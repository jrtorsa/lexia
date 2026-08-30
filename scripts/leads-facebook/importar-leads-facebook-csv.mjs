// importar-leads-facebook-csv.mjs
//
// Importa leads exportados como CSV desde Meta Ads Manager (Instant Forms
// Library) a la tabla `prospectos` de Supabase.
//
// A diferencia de importar-leads-facebook{,-2,-3}.mjs (arrays hardcodeados
// y nunca commiteados), este script:
//   - Lee un CSV real y detecta columnas por nombre de header (tolerante a
//     los distintos formatos que exporta Meta).
//   - Deduplica contra el estado ACTUAL de la tabla `prospectos` (por email,
//     único identificador con constraint UNIQUE), no contra scripts viejos.
//     `nombre` YA NO es único en la BD (se quitó el constraint a propósito:
//     dos personas distintas pueden llamarse igual) — solo se compara para
//     dar contexto, nunca para descartar un lead.
//   - `telefono` SÍ mantiene su UNIQUE constraint en la BD (parcial, excluye
//     NULL/vacío). El script detecta colisiones de teléfono (normalizando a
//     los últimos 10 dígitos):
//       * Si chocan DOS FILAS DEL MISMO CSV (mismo lead reenviado con otro
//         email) se resuelve automáticamente: se conserva la fila con la
//         fecha de creación más reciente y se descarta la otra. Se reporta
//         qué se resolvió, nunca en silencio.
//       * Si choca contra un registro YA EXISTENTE en la BD, no se resuelve
//         solo — se lista para revisión manual (podría ser el mismo lead
//         reingresando, o un número mal capturado).
//   - Es idempotente: correrlo dos veces con el mismo CSV no inserta nada
//     dos veces.
//   - Soporta --dry-run para revisar antes de escribir.
//
// Uso:
//   node importar-leads-facebook-csv.mjs <ruta-al-csv> --dry-run
//   node importar-leads-facebook-csv.mjs <ruta-al-csv>

import { createClient } from "@supabase/supabase-js"
import { readFileSync } from "fs"

// ─── Args ───────────────────────────────────────────────────────────────────

const args = process.argv.slice(2)
const dryRun = args.includes("--dry-run")
const csvPath = args.find((a) => !a.startsWith("--"))

if (!csvPath) {
  console.error("Uso: node importar-leads-facebook-csv.mjs <ruta-al-csv> [--dry-run]")
  process.exit(1)
}

// ─── Config / Supabase ──────────────────────────────────────────────────────

const envFile = readFileSync(".env.local", "utf-8")
const env = Object.fromEntries(
  envFile.split("\n")
    .filter((line) => line && !line.startsWith("#") && line.includes("="))
    .map((line) => {
      const [key, ...rest] = line.split("=")
      return [key.trim(), rest.join("=").trim()]
    })
)

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY
)

// ─── CSV parsing (RFC4180-ish: comillas, comas y saltos de línea dentro de campos) ──

function parseCsv(text) {
  // Quita BOM si Meta lo incluye
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1)

  const rows = []
  let row = []
  let field = ""
  let inQuotes = false

  for (let i = 0; i < text.length; i++) {
    const c = text[i]

    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"'
          i++
        } else {
          inQuotes = false
        }
      } else {
        field += c
      }
      continue
    }

    if (c === '"') {
      inQuotes = true
    } else if (c === ",") {
      row.push(field)
      field = ""
    } else if (c === "\r") {
      // ignorar, \n lo maneja
    } else if (c === "\n") {
      row.push(field)
      rows.push(row)
      row = []
      field = ""
    } else {
      field += c
    }
  }
  // última fila si el archivo no termina en \n
  if (field.length > 0 || row.length > 0) {
    row.push(field)
    rows.push(row)
  }

  return rows.filter((r) => r.length > 1 || (r.length === 1 && r[0] !== ""))
}

// ─── Detección tolerante de columnas ────────────────────────────────────────

function normalizeHeader(h) {
  return h
    .toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "") // quita acentos
    .replace(/[^a-z0-9]/g, "") // quita espacios, guiones, guiones bajos, etc.
}

const HEADER_CANDIDATES = {
  nombre: ["fullname", "name", "nombre", "nombrecompleto"],
  email: ["email", "emailaddress", "correo", "correoelectronico"],
  telefono: ["phonenumber", "phone", "telefono", "celular", "numerotelefonico", "whatsapp"],
  fecha: ["createdtime", "created_time", "fechadecreacion", "fechacreacion", "fecha"],
}

