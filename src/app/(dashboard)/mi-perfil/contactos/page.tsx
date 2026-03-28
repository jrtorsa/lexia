import { MessageCircle, Phone, Mail, MessageSquare, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const CONTACTS = [
  { id: 1, name: "Juan Pérez", email: "juan@email.com", phone: "+52 55 1111 2222", type: "WHATSAPP", message: "Necesito asesoría para divorcio express. Tenemos 2 hijos menores.", date: "2026-03-27", read: false },
  { id: 2, name: "Ana López", email: "ana@email.com", phone: null, type: "MESSAGE", message: "¿Cuánto cobras por una consulta inicial? Tengo un problema de custodia.", date: "2026-03-27", read: false },
  { id: 3, name: "Carlos Ruiz", email: null, phone: "+52 55 3333 4444", type: "CALL", message: "Llamada perdida", date: "2026-03-26", read: true },
  { id: 4, name: "Empresa Alfa SA", email: "legal@alfa.mx", phone: "+52 55 5555 6666", type: "MESSAGE", message: "Requiero elaboración de contrato de custodia de activos para nuestros socios.", date: "2026-03-25", read: true },
  { id: 5, name: "Sofía Martínez", email: "sofia@email.com", phone: null, type: "WHATSAPP", message: "Buenos días, necesito orientación sobre pensión alimenticia.", date: "2026-03-24", read: true },
  { id: 6, name: "Roberto Díaz", email: "roberto@email.com", phone: null, type: "EMAIL", message: "Me interesa conocer sus honorarios para un caso de adopción.", date: "2026-03-23", read: true },
]

const TYPE_CONFIG: Record<string, { label: string; icon: typeof Phone; badgeClass: string }> = {
  WHATSAPP: { label: "WhatsApp", icon: MessageCircle, badgeClass: "bg-green-100 text-green-700 border-0" },
  MESSAGE:  { label: "Mensaje", icon: MessageSquare, badgeClass: "bg-blue-100 text-blue-700 border-0" },
  CALL:     { label: "Llamada", icon: Phone, badgeClass: "bg-slate-100 text-slate-600 border-0" },
  EMAIL:    { label: "Email", icon: Mail, badgeClass: "bg-purple-100 text-purple-700 border-0" },
}

export default function ContactosPage() {
  const unread = CONTACTS.filter((c) => !c.read).length

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Contactos</h1>
        <p className="text-slate-500 mt-1">
          {CONTACTS.length} contactos en total · {unread} sin leer
        </p>
      </div>

      {/* Resumen */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {Object.entries(TYPE_CONFIG).map(([type, cfg]) => {
          const Icon = cfg.icon
          const count = CONTACTS.filter((c) => c.type === type).length
          return (
            <div key={type} className="bg-white border border-slate-200 rounded-xl p-4 text-center">
              <Icon className="w-5 h-5 mx-auto mb-1 text-slate-500" />
              <p className="text-xl font-bold text-slate-900">{count}</p>
              <p className="text-xs text-slate-400">{cfg.label}</p>
            </div>
          )
        })}
      </div>

      {/* Lista */}
      <div className="bg-white border border-slate-200 rounded-xl divide-y divide-slate-100">
        {CONTACTS.map((c) => {
          const cfg = TYPE_CONFIG[c.type]
          const Icon = cfg.icon
          return (
            <div key={c.id} className={`flex gap-4 p-5 hover:bg-slate-50 transition-colors ${!c.read ? "bg-blue-50/30" : ""}`}>
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-slate-600">
                {c.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-slate-900 text-sm">{c.name}</span>
                  <Badge className={cfg.badgeClass}>
                    <Icon className="w-3 h-3 mr-1" />
                    {cfg.label}
                  </Badge>
                  {!c.read && (
                    <span className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0" />
                  )}
                </div>
                <p className="text-sm text-slate-500 mt-0.5 truncate">{c.message}</p>
                <div className="flex items-center gap-3 mt-1">
                  {c.email && <span className="text-xs text-slate-400">{c.email}</span>}
                  {c.phone && <span className="text-xs text-slate-400">{c.phone}</span>}
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-400 flex-shrink-0">
                <Calendar className="w-3.5 h-3.5" />
                {c.date}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
