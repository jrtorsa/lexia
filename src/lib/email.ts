import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export const FROM = "Lexia <hola@lexiamx.com>"
export const REPLY_TO = "hola@lexiamx.com"

// ─── Welcome email to new lawyer ──────────────────────────────────────────────
export async function sendWelcomeEmail({
  to,
  name,
}: {
  to: string
  name: string
}) {
  return resend.emails.send({
    from: FROM,
    to,
    replyTo: REPLY_TO,
    subject: "Bienvenido a Lexia — tu perfil está activo",
    html: `
      <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #0C0D10;">
        <div style="background: #0C0D10; padding: 32px; text-align: center; border-radius: 12px 12px 0 0;">
          <h1 style="color: #C49A3C; font-size: 28px; margin: 0; letter-spacing: 2px;">LEXIA</h1>
        </div>
        <div style="background: #FAF7F2; padding: 36px; border: 1px solid #EAE4D9; border-top: 0; border-radius: 0 0 12px 12px;">
          <h2 style="font-size: 22px; color: #0C0D10; margin-top: 0;">Bienvenido, ${name}</h2>
          <p style="color: #555; line-height: 1.7;">
            Tu perfil de abogado ya está registrado en Lexia. Durante los próximos
            <strong>3 meses tienes acceso gratuito</strong> a todas las funciones Premium:
          </p>
          <ul style="color: #555; line-height: 2;">
            <li>Posición preferente en búsquedas</li>
            <li>Botón de WhatsApp directo</li>
            <li>Estadísticas de contactos</li>
            <li>Badge de perfil verificado</li>
            <li>Especialidades ilimitadas</li>
          </ul>
          <div style="text-align: center; margin: 32px 0;">
            <a href="https://lexiamx.com/mi-perfil/editar"
               style="background: #C49A3C; color: #0C0D10; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px;">
              Completar mi perfil
            </a>
          </div>
          <p style="color: #999; font-size: 13px; border-top: 1px solid #EAE4D9; padding-top: 20px; margin-bottom: 0;">
            Si tienes dudas escríbenos a
            <a href="mailto:hola@lexiamx.com" style="color: #C49A3C;">hola@lexiamx.com</a>
          </p>
        </div>
      </div>
    `,
  })
}

// ─── Contact notification to lawyer ───────────────────────────────────────────
export async function sendContactNotification({
  lawyerEmail,
  lawyerName,
  visitorName,
  visitorEmail,
  visitorPhone,
  type,
}: {
  lawyerEmail: string
  lawyerName: string
  visitorName: string
  visitorEmail: string
  visitorPhone?: string | null
  type: "WHATSAPP" | "CALL" | "EMAIL" | "MESSAGE"
}) {
  const typeLabels: Record<string, string> = {
    WHATSAPP: "WhatsApp",
    CALL:     "llamada telefónica",
    EMAIL:    "correo electrónico",
    MESSAGE:  "mensaje",
  }

  return resend.emails.send({
    from: FROM,
    to: lawyerEmail,
    replyTo: visitorEmail,
    subject: `Nuevo contacto en Lexia — ${visitorName}`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #0C0D10;">
        <div style="background: #0C0D10; padding: 24px 32px; border-radius: 12px 12px 0 0;">
          <h1 style="color: #C49A3C; font-size: 22px; margin: 0;">LEXIA</h1>
        </div>
        <div style="background: #FAF7F2; padding: 32px; border: 1px solid #EAE4D9; border-top: 0; border-radius: 0 0 12px 12px;">
          <h2 style="font-size: 18px; margin-top: 0; color: #0C0D10;">
            Nuevo contacto vía ${typeLabels[type] ?? type}
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0; background: white; border-radius: 8px; border: 1px solid #EAE4D9;">
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid #EAE4D9; color: #888; font-size: 13px; width: 120px;">Nombre</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid #EAE4D9; font-weight: bold;">${visitorName}</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid #EAE4D9; color: #888; font-size: 13px;">Correo</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid #EAE4D9;">
                <a href="mailto:${visitorEmail}" style="color: #C49A3C;">${visitorEmail}</a>
              </td>
            </tr>
            ${visitorPhone ? `
            <tr>
              <td style="padding: 12px 16px; color: #888; font-size: 13px;">Teléfono</td>
              <td style="padding: 12px 16px;">
                <a href="tel:${visitorPhone}" style="color: #C49A3C;">${visitorPhone}</a>
              </td>
            </tr>` : ""}
          </table>
          <div style="text-align: center; margin: 24px 0;">
            <a href="https://lexiamx.com/mi-perfil/contactos"
               style="background: #C49A3C; color: #0C0D10; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px;">
              Ver todos mis contactos
            </a>
          </div>
          <p style="color: #999; font-size: 12px; margin: 0; border-top: 1px solid #EAE4D9; padding-top: 16px;">
            Este mensaje fue generado automáticamente por Lexia · lexiamx.com
          </p>
        </div>
      </div>
    `,
  })
}

// ─── Cancellation confirmation ─────────────────────────────────────────────────
export async function sendCancellationEmail({
  to,
  name,
}: {
  to: string
  name: string
}) {
  return resend.emails.send({
    from: FROM,
    to,
    replyTo: REPLY_TO,
    subject: "Tu suscripción a Lexia ha sido cancelada",
    html: `
      <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #0C0D10;">
        <div style="background: #0C0D10; padding: 24px 32px; border-radius: 12px 12px 0 0;">
          <h1 style="color: #C49A3C; font-size: 22px; margin: 0;">LEXIA</h1>
        </div>
        <div style="background: #FAF7F2; padding: 32px; border: 1px solid #EAE4D9; border-top: 0; border-radius: 0 0 12px 12px;">
          <h2 style="font-size: 18px; margin-top: 0;">Suscripción cancelada, ${name}</h2>
          <p style="color: #555; line-height: 1.7;">
            Hemos cancelado tu suscripción. Tu perfil ya no aparece en el directorio
            pero tu cuenta sigue activa.
          </p>
          <p style="color: #555; line-height: 1.7;">
            Puedes reactivar tu plan en cualquier momento desde tu panel.
          </p>
          <div style="text-align: center; margin: 28px 0;">
            <a href="https://lexiamx.com/planes"
               style="background: #C49A3C; color: #0C0D10; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px;">
              Reactivar mi plan
            </a>
          </div>
          <p style="color: #999; font-size: 12px; margin: 0; border-top: 1px solid #EAE4D9; padding-top: 16px;">
            ¿Tienes dudas?
            <a href="mailto:hola@lexiamx.com" style="color: #C49A3C;">hola@lexiamx.com</a>
          </p>
        </div>
      </div>
    `,
  })
}
