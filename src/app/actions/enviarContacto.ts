"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const ASUNTOS: Record<string, string> = {
  soporte:     "Soporte técnico",
  cuenta:      "Problema con mi cuenta",
  suscripcion: "Dudas sobre suscripción",
  reporte:     "Reportar un perfil",
  prensa:      "Prensa / alianzas",
  otro:        "Otro",
}

export async function enviarContacto(formData: FormData) {
  const nombre  = (formData.get("nombre")  as string)?.trim()
  const email   = (formData.get("email")   as string)?.trim()
  const asunto  = (formData.get("asunto")  as string)?.trim()
  const mensaje = (formData.get("mensaje") as string)?.trim()

  if (!nombre || !email || !mensaje) {
    return { error: "Por favor completa todos los campos requeridos." }
  }

  const asuntoLabel = ASUNTOS[asunto] ?? asunto ?? "Sin asunto"

  const { error } = await resend.emails.send({
    from:    "Lexia Contacto <hola@lexiamx.com>",
    to:      process.env.ADMIN_EMAIL ?? "jr.torsa@gmail.com",
    replyTo: email,
    subject: `[Contacto Lexia] ${asuntoLabel} — ${nombre}`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #0C0D10;">
        <div style="background: #0C0D10; padding: 24px 32px; border-radius: 12px 12px 0 0;">
          <h1 style="color: #C49A3C; font-size: 22px; margin: 0;">LEXIA</h1>
        </div>
        <div style="background: #FAF7F2; padding: 32px; border: 1px solid #EAE4D9; border-top: 0; border-radius: 0 0 12px 12px;">
          <h2 style="font-size: 18px; margin-top: 0;">Nuevo mensaje de contacto</h2>
          <table style="width: 100%; border-collapse: collapse; margin: 16px 0; background: white; border-radius: 8px; border: 1px solid #EAE4D9;">
            <tr>
              <td style="padding: 10px 16px; border-bottom: 1px solid #EAE4D9; color: #888; font-size: 13px; width: 100px;">Nombre</td>
              <td style="padding: 10px 16px; border-bottom: 1px solid #EAE4D9; font-weight: bold;">${nombre}</td>
            </tr>
            <tr>
              <td style="padding: 10px 16px; border-bottom: 1px solid #EAE4D9; color: #888; font-size: 13px;">Correo</td>
              <td style="padding: 10px 16px; border-bottom: 1px solid #EAE4D9;">
                <a href="mailto:${email}" style="color: #C49A3C;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 16px; color: #888; font-size: 13px;">Asunto</td>
              <td style="padding: 10px 16px;">${asuntoLabel}</td>
            </tr>
          </table>
          <div style="background: white; border: 1px solid #EAE4D9; border-radius: 8px; padding: 16px; white-space: pre-wrap; font-size: 14px; line-height: 1.7; color: #333;">
            ${mensaje.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
          </div>
          <p style="color: #999; font-size: 12px; margin: 20px 0 0; border-top: 1px solid #EAE4D9; padding-top: 16px;">
            Responde directamente a este correo para contestar a ${nombre}.
          </p>
        </div>
      </div>
    `,
  })

  if (error) {
    console.error("[email] contacto failed:", error)
    return { error: "Error al enviar el mensaje. Intenta de nuevo." }
  }

  return { ok: true }
}
