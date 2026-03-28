import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { CheckCircle2, AlertCircle, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const PLAN_FEATURES: Record<string, string[]> = {
  "Básico": [
    "Perfil básico en el directorio",
    "Hasta 2 especialidades",
    "Contacto por mensaje",
  ],
  "Premium": [
    "Posición preferente en búsquedas",
    "Botón de WhatsApp directo",
    "Estadísticas de visitas y contactos",
    "Badge de perfil verificado",
    "Hasta 5 especialidades",
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
  TRIAL:     { label: "Prueba",   cls: "bg-blue-100 text-blue-700 border-0" },
  ACTIVE:    { label: "Activo",   cls: "bg-green-100 text-green-700 border-0" },
  PAST_DUE:  { label: "Vencido",  cls: "bg-red-100 text-red-700 border-0" },
  CANCELLED: { label: "Cancelado", cls: "bg-slate-100 text-slate-600 border-0" },
}

export default async function SuscripcionPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/login")

  const membership = await prisma.membership.findFirst({
    where: { lawyerId: session.user.id },
    include: { plan: true },
    orderBy: { createdAt: "desc" },
  })

  const planName = membership?.plan.name ?? "Básico"
  const planPrice = membership?.plan.price ? Number(membership.plan.price) : 0
  const status = membership?.status ?? "TRIAL"
  const statusInfo = STATUS_LABELS[status] ?? STATUS_LABELS.TRIAL
  const features = PLAN_FEATURES[planName] ?? PLAN_FEATURES["Básico"]

  const nextBilling = membership?.currentPeriodEnd
    ? new Date(membership.currentPeriodEnd).toLocaleDateString("es-MX", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null

  return (
    <div className="p-8 space-y-8 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Suscripción</h1>
        <p className="text-slate-500 mt-1">Gestiona tu plan y métodos de pago.</p>
      </div>

      {/* Plan actual */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="font-semibold text-slate-900 text-lg">Plan {planName}</h2>
              <Badge className={statusInfo.cls}>{statusInfo.label}</Badge>
            </div>
            <p className="text-slate-500 text-sm">
              {planPrice > 0 ? `$${planPrice.toFixed(0)} MXN / mes` : "Gratuito"}
              {nextBilling && ` · Próximo cobro: ${nextBilling}`}
            </p>
          </div>
          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-amber-600" />
          </div>
        </div>

        <Separator className="my-4" />

        <div className="grid sm:grid-cols-2 gap-3">
          {features.map((f) => (
            <div key={f} className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span className="text-slate-600">{f}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-6">
          <Button variant="outline" className="text-sm">
            Cambiar plan
          </Button>
          {status !== "CANCELLED" && (
            <Button variant="outline" className="text-sm text-red-500 hover:text-red-600 hover:border-red-300">
              Cancelar suscripción
            </Button>
          )}
        </div>
      </div>

      {/* Método de pago (placeholder — Stripe pendiente) */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h2 className="font-semibold text-slate-900 mb-4">Método de pago</h2>
        {membership?.stripeSubId ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-7 bg-slate-800 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">VISA</span>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800">•••• •••• •••• 4242</p>
                <p className="text-xs text-slate-400">Vence 12/2028</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Actualizar</Button>
          </div>
        ) : (
          <p className="text-sm text-slate-400">No hay método de pago registrado.</p>
        )}
      </div>

      {/* Aviso */}
      <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm">
        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-amber-800">
          Los pagos son procesados de forma segura por <strong>Stripe</strong>. Lexia no almacena datos de tarjeta.
        </div>
      </div>
    </div>
  )
}
