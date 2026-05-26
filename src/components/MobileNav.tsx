'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  Menu, X, LayoutDashboard, User, MessageSquare,
  BarChart3, CreditCard, CalendarDays,
} from "lucide-react"
import DashboardLogout from "@/components/DashboardLogout"

const NAV = [
  { href: "/mi-perfil",              label: "Resumen",      icon: LayoutDashboard },
  { href: "/mi-perfil/editar",       label: "Mi perfil",    icon: User },
  { href: "/mi-perfil/contactos",    label: "Contactos",    icon: MessageSquare },
  { href: "/mi-perfil/estadisticas", label: "Estadísticas", icon: BarChart3 },
  { href: "/mi-perfil/citatorios",   label: "Citatorios",   icon: CalendarDays },
  { href: "/mi-perfil/suscripcion",  label: "Suscripción",  icon: CreditCard },
]

interface Props {
  firstName: string
  initials: string
  plan: string
}

export default function MobileNav({ firstName, initials, plan }: Props) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Close on route change
  useEffect(() => { setOpen(false) }, [pathname])

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  return (
    <>
      {/* Top bar — mobile only */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-14 bg-[#1A1C26] z-40 flex items-center justify-between px-4 border-b border-white/8">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Lexia MX"
            width={300}
            height={200}
            className="h-8 w-auto rounded-sm"
            style={{ width: "auto" }}
          />
        </Link>
        <button
          onClick={() => setOpen(true)}
          className="text-[#FAF7F2]/70 hover:text-[#FAF7F2] transition-colors p-1"
          aria-label="Abrir menú"
        >
          <Menu className="w-5 h-5" />
        </button>
      </header>

      {/* Backdrop */}
      {open && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Slide-over sidebar */}
      <div
        className={`md:hidden fixed top-0 left-0 h-full w-72 max-w-[85vw] bg-[#1A1C26] z-50 flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-5 border-b border-white/8 flex items-center justify-between">
          <Link href="/" onClick={() => setOpen(false)}>
            <Image
              src="/logo.png"
              alt="Lexia MX"
              width={300}
              height={200}
              className="h-10 w-auto rounded-sm"
              style={{ width: "auto" }}
            />
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="text-[#FAF7F2]/50 hover:text-[#FAF7F2] transition-colors p-1"
            aria-label="Cerrar menú"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== "/mi-perfil" && pathname.startsWith(href))
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition-colors ${
                  active
                    ? "bg-white/10 text-[#FAF7F2]"
                    : "text-[#FAF7F2]/55 hover:bg-white/8 hover:text-[#FAF7F2]"
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {label}
              </Link>
            )
          })}
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
              <p className="text-xs text-[#FAF7F2]/35 truncate">Plan {plan}</p>
            </div>
          </div>
          <DashboardLogout />
        </div>
      </div>
    </>
  )
}
