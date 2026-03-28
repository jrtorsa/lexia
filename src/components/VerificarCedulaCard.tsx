"use client"

import { useState, useTransition } from "react"
import { ShieldCheck, ShieldOff, ShieldAlert, Loader2, ExternalLink, Clock } from "lucide-react"
import { verificarCedula } from "@/app/actions/verificarCedula"

interface Props {
  cedulaActual:  string | null
  isVerified:    boolean
  cedulaStatus:  string | null
}

export default function VerificarCedulaCard({ cedulaActual, isVerified, cedulaStatus: initialStatus }: Props) {
  const [cedula, setCedula]           = useState(cedulaActual ?? "")
  const [status, setStatus]           = useState<string | null>(
    isVerified ? "approved" : (initialStatus ?? null)
  )
  const [error, setError]             = useState("")
  const [isPending, startTransition]  = useTransition()

  function handleVerify() {
    setError("")
    startTransition(async () => {
      const res = await verificarCedula(cedula)
      if (res.ok) {
        setStatus("pending")
      } else {
        setError(res.error)
      }
    })
  }

  return (
    <div className="bg-white border border-[#EAE4D9] rounded-xl p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <h3 className="font-semibold text-[#0C0D10] text-sm mb-0.5">Verificación de cédula</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Enviamos tu cédula al equipo de Lexia para verificarla contra el registro del SEP.
            El proceso toma menos de 24 horas.
          </p>
        </div>
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
          status === "approved" ? "bg-green-50 border border-green-200"
          : status === "pending" ? "bg-amber-50 border border-amber-200"
          : status === "rejected" ? "bg-red-50 border border-red-200"
          : "bg-[#F5F0E8] border border-[#EAE4D9]"
        }`}>
          {status === "approved" && <ShieldCheck className="w-5 h-5 text-green-600" />}
          {status === "pending"  && <Clock       className="w-5 h-5 text-amber-500" />}
          {status === "rejected" && <ShieldAlert className="w-5 h-5 text-red-500"   />}
          {!status               && <ShieldOff   className="w-5 h-5 text-slate-400" />}
        </div>
      </div>

      {/* Status banners */}
      {status === "approved" && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-4 py-3 mb-4">
          <ShieldCheck className="w-4 h-4 text-green-600 flex-shrink-0" />
          <span className="text-sm text-green-800 font-medium">Tu cédula está verificada</span>
        </div>
      )}

      {status === "pending" && (
        <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mb-4">
          <Clock className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-amber-800 font-medium">En revisión</p>
            <p className="text-xs text-amber-700 mt-0.5">
              Recibirás un correo cuando tu cédula sea verificada (menos de 24 hrs).
            </p>
          </div>
        </div>
      )}

      {status === "rejected" && (
        <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-4">
          <ShieldAlert className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-red-800 font-medium">Cédula no encontrada</p>
            <p className="text-xs text-red-600 mt-0.5">
              No encontramos tu cédula en el SEP. Revisa el número e intenta de nuevo.
            </p>
          </div>
        </div>
      )}

      {/* Input + button — show unless approved */}
      {status !== "approved" && (
        <>
          <div className="flex gap-2">
            <input
              type="text"
              value={cedula}
              onChange={(e) => { setCedula(e.target.value.replace(/\D/g, "")); setStatus(null) }}
              placeholder="Número de cédula SEP"
              maxLength={10}
              className="flex-1 px-3.5 py-2.5 text-sm border border-[#EAE4D9] rounded-lg text-[#0C0D10] bg-white placeholder-slate-300 focus:outline-none focus:border-[#C49A3C] focus:ring-1 focus:ring-[rgba(196,154,60,0.2)] transition-colors font-mono tracking-wider"
            />
            <button
              onClick={handleVerify}
              disabled={isPending || cedula.trim().length < 5 || status === "pending"}
              className="flex items-center gap-2 bg-[#0C0D10] hover:bg-[#1A1C26] disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap"
            >
              {isPending
                ? <><Loader2 className="w-4 h-4 animate-spin" /> Enviando…</>
                : <><ShieldCheck className="w-4 h-4" /> Verificar</>
              }
            </button>
          </div>

          {error && (
            <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mt-3">
              {error}
            </p>
          )}
        </>
      )}

      {/* SEP link */}
      <a
        href="https://cedulaprofesional.sep.gob.mx"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-[10px] text-slate-400 hover:text-[#C49A3C] transition-colors mt-3"
      >
        <ExternalLink className="w-3 h-3" />
        Consultar directamente en el SEP
      </a>
    </div>
  )
}
