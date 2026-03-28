import Link from "next/link"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import Image from "next/image"
import { LayoutDashboard, User, MessageSquare, BarChart3, CreditCard } from "lucide-react"
import DashboardLogout from "@/components/DashboardLogout"
import Toaster from "@/components/Toaster"

const NAV = [
  { href: "/mi-perfil", label: "Resumen", icon: LayoutDashboard },
  { href: "/mi-perfil/editar", label: "Mi perfil", icon: User },
  { href: "/mi-perfil/contactos", label: "Contactos", icon: MessageSquare },
  { href: "/mi-perfil/estadisticas", label: "Estadísticas", icon: BarChart3 },
  { href: "/mi-perfil/suscripcion", label: "Suscripción", icon: CreditCard },
]

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/login")

  const initials = session.user.name
    .replace(/^Lic\.\s*/i, "")
    .split(" ")
    .slice(0, 2)
    .map((n: string) => n[0])
    .join("")

  const firstName = session.user.name.replace(/^Lic\.\s*/i, "").split(" ")[0]

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex">
      {/* Sidebar */}
      <aside className="w-60 bg-[#1A1C26] flex flex-col fixed top-0 left-0 h-full z-40">
        {/* Logo */}
        <div className="p-5 border-b border-white/8">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Lexia MX"
              width={600}
              height={400}
              className="h-12 w-auto rounded-sm"
              style={{ width: "auto" }}
            />
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5">
          {NAV.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#FAF7F2]/55 hover:bg-white/8 hover:text-[#FAF7F2] transition-colors"
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </Link>
          ))}
        </nav>

        {/* User + logout */}
        <div className="p-3 border-t border-white/8">
          <div className="flex items-center gap-3 px-3 py-2 mb-1">
            <div
              className="w-8 h-8 rounded-full bg-[rgba(196,154,60,0.15)] border border-[rgba(196,154,60,0.3)] flex items-center justify-center text-[#C49A3C] font-semibold text-sm flex-shrink-0"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-[#FAF7F2] truncate">{firstName}</p>
              <p className="text-xs text-[#FAF7F2]/35 truncate">Plan {session.user.plan}</p>
            </div>
          </div>
          <DashboardLogout />
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 ml-60 min-h-screen">
        {children}
      </main>
      <Toaster />
    </div>
  )
}
