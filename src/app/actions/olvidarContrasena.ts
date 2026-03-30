"use server"

import { prisma } from "@/lib/prisma"
import { randomBytes } from "crypto"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function olvidarContrasena(email: string): Promise<{ ok: boolean; error?: string }> {
  try {
    const normalizedEmail = email.trim().toLowerCase()
    const lawyer = await prisma.lawyer.findFirst({
      where: { email: { equals: normalizedEmail, mode: "insensitive" } },
    })

    console.log("[olvidarContrasena] email buscado:", normalizedEmail, "encontrado:", !!lawyer)

    if (!lawyer) return { ok: false, error: "No existe una cuenta registrada con ese correo." }

    const token = randomBytes(32).toString("hex")
    const expiry = new Date(Date.now() + 1000 * 60 * 60) // 1 hora

    await prisma.lawyer.update({
      where: { id: lawyer.id },
      data: { resetToken: token, resetTokenExpiry: expiry },
    })

    const base = process.env.NEXTAUTH_URL ?? "https://lexiamx.com"
    const link = `${base}/restablecer-contrasena/${token}`

    const { error: resendError } = await resend.emails.send({
      from: "Lexia <hola@lexiamx.com>",
      to: lawyer.email,
      subject: "Restablece tu contraseña — Lexia",
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;background:#FAF7F2;">
          <h2 style="font-family:Georgia,serif;color:#0C0D10;font-weight:400;margin-bottom:8px;">
            Restablecer contraseña
          </h2>
          <p style="color:#0C0D10;opacity:.6;font-size:14px;margin-bottom:24px;">
            Recibimos una solicitud para restablecer la contraseña de tu cuenta en Lexia.
            El enlace es válido por <strong>1 hora</strong>.
          </p>
          <a href="${link}"
             style="display:inline-block;background:#C49A3C;color:#0C0D10;font-weight:600;font-size:14px;
                    padding:12px 28px;border-radius:8px;text-decoration:none;">
            Restablecer contraseña
          </a>
          <p style="color:#0C0D10;opacity:.4;font-size:12px;margin-top:24px;">
            Si no solicitaste esto, ignora este correo. Tu contraseña no cambiará.
          </p>
        </div>
      `,
    })

    if (resendError) {
      console.error("[olvidarContrasena] Resend error:", resendError)
      return { ok: false, error: "Error al enviar el correo. Intenta de nuevo." }
    }

    console.log("[olvidarContrasena] Email enviado a:", lawyer.email)
    return { ok: true }
  } catch (err) {
    console.error("[olvidarContrasena] Error:", err)
    return { ok: false, error: "Ocurrió un error inesperado. Intenta de nuevo." }
  }
}
