import { NextResponse } from "next/server"
import Anthropic from "@anthropic-ai/sdk"
import { createClient } from "@supabase/supabase-js"

export const dynamic = "force-dynamic"
export const maxDuration = 300 // Vercel Pro required

// ─── Clientes ─────────────────────────────────────────────────────────────────

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )
}

// ─── Constantes ───────────────────────────────────────────────────────────────

const TERMINOS = [
  "abogado laboral",
  "abogado familiar",
  "abogado penal",
  "abogado corporativo",
  "abogado fiscal",
  "abogado civil",
  "abogado inmobiliario",
  "abogado mercantil",
  "despacho jurídico",
  "asesoría legal",
  "licenciado en derecho",
  "bufete de abogados",
]

const CIUDADES = [
  { nombre: "Chihuahua",           lat: 28.6353,  lng: -106.0889 },
  { nombre: "Ciudad Juárez",       lat: 31.6904,  lng: -106.4245 },
  { nombre: "Delicias",            lat: 28.1922,  lng: -105.4711 },
  { nombre: "Cuauhtémoc",          lat: 28.4083,  lng: -106.8644 },
  { nombre: "Parral",              lat: 26.9317,  lng: -105.6664 },
  { nombre: "Nuevo Casas Grandes", lat: 30.4133,  lng: -107.9183 },
  { nombre: "Camargo",             lat: 27.6789,  lng: -105.1678 },
  { nombre: "Jiménez",             lat: 27.1333,  lng: -104.9167 },
  { nombre: "Ojinaga",             lat: 29.5667,  lng: -104.4167 },
  { nombre: "Guerrero",            lat: 28.5500,  lng: -107.4833 },
]

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface LugarDetalle {
  name: string
  rating?: number
  telefono: string | null
  website: string | null
  direccion: string | null
}

interface Prospecto {
  nombre: string
  especialidad: string
  ciudad: string
  email: string
  telefono: string | null
  despacho: string | null
  website: string | null
  direccion: string | null
  score: number
}

interface Ciudad {
  nombre: string
  lat: number
  lng: number
}

// ─── Google Maps ──────────────────────────────────────────────────────────────

async function buscarEnGoogleMaps(termino: string, ciudad: Ciudad) {
  const query = encodeURIComponent(`${termino} ${ciudad.nombre} Chihuahua Mexico`)
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&language=es&region=mx&key=${process.env.GOOGLE_API_KEY}`

  const res = await fetch(url)
  const data = await res.json() as { status: string; error_message?: string; results?: { place_id: string; name: string; rating?: number; formatted_address?: string }[] }

  if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
    throw new Error(`Google Maps error: ${data.status} - ${data.error_message ?? ""}`)
  }

  return (data.results ?? []).slice(0, 8)
}

async function obtenerDetalle(placeId: string): Promise<{ formatted_phone_number?: string; website?: string; formatted_address?: string } | null> {
  const fields = "name,formatted_phone_number,website,rating,formatted_address"
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&language=es&key=${process.env.GOOGLE_API_KEY}`

  const res = await fetch(url)
  const data = await res.json() as { status: string; result?: { formatted_phone_number?: string; website?: string; formatted_address?: string } }

  if (data.status !== "OK") return null
  return data.result ?? null
}

// ─── Claude enriquece ─────────────────────────────────────────────────────────

async function enriquecerConClaude(lugares: LugarDetalle[], termino: string, ciudad: string): Promise<Prospecto[]> {
  if (lugares.length === 0) return []

  const lugaresTexto = lugares.map((l, i) =>
    `${i + 1}. Nombre: ${l.name}
   Teléfono: ${l.telefono ?? "No disponible"}
   Dirección: ${l.direccion ?? "No disponible"}
   Website: ${l.website ?? "No disponible"}
   Rating: ${l.rating ?? "N/A"}`
  ).join("\n\n")

  const prompt = `Eres un asistente para Lexia, un directorio legal mexicano.

Analiza estos despachos/abogados encontrados en Google Maps para "${termino}" en ${ciudad}:

${lugaresTexto}

Para cada uno genera un JSON. Si no tienes el email, infiere uno probable basado en el nombre y website. Responde SOLO con el array JSON, sin texto adicional, sin backticks:

[
  {
    "nombre": "Nombre del abogado o despacho",
    "especialidad": "${termino}",
    "ciudad": "${ciudad}",
    "email": "email inferido o probable",
    "telefono": "teléfono real si está disponible",
    "despacho": "nombre del despacho",
    "website": "url si existe o null",
    "direccion": "dirección real",
    "score": 85
  }
]

El score considera: tiene teléfono (+20), tiene website (+20), tiene rating en Google (+15), nombre profesional (+15), dirección completa (+15), base (15).`

  const message = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 4096,
    messages: [{ role: "user", content: prompt }],
  })

  const text = (message.content[0] as { text: string }).text
  const match = text.match(/\[[\s\S]*\]/)
  if (!match) return []

  try {
    return JSON.parse(match[0]) as Prospecto[]
  } catch {
    return []
  }
}

