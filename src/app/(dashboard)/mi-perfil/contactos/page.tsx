import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { MessageCircle, Phone, Mail, MessageSquare, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const TYPE_CONFIG: Record<string, { label: string; icon: typeof Phone; badgeClass: string }> = {
  WHATSAPP: { label: "WhatsApp", icon: MessageCircle, badgeClass: "bg-green-100 text-green-700 border-0" },
  MESSAGE:  { label: "Mensaje",  icon: MessageSquare, badgeClass: "bg-blue-100 text-blue-700 border-0"  },
  CALL:     { label: "Llamada",  icon: Phone,         badgeClass: "bg-slate-100 text-slate-600 border-0" },
  EMAIL:    { label: "Email",    icon: Mail,          badgeClass: "bg-purple-100 text-purple-700 border-0" },
}

export default async function ContactosPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/login")

  const contacts = await prisma.contact.findMany({
    where: { lawyerId: session.user.id },
    orderBy: { createdAt: "desc" },
  })

  const typeCounts = Object.fromEntries(
    Object.keys(TYPE_CONFIG).map((t) => [t, contacts.filter((c) => c.type === t).length])
  )

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Contactos</h1>
        <p className="text-slate-500 mt-1">
          {contacts.length} contacto{contacts.length !== 1 ? "s" : ""} en total
        </p>
      </div>

      {/* Resumen */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {Object.entries(TYPE_CONFIG).map(([type, cfg]) => {
          const Icon = cfg.icon
          return (
            <div key={type} className="bg-white border border-slate-200 rounded-xl p-4 text-center">
              <Icon className="w-5 h-5 mx-auto mb-1 text-slate-500" />
              <p className="text-xl font-bold text-slate-900">{typeCounts[type] ?? 0}</p>
              <p className="text-xs text-slate-400">{cfg.label}</p>
            </div>
          )
        })}
      </div>

      {contacts.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
          <MessageSquare className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 font-medium">Aún no tienes contactos</p>
          <p className="text-slate-400 text-sm mt-1">Cuando un cliente te contacte aparecerá aquí.</p>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl divide-y divide-slate-100">
          {contacts.map((c) => {
            const cfg = TYPE_CONFIG[c.type] ?? TYPE_CONFIG.MESSAGE
            const Icon = cfg.icon
            return (
              <div key={c.id} className="flex gap-4 p-5 hover:bg-slate-50 transition-colors">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-slate-600">
                  {c.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-slate-900 text-sm">{c.name}</span>
                    <Badge className={cfg.badgeClass}>
                      <Icon className="w-3 h-3 mr-1" />
                      {cfg.label}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-500 mt-0.5 truncate">{c.message ?? "—"}</p>
                  <div className="flex items-center gap-3 mt-1">
                    {c.email && <span className="text-xs text-slate-400">{c.email}</span>}
                    {c.phone && <span className="text-xs text-slate-400">{c.phone}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-400 flex-shrink-0">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(c.createdAt).toLocaleDateString("es-MX", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
