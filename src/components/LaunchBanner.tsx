"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X } from "lucide-react"
import { PROMO } from "@/lib/promo"

const STORAGE_KEY = "lexia_launch_banner_closed"

export default function LaunchBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const closed = localStorage.getItem(STORAGE_KEY)
    if (!closed) setVisible(true)
  }, [])

  function cerrar() {
    localStorage.setItem(STORAGE_KEY, "1")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="sticky top-0 z-50 animate-fade-up"
      style={{ background: "linear-gradient(90deg, #C49A3C 0%, #E2B865 50%, #C49A3C 100%)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Main message */}
        <div className="flex-1 flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-3 text-center sm:text-left min-w-0">
          <span className="text-[#0C0D10] text-sm font-medium leading-snug">
            🎉 {PROMO.mesesGratis} meses Premium gratis para los primeros{" "}
            <strong>{PROMO.lugaresTotal} abogados</strong> registrados.{" "}
            <span className="text-[#5C3D0A] font-semibold">
              ¡Solo quedan {PROMO.lugaresRestantes} lugares!
            </span>
          </span>

          <span className="hidden sm:inline text-[#0C0D10]/40 font-light">·</span>

          <span className="text-[#0C0D10]/70 text-xs sm:text-sm">
            <del className="text-[#5C3D0A]/70">{PROMO.precioOriginal}/mes</del>
            <span className="ml-1.5 font-semibold text-[#0C0D10]">→ Gratis por {PROMO.mesesGratis} meses</span>
          </span>

          <Link
            href="/registro"
            className="flex-shrink-0 bg-[#0C0D10] text-[#E2B865] text-xs font-bold px-4 py-1.5 rounded-full hover:bg-[#1A1C26] transition-colors whitespace-nowrap"
          >
            Registra tu perfil gratis →
          </Link>
        </div>

        {/* Close */}
        <button
          onClick={cerrar}
          aria-label="Cerrar banner"
          className="flex-shrink-0 text-[#0C0D10]/50 hover:text-[#0C0D10] transition-colors p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
