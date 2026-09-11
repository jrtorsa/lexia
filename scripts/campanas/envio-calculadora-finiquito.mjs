// envio-calculadora-finiquito.mjs
//
// Envío ÚNICO y dirigido a los abogados registrados activos, promocionando
// la Calculadora de Finiquito (/herramientas). NO toca la tabla `prospectos`
// ni el cron de captación — esos son leads sin cuenta, esto es una campaña
// aparte a usuarios YA REGISTRADOS (tabla "Lawyer", vía Prisma).
//
// No marca nada en la BD: es un envío informativo, no cambia isActive,
// no crea registros, no actualiza nada del abogado.
//
// Modos:
//   node envio-calculadora-finiquito.mjs --dry-run   # no envía nada
//   node envio-calculadora-finiquito.mjs --test      # envía SOLO a jr.torsa@gmail.com
//   node envio-calculadora-finiquito.mjs --send      # envío real a los 80

import { readFileSync } from "fs"
import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"
import { Resend } from "resend"

// ─── Args ───────────────────────────────────────────────────────────────────

const args = process.argv.slice(2)
const dryRun = args.includes("--dry-run")
const testMode = args.includes("--test")
const sendMode = args.includes("--send")

if (!dryRun && !testMode && !sendMode) {
  console.error("Uso: node envio-calculadora-finiquito.mjs [--dry-run | --test | --send]")
  process.exit(1)
}

// ─── Config / env ───────────────────────────────────────────────────────────

const envFile = readFileSync(".env.local", "utf-8")
const env = Object.fromEntries(
  envFile.split("\n")
    .filter((line) => line && !line.startsWith("#") && line.includes("="))
    .map((line) => {
      const [key, ...rest] = line.split("=")
      return [key.trim(), rest.join("=").trim().replace(/^"|"$/g, "")]
    })
)

const pool = new Pool({ connectionString: env.DATABASE_URL, max: 1 })
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) })
const resend = new Resend(env.RESEND_API_KEY)

const FROM = "Lexia <hola@lexiamx.com>"
const REPLY_TO = "hola@lexiamx.com"
const DELAY_MS = 500
const TEST_EMAIL = "jr.torsa@gmail.com"

// ─── sanitizeTag ────────────────────────────────────────────────────────────
// Copiado de src/lib/email.ts — Resend rechaza tags[].value con acentos
// (422, ver bug del cron de email). No se importa directo porque ese
// archivo es TS con path alias @/ y este script corre como .mjs plano.

function sanitizeTag(value) {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9_-]/g, "")
}

// ─── Template de email ──────────────────────────────────────────────────────

