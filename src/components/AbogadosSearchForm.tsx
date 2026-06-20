"use client"

import { Search, SlidersHorizontal, X } from "lucide-react"
import { useRef } from "react"

interface Props {
  q?: string
  especialidad?: string
  estado?: string
  hasFilters: boolean
  especialidades: string[]
  estados: string[]
}

export default function AbogadosSearchForm({
  q,
  especialidad,
  estado,
  hasFilters,
  especialidades,
  estados,
}: Props) {
  const formRef = useRef<HTMLFormElement>(null)

  function trackSearch() {
    if (typeof window !== "undefined" && (window as { gtag?: Function }).gtag) {
      const form = formRef.current
      const query = (form?.querySelector('input[name="q"]') as HTMLInputElement)?.value ?? ""
      const esp = (form?.querySelector('input[name="especialidad"]:checked') as HTMLInputElement)?.value ?? ""
      const est = (form?.querySelector('input[name="estado"]:checked') as HTMLInputElement)?.value ?? ""
      ;(window as { gtag: Function }).gtag("event", "search", {
        search_term: query,
        especialidad: esp,
        ciudad: est,
      })
    }
  }

  return (
    <form
      ref={formRef}
      method="GET"
      className="bg-white border border-[#EAE4D9] rounded-2xl p-5 space-y-6 sticky top-20"
      onSubmit={trackSearch}
    >
      <div>
        <label className="text-[11px] font-semibold text-[#0C0D10]/60 block mb-2 tracking-widest uppercase">
          Buscar
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#0C0D10]/30" />
          <input
            name="q"
            defaultValue={q ?? ""}
            placeholder="Nombre, ciudad..."
            className="w-full pl-8 pr-3 py-2 text-sm border border-[#EAE4D9] rounded-lg text-[#0C0D10] placeholder-[#0C0D10]/30 focus:outline-none focus:border-[#C49A3C] focus:ring-1 focus:ring-[rgba(196,154,60,0.2)] transition-colors bg-transparent"
          />
        </div>
      </div>

      <div>
        <label className="text-[11px] font-semibold text-[#0C0D10]/60 block mb-3 tracking-widest uppercase">
          Especialidad
        </label>
        <div className="space-y-1">
          {especialidades.map((esp) => (
            <label key={esp} className="flex items-center gap-2.5 cursor-pointer group py-0.5">
              <input
                type="radio"
                name="especialidad"
                value={esp}
                defaultChecked={especialidad === esp || (!especialidad && esp === "Todas")}
                className="w-3.5 h-3.5 accent-[#C49A3C]"
                onChange={trackSearch}
              />
              <span className="text-xs text-[#0C0D10]/60 group-hover:text-[#0C0D10] transition-colors">
                {esp}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="text-[11px] font-semibold text-[#0C0D10]/60 block mb-3 tracking-widest uppercase">
          Estado
        </label>
        <div className="space-y-1">
          {estados.map((est) => (
            <label key={est} className="flex items-center gap-2.5 cursor-pointer group py-0.5">
              <input
                type="radio"
                name="estado"
                value={est}
                defaultChecked={estado === est || (!estado && est === "Todos")}
                className="w-3.5 h-3.5 accent-[#C49A3C]"
                onChange={trackSearch}
              />
              <span className="text-xs text-[#0C0D10]/60 group-hover:text-[#0C0D10] transition-colors">
                {est}
              </span>
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-[#C49A3C] hover:bg-[#E2B865] text-[#0C0D10] font-semibold text-sm py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <SlidersHorizontal className="w-3.5 h-3.5" />
        Aplicar filtros
      </button>

      {hasFilters && (
        <a
          href="/abogados"
          className="flex items-center justify-center gap-1.5 text-xs text-[#0C0D10]/40 hover:text-[#0C0D10]/70 transition-colors"
        >
          <X className="w-3 h-3" />
          Limpiar filtros
        </a>
      )}
    </form>
  )
}
