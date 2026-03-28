"use client"

import { useState, useTransition } from "react"
import { AlertTriangle, Loader2, X } from "lucide-react"
import { cancelarSuscripcion } from "@/app/actions/cancelarSuscripcion"

export default function CancelarSuscripcionButton() {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  function handleConfirm() {
    startTransition(async () => {
      await cancelarSuscripcion()
    })
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-xs h-7 px-3 rounded-lg border border-slate-200 text-red-500 hover:text-red-600 hover:border-red-300 transition-colors"
      >
        Cancelar suscripción
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => !isPending && setOpen(false)}
          />

          {/* Dialog */}
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 border border-[#EAE4D9]">
            <button
              type="button"
              onClick={() => setOpen(false)}
              disabled={isPending}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 disabled:opacity-40"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-50 mb-4">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>

            <h2 className="font-semibold text-slate-900 text-lg mb-2">¿Cancelar suscripción?</h2>

            <div className="space-y-2 mb-6">
              <p className="text-sm text-slate-500">Al cancelar:</p>
              <ul className="space-y-1.5 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">•</span>
                  Tu perfil <strong>dejará de aparecer</strong> en el directorio de abogados.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">•</span>
                  Perderás acceso a las funciones Premium inmediatamente.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">•</span>
                  Tu cuenta y datos <strong>no se eliminan</strong> — puedes reactivar cuando quieras.
                </li>
              </ul>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                disabled={isPending}
                className="flex-1 border border-[#EAE4D9] text-slate-600 hover:bg-slate-50 text-sm font-medium py-2.5 rounded-lg transition-colors disabled:opacity-40"
              >
                Mantener plan
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                disabled={isPending}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Cancelando...
                  </>
                ) : (
                  "Sí, cancelar"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
