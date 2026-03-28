import { Eye, MessageSquare, Star, TrendingUp, ArrowUp, ArrowDown } from "lucide-react"

const WEEKLY = [
  { day: "Lun", visitas: 28, contactos: 2 },
  { day: "Mar", visitas: 45, contactos: 4 },
  { day: "Mié", visitas: 38, contactos: 3 },
  { day: "Jue", visitas: 52, contactos: 5 },
  { day: "Vie", visitas: 61, contactos: 6 },
  { day: "Sáb", visitas: 32, contactos: 2 },
  { day: "Dom", visitas: 28, contactos: 1 },
]

const maxVisitas = Math.max(...WEEKLY.map((d) => d.visitas))

const MONTHLY = [
  { month: "Oct", visitas: 198, contactos: 14 },
  { month: "Nov", visitas: 221, contactos: 18 },
  { month: "Dic", visitas: 185, contactos: 12 },
  { month: "Ene", visitas: 242, contactos: 19 },
  { month: "Feb", visitas: 267, contactos: 21 },
  { month: "Mar", visitas: 284, contactos: 23 },
]

export default function EstadisticasPage() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Estadísticas</h1>
        <p className="text-slate-500 mt-1">Rendimiento de tu perfil en los últimos 30 días.</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Visitas al perfil", value: "284", prev: "241", icon: Eye, up: true },
          { label: "Contactos recibidos", value: "23", prev: "19", icon: MessageSquare, up: true },
          { label: "Tasa de contacto", value: "8.1%", prev: "7.9%", icon: TrendingUp, up: true },
          { label: "Calificación", value: "4.8", prev: "4.7", icon: Star, up: true },
        ].map((k) => {
          const Icon = k.icon
          const diff = k.up ? "↑" : "↓"
          return (
            <div key={k.label} className="bg-white border border-slate-200 rounded-xl p-5">
              <div className="flex items-center justify-between mb-2">
                <Icon className="w-4 h-4 text-slate-400" />
                <span className={`text-xs font-medium flex items-center gap-0.5 ${k.up ? "text-green-600" : "text-red-500"}`}>
                  {k.up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                  vs {k.prev}
                </span>
              </div>
              <p className="text-2xl font-bold text-slate-900">{k.value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{k.label}</p>
            </div>
          )
        })}
      </div>

      {/* Gráfica semanal (CSS bars) */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h2 className="font-semibold text-slate-900 mb-5">Visitas esta semana</h2>
        <div className="flex items-end gap-3 h-36">
          {WEEKLY.map((d) => (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-1.5">
              <span className="text-xs text-slate-400">{d.visitas}</span>
              <div
                className="w-full bg-blue-600 rounded-t-md transition-all hover:bg-blue-700"
                style={{ height: `${(d.visitas / maxVisitas) * 100}%` }}
              />
              <span className="text-xs text-slate-500">{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tabla mensual */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-900">Historial mensual</h2>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
            <tr>
              <th className="text-left px-6 py-3">Mes</th>
              <th className="text-right px-6 py-3">Visitas</th>
              <th className="text-right px-6 py-3">Contactos</th>
              <th className="text-right px-6 py-3">Tasa</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[...MONTHLY].reverse().map((m) => (
              <tr key={m.month} className="hover:bg-slate-50">
                <td className="px-6 py-3 font-medium text-slate-800">{m.month} 2025</td>
                <td className="px-6 py-3 text-right text-slate-600">{m.visitas}</td>
                <td className="px-6 py-3 text-right text-slate-600">{m.contactos}</td>
                <td className="px-6 py-3 text-right text-slate-500">
                  {((m.contactos / m.visitas) * 100).toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
