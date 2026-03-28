import Link from "next/link"
import { Scale, LayoutDashboard, User, MessageSquare, BarChart3, CreditCard, LogOut } from "lucide-react"

const NAV = [
  { href: "/mi-perfil", label: "Resumen", icon: LayoutDashboard },
  { href: "/mi-perfil/editar", label: "Mi perfil", icon: User },
  { href: "/mi-perfil/contactos", label: "Contactos", icon: MessageSquare },
  { href: "/mi-perfil/estadisticas", label: "Estadísticas", icon: BarChart3 },
  { href: "/mi-perfil/suscripcion", label: "Suscripción", icon: CreditCard },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r border-slate-200 flex flex-col fixed top-0 left-0 h-full z-40">
        {/* Logo */}
        <div className="p-5 border-b border-slate-200">
          <Link href="/" className="flex items-center gap-2 font-bold text-slate-900">
            <Scale className="w-5 h-5 text-blue-700" />
            Lexia
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5">
          {NAV.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </Link>
          ))}
        </nav>

        {/* Footer sidebar */}
        <div className="p-3 border-t border-slate-200">
          {/* Mock user */}
          <div className="flex items-center gap-3 px-3 py-2 mb-1">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-semibold text-sm flex-shrink-0">
              MF
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-800 truncate">María Fernanda</p>
              <p className="text-xs text-slate-400 truncate">Plan Premium</p>
            </div>
          </div>
          <button className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors">
            <LogOut className="w-4 h-4" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 ml-60 min-h-screen">
        {children}
      </main>
    </div>
  )
}
