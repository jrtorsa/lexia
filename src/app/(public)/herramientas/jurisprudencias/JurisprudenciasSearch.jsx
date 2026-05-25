'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  BookOpen, ChevronRight, Sparkles, Loader2,
  AlertCircle, Search, ExternalLink,
} from 'lucide-react'

const df = { fontFamily: 'var(--font-cormorant)' }

const MATERIA_CODES = {
  Constitucional: '1',
  Administrativa:  '2',
  Civil:           '3',
  Penal:           '4',
  Laboral:         '5',
  Fiscal:          '7',
}

const TIPO_CODES = {
  'Jurisprudencia': '1',
  'Tesis Aislada':  '2',
}

export default function JurisprudenciasSearch() {
  const [caso,      setCaso]      = useState('')
  const [loading,   setLoading]   = useState(false)
  const [error,     setError]     = useState('')
  const [resultado, setResultado] = useState(null)

  async function handleAnalizar(e) {
    e.preventDefault()
    if (!caso.trim()) return

    setLoading(true)
    setError('')
    setResultado(null)

    try {
      const res = await fetch('/api/ia-jurisprudencias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caso: caso.trim() }),
      })

      const data = await res.json()

      if (!res.ok || data.error) {
        setError(data.error ?? 'Ocurrió un error al analizar tu caso. Intenta de nuevo.')
        return
      }

      setResultado(data)
    } catch {
      setError('No se pudo conectar con el servidor. Verifica tu conexión e intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  function buildSJFUrl() {
    if (!resultado) return '#'
    const params = new URLSearchParams()
    params.set('searchField', resultado.palabrasClave)
    const materiaCode = MATERIA_CODES[resultado.materia]
    if (materiaCode) params.set('materia', materiaCode)
    const tipoCode = TIPO_CODES[resultado.tipo]
    if (tipoCode) params.set('tipoTesis', tipoCode)
    return `https://sjf2.scjn.gob.mx/busqueda-principal-tesis?${params.toString()}`
  }

  return (
    <main className="min-h-screen bg-[#FAF7F2]">
      {/* Header */}
      <div className="bg-[#1A1C26] border-b border-white/8">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 py-10">
          <nav className="flex items-center gap-2 text-[#C49A3C]/60 text-xs mb-3">
            <Link href="/" className="hover:text-[#C49A3C] transition-colors">Inicio</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/herramientas" className="hover:text-[#C49A3C] transition-colors">Herramientas</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#C49A3C]">Jurisprudencias SCJN</span>
          </nav>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-[rgba(196,154,60,0.12)] border border-[rgba(196,154,60,0.3)] flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-4 h-4 text-[#C49A3C]" />
            </div>
            <h1 className="text-3xl md:text-4xl text-[#FAF7F2]" style={df}>
              Buscador de Jurisprudencias SCJN
            </h1>
          </div>
          <p className="text-[#FAF7F2]/50 text-sm mt-2 max-w-xl">
            Describe tu caso y la IA identifica las palabras clave, materia y tipo
            de criterio para buscar en el Semanario Judicial de la Federación.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-12 space-y-5">

        {/* Input card */}
        <div className="bg-white border border-[#EAE4D9] rounded-2xl p-7 shadow-sm">
          <form onSubmit={handleAnalizar} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-[#0C0D10]/60 uppercase tracking-widest block mb-1.5">
                Describe tu caso
              </label>
              <textarea
                required
                rows={5}
                value={caso}
                onChange={(e) => setCaso(e.target.value)}
                placeholder={
                  'Describe tu caso o lo que necesitas encontrar...\n' +
                  'Ejemplo: Busco jurisprudencia sobre pensión alimenticia cuando el padre es trabajador independiente'
                }
                className={
                  'w-full px-4 py-3 border border-[#EAE4D9] rounded-xl text-sm text-[#0C0D10] ' +
                  'placeholder-slate-300 focus:outline-none focus:border-[#C49A3C] ' +
                  'focus:ring-1 focus:ring-[rgba(196,154,60,0.2)] transition-colors resize-none'
                }
              />
            </div>

            <button
              type="submit"
              disabled={loading || !caso.trim()}
              className="w-full bg-[#C49A3C] hover:bg-[#E2B865] disabled:opacity-50 disabled:cursor-not-allowed text-[#0C0D10] font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analizando tu caso...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Analizar con IA
                </>
              )}
            </button>
          </form>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3.5">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700 leading-relaxed">{error}</p>
          </div>
        )}

        {/* Results */}
        {resultado && (
          <div className="bg-white border border-[#EAE4D9] rounded-2xl p-7 shadow-sm space-y-5">
            {/* Section label */}
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C49A3C]" />
              <h2 className="text-xs font-bold text-[#0C0D10]/60 uppercase tracking-widest">
                Análisis de la IA
              </h2>
            </div>

            {/* Chips row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-[#FAF7F2] border border-[#EAE4D9] rounded-xl p-4">
                <p className="text-[10px] font-bold text-[#C49A3C]/80 uppercase tracking-widest mb-1.5">
                  Materia
                </p>
                <p className="text-sm font-semibold text-[#0C0D10]">{resultado.materia}</p>
              </div>
              <div className="bg-[#FAF7F2] border border-[#EAE4D9] rounded-xl p-4">
                <p className="text-[10px] font-bold text-[#C49A3C]/80 uppercase tracking-widest mb-1.5">
                  Tipo de criterio
                </p>
                <p className="text-sm font-semibold text-[#0C0D10]">{resultado.tipo}</p>
              </div>
              <div className="bg-[#FAF7F2] border border-[#EAE4D9] rounded-xl p-4">
                <p className="text-[10px] font-bold text-[#C49A3C]/80 uppercase tracking-widest mb-1.5">
                  Palabras clave
                </p>
                <p className="text-sm font-semibold text-[#0C0D10]">{resultado.palabrasClave}</p>
              </div>
            </div>

            {/* Explanation */}
            <div className="bg-[#FAF7F2] border border-[#EAE4D9] rounded-xl p-4">
              <p className="text-[10px] font-bold text-[#C49A3C]/80 uppercase tracking-widest mb-1.5">
                Por qué estos parámetros
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">{resultado.explicacion}</p>
            </div>

            {/* CTA */}
            <a
              href={buildSJFUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#0C0D10] hover:bg-[#1A1C26] text-[#FAF7F2] font-semibold py-3.5 rounded-xl transition-colors text-sm"
            >
              <Search className="w-4 h-4" />
              Buscar en el SJF
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </a>
          </div>
        )}

        {/* Footer note */}
        <p className="text-center text-xs text-[#0C0D10]/40 pb-4">
          Los resultados se muestran en el portal oficial del{' '}
          <a
            href="https://sjf2.scjn.gob.mx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#C49A3C] hover:text-[#E2B865] transition-colors"
          >
            Semanario Judicial de la Federación (SCJN)
          </a>
        </p>
      </div>
    </main>
  )
}