function detectColumns(headerRow) {
  const normalized = headerRow.map(normalizeHeader)
  const columns = {}

  for (const [field, candidates] of Object.entries(HEADER_CANDIDATES)) {
    // 1) match exacto contra la lista de candidatos
    let idx = normalized.findIndex((h) => candidates.includes(h))
    // 2) si no hay match exacto, match por "includes" (ej. "leadsfullname")
    if (idx === -1) {
      idx = normalized.findIndex((h) => candidates.some((c) => h.includes(c)))
    }
    if (idx !== -1) columns[field] = idx
  }

  return columns
}

// ─── Normalización de valores ───────────────────────────────────────────────

function normEmail(raw) {
  return (raw || "").trim().toLowerCase()
}

function normNombre(raw) {
  return (raw || "").trim().replace(/\s+/g, " ")
}

function normTelefono(raw) {
  return (raw || "").trim()
}

// Clave de comparación: solo dígitos, quedándose con los últimos 10 (número
// mexicano sin país/prefijos). Así "+52 01 7445066665", "044 744 506 6665" y
// "7445066665" se reconocen como el mismo teléfono.
function telefonoKey(raw) {
  const digits = (raw || "").replace(/\D/g, "")
  if (digits.length === 0) return ""
  return digits.length <= 10 ? digits : digits.slice(-10)
}

// Enmascara para mostrar sin exponer el número completo en logs/resúmenes.
function maskTelefono(raw) {
  const s = (raw || "").trim()
  if (s.length <= 6) return "*".repeat(s.length)
  return s.slice(0, 4) + "*".repeat(Math.max(s.length - 6, 3)) + s.slice(-2)
}