// ─── Deduplicación ────────────────────────────────────────────────────────────

async function filtrarNuevos(prospectos: Prospecto[]) {
  if (prospectos.length === 0) return { nuevos: [] as Prospecto[], duplicados: [] as Prospecto[] }

  const supabase = getSupabase()
  const emails    = prospectos.map(p => p.email).filter(Boolean)
  const nombres   = prospectos.map(p => p.nombre).filter(Boolean)
  const telefonos = prospectos.map(p => p.telefono).filter(Boolean) as string[]

  const filters = [
    emails.length    ? `email.in.(${emails.map(e => `"${e}"`).join(",")})` : null,
    nombres.length   ? `nombre.in.(${nombres.map(n => `"${n}"`).join(",")})` : null,
    telefonos.length ? `telefono.in.(${telefonos.map(t => `"${t}"`).join(",")})` : null,
  ].filter(Boolean).join(",")

  const { data: existentes } = await supabase
    .from("prospectos")
    .select("email, nombre, telefono")
    .or(filters)

  const emailsEx    = new Set((existentes ?? []).map((r: { email: string }) => r.email))
  const nombresEx   = new Set((existentes ?? []).map((r: { nombre: string }) => r.nombre))
  const telefonosEx = new Set((existentes ?? []).map((r: { telefono: string }) => r.telefono))

  const nuevos     = prospectos.filter(p =>
    !emailsEx.has(p.email) &&
    !nombresEx.has(p.nombre) &&
    (!p.telefono || !telefonosEx.has(p.telefono))
  )
  const duplicados = prospectos.filter(p =>
    emailsEx.has(p.email) ||
    nombresEx.has(p.nombre) ||
    (p.telefono != null && telefonosEx.has(p.telefono))
  )

  return { nuevos, duplicados }
}

// ─── Guardar ──────────────────────────────────────────────────────────────────

async function guardarProspectos(prospectos: Prospecto[]) {
  if (prospectos.length === 0) return

  const supabase = getSupabase()
  const rows = prospectos.map(p => ({
    ...p,
    estado: "prospecto",
    fuente: "google-maps",
    created_at: new Date().toISOString(),
  }))

  const { error } = await supabase
    .from("prospectos")
    .upsert(rows, { onConflict: "email", ignoreDuplicates: true })

  if (error) throw new Error(`Supabase error: ${error.message}`)
}

// ─── Handler ──────────────────────────────────────────────────────────────────

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization")
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const resumen = { buscados: 0, nuevos: 0, duplicados: 0, errores: 0 }

  for (const termino of TERMINOS) {
    for (const ciudad of CIUDADES) {
      try {
        const resultados = await buscarEnGoogleMaps(termino, ciudad)
        if (resultados.length === 0) continue

        const lugaresDetalle: LugarDetalle[] = await Promise.all(
          resultados.map(async (l) => {
            const detalle = await obtenerDetalle(l.place_id)
            return {
              name:      l.name,
              rating:    l.rating,
              telefono:  detalle?.formatted_phone_number ?? null,
              website:   detalle?.website ?? null,
              direccion: detalle?.formatted_address ?? l.formatted_address ?? null,
            }
          })
        )

        const prospectos = await enriquecerConClaude(lugaresDetalle, termino, ciudad.nombre)
        resumen.buscados += prospectos.length

        const { nuevos, duplicados } = await filtrarNuevos(prospectos)
        resumen.duplicados += duplicados.length

        await guardarProspectos(nuevos)
        resumen.nuevos += nuevos.length

        await new Promise(r => setTimeout(r, 400))
      } catch (e) {
        console.error(`captacion error [${termino}/${ciudad.nombre}]:`, e)
        resumen.errores++
      }
    }
  }

  return NextResponse.json({ ok: true, resumen })
}
