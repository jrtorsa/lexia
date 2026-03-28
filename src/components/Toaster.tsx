"use client"

import { useEffect, useState } from "react"
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react"
import { type ToastEvent } from "@/lib/toast"

interface Toast extends ToastEvent {
  leaving: boolean
}

export default function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    function handler(e: Event) {
      const { message, type, id } = (e as CustomEvent<ToastEvent>).detail
      setToasts((prev) => [...prev, { message, type, id, leaving: false }])

      // Start leave animation after 3.5 s
      setTimeout(() => {
        setToasts((prev) =>
          prev.map((t) => (t.id === id ? { ...t, leaving: true } : t))
        )
      }, 3500)

      // Remove from DOM after animation
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, 3800)
    }

    window.addEventListener("lexia:toast", handler)
    return () => window.removeEventListener("lexia:toast", handler)
  }, [])

  if (!toasts.length) return null

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
      {toasts.map((t) => {
        const Icon =
          t.type === "success" ? CheckCircle2 :
          t.type === "error"   ? AlertCircle  :
          Info

        const colors =
          t.type === "success"
            ? "bg-[#0C0D10] border-[#C49A3C]/30 text-[#FAF7F2]"
            : t.type === "error"
              ? "bg-red-900 border-red-700/50 text-red-100"
              : "bg-[#1A1C26] border-white/10 text-[#FAF7F2]"

        const iconColor =
          t.type === "success" ? "text-[#C49A3C]" :
          t.type === "error"   ? "text-red-400"   :
          "text-blue-400"

        return (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-start gap-3 px-4 py-3.5 rounded-xl border shadow-2xl max-w-sm ${colors} transition-all duration-300 ${
              t.leaving ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
            }`}
          >
            <Icon className={`w-4 h-4 flex-shrink-0 mt-0.5 ${iconColor}`} />
            <p className="text-sm leading-snug flex-1">{t.message}</p>
            <button
              onClick={() =>
                setToasts((prev) => prev.filter((x) => x.id !== t.id))
              }
              className="text-white/30 hover:text-white/70 transition-colors flex-shrink-0 mt-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
