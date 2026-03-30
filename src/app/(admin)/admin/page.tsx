import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import Link from "next/link"
import {
  Users, ShieldCheck, Clock, Star, Phone, MessageSquare,
  TrendingUp, AlertCircle, CheckCircle2, XCircle, Mail,
} from "lucide-react"
import { makeToken } from "@/lib/cedula-token"

const displayFont = { fontFamily: "var(--font-cormorant)" }

function fmt(n: number) {
  return n.toLocaleString("es-MX")
}

function timeAgo(date: Date) {
  const diff = Date.now() - date.getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `hace ${mins}m`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `hace ${hrs}h`
  const days = Math.floor(hrs / 24)
  return `hace ${days}d`
}

export default async function AdminPage() {
  const session = await getServerSession(authOptions)
  const base = process.env.NEXTAUTH_URL ?? "https://lexiamx.com"

  const [
    totalAbogados,
    verificados,
    pendientesVerificacion,
    activosMes,
    membresíasActivas,
    abogadosRecientes,
    cedulasPendientes,
    contactosRecientes,
    topEstados,
  ] = await Promise.all([
    prisma.lawyer.count({ where: { isActive: true } }),
    prisma.lawyer.count({ where: { isVerified: true } }),
    prisma.lawyer.count({ where: { cedulaStatus: "pending" } }),
    prisma.lawyer.count({
      where: {
        createdAt: { gte: new Date(new Date().setDate(1)) },
      },
    }),
    prisma.membership.count({ where: { status: "ACTIVE" } }),
    prisma.lawyer.findMany({
      orderBy: { createdAt: "desc" },
      take: 12,
      select: {
        id: true,
        name: true,
        email: true,
        city: true,
        state: true,
        isVerified: true,
        cedulaStatus: true,
        createdAt: true,
        specialties: {
          where: { isPrimary: true },
          include: { specialty: { select: { name: true } } },
          take: 1,
        },
        memberships: {
          orderBy: { createdAt: "desc" },
          take: 1,
          include: { plan: { select: { name: true } } },
        },
      },
    }),
    prisma.lawyer.findMany({
      where: { cedulaStatus: "pending" },
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        cedula: true,
        city: true,
        state: true,
        updatedAt: true,
      },
    }),
    prisma.contact.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      select: {
        id: true,
        name: true,
        type: true,
        createdAt: true,
        lawyer: { select: { name: true, city: true } },
      },
    }),
    prisma.lawyer.groupBy({
      by: ["state"],
      _count: true,
      orderBy: { _count: { state: "desc" } },
      take: 6,
    }),
  ])

  const contactIcon: Record<string, React.ReactNode> = {
    WHATSAPP: <MessageSquare className="w-3 h-3 text-green-500" />,
    CALL:     <Phone className="w-3 h-3 text-blue-500" />,
    EMAIL:    <Mail className="w-3 h-3 text-purple-500" />,
    MESSAGE:  <MessageSquare className="w-3 h-3 text-[#C49A3C]" />,
  }

  const stats = [
    { label: "Total abogados", value: fmt(totalAbogados), icon: Users, color: "text-[#C49A3C]", bg: "bg-[rgba(196,154,60,0.08)]" },
    { label: "Verificados", value: fmt(verificados), icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Pendientes verificación", value: fmt(pendientesVerificacion), icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Nuevos este mes", value: fmt(activosMes), icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Membresías activas", value: fmt(membresíasActivas), icon: Star, color: "text-violet-600", bg: "bg-violet-50" },
  ]

  return (
    <main className="min-h-screen bg-[#F5F0E8]">
      {/* Header */}
      <div className="bg-[#1A1C26] border-b border-white/8 px-6 lg:px-10 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-[#FAF7F2]" style={displayFont}>
            Panel de Admin
          </h1>
          <p className="text-[#FAF7F2]/40 text-xs mt-0.5">Lexia MX · {session?.user.email}</p>
        </div>
        <Link href="/" className="text-[#C49A3C] text-xs hover:text-[#E2B865] transition-colors">
          ← Ver sitio
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 space-y-8">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-[#EAE4D9] p-4">
              <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center mb-3`}>
                <s.icon className={`w-4 h-4 ${s.color}`} />
              </div>
              <p className="text-2xl font-semibold text-[#0C0D10]" style={displayFont}>{s.value}</p>
              <p className="text-[11px] text-[#0C0D10]/45 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Abogados recientes */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-[#EAE4D9] overflow-hidden">
            <div className="px-5 py-4 border-b border-[#EAE4D9] flex items-center justify-between">
              <h2 className="font-semibold text-[#0C0D10] text-sm">Abogados recientes</h2>
              <span className="text-[11px] text-[#0C0D10]/40">Últimos 12</span>
            </div>
            <div className="divide-y divide-[#EAE4D9]">
              {abogadosRecientes.map((l) => {
                const plan = l.memberships[0]?.plan.name ?? "Sin plan"
                const specialty = l.specialties[0]?.specialty.name ?? "—"
                return (
                  <div key={l.id} className="px-5 py-3 flex items-center gap-3 hover:bg-[#FAF7F2] transition-colors">
                    {/* Avatar initials */}
                    <div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#EAE4D9] flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-semibold text-[#C49A3C]" style={displayFont}>
                        {l.name.replace(/^Lic\.\s*/i, "").split(" ").slice(0, 2).map((n) => n[0]).join("")}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="text-xs font-medium text-[#0C0D10] truncate">{l.name}</p>
                        {l.isVerified && <ShieldCheck className="w-3 h-3 text-[#C49A3C] flex-shrink-0" />}
                      </div>
                      <p className="text-[11px] text-[#0C0D10]/40 truncate">{specialty} · {l.city}, {l.state}</p>
                    </div>
                    <div className="text-right flex-shrink-0 space-y-0.5">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                        plan === "Premium" || plan === "Despacho"
                          ? "bg-[rgba(196,154,60,0.12)] text-[#C49A3C]"
                          : "bg-[#F5F0E8] text-[#0C0D10]/40"
                      }`}>
                        {plan}
                      </span>
                      <p className="text-[10px] text-[#0C0D10]/30">{timeAgo(l.createdAt)}</p>
                    </div>
                    {l.cedulaStatus === "pending" && (
                      <span className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" title="Cédula pendiente" />
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-5">

            {/* Cédulas pendientes */}
            <div className="bg-white rounded-2xl border border-[#EAE4D9] overflow-hidden">
              <div className="px-5 py-4 border-b border-[#EAE4D9] flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500" />
                <h2 className="font-semibold text-[#0C0D10] text-sm">Cédulas pendientes</h2>
                {pendientesVerificacion > 0 && (
                  <span className="ml-auto bg-amber-100 text-amber-700 text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                    {pendientesVerificacion}
                  </span>
                )}
              </div>

              {cedulasPendientes.length === 0 ? (
                <div className="px-5 py-6 text-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-200 mx-auto mb-2" />
                  <p className="text-xs text-[#0C0D10]/40">Sin pendientes</p>
                </div>
              ) : (
                <div className="divide-y divide-[#EAE4D9]">
                  {cedulasPendientes.map((l) => {
                    const aprobarUrl = `${base}/api/admin/cedula?id=${l.id}&action=aprobar&token=${makeToken(l.id, "aprobar")}`
                    const rechazarUrl = `${base}/api/admin/cedula?id=${l.id}&action=rechazar&token=${makeToken(l.id, "rechazar")}`
                    return (
                      <div key={l.id} className="px-5 py-3.5">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <p className="text-xs font-medium text-[#0C0D10]">{l.name}</p>
                            <p className="text-[11px] text-[#0C0D10]/40">{l.city}, {l.state}</p>
                            <p className="text-[11px] text-[#0C0D10]/60 font-mono mt-0.5">Cédula: {l.cedula}</p>
                          </div>
                          <p className="text-[10px] text-[#0C0D10]/30 flex-shrink-0">{timeAgo(l.updatedAt)}</p>
                        </div>
                        <a
                          href={`https://www.buholegal.com/consultacedula/?cedula=${l.cedula}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-[#C49A3C] hover:underline block mb-2"
                        >
                          Verificar en SEP →
                        </a>
                        <div className="flex gap-2">
                          <a
                            href={aprobarUrl}
                            className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-medium hover:bg-emerald-100 transition-colors"
                          >
                            <CheckCircle2 className="w-3 h-3" /> Aprobar
                          </a>
                          <a
                            href={rechazarUrl}
                            className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-red-50 border border-red-200 text-red-600 text-[11px] font-medium hover:bg-red-100 transition-colors"
                          >
                            <XCircle className="w-3 h-3" /> Rechazar
                          </a>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Top estados */}
            <div className="bg-white rounded-2xl border border-[#EAE4D9] p-5">
              <h2 className="font-semibold text-[#0C0D10] text-sm mb-4">Por estado</h2>
              <div className="space-y-2.5">
                {topEstados.map((e) => {
                  const pct = Math.round((e._count / totalAbogados) * 100)
                  return (
                    <div key={e.state}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-[#0C0D10]/70">{e.state}</span>
                        <span className="text-xs font-medium text-[#0C0D10]">{e._count}</span>
                      </div>
                      <div className="h-1.5 bg-[#F5F0E8] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#C49A3C] rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Contactos recientes */}
        <div className="bg-white rounded-2xl border border-[#EAE4D9] overflow-hidden">
          <div className="px-5 py-4 border-b border-[#EAE4D9] flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-[#C49A3C]" />
            <h2 className="font-semibold text-[#0C0D10] text-sm">Últimos contactos (leads)</h2>
          </div>
          {contactosRecientes.length === 0 ? (
            <p className="px-5 py-6 text-xs text-[#0C0D10]/40 text-center">Sin contactos registrados</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 divide-x divide-y divide-[#EAE4D9]">
              {contactosRecientes.map((c) => (
                <div key={c.id} className="px-4 py-3 flex items-start gap-2.5">
                  <div className="mt-0.5 flex-shrink-0">{contactIcon[c.type]}</div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-[#0C0D10] truncate">{c.name}</p>
                    <p className="text-[11px] text-[#0C0D10]/50 truncate">→ {c.lawyer.name}</p>
                    <p className="text-[10px] text-[#0C0D10]/30 mt-0.5">{timeAgo(c.createdAt)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  )
}
