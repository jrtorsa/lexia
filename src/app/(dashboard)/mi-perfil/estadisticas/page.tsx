import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { MessageSquare, Star, TrendingUp, ArrowUp, ArrowDown, Minus, Users } from "lucide-react"

const DAYS   = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]
const MONTHS = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]

export default async function EstadisticasPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/login")

  const now = new Date()
  const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const sixMonthsAgo    = new Date(now.getFullYear(), now.getMonth() - 5, 1)

  const [allContacts, reviews] = await Promise.all([
    prisma.contact.findMany({
      where: { lawyerId: session.user.id, createdAt: { gte: sixMonthsAgo } },
      select: { createdAt: true },
      orderBy: { createdAt: "asc" },
    }),
    prisma.review.findMany({
      where: { lawyerId: session.user.id, isVisible: true },
      select: { rating: true },
    }),
  ])

  // ── KPIs ──────────────────────────────────────────────────────────────────
  const thisMonth  = allContacts.filter((c) => c.createdAt >= startOfThisMonth).length
  const lastMonth  = allContacts.filter((c) => c.createdAt >= startOfLastMonth && c.createdAt < startOfThisMonth).length
  const totalContacts = allContacts.length
  const avgRating  = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : null

  // ── Weekly (last 7 days) ──────────────────────────────────────────────────
  const weekly = Array.from({ length: 7 }, (_, i) => {
    const from = new Date(now)
    from.setDate(now.getDate() - (6 - i))
    from.setHours(0, 0, 0, 0)
    const to = new Date(from)
    to.setHours(23, 59, 59, 999)
    return {
      day: DAYS[from.getDay()],
      contactos: allContacts.filter((c) => c.createdAt >= from && c.createdAt <= to).length,
    }
  })
  const maxWeekly = Math.max(...weekly.map((d) => d.contactos), 1)

  // ── Monthly (last 6 months) ───────────────────────────────────────────────
  const monthly = Array.from({ length: 6 }, (_, i) => {
    const from = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1)
    const to   = new Date(now.getFullYear(), now.getMonth() - (5 - i) + 1, 0, 23, 59, 59)
    return {
      month: MONTHS[from.getMonth()],
      year: from.getFullYear(),
      contactos: allContacts.filter((c) => c.createdAt >= from && c.createdAt <= to).length,
    }
  })

  const contactDiff = thisMonth - lastMonth

  const kpis = [
    {
      label: "Contactos este mes",
      value: String(thisMonth),
      sub: lastMonth > 0 ? `${lastMonth} el mes pasado` : "Primer mes",
      trend: contactDiff > 0 ? "up" : contactDiff < 0 ? "down" : "flat",
      icon: MessageSquare,
    },
    {
      label: "Total contactos",
      value: String(totalContacts),
      sub: "Desde tu registro",
      trend: "flat" as const,
      icon: Users,
    },
    {
      label: "Calificación",
      value: avgRating ?? "—",
      sub: reviews.length ? `${reviews.length} reseña${reviews.length !== 1 ? "s" : ""}` : "Sin reseñas aún",
      trend: "flat" as const,
      icon: Star,
    },
    {
      label: "Tasa de contacto",
      value: totalContacts > 0 ? `${((thisMonth / Math.max(totalContacts, 1)) * 100).toFixed(0)}%` : "—",
      sub: "Contactos este mes / total",
      trend: "flat" as const,
      icon: TrendingUp,
    },
  ]

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Estadísticas</h1>
        <p className="text-slate-500 mt-1">Actividad real de tu perfil.</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k) => {
          const Icon = k.icon
          return (
            <div key={k.label} className="bg-white border border-slate-200 rounded-xl p-5">
              <div className="flex items-center justify-between mb-2">
                <Icon className="w-4 h-4 text-slate-400" />
                {k.trend !== "flat" && (
                  <span className={`text-xs font-medium flex items-center gap-0.5 ${
                    k.trend === "up" ? "text-green-600" : "text-red-500"
                  }`}>
                    {k.trend === "up"
                      ? <ArrowUp className="w-3 h-3" />
                      : <ArrowDown className="w-3 h-3" />}
                    {Math.abs(contactDiff)}
                  </span>
                )}
                {k.trend === "flat" && <Minus className="w-3 h-3 text-slate-300" />}
              </div>
              <p className="text-2xl font-bold text-slate-900">{k.value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{k.label}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">{k.sub}</p>
            </div>
          )
        })}
      </div>

      {/* Weekly bar chart */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h2 className="font-semibold text-slate-900 mb-1">Contactos esta semana</h2>
        <p className="text-xs text-slate-400 mb-5">Mensajes, WhatsApp y llamadas recibidas</p>
        {weekly.every((d) => d.contactos === 0) ? (
          <div className="h-36 flex items-center justify-center text-slate-400 text-sm">
            Aún no tienes contactos esta semana.
          </div>
        ) : (
          <div className="flex items-end gap-3 h-36">
            {weekly.map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1.5">
                {d.contactos > 0 && (
                  <span className="text-xs text-slate-400">{d.contactos}</span>
                )}
                <div
                  className="w-full bg-blue-600 rounded-t-md hover:bg-blue-700 transition-colors"
                  style={{ height: `${(d.contactos / maxWeekly) * 100}%`, minHeight: d.contactos > 0 ? "4px" : "0" }}
                />
                <span className="text-xs text-slate-500">{d.day}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Monthly table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-900">Historial de contactos</h2>
        </div>
        {monthly.every((m) => m.contactos === 0) ? (
          <div className="px-6 py-10 text-center text-slate-400 text-sm">
            No hay contactos registrados en los últimos 6 meses.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
              <tr>
                <th className="text-left px-6 py-3">Mes</th>
                <th className="text-right px-6 py-3">Contactos</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[...monthly].reverse().map((m) => (
                <tr key={`${m.month}-${m.year}`} className="hover:bg-slate-50">
                  <td className="px-6 py-3 font-medium text-slate-800">{m.month} {m.year}</td>
                  <td className="px-6 py-3 text-right text-slate-600">{m.contactos}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <p className="text-xs text-slate-400">
        Las visitas al perfil estarán disponibles próximamente.
      </p>
    </div>
  )
}
