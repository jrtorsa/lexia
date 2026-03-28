import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { CheckCircle2, AlertCircle, Gift, Clock, CreditCard, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { PROMO } from "@/lib/promo"
import Link from "next/link"
import CancelarSuscripcionButton from "@/components/CancelarSuscripcionButton"

const PLAN_FEATURES: Record<string, string[]> = {
  "Básico": [
    "Perfil básico en el directorio",
    "Hasta 2 especialidades",
    "Contacto por mensaje",
  ],
  "Premium": [
    "Posición preferente en búsquedas",
    "Botón de WhatsApp directo",
    "Estadísticas de contactos",
    "Badge de perfil verificado",
    "Especialidades ilimitadas",
  ],
  "Despacho": [
    "Posición preferente máxima",
    "Botón de WhatsApp directo",
    "Estadísticas avanzadas",
    "Badge verificado prioritario",
    "Especialidades ilimitadas",
    "Soporte prioritario",
  ],
}

const STATUS_LABELS: Record<string, { label: string; cls: string }> = {
  TRIAL:     { label: "Periodo gratuito", cls: "bg-blue-100 text-blue-700 border-0" },
  ACTIVE:    { label: "Activo",           cls: "bg-green-100 text-green-700 border-0" },
  PAST_DUE:  { label: "Vencido",          cls: "bg-red-100 text-red-700 border-0" },
  CANCELLED: { label: "Cancelado",        cls: "bg-slate-100 text-slate-600 border-0" },
}

function fmtDate(d: Date) {
  return d.toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" })
}

export default async function SuscripcionPage({
  searchParams,
}: {
  searchParams: Promise<{ cancelado?: string }>
}) {
  const params = await searchParams
  const wasCancelled = params.cancelado === "1"
  const session = await getServerSession(authOptions)
  if (!session) redirect("/login")

  let membership = await prisma.membership.findFirst({
    where: { lawyerId: session.user.id },
    include: { plan: true },
    orderBy: { createdAt: "desc" },
  })

  // ── Auto-expire / auto-delete ─────────────────────────────────────────────
  const now = new Date()

  if (membership?.currentPeriodEnd) {
    const periodEnd = membership.currentPeriodEnd
    const sevenDaysAfterExpiry = new Date(periodEnd)
    sevenDaysAfterExpiry.setDate(sevenDaysAfterExpiry.getDate() + 7)

    if (sevenDaysAfterExpiry < now) {
      // Grace period over — delete the lawyer account entirely
      await prisma.lawyer.delete({ where: { id: session.user.id } })
      redirect("/registro?motivo=cuenta-eliminada")
    } else if (membership.status === "TRIAL" && periodEnd < now) {
      // Trial just expired — mark as PAST_DUE
      membership = await prisma.membership.update({
        where: { id: membership.id },
        data: { status: "PAST_DUE" },
        include: { plan: true },
      })
    }
  }

  const planName   = membership?.plan.name ?? "Premium"
  const planPrice  = membership?.plan.price ? Number(membership.plan.price) : 599
  const status     = membership?.status ?? "TRIAL"
  const statusInfo = STATUS_LABELS[status] ?? STATUS_LABELS.TRIAL
  const features   = PLAN_FEATURES["Premium"]

  // ── Trial countdown ────────────────────────────────────────────────────────
  // Fallback: if period dates weren't set (users before fix), use createdAt + 3 months
  const periodStart = membership?.currentPeriodStart
    ?? membership?.createdAt
    ?? now

  const periodEnd = membership?.currentPeriodEnd ?? (() => {
    const d = new Date(periodStart)
    d.setMonth(d.getMonth() + 3)
    return d
  })()

  const totalMs      = periodEnd.getTime() - periodStart.getTime()
  const usedMs       = Math.max(now.getTime() - periodStart.getTime(), 0)
  const progressPct  = Math.min(Math.round((usedMs / totalMs) * 100), 100)
  const daysTotal    = Math.round(totalMs / (1000 * 60 * 60 * 24))
  const daysUsed     = Math.min(Math.round(usedMs / (1000 * 60 * 60 * 24)), daysTotal)
  const daysLeft     = Math.max(daysTotal - daysUsed, 0)

  const isTrial   = status === "TRIAL"
  const isExpired = status === "PAST_DUE"
  const isActive  = status === "ACTIVE"

  return (
    <div className="p-8 space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Suscripción</h1>
        <p className="text-slate-500 mt-1">Gestiona tu plan y método de pago.</p>
      </div>

      {/* Cancelled success banner */}
      {wasCancelled && (
        <div className="flex gap-3 bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm">
          <CheckCircle2 className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
          <div className="text-slate-600">
            <strong>Suscripción cancelada.</strong> Tu perfil ya no aparece en el directorio.
            Tu cuenta sigue activa — puedes reactivar tu plan cuando quieras.
          </div>
        </div>
      )}

      {/* ── EXPIRED: payment required ───────────────────────────────────────── */}
      {isExpired && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-5">
          <div className="flex items-start gap-3 mb-4">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-red-800 text-sm">Tu periodo gratuito ha vencido</p>
              <p className="text-red-700 text-sm mt-1">
                Venció el {fmtDate(periodEnd)}. Tu perfil seguirá visible pero las funciones Premium
                están pausadas hasta que actives tu plan.
              </p>
            </div>
          </div>
          <Link
            href="/planes"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors w-full sm:w-auto justify-center"
          >
            <CreditCard className="w-4 h-4" />
            Activar plan Premium — {PROMO.precioOriginal}{PROMO.periodo}
          </Link>
        </div>
      )}

      {/* ── TRIAL: countdown card ───────────────────────────────────────────── */}
      {isTrial && (
        <div className="bg-white border border-[#C49A3C]/30 rounded-xl p-6 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-[#C49A3C]" />
              <span className="font-semibold text-slate-900">Periodo gratuito de lanzamiento</span>
            </div>
            <Badge className={statusInfo.cls}>{statusInfo.label}</Badge>
          </div>

          {/* Days remaining */}
          <div className="flex items-end gap-2 mb-3">
            <span className="text-4xl font-bold text-slate-900">{daysLeft}</span>
            <span className="text-slate-500 mb-1">días restantes</span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-100 rounded-full h-2 mb-3">
            <div
              className="h-2 rounded-full transition-all"
              style={{
                width: `${progressPct}%`,
                background: progressPct > 80
                  ? "linear-gradient(90deg, #C49A3C, #ef4444)"
                  : "linear-gradient(90deg, #C49A3C, #E2B865)",
              }}
            />
          </div>

          <div className="flex justify-between text-xs text-slate-400 mb-4">
            <span>Inicio: {fmtDate(periodStart)}</span>
            <span>Vence: {fmtDate(periodEnd)}</span>
          </div>

          <p className="text-sm text-slate-500">
            {daysLeft > 10
              ? `Disfruta todas las funciones Premium sin costo. Al vencer, se requiere activar el plan para continuar.`
              : `⚠️ Quedan pocos días. Agrega un método de pago para no perder el acceso a tus funciones Premium.`}
          </p>

          {daysLeft <= 10 && (
            <div className="mt-4">
              <Link
                href="/planes"
                className="inline-flex items-center gap-2 bg-[#C49A3C] hover:bg-[#E2B865] text-[#0C0D10] text-sm font-medium px-4 py-2 rounded-lg transition-colors"
              >
                <Zap className="w-4 h-4" />
                Agregar método de pago
              </Link>
            </div>
          )}
        </div>
      )}

      {/* ── Plan selector ──────────────────────────────────────────────────── */}
      <div className="space-y-3">
        <h2 className="font-semibold text-slate-900 text-sm">Tu plan</h2>

        {/* Básico — disabled / crossed out */}
        <div className="rounded-xl p-4 border-2 border-[#EAE4D9] bg-slate-50/50 opacity-50 cursor-not-allowed select-none">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 w-4 h-4 rounded-full border-2 border-slate-300 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-slate-400 text-sm line-through">Plan Básico</span>
                <span className="text-sm text-slate-400 line-through">Gratis</span>
                <span className="text-[10px] border border-slate-300 text-slate-400 font-medium px-2 py-0.5 rounded-full tracking-widest uppercase">
                  No disponible
                </span>
              </div>
              <p className="text-slate-400 text-xs mt-1 line-through">
                Perfil básico en el directorio. Hasta 2 especialidades, contacto por formulario.
              </p>
            </div>
          </div>
        </div>

        {/* Premium — active */}
        <div className={`rounded-xl p-4 border-2 ${
          isExpired ? "border-red-300 bg-red-50/30" : "border-[#C49A3C] bg-[rgba(196,154,60,0.04)]"
        }`}>
          <div className="flex items-start gap-3">
            <div className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
              isExpired ? "border-red-400 bg-red-400" : "border-[#C49A3C] bg-[#C49A3C]"
            }`}>
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-[#0C0D10] text-sm">Plan Premium</span>
                {isExpired ? (
                  <>
                    <span className="text-sm font-semibold text-red-500">{PROMO.precioOriginal}<span className="text-xs font-normal text-slate-400">{PROMO.periodo}</span></span>
                    <Badge className="bg-red-100 text-red-700 border-0">Vencido</Badge>
                  </>
                ) : PROMO.activa ? (
                  <>
                    <span className="text-sm text-slate-400 line-through font-normal">{PROMO.precioOriginal}{PROMO.periodo}</span>
                    <span className="text-sm font-bold text-[#C49A3C]">GRATIS</span>
                    {isTrial && <span className="text-xs text-slate-400">por {daysLeft} días más</span>}
                    <Badge className={statusInfo.cls}>{statusInfo.label}</Badge>
                  </>
                ) : (
                  <>
                    <span className="text-sm font-semibold text-[#C49A3C]">{PROMO.precioOriginal}<span className="text-xs font-normal text-slate-400">{PROMO.periodo}</span></span>
                    <Badge className={statusInfo.cls}>{statusInfo.label}</Badge>
                  </>
                )}
              </div>
              <p className="text-slate-500 text-xs mt-1">
                Posición preferente, WhatsApp directo, estadísticas y badge verificado.
              </p>
              {membership?.createdAt && (
                <p className="text-[11px] text-slate-400 mt-1.5">
                  Miembro desde {fmtDate(membership.createdAt)}
                </p>
              )}

              <Separator className="my-3" />

              <div className="grid sm:grid-cols-2 gap-2">
                {features.map((f) => (
                  <div key={f} className={`flex items-center gap-2 text-xs ${isExpired ? "opacity-40" : ""}`}>
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                    <span className="text-slate-600">{f}</span>
                  </div>
                ))}
              </div>

              {!isExpired && status !== "CANCELLED" && (
                <div className="flex gap-3 mt-4">
                  <CancelarSuscripcionButton />
                </div>
              )}

              {status === "CANCELLED" && (
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <p className="text-xs text-slate-400 mb-3">Tu suscripción está cancelada. Tu perfil no aparece en el directorio.</p>
                  <Link href="/planes">
                    <button className="text-xs font-medium text-[#C49A3C] hover:text-[#E2B865] border border-[#C49A3C]/30 hover:border-[#C49A3C] px-3 py-1.5 rounded-lg transition-colors">
                      Reactivar plan →
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Método de pago ─────────────────────────────────────────────────── */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-slate-900">Método de pago</h2>
          {isExpired && (
            <span className="text-xs text-red-500 font-medium">Requerido</span>
          )}
        </div>

        {membership?.stripeSubId ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-7 bg-slate-800 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">CARD</span>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800">Tarjeta vinculada</p>
                <p className="text-xs text-slate-400">Gestionada por Stripe</p>
              </div>
            </div>
            <button className="text-xs border border-slate-200 hover:border-slate-400 text-slate-600 px-3 py-1.5 rounded-lg transition-colors">Actualizar</button>
          </div>
        ) : isTrial && daysLeft > 10 ? (
          <p className="text-sm text-slate-400">
            No se requiere pago durante el periodo gratuito. Podrás agregar tu tarjeta cuando esté por vencer.
          </p>
        ) : (
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-400">Sin método de pago registrado.</p>
            <Link
              href="/planes"
              className="inline-flex items-center gap-1.5 text-xs font-medium bg-[#C49A3C] hover:bg-[#E2B865] text-[#0C0D10] px-3 py-1.5 rounded-lg transition-colors"
            >
              <CreditCard className="w-3.5 h-3.5" />
              Agregar
            </Link>
          </div>
        )}
      </div>

      {/* ── Nota Stripe ────────────────────────────────────────────────────── */}
      <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm">
        <Clock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-amber-800">
          Los pagos serán procesados de forma segura por <strong>Stripe</strong>. Lexia no almacena datos de tarjeta.
          La integración de pagos estará disponible próximamente.
        </div>
      </div>
    </div>
  )
}
