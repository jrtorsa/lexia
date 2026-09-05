import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export const dynamic = "force-dynamic"
export const maxDuration = 60 // Vercel Pro required — el poll de status agrega latencia

const LIMITE = 20

// ─── Kill switch explícito ──────────────────────────────────────────────────
// La cuenta de WhatsApp Business fue deshabilitada por Meta (Twilio error
// 63112, confirmado 2026-09-05: ~127 mensajes de la semana del 30-ago al
// 5-sep "aceptados" por Twilio pero nunca entregados). El toggle de
// pausado del dashboard de Vercel NO es confiable — se reactivó solo tras
// un redeploy que ni siquiera tocaba este cron. Este flag es la fuente de
// verdad real: no cambiar a "true" hasta confirmar con Meta/Twilio que la
// cuenta de WhatsApp Business fue restaurada.
const WHATSAPP_ENABLED = process.env.WHATSAPP_ENABLED === "true"

async function enviarWhatsApp(
  telefono: string,
  nombre: string,
  ciudad: string,
  twilioUrl: string,
  twilioAuth: string,
  twilioAccountSid: string,
) {
  const numeroLimpio = telefono.replace(/\s|-|\(|\)/g, "")
  const numeroConCodigo = numeroLimpio.startsWith("+")
    ? numeroLimpio
    : `+521${numeroLimpio}`
  const to = `whatsapp:${numeroConCodigo}`

  const body = new URLSearchParams({
    From: process.env.TWILIO_WHATSAPP_NUMBER!,
    To: to,
    ContentSid: process.env.TWILIO_CONTENT_SID!,
    ContentVariables: JSON.stringify({ "1": nombre, "2": ciudad }),
  })

  const res = await fetch(twilioUrl, {
    method: "POST",
    headers: {
      Authorization: `Basic ${twilioAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`)

  // Twilio acepta el mensaje de forma síncrona (HTTP 201, status "queued")
  // incluso cuando la entrega real fallará — ej. cuenta de WhatsApp Business
  // deshabilitada (63112) solo se sabe después, de forma asíncrona. Mismo
  // patrón de bug que tuvimos con Resend: "aceptado" no es "entregado".
  // Esperamos un momento y confirmamos el status final antes de dar por
  // exitoso el envío.
  await new Promise((r) => setTimeout(r, 2000))

  const statusRes = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages/${data.sid}.json`,
    { headers: { Authorization: `Basic ${twilioAuth}` } }
  )
  const statusData = await statusRes.json()

  if (statusData.status === "failed" || statusData.status === "undelivered") {
    throw new Error(
      `Twilio ${statusData.status} (${statusData.error_code}): ${statusData.error_message || "sin mensaje"}`
    )
  }

  return data.sid
}

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization")
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  if (!WHATSAPP_ENABLED) {
    return NextResponse.json({
      message:
        "WhatsApp outreach deshabilitado explícitamente (WHATSAPP_ENABLED != 'true'). " +
        "La cuenta de WhatsApp Business fue deshabilitada por Meta (Twilio error 63112) — " +
        "no reactivar sin confirmar restauración con Meta/Twilio.",
      total: 0,
      enviados: 0,
      errores: 0,
    })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`
  const twilioAuth = Buffer.from(
    `${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`
  ).toString("base64")

  const { data: prospectos, error } = await supabase
    .from("prospectos")
    .select("id, nombre, ciudad, telefono")
    .not("telefono", "is", null)
    .not("telefono", "eq", "")
    .not("estado", "eq", "contactado_whatsapp")
    .limit(LIMITE)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!prospectos?.length) {
    return NextResponse.json({ message: "Sin prospectos pendientes", total: 0 })
  }

  const resumen = { enviados: 0, errores: 0, detalles: [] as string[] }

  for (const prospecto of prospectos) {
    try {
      const sid = await enviarWhatsApp(
        prospecto.telefono,
        prospecto.nombre,
        prospecto.ciudad,
        twilioUrl,
        twilioAuth,
        process.env.TWILIO_ACCOUNT_SID!
      )

      await supabase
        .from("prospectos")
        .update({
          estado: "contactado_whatsapp",
          contactado_at: new Date().toISOString(),
        })
        .eq("id", prospecto.id)

      resumen.enviados++
      resumen.detalles.push(`✅ ${prospecto.nombre} → ${sid}`)

      await new Promise(r => setTimeout(r, 1000))
    } catch (e: unknown) {
      resumen.errores++
      resumen.detalles.push(
        `❌ ${prospecto.nombre}: ${e instanceof Error ? e.message : String(e)}`
      )
    }
  }

  return NextResponse.json({
    message: "Outreach completado",
    ...resumen,
  })
}
