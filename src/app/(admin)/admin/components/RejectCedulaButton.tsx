'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { XCircle, X, AlertCircle } from 'lucide-react'

export function RejectCedulaButton({
  lawyerId,
  lawyerName,
}: {
  lawyerId: string
  lawyerName: string
}) {
  const [open, setOpen] = useState(false)
  const [reason, setReason] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  function handleOpen() {
    setReason('')
    setError('')
    setOpen(true)
  }

  function handleClose() {
    if (loading) return
    setOpen(false)
  }

  async function handleConfirm() {
    if (!reason.trim()) {
      setError('Escribe una razón antes de continuar.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/cedula-reject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lawyerId, reason: reason.trim() }),
      })
      if (res.ok) {
        setOpen(false)
        router.refresh()
      } else {
        setError('Error al rechazar. Intenta de nuevo.')
      }
    } catch {
      setError('Error de conexión.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={handleOpen}
        className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-red-50 border border-red-200 text-red-600 text-[11px] font-medium hover:bg-red-100 transition-colors"
      >
        <XCircle className="w-3 h-3" /> Rechazar
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Dialog */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div className="bg-white rounded-2xl border border-[#EAE4D9] shadow-2xl w-full max-w-md pointer-events-auto">
              {/* Header */}
              <div className="px-6 py-4 border-b border-[#EAE4D9] flex items-center justify-between">
                <div>
                  <h3
                    className="font-semibold text-[#0C0D10] text-base"
                    style={{ fontFamily: 'var(--font-cormorant)' }}
                  >
                    Rechazar cédula
                  </h3>
                  <p className="text-[11px] text-[#0C0D10]/40 mt-0.5 truncate">{lawyerName}</p>
                </div>
                <button
                  onClick={handleClose}
                  disabled={loading}
                  className="text-[#0C0D10]/30 hover:text-[#0C0D10] transition-colors disabled:opacity-40"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-3">
                <label className="block text-[11px] font-semibold text-[#0C0D10]/60 uppercase tracking-wide mb-1">
                  Razón del rechazo
                </label>
                <textarea
                  value={reason}
                  onChange={e => { setReason(e.target.value); setError('') }}
                  placeholder="Ej: El número de cédula no coincide con el registro del SEP. Por favor verifica el número e inténtalo de nuevo."
                  rows={4}
                  disabled={loading}
                  className="w-full px-3.5 py-2.5 text-sm border border-[#EAE4D9] rounded-lg text-[#0C0D10] placeholder-[#0C0D10]/25 focus:outline-none focus:border-red-300 focus:ring-1 focus:ring-red-100 transition-colors resize-none disabled:opacity-50"
                />
                <p className="text-[11px] text-[#0C0D10]/40">
                  Esta razón se incluirá en el email que recibirá el abogado.
                </p>
                {error && (
                  <div className="flex items-center gap-2 text-red-600 text-xs bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    {error}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-6 pb-6 flex gap-3">
                <button
                  onClick={handleClose}
                  disabled={loading}
                  className="flex-1 py-2.5 text-sm border border-[#EAE4D9] rounded-lg text-[#0C0D10]/60 hover:bg-[#FAF7F2] transition-colors disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={loading || !reason.trim()}
                  className="flex-1 py-2.5 text-sm bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Rechazando...
                    </>
                  ) : (
                    'Confirmar rechazo'
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
