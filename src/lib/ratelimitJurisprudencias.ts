import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"
import { Resend } from "resend"
import { FROM } from "@/lib/email"

// Rate limit compartido entre /api/ia-jurisprudencias y /api/ia-clarificacion
// — misma llave (mismo prefix) para que un bot no alterne entre los dos
// endpoints y duplique su cuota horaria.
//
// OJO: Vercel/Upstash NO crean las env vars con los nombres "estándar"
// que espera Redis.fromEnv() (UPSTASH_REDIS_REST_URL / _TOKEN). La
// integración de Vercel las nombra con el prefijo del KV store:
// UPSTASH_REDIS_REST_KV_REST_API_URL / _KV_REST_API_TOKEN. Se usa el
// token de escritura (no el _READ_ONLY_TOKEN) porque el rate limit
// necesita escribir los contadores en cada request.
const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_KV_REST_API_URL
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN

if (!UPSTASH_URL || !UPSTASH_TOKEN) {
  console.warn(
    "[ratelimit/jurisprudencias] Upstash no configurado — rate limit en fail-open " +
      "(faltan UPSTASH_REDIS_REST_KV_REST_API_URL / UPSTASH_REDIS_REST_KV_REST_API_TOKEN)"
  )
}

const redis = new Redis({
  url: UPSTASH_URL ?? "",
  token: UPSTASH_TOKEN ?? "",
})

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(25, "1 h"),
  prefix: "ratelimit:jurisprudencias",
  analytics: false,
})

const resend = new Resend(process.env.RESEND_API_KEY)
const DAILY_ALERT_THRESHOLD = 300

// ─── IP del cliente ─────────────────────────────────────────────────────────
// Vercel agrega x-forwarded-for a cada request. Se lee del header estándar
// en vez de cualquier propiedad de Next.js/Vercel que pueda cambiar entre
// versiones (ver el caso de middleware.ts -> proxy.ts en este mismo repo).
export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for")
  if (!forwardedFor) return "unknown"
  // "ip-cliente, proxy1, proxy2" — la primera es el cliente real.
  return forwardedFor.split(",")[0].trim()
}

function maskIp(ip: string): string {
  if (ip === "unknown") return ip
  const parts = ip.split(".")
  if (parts.length === 4) return `${parts[0]}.${parts[1]}.${parts[2]}.xxx`
  return ip.slice(0, 8) + "…" // IPv6 u otro formato: solo el prefijo
}

export interface RateLimitCheck {
  allowed: boolean
  failedOpen: boolean
}

// Fail-open a propósito: si Redis no responde, se deja pasar la búsqueda
// (mejor que un usuario legítimo no pueda buscar por un problema nuestro de
// infraestructura) pero se loguea para enterarnos del fallo.
export async function checkJurisprudenciasRateLimit(ip: string): Promise<RateLimitCheck> {
  try {
    const { success } = await ratelimit.limit(ip)
    return { allowed: success, failedOpen: false }
  } catch (err) {
    console.error("[ratelimit/jurisprudencias] Redis no disponible, fail-open:", err)
    return { allowed: true, failedOpen: true }
  }
}

export function logJurisprudenciasCall(endpoint: string, ip: string, allowed: boolean) {
  console.log(`[${endpoint}] ip=${maskIp(ip)} allowed=${allowed}`)
}

// ─── Conteo diario + alerta (una sola vez al día) ──────────────────────────
// No bloquea la búsqueda si falla — solo sirve para detectar picos de uso.
export async function trackDailyCallAndAlert(): Promise<void> {
  try {
    const today = new Date().toISOString().slice(0, 10) // YYYY-MM-DD (UTC)
    const countKey = `jurisprudencias:calls:${today}`
    const alertKey = `jurisprudencias:alert-sent:${today}`

    const count = await redis.incr(countKey)
    if (count === 1) {
      await redis.expire(countKey, 60 * 60 * 48) // 48h, se autolimpia
    }

    if (count >= DAILY_ALERT_THRESHOLD) {
      // SET NX: solo el primer request que cruza el umbral en el día manda la alerta.
      const alertSet = await redis.set(alertKey, "1", { nx: true, ex: 60 * 60 * 48 })
      if (alertSet) {
        await sendDailySpikeAlert(count, today)
      }
    }
  } catch (err) {
    console.error("[ratelimit/jurisprudencias] Error en conteo diario (no bloqueante):", err)
  }
}

async function sendDailySpikeAlert(count: number, date: string) {
  const admin = process.env.ADMIN_EMAIL ?? "jr.torsa@gmail.com"
  try {
    await resend.emails.send({
      from: FROM,
      to: admin,
      subject: `[Lexia] Pico de uso en Buscador de Jurisprudencias — ${count} llamadas hoy`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #0C0D10;">
          <div style="background: #0C0D10; padding: 24px 32px; border-radius: 12px 12px 0 0;">
            <h1 style="color: #C49A3C; font-size: 22px; margin: 0;">LEXIA · Admin</h1>
          </div>
          <div style="background: #FAF7F2; padding: 32px; border: 1px solid #EAE4D9; border-top: 0; border-radius: 0 0 12px 12px;">
            <h2 style="font-size: 18px; margin-top: 0; color: #dc2626;">
              ⚠️ Pico de uso en el Buscador de Jurisprudencias
            </h2>
            <p style="color: #555; font-size: 14px; line-height: 1.7;">
              Entre <code>/api/ia-jurisprudencias</code> y <code>/api/ia-clarificacion</code>
              se registraron <strong>${count} llamadas</strong> el día <strong>${date}</strong>,
              cruzando el umbral de ${DAILY_ALERT_THRESHOLD}/día.
            </p>
            <p style="color: #555; font-size: 14px; line-height: 1.7;">
              El límite de 25/hora por IP ya está aplicando, pero este volumen es
              inusual para esta herramienta — vale la pena revisar si es tráfico
              legítimo o abuso distribuido entre muchas IPs distintas.
            </p>
            <p style="color: #999; font-size: 12px; margin: 24px 0 0; border-top: 1px solid #EAE4D9; padding-top: 16px;">
              Este correo se manda una sola vez por día, la primera vez que se cruza el umbral.
            </p>
          </div>
        </div>
      `,
    })
  } catch (err) {
    console.error("[ratelimit/jurisprudencias] Error mandando alerta por correo:", err)
  }
}