function buildEmail(name) {
  return {
    subject: "Calcula finiquitos en segundos — tu herramienta en Lexia",
    html: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Calculadora de Finiquito · Lexia</title>
</head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0ea5e9,#6366f1);padding:36px 40px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:800;letter-spacing:-0.5px;">Lexia</h1>
              <p style="margin:6px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">El directorio legal de México</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <p style="margin:0 0 16px;font-size:16px;color:#1e293b;">
                Hola <strong>${name}</strong>,
              </p>
              <p style="margin:0 0 16px;font-size:15px;color:#475569;line-height:1.6;">
                Ya tienes tu perfil en Lexia — ahora súmale una herramienta que tus clientes van a agradecerte: la <strong>Calculadora de Finiquito</strong>, disponible gratis.
              </p>
              <p style="margin:0 0 24px;font-size:15px;color:#475569;line-height:1.6;">
                Calcula finiquito o liquidación según la Ley Federal del Trabajo en segundos: salario pendiente, vacaciones proporcionales, prima vacacional, aguinaldo y, en caso de despido injustificado, indemnización constitucional y prima de antigüedad — todo con el desglose legal explicado.
              </p>

              <!-- Feature -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td style="padding:12px 16px;background:#fefce8;border-radius:8px;">
                    <table width="100%"><tr>
                      <td width="36" style="font-size:22px;">🧮</td>
                      <td>
                        <strong style="color:#eab308;font-size:14px;">Calculadora laboral, actualizada 2025</strong><br/>
                        <span style="color:#64748b;font-size:13px;">Útil para tus propios cálculos o para compartir con clientes en consulta</span>
                      </td>
                    </tr></table>
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="https://lexiamx.com/herramientas?utm_source=abogados&utm_medium=email&utm_campaign=calculadora-finiquito"
                      style="display:inline-block;padding:14px 36px;background:#C49A3C;color:#0C0D10;font-size:15px;font-weight:700;text-decoration:none;border-radius:8px;">
                      Usar la calculadora →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:28px 0 0;font-size:13px;color:#94a3b8;text-align:center;line-height:1.6;">
                ¿Tienes dudas o sugerencias? Responde este correo y con gusto te ayudamos.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;padding:20px 40px;text-align:center;border-top:1px solid #e2e8f0;">
              <p style="margin:0;font-size:12px;color:#94a3b8;">
                © Lexia · lexiamx.com · Chihuahua, México
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
  }
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function maskEmail(email) {
  const [user, domain] = email.split("@")
  if (!domain) return "***"
  const visible = user.slice(0, 2)
  return `${visible}${"*".repeat(Math.max(user.length - 2, 1))}@${domain}`
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  const abogados = await prisma.lawyer.findMany({
    where: { isActive: true },
    select: { name: true, email: true },
    orderBy: { name: "asc" },
  })

  if (dryRun) {
    console.log(`[dry-run] Destinatarios cargados: ${abogados.length}`)
    console.log(`[dry-run] Ejemplos (nombre + email enmascarado):`)
    abogados.slice(0, 3).forEach((a) => {
      console.log(`  - ${a.name} <${maskEmail(a.email)}>`)
    })

    const { subject, html } = buildEmail(abogados[0]?.name ?? "{name}")
    console.log(`\n[dry-run] Asunto: ${subject}`)
    console.log(`[dry-run] HTML renderizado (con el primer destinatario como ejemplo):\n`)
    console.log(html)
    console.log(`\n[dry-run] No se envió ningún correo. Nada se escribió en la BD.`)
    return
  }

  if (testMode) {
    const { subject, html } = buildEmail("Jose Raúl")
    console.log(`[test] Enviando SOLO a ${TEST_EMAIL}...`)
    const { data, error } = await resend.emails.send({
      from: FROM,
      replyTo: REPLY_TO,
      to: TEST_EMAIL,
      subject,
      html,
      tags: [{ name: "campaign", value: sanitizeTag("calculadora-finiquito-test") }],
    })
    if (error) {
      console.error("[test] Error:", JSON.stringify(error, null, 2))
      process.exit(1)
    }
    console.log(`[test] Enviado OK. Resend id: ${data.id}`)
    console.log(`[test] Revisa la bandeja de ${TEST_EMAIL} y prueba el link del botón.`)
    return
  }

  if (sendMode) {
    console.log(`[send] Envío real a ${abogados.length} abogados activos. Delay ${DELAY_MS}ms entre envíos.`)
    const resumen = { enviados: 0, errores: 0 }
    const fallidos = []

    for (const abogado of abogados) {
      try {
        const { subject, html } = buildEmail(abogado.name.trim())
        const { data, error } = await resend.emails.send({
          from: FROM,
          replyTo: REPLY_TO,
          to: abogado.email,
          subject,
          html,
          tags: [{ name: "campaign", value: sanitizeTag("calculadora-finiquito") }],
        })

        if (error || !data?.id) {
          console.error(`[send] Error [${maskEmail(abogado.email)}]:`, JSON.stringify(error, null, 2))
          resumen.errores++
          fallidos.push({ name: abogado.name, email: abogado.email, error: error?.message ?? "sin id de Resend" })
          continue
        }

        resumen.enviados++
        console.log(`[send] OK [${maskEmail(abogado.email)}] resend_id=${data.id}`)
      } catch (e) {
        console.error(`[send] Excepción [${maskEmail(abogado.email)}]:`, e?.message ?? e)
        resumen.errores++
        fallidos.push({ name: abogado.name, email: abogado.email, error: e?.message ?? String(e) })
      }

      await new Promise((r) => setTimeout(r, DELAY_MS))
    }

    console.log(`\n[send] Resumen: total=${abogados.length} enviados=${resumen.enviados} errores=${resumen.errores}`)
    if (fallidos.length > 0) {
      console.log(`[send] Fallidos:`)
      fallidos.forEach((f) => console.log(`  - ${f.name} <${f.email}>: ${f.error}`))
    }
  }
}

main()
  .catch((e) => {
    console.error("Error fatal:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    await pool.end()
  })
