import { NextResponse } from "next/server"
import { Resend } from "resend"
import { FROM } from "@/lib/email"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization")
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const admin = process.env.ADMIN_EMAIL ?? "jr.torsa@gmail.com"

  await resend.emails.send({
    from: FROM,
    to: admin,
    subject: "[Lexia] Recordatorio semanal: leads de Facebook",
    html: `
      <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #0C0D10;">
        <div style="background: #0C0D10; padding: 24px 32px; border-radius: 12px 12px 0 0;">
          <h1 style="color: #C49A3C; font-size: 22px; margin: 0;">LEXIA · Admin</h1>
        </div>
        <div style="background: #FAF7F2; padding: 32px; border: 1px solid #EAE4D9; border-top: 0; border-radius: 0 0 12px 12px;">
          <h2 style="font-size: 18px; margin-top: 0; color: #0C0D10;">
            📋 Baja los leads de Meta Business Suite
          </h2>
          <p style="color: #555; font-size: 14px; line-height: 1.7;">
            Baja el CSV de leads de Meta Business Suite y corre
            <code style="background:#EAE4D9;padding:2px 6px;border-radius:4px;">importar-leads-facebook-csv.mjs</code>.
          </p>
          <p style="color: #555; font-size: 14px; line-height: 1.7;">
            Pasos: exporta el CSV desde Meta Business Suite → revisa con <code style="background:#EAE4D9;padding:2px 6px;border-radius:4px;">--dry-run</code> → corre el import real. Ver <code style="background:#EAE4D9;padding:2px 6px;border-radius:4px;">scripts/leads-facebook/README.md</code> en el repo para el detalle.
          </p>
          <p style="color: #999; font-size: 12px; margin: 24px 0 0; border-top: 1px solid #EAE4D9; padding-top: 16px;">
            Este recordatorio se envía automáticamente cada lunes a las 9:00 AM UTC.
          </p>
        </div>
      </div>
    `,
  })

  return NextResponse.json({ message: "Recordatorio enviado", to: admin })
}
