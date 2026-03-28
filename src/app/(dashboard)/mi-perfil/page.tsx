import Link from "next/link"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import {
  Eye, MessageSquare, Star, TrendingUp, ShieldCheck,
  ArrowUpRight, Phone, MessageCircle, Mail, ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const TYPE_CONFIG: Record<string, { label: string; icon: typeof Phone; color: string }> = {
  WHATSAPP: { label: "WhatsApp", icon: MessageCircle, color: "text-green-600 bg-green-50" },
  MESSAGE:  { label: "Mensaje",  icon: Mail,          color: "text-blue-600 bg-blue-50"  },
  CALL:     { label: "Llamada",  icon: Phone,         color: "text-slate-600 bg-slate-100" },
  EMAIL:    { label: "Email",    icon: Mail,          color: "text-purple-600 bg-purple-50" },
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/login")

  const lawyer = await prisma.lawyer.findUnique({
    where: { id: session.user.id },
    include: {
      specialties: { include: { specialty: true } },
      memberships: { include: { plan: true }, orderBy: { createdAt: "desc" }, take: 1 },
      reviews: { where: { isVisible: true }, orderBy: { createdAt: "desc" }, take: 3 },
      contacts: { orderBy: { createdAt: "desc" }, take: 4 },
    },
  })

  if (!lawyer) redirect("/login")

  const avgRating =
    lawyer.reviews.length > 0
      ? lawyer.reviews.reduce((sum, r) => sum + r.rating, 0) / lawyer.reviews.length
      : 0

  const membership = lawyer.memberships[0]
  const planName = membership?.plan.name ?? "Básico"
  const isPremium = planName !== "Básico"

  const firstName = lawyer.name.replace(/^Lic\.\s*/i, "").split(" ")[0]

  const profileItems = [
    { label: "Foto de perfil",   done: !!lawyer.photoUrl },
    { label: "Bio completa",     done: !!lawyer.bio },
    { label: "Cédula verificada", done: lawyer.isVerified },
    { label: "WhatsApp agregado", done: !!lawyer.whatsapp },
    { label: "Especialidades",   done: lawyer.specialties.length > 0 },
  ]
  const completedCount = profileItems.filter((i) => i.done).length
  const completionPct = Math.round((completedCount / profileItems.length) * 100)

  const totalContacts = await prisma.contact.count({ where: { lawyerId: lawyer.id } })

  const STATS = [
    { label: "Visitas este mes",     value: "—",                    change: "próximamente",          icon: Eye,           color: "blue"   },
    { label: "Contactos recibidos",  value: String(totalContacts),  change: "total acumulado",        icon: MessageSquare, color: "green"  },
    { label: "Calificación promedio", value: avgRating > 0 ? avgRating.toFixed(1) : "—", change: `${lawyer.reviews.length} reseñas`, icon: Star, color: "amber" },
    { label: "Posición en búsquedas", value: isPremium ? "Top" : "—", change: isPremium ? "perfil premium" : "actualiza tu plan", icon: TrendingUp, color: "purple" },
  ]

  const colors: Record<string, string> = {
    blue:   "bg-blue-50 text-blue-700",
    green:  "bg-green-50 text-green-700",
    amber:  "bg-amber-50 text-amber-700",
    purple: "bg-purple-50 text-purple-700",
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Hola, {firstName} 👋</h1>
          <p className="text-slate-500 mt-1">Aquí está el resumen de tu perfil.</p>
        </div>
        <div className="flex items-center gap-2">
          {lawyer.isVerified && (
            <div className="flex items-center gap-1.5 text-sm text-blue-700 bg-blue-50 border border-blue-200 rounded-full px-3 py-1">
              <ShieldCheck className="w-4 h-4" />
              Cédula verificada
            </div>
          )}
          <Badge className="bg-amber-400 text-slate-900 border-0">{planName}</Badge>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {STATS.map((s) => {
          const Icon = s.icon
          return (
            <div key={s.label} className="bg-white border border-slate-200 rounded-xl p-5">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${colors[s.color]}`}>
                <Icon className="w-4 h-4" />
              </div>
              <p className="text-2xl font-bold text-slate-900">{s.value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
              <p className="text-xs text-green-600 font-medium mt-1">{s.change}</p>
            </div>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Contactos recientes */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl">
          <div className="flex items-center justify-between p-5 border-b border-slate-100">
            <h2 className="font-semibold text-slate-900">Contactos recientes</h2>
            <Link href="/mi-perfil/contactos" className="text-sm text-blue-700 hover:underline flex items-center gap-0.5">
              Ver todos <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          {lawyer.contacts.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-sm">
              Aún no tienes contactos. Cuando alguien te contacte aparecerá aquí.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {lawyer.contacts.map((c) => {
                const cfg = TYPE_CONFIG[c.type] ?? TYPE_CONFIG.MESSAGE
                const Icon = cfg.icon
                return (
                  <div key={c.id} className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${cfg.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-slate-800">{c.name}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${cfg.color}`}>{cfg.label}</span>
                      </div>
                      <p className="text-xs text-slate-400 truncate">{c.message ?? c.email}</p>
                    </div>
                    <span className="text-xs text-slate-400 flex-shrink-0">
                      {new Date(c.createdAt).toLocaleDateString("es-MX", { day: "numeric", month: "short" })}
                    </span>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Panel lateral */}
        <div className="space-y-4">
          {/* Estado del perfil */}
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h2 className="font-semibold text-slate-900 mb-4">Estado del perfil</h2>
            <div className="space-y-3">
              {profileItems.map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-sm">
                  <div className={`w-4 h-4 rounded-full flex-shrink-0 border-2 ${item.done ? "bg-green-500 border-green-500" : "border-slate-300"}`} />
                  <span className={item.done ? "text-slate-700" : "text-slate-400"}>{item.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs text-slate-500 mb-1">
                <span>Perfil completado</span>
                <span>{completionPct}%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full transition-all" style={{ width: `${completionPct}%` }} />
              </div>
            </div>
            <Link href="/mi-perfil/editar">
              <Button variant="outline" size="sm" className="w-full mt-4">
                Completar perfil
              </Button>
            </Link>
          </div>

          {/* Ver mi perfil público */}
          <div className="bg-blue-700 rounded-xl p-5 text-white">
            <p className="font-semibold mb-1">Tu perfil público</p>
            <p className="text-blue-200 text-sm mb-3">
              Así te ven los clientes en el directorio.
            </p>
            <Link href={`/abogados/${lawyer.slug}`} target="_blank">
              <Button className="w-full bg-white text-blue-700 hover:bg-blue-50 text-sm">
                Ver perfil
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Reseñas */}
      {lawyer.reviews.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-semibold text-slate-900">Reseñas recientes</h2>
              <p className="text-sm text-slate-400">
                {lawyer.reviews.length} reseñas · promedio {avgRating.toFixed(1)} ⭐
              </p>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {lawyer.reviews.map((r) => (
              <div key={r.id} className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                <div className="flex items-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star key={n} className={`w-3.5 h-3.5 ${n <= r.rating ? "fill-amber-400 text-amber-400" : "text-slate-200 fill-slate-200"}`} />
                  ))}
                </div>
                {r.comment && <p className="text-sm text-slate-600 leading-relaxed">"{r.comment}"</p>}
                <p className="text-xs text-slate-400 mt-2">
                  {new Date(r.createdAt).toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" })}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
