"use client"

import { useState, useTransition } from "react"
import { ShieldCheck, ShieldOff, Loader2, ExternalLink } from "lucide-react"
import { verificarCedula } from "@/app/actions/verificarCedula"

interface Props {
  cedulaActual: string | null
  isVerified:   boolean
}

export default function VerificarCedulaCard({ cedulaActual, isVerified: initialVerified }: Props) {
  const [cedula, setCedula]         = useState(cedulaActual ?? "")
  const [verified, setVerified]     = useState(initialVerified)
  const [result, setResult]         = useState<{ nombre: string; carrera: string; institucion: string } | null>(null)
  const [error, setError]           = useState("")
  const [isPending, startTransition] = useTransition()

  function handleVerify() {
    setError("")
    setResult(null)
    startTransition(async () => {
      const res = await verificarCedula(cedula)
      if (res.ok) {
        setVerified(true)
        setResult({ nombre: res.nombre, carrera: res.carrera, institucion: res.institucion })
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
            Verificamos tu cédula directamente con el registro oficial del SEP.
            El badge aparece en tu perfil público.
          </p>
        </div>
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
          verified ? "bg-green-50 border border-green-200" : "bg-[#F5F0E8] border border-[#EAE4D9]"
        }`}>
          {verified
            ? <ShieldCheck className="w-5 h-5 text-green-600" />
            : <ShieldOff  className="w-5 h-5 text-slate-400" />
          }
        </div>
      </div>

      {/* Already verified */}
      {verified && result && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-4 h-4 text-green-600 flex-shrink-0" />
            <span className="text-sm font-semibold text-green-800">Cédula verificada con el SEP</span>
          </div>
          <p className="text-xs text-green-700 ml-6">{result.nombre}</p>
          <p className="text-xs text-green-600 ml-6">{result.carrera}</p>
          <p className="text-xs text-green-500 ml-6">{result.institucion}</p>
        </div>
      )}

      {verified && !result && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-4 py-3 mb-4">
          <ShieldCheck className="w-4 h-4 text-green-600 flex-shrink-0" />
          <span className="text-sm text-green-800 font-medium">Tu cédula ya está verificada</span>
        </div>
      )}

      {/* Input + button */}
      <div className="flex gap-2">
        <input
          type="text"
          value={cedula}
          onChange={(e) => setCedula(e.target.value.replace(/\D/g, ""))}
          placeholder="Número de cédula SEP"
          maxLength={10}
          className="flex-1 px-3.5 py-2.5 text-sm border border-[#EAE4D9] rounded-lg text-[#0C0D10] bg-white placeholder-slate-300 focus:outline-none focus:border-[#C49A3C] focus:ring-1 focus:ring-[rgba(196,154,60,0.2)] transition-colors font-mono tracking-wider"
        />
        <button
          onClick={handleVerify}
          disabled={isPending || cedula.trim().length < 5}
          className="flex items-center gap-2 bg-[#0C0D10] hover:bg-[#1A1C26] disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap"
        >
          {isPending
            ? <><Loader2 className="w-4 h-4 animate-spin" /> Verificando…</>
            : <><ShieldCheck className="w-4 h-4" /> Verificar</>
          }
        </button>
      </div>

      {/* Error */}
      {error && (
        <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mt-3">
          {error}
        </p>
      )}

      {/* SEP link */}
      <a
        href="https://www.cedulaprofesional.sep.gob.mx/cedula/presidencia/indexAvanzada.action"
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