// Formato de Meta Business Suite: "08/28/2026 9:54pm" (MM/DD/YYYY h:mmam|pm,
// sin espacio antes de am/pm). Se interpreta en la zona horaria local de esta
// máquina (America/Chihuahua), que es la zona de negocio de Lexia.
function parseFechaMeta(raw) {
  if (!raw) return null
  const m = raw.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2})\s*(am|pm)$/i)
  if (!m) return null

  let [, mo, d, y, h, mi, ap] = m
  h = parseInt(h, 10)
  if (ap.toLowerCase() === "pm" && h !== 12) h += 12
  if (ap.toLowerCase() === "am" && h === 12) h = 0

  const date = new Date(Number(y), Number(mo) - 1, Number(d), h, Number(mi), 0)
  return isNaN(date.getTime()) ? null : date
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  console.log("\n📋 LEXIA — Importar Leads de Facebook (CSV)")
  console.log("═".repeat(50))
  console.log(`Archivo: ${csvPath}`)
  console.log(`Modo: ${dryRun ? "DRY-RUN (no escribe en la BD)" : "EJECUCIÓN REAL"}\n`)

  const text = readFileSync(csvPath, "utf-8")
  const rows = parseCsv(text)

  if (rows.length === 0) {
    console.error("❌ El CSV está vacío.")
    process.exit(1)
  }

  const headerRow = rows[0]
  const dataRows = rows.slice(1)
  const columns = detectColumns(headerRow)

  console.log("Columnas detectadas:")
  console.log(`  nombre   -> ${columns.nombre !== undefined ? `"${headerRow[columns.nombre]}"` : "(no encontrada)"}`)
  console.log(`  email    -> ${columns.email !== undefined ? `"${headerRow[columns.email]}"` : "(no encontrada)"}`)
  console.log(`  telefono -> ${columns.telefono !== undefined ? `"${headerRow[columns.telefono]}"` : "(no encontrada)"}`)
  console.log(`  fecha    -> ${columns.fecha !== undefined ? `"${headerRow[columns.fecha]}"` : "(no encontrada, se usará la fecha de importación)"}`)
  console.log("")

  if (columns.email === undefined) {
    console.error("❌ No se pudo detectar la columna de email en el CSV. Revisa los headers.")
    console.error(`   Headers encontrados: ${headerRow.join(" | ")}`)
    process.exit(1)
  }

  // ─── Traer estado actual de la tabla (dedup real, no contra scripts viejos) ──

  const { data: existingRows, error: fetchError } = await supabase
    .from("prospectos")
    .select("email, nombre, telefono")

  if (fetchError) {
    console.error("❌ Error consultando prospectos existentes:", fetchError.message)
    process.exit(1)
  }

  const existingEmails = new Set(existingRows.map((r) => normEmail(r.email)))

  // Mapa teléfono normalizado -> primer registro existente que lo tiene,
  // para poder mostrar contra quién choca (no solo que "ya existe").
  const existingPhoneMap = new Map()
  for (const r of existingRows) {
    const key = telefonoKey(r.telefono)
    if (key && !existingPhoneMap.has(key)) {
      existingPhoneMap.set(key, { nombre: r.nombre, email: r.email, telefono: r.telefono })
    }
  }

  console.log(`Prospectos ya existentes en BD: ${existingRows.length}\n`)

  // ─── Procesar filas del CSV ──────────────────────────────────────────────

  let leidos = 0
  let sinEmail = 0
  let duplicadosEnCsv = 0
  let yaExistianEmail = 0
  let nuevos = 0
  let insertados = 0
  let errores = 0
  let fechasInvalidas = 0
  let telefonoChocaBd = 0

  const seenEmailsThisRun = new Set()
  const colisionesTelefonoBd = []

  // ─── Pasada 1: parsear filas y resolver choques de teléfono DENTRO del CSV ──
  // Regla de negocio (decidida explícitamente, no automática por default):
  // si dos filas comparten teléfono, es el mismo lead reenviado con otro
  // email — se conserva la fila con la fecha de creación más reciente y se
  // descarta la otra. Esto es independiente del dedup por email de abajo.

  const parsed = []
  for (const row of dataRows) {
    if (row.every((c) => c.trim() === "")) continue
    leidos++

    const nombre = columns.nombre !== undefined ? normNombre(row[columns.nombre]) : ""
    const email = normEmail(row[columns.email])
    const telefono = columns.telefono !== undefined ? normTelefono(row[columns.telefono]) : ""
    const telKey = telefonoKey(telefono)
    const fechaRaw = columns.fecha !== undefined ? row[columns.fecha] : ""
    const fechaCreacion = fechaRaw ? parseFechaMeta(fechaRaw) : null
    if (fechaRaw && !fechaCreacion) {
      fechasInvalidas++
      console.log(`  ⚠️  Fecha no reconocida ("${fechaRaw}"), se usará la fecha de importación para: ${email || "(sin email)"}`)
    }

    if (!email) {
      sinEmail++
      console.log(`  ⚠️  Fila sin email, omitida: ${JSON.stringify(row)}`)
      continue
    }

    parsed.push({ nombre, email, telefono, telKey, fechaCreacion })
  }

  const porTelefono = new Map()
  parsed.forEach((lead, idx) => {
    if (!lead.telKey) return
    if (!porTelefono.has(lead.telKey)) porTelefono.set(lead.telKey, [])
    porTelefono.get(lead.telKey).push(idx)
  })

  const descartadoPorTelefono = new Set()
  let telefonoResueltoCsv = 0

  for (const idxs of porTelefono.values()) {
    if (idxs.length < 2) continue

    // Ganador: fecha más reciente conocida. Si ninguna fila tiene fecha
    // parseable, se conserva la primera que aparece en el archivo.
    let ganadorIdx = idxs[0]
    for (const idx of idxs.slice(1)) {
      const actual = parsed[idx]
      const ganador = parsed[ganadorIdx]
      if (actual.fechaCreacion && (!ganador.fechaCreacion || actual.fechaCreacion > ganador.fechaCreacion)) {
        ganadorIdx = idx
      }
    }

    for (const idx of idxs) {
      if (idx === ganadorIdx) continue
      descartadoPorTelefono.add(idx)
      telefonoResueltoCsv++
      const ganador = parsed[ganadorIdx]
      const perdedor = parsed[idx]
      console.log(`  🔀 Duplicado de teléfono resuelto: se conserva ${ganador.nombre || "(sin nombre)"} <${ganador.email}> (más reciente), se descarta ${perdedor.nombre || "(sin nombre)"} <${perdedor.email}> ${maskTelefono(perdedor.telefono)}`)
    }
  }

  // ─── Pasada 2: dedup contra la BD e inserción ───────────────────────────────

  for (let i = 0; i < parsed.length; i++) {
    if (descartadoPorTelefono.has(i)) continue
    const { nombre, email, telefono, telKey, fechaCreacion } = parsed[i]

    if (seenEmailsThisRun.has(email)) {
      duplicadosEnCsv++
      console.log(`  ⏭️  Duplicado dentro del propio CSV (email): ${email}`)
      continue
    }

    if (existingEmails.has(email)) {
      yaExistianEmail++
      console.log(`  ⏭️  Ya existe en BD (email): ${email}`)
      seenEmailsThisRun.add(email)
      continue
    }

    // Colisión de teléfono contra la BD: NO se resuelve sola (a diferencia
    // del caso dentro del CSV, aquí ya hay un registro persistido). Se
    // reporta para revisión manual — `telefono` tiene UNIQUE en la BD, así
    // que insertar esto tal cual fallaría.
    if (telKey && existingPhoneMap.has(telKey)) {
      telefonoChocaBd++
      const existente = existingPhoneMap.get(telKey)
      colisionesTelefonoBd.push({
        nombre, email, telefono,
        existenteNombre: existente.nombre, existenteEmail: existente.email, existenteTelefono: existente.telefono,
      })
      console.log(`  📵 Choque de teléfono contra BD: ${nombre} <${email}> ${maskTelefono(telefono)} ≈ ya existe: ${existente.nombre} <${existente.email}> ${maskTelefono(existente.telefono)}`)
      seenEmailsThisRun.add(email)
      continue
    }

    // Es nuevo
    seenEmailsThisRun.add(email)
    nuevos++

    if (dryRun) {
      const fechaTxt = fechaCreacion ? fechaCreacion.toISOString() : "(fecha de importación)"
      console.log(`  ✅ [DRY-RUN] Insertaría: ${nombre || "(sin nombre)"} <${email}> ${telefono} | created_at: ${fechaTxt}`)
      continue
    }

    const insertRow = {
      nombre: nombre || null,
      email,
      telefono: telefono || null,
      ciudad: "México",
      especialidad: "Derecho",
      estado: "prospecto",
      fuente: "facebook_lead_ad",
    }
    if (fechaCreacion) insertRow.created_at = fechaCreacion.toISOString()

    const { error } = await supabase
      .from("prospectos")
      .insert(insertRow)

    if (error) {
      errores++
      console.error(`  ❌ Error insertando ${email}: ${error.message}`)
    } else {
      insertados++
      console.log(`  ✅ Insertado: ${nombre || "(sin nombre)"} <${email}>`)
      // evita duplicar dentro de la misma corrida si el CSV trae variantes
      existingEmails.add(email)
    }
  }

  console.log("\n" + "═".repeat(50))
  console.log("📊 RESUMEN")
  console.log("═".repeat(50))
  console.log(`   Leads leídos del CSV:              ${leidos}`)
  console.log(`   Sin email (omitidos):              ${sinEmail}`)
  console.log(`   Duplicados dentro del CSV (email): ${duplicadosEnCsv}`)
  console.log(`   Ya existían en BD (por email):     ${yaExistianEmail}`)
  console.log(`   Dup. teléfono en CSV (resueltos):  ${telefonoResueltoCsv}  (se conservó el registro más reciente, ver detalle abajo)`)
  console.log(`   Choque de teléfono contra BD:      ${telefonoChocaBd}  (requiere revisión manual, ver lista abajo)`)
  console.log(`   Fechas no reconocidas:             ${fechasInvalidas}`)
  if (dryRun) {
    console.log(`   Se insertarían (nuevos, limpios):  ${nuevos}`)
    console.log("\n   ⚠️  DRY-RUN: no se escribió nada en la base de datos.")
  } else {
    console.log(`   Insertados:                        ${insertados}`)
    console.log(`   Errores de inserción:              ${errores}`)
  }
  console.log("═".repeat(50))

  if (colisionesTelefonoBd.length > 0) {
    console.log("\n📵 CHOQUES DE TELÉFONO CONTRA LA BD (revisar caso por caso):")
    for (const c of colisionesTelefonoBd) {
      console.log(`   - CSV: ${c.nombre || "(sin nombre)"} <${c.email}> ${maskTelefono(c.telefono)}`)
      console.log(`     ya existe: ${c.existenteNombre || "(sin nombre)"} <${c.existenteEmail}> ${maskTelefono(c.existenteTelefono)}`)
    }
  }

  console.log("")
}

main().catch((err) => {
  console.error("💥 Error fatal:", err)
  process.exit(1)
})
