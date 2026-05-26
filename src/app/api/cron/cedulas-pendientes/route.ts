import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Resend } from "resend"
import { FROM } from "@/lib/email"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization")
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const hace24hrs = new Date(Date.now() - 24 * 60 * 60 * 1000)

  const pendientes = await prisma.lawyer.findMany({
    where: {
      cedulaStatus: "pending",
      updatedAt: { lte: hace24hrs },
    },
    select: {
      id: true,
      name: true,
      email: true,
      cedula: true,
      city: true,
      state: true,
      updatedAt: true,
    },
    orderBy: { updatedAt: "asc" },
  })

  if (pendientes.length === 0) {
    return NextResponse.json({ message: "Sin cédulas pendientes", total: 0 })
  }

  const base = process.env.NEXTAUTH_URL ?? "https://lexiamx.com"

  const filas = pendientes
    .map((l) => {
      const horas = Math.floor((Date.now() - l.updatedAt.getTime()) / 3600000)
      const sepUrl = `https://cedulaprofesional.sep.gob.mx/?cedula=${l.cedula}`
      return `
      <tr>
        <td style="padding: 10px 14px; border-bottom: 1px solid #EAE4D9; font-size: 13px;">${l.name}</td>
        <td style="padding: 10px 14px; border-bottom: 1px solid #EAE4D9; font-size: 13px; font-family: monospace;">${l.cedula}</td>
        <td style="padding: 10px 14px; border-bottom: 1px solid #EAE4D9; font-size: 13px;">${l.city}, ${l.state}</td>
        <td style="padding: 10px 14px; border-bottom: 1px solid #EAE4D9; font-size: 13px; color: #dc2626; font-weight: bold;">${horas}h</td>
        <td style="padding: 10px 14px; border-bottom: 1px solid #EAE4D9; font-size: 13px;">
          <a href="${sepUrl}" style="color: #C49A3C;">Verificar SEP →</a>
        </td>
      </tr>`
    })
    .join("")

  const admin = process.env.ADMIN_EMAIL ?? "jr.torsa@gmail.com"
  const n = pendientes.length
  const plural = n > 1

  await resend.emails.send({
    from: FROM,
    to: admin,
    subject: `[Lexia] ${n} cédula${plural ? "s" : ""} pendiente${plural ? "s" : ""} de verificar`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 640px; margin: 0 auto; color: #0C0D10;">
        <div style="background: #0C0D10; padding: 24px 32px; border-radius: 12px 12px 0 0;">
          <h1 style="color: #C49A3C; font-size: 22px; margin: 0;">LEXIA · Admin</h1>
        </div>
        <div style="background: #FAF7F2; padding: 32px; border: 1px solid #EAE4D9; border-top: 0; border-radius: 0 0 12px 12px;">
          <h2 style="font-size: 18px; margin-top: 0; color: #dc2626;">
            ⏰ ${n} cédula${plural ? "s" : ""} lleva${plural ? "n" : ""} más de 24 horas pendiente${plural ? "s" : ""}
          </h2>
          <p style="color: #555; font-size: 14px; margin-bottom: 20px;">
            Los siguientes abogados están esperando verificación de cédula:
          </p>
          <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; border: 1px solid #EAE4D9; margin-bottom: 24px;">
            <thead>
              <tr style="background: #F5F0E8;">
                <th style="padding: 10px 14px; text-align: left; font-size: 12px; color: #888;">Abogado</th>
                <th style="padding: 10px 14px; text-align: left; font-size: 12px; color: #888;">Cédula</th>
                <th style="padding: 10px 14px; text-align: left; font-size: 12px; color: #888;">Ciudad</th>
                <th style="padding: 10px 14px; text-align: left; font-size: 12px; color: #888;">Espera</th>
                <th style="padding: 10px 14px; text-align: left; font-size: 12px; color: #888;">Acción</th>
              </tr>
            </thead>
            <tbody>${filas}</tbody>
          </table>
          <div style="text-align: center; margin: 24px 0;">
            <a href="${base}/admin"
               style="background: #C49A3C; color: #0C0D10; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px;">
              Ir al panel de admin
            </a>
          </div>
          <p style="color: #999; font-size: 12px; margin: 0; border-top: 1px solid #EAE4D9; padding-top: 16px;">
            Este recordatorio se envía automáticamente cada día a las 9:00 AM UTC.
          </p>
        </div>
      </div>
    `,
  })

  return NextResponse.json({
    message: "Recordatorio enviado",
    total: n,
    abogados: pendientes.map((l) => l.name),
  })
}
