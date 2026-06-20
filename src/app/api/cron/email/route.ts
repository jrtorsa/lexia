import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { Resend } from "resend"

export const dynamic = "force-dynamic"
export const maxDuration = 60 // Vercel Pro required

// ─── Clientes ─────────────────────────────────────────────────────────────────

const resend = new Resend(process.env.RESEND_API_KEY)

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )
}

const FROM     = "Lexia <hola@lexiamx.com>"
const REPLY_TO = "hola@lexiamx.com"

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface Prospecto {
  id: string
  nombre: string
  email: string
  especialidad: string
  ciudad: string
}

// ─── Template de email ────────────────────────────────────────────────────────

function buildEmail(prospecto: Prospecto) {
  return {
    subject: `${prospecto.nombre}, te invitamos a unirte a Lexia`,
    html: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Invitación Lexia</title>
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
                Estimado <strong>${prospecto.nombre}</strong>,
              </p>
              <p style="margin:0 0 16px;font-size:15px;color:#475569;line-height:1.6;">
                Somos <strong>Lexia</strong>, el directorio legal enfocado en conectar a abogados mexicanos con clientes que necesitan sus servicios. Encontramos tu despacho en ${prospecto.ciudad} y queremos invitarte a formar parte de nuestra plataforma.
              </p>
              <p style="margin:0 0 24px;font-size:15px;color:#475569;line-height:1.6;">
                Al registrarte <strong>gratis</strong> obtienes acceso a:
              </p>

              <!-- Features -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td style="padding:12px 16px;background:#f0f9ff;border-radius:8px;margin-bottom:8px;display:block;">
                    <table width="100%"><tr>
                      <td width="36" style="font-size:22px;">📋</td>
                      <td>
                        <strong style="color:#0ea5e9;font-size:14px;">Perfil profesional en el directorio</strong><br/>
                        <span style="color:#64748b;font-size:13px;">Visibilidad ante clientes que buscan ${prospecto.especialidad} en ${prospecto.ciudad}</span>
                      </td>
                    </tr></table>
                  </td>
                </tr>
                <tr><td style="height:8px;"></td></tr>
                <tr>
                  <td style="padding:12px 16px;background:#f0fdf4;border-radius:8px;">
                    <table width="100%"><tr>
                      <td width="36" style="font-size:22px;">⚖️</td>
                      <td>
                        <strong style="color:#22c55e;font-size:14px;">Buscador de jurisprudencias</strong><br/>
                        <span style="color:#64748b;font-size:13px;">Acceso a criterios del Poder Judicial de la Federación</span>
                      </td>
                    </tr></table>
                  </td>
                </tr>
                <tr><td style="height:8px;"></td></tr>
                <tr>
                  <td style="padding:12px 16px;background:#fefce8;border-radius:8px;">
                    <table width="100%"><tr>
                      <td width="36" style="font-size:22px;">🧮</td>
                      <td>
                        <strong style="color:#eab308;font-size:14px;">Calculadora laboral</strong><br/>
                        <span style="color:#64748b;font-size:13px;">Liquidaciones, finiquitos y prestaciones de ley al instante</span>
                      </td>
                    </tr></table>
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="https://lexiamx.com/registro?utm_source=captacion&utm_medium=email&utm_campaign=invitacion"
                      style="display:inline-block;padding:14px 36px;background:linear-gradient(135deg,#0ea5e9,#6366f1);color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;border-radius:8px;">
                      Crear mi perfil gratis →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:28px 0 0;font-size:13px;color:#94a3b8;text-align:center;line-height:1.6;">
                ¿Tienes dudas? Responde este correo y con gusto te ayudamos.<br/>
                Si no deseas recibir más correos, <a href="https://lexiamx.com/unsubscribe?email=${prospecto.email}" style="color:#94a3b8;">cancela tu suscripción aquí</a>.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;padding:20px 40px;text-align:center;border-top:1px solid #e2e8f0;">
              <p style="margin:0;font-size:12px;color:#94a3b8;">
                © 2025 Lexia · lexiamx.com · Chihuahua, México
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

// ─── Handler ──────────────────────────────────────────────────────────────────

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization")
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const supabase = getSupabase()

  const { data: prospectos, error } = await supabase
    .from("prospectos")
    .select("id, nombre, email, especialidad, ciudad")
    .eq("estado", "prospecto")
    .limit(10)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const lista = (prospectos ?? []) as Prospecto[]
  const resumen = { enviados: 0, errores: 0 }

  for (const prospecto of lista) {
    try {
      const { subject, html } = buildEmail(prospecto)

      const { data: emailData, error: emailError } = await resend.emails.send({
        from: FROM,
        replyTo: REPLY_TO,
        to: prospecto.email,
        subject,
        html,
        tags: [
          { name: "campaign", value: "captacion-chihuahua" },
          { name: "especialidad", value: prospecto.especialidad.replace(/\s/g, "-").toLowerCase() },
        ],
      })

      if (emailError || !emailData?.id) {
        console.error(`Resend error [${prospecto.email}]:`, emailError)
        resumen.errores++
        continue
      }

      await supabase
        .from("prospectos")
        .update({
          estado: "contactado",
          resend_id: emailData.id,
          contactado_at: new Date().toISOString(),
        })
        .eq("id", prospecto.id)

      resumen.enviados++

      await new Promise(r => setTimeout(r, 400))
    } catch (e) {
      console.error(`email error [${prospecto.email}]:`, e)
      resumen.errores++
    }
  }

  return NextResponse.json({ ok: true, total: lista.length, resumen })
}
