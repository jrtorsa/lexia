import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const TWILIO_URL = `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`
const TWILIO_AUTH = Buffer.from(
  `${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`
).toString("base64")
const LIMITE = 20

async function enviarWhatsApp(telefono: string, nombre: string, ciudad: string) {
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

  const res = await fetch(TWILIO_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${TWILIO_AUTH}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`)
  return data.sid
}

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization")
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

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
        prospecto.ciudad
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
