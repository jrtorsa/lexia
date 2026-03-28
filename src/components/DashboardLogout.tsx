"use client"

import { signOut } from "next-auth/react"
import { LogOut } from "lucide-react"

export default function DashboardLogout() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm text-[#FAF7F2]/40 hover:bg-white/8 hover:text-[#FAF7F2]/70 transition-colors"
    >
      <LogOut className="w-4 h-4" />
      Cerrar sesión
    </button>
  )
}
