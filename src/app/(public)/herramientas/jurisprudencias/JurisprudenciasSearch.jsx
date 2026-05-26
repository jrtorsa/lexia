'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import {
  BookOpen, ChevronRight, Sparkles, Loader2, AlertCircle,
  Search, ExternalLink, CircleAlert, CircleMinus, CircleCheck,
  MessageSquare, ArrowLeft,
} from 'lucide-react'

const df = { fontFamily: 'var(--font-cormorant)' }

// ─── Constants ────────────────────────────────────────────────────────────────

const MATERIA_CODES = {
  Constitucional: '1', Administrativa: '2', Civil: '3',
  Penal: '4', Laboral: '5', Fiscal: '7',
}
const TIPO_CODES = { 'Jurisprudencia': '1', 'Tesis Aislada': '2' }

const GENERIC_TERMS  = ['abogado','ley','legal','derecho','juicio','demanda','caso','problema','ayuda','información']
const SPECIFIC_TERMS = ['artículo','fracción','constitucional','amparo','materia','trabajador','patrón','contrato','pensión','custodia','divorcio','despido','nulidad','rescisión','embargo','fideicomiso','arrendamiento','herencia','sociedad','concurso']

const PLACEHOLDERS = [
  'Ej: Busco jurisprudencia sobre pensión alimenticia cuando el padre es trabajador independiente y no tiene ingresos fijos',
  'Ej: Necesito tesis sobre despido injustificado de trabajador sindicalizado durante período de prueba',
  'Ej: Criterios sobre custodia compartida cuando ambos padres viven en ciudades diferentes',
  'Ej: Jurisprudencia sobre nulidad de contrato de arrendamiento por vicios del consentimiento',
]

// ─── Quality indicator ────────────────────────────────────────────────────────

function evaluateQuality(text) {
  const lower = text.toLowerCase()
  const words = lower.trim().split(/\s+/).filter(Boolean)
  if (words.length <= 3) return null
  const hasSpecific = SPECIFIC_TERMS.some((t) => lower.includes(t))
  if (hasSpecific || words.length > 15) return 'green'
  const hasOnlyGeneric = words.every((w) => GENERIC_TERMS.includes(w) || w.length <= 2)
  if (words.length < 8 || hasOnlyGeneric) return 'red'
  return 'yellow'
}

const QUALITY_CONFIG = {
  red: {
    icon: CircleAlert, color: 'text-red-500', label: 'Muy general', segments: 1,
    message: 'Tu búsqueda es muy general. Agrega más contexto para mejores resultados.',
    tip: 'Tip: incluye el tipo de caso, las partes involucradas y el punto específico que necesitas resolver.',
  },
  yellow: {
    icon: CircleMinus, color: 'text-amber-500', label: 'Puede mejorar', segments: 2,
    message: 'Tu búsqueda puede mejorar. Intenta incluir términos jurídicos específicos.',
    tip: 'Tip: menciona el artículo de ley, la figura jurídica o las partes del conflicto.',
  },
  green: {
    icon: CircleCheck, color: 'text-emerald-500', label: 'Búsqueda sólida', segments: 3,
    message: 'Tu descripción es clara. La IA puede encontrar criterios relevantes.',
    tip: null,
  },
}
const SEGMENT_COLORS = ['bg-red-400', 'bg-amber-400', 'bg-emerald-400']

// ─── Helpers ──────────────────────────────────────────────────────────────────

function esTextoCorto(texto) {
  const palabras = texto.trim().split(/\s+/).filter(Boolean).length
  return palabras < 5 || texto.trim().length < 30
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function JurisprudenciasSearch() {
  // form
  const [caso,           setCaso]           = useState('')
  const [placeholderIdx, setPlaceholderIdx] = useState(0)
  // flow state: idle | loading-preguntas | clarificacion | loading-busqueda | resultado
  const [estado,         setEstado]         = useState('idle')
  // clarification
  const [clarificacion,  setClarificacion]  = useState(null)   // { intro, preguntas }
  const [respuesta,      setRespuesta]      = useState('')
  // result
  const [resultado,      setResultado]      = useState(null)
  const [error,          setError]          = useState('')

  // Rotate placeholder every 3 s
  useEffect(() => {
    const id = setInterval(() => setPlaceholderIdx((i) => (i + 1) % PLACEHOLDERS.length), 3000)
    return () => clearInterval(id)
  }, [])

  const quality = useMemo(() => evaluateQuality(caso), [caso])
  const qConfig = quality ? QUALITY_CONFIG[quality] : null

  // ── Textarea border color ──────────────────────────────────────────────────
  const textareaBorder =
    quality === 'green'  ? 'border-emerald-300 focus:border-emerald-400 focus:ring-emerald-100' :
    quality === 'yellow' ? 'border-amber-300   focus:border-amber-400   focus:ring-amber-100'   :
    quality === 'red'    ? 'border-red-300     focus:border-red-400     focus:ring-red-100'     :
                           'border-[#EAE4D9]   focus:border-[#C49A3C]  focus:ring-[rgba(196,154,60,0.2)]'

  // ── API: fetch clarification questions ────────────────────────────────────
  async function fetchClarificacion() {
    setEstado('loading-preguntas')
    setError('')
    try {
      const res  = await fetch('/api/ia-clarificacion', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ caso: caso.trim() }),
      })
      const data = await res.json()
      if (!res.ok || data.error) { setError(data.error ?? 'Error al obtener preguntas.'); setEstado('idle'); return }
      setClarificacion(data)
      setRespuesta('')
      setEstado('clarificacion')
    } catch {
      setError('No se pudo conectar. Intenta de nuevo.')
      setEstado('idle')
    }
  }

  // ── API: fetch main jurisprudencias result ────────────────────────────────
  async function fetchJurisprudencia(prompt) {
    setEstado('loading-busqueda')
    setError('')
    try {
      const res  = await fetch('/api/ia-jurisprudencias', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ caso: prompt }),
      })
      const data = await res.json()
      if (!res.ok || data.error) { setError(data.error ?? 'Error al analizar el caso.'); setEstado('idle'); return }
      setResultado(data)
      setEstado('resultado')
    } catch {
      setError('No se pudo conectar. Intenta de nuevo.')
      setEstado('idle')
    }
  }

  // ── Submit: decide flow path ───────────────────────────────────────────────
  function handleAnalizar(e) {
    e.preventDefault()
    if (!caso.trim()) return
    setResultado(null)
    if (esTextoCorto(caso)) {
      fetchClarificacion()
    } else {
      fetchJurisprudencia(caso.trim())
    }
  }

  // ── Submit: clarification answered → build combined prompt ────────────────
  function handleContinuar(e) {
    e.preventDefault()
    if (!respuesta.trim()) return
    const prompt =
      `El usuario busca sobre: ${caso.trim()}\n` +
      `Contexto adicional:\n` +
      `- ${clarificacion.preguntas[0]} / ${clarificacion.preguntas[1]}\n` +
      `- Respuesta del usuario: ${respuesta.trim()}`
    fetchJurisprudencia(prompt)
  }

  function handleReset() {
    setEstado('idle')
    setClarificacion(null)
    setRespuesta('')
    setResultado(null)
    setError('')
  }

  function buildSJFUrl() {
    if (!resultado) return '#'
    const params = new URLSearchParams()
    params.set('searchField', resultado.palabrasClave)
    const mc = MATERIA_CODES[resultado.materia]; if (mc) params.set('materia',    mc)
    const tc = TIPO_CODES[resultado.tipo];       if (tc) params.set('tipoTesis',  tc)
    return `https://sjf2.scjn.gob.mx/busqueda-principal-tesis?${params.toString()}`
  }

  const isLoading = estado === 'loading-preguntas' || estado === 'loading-busqueda'

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

        {/* ── Input card ─────────────────────────────────────────────────── */}
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
                disabled={isLoading || estado === 'clarificacion'}
                onChange={(e) => { setCaso(e.target.value); setResultado(null); setEstado('idle') }}
                placeholder={PLACEHOLDERS[placeholderIdx]}
                className={
                  `w-full px-4 py-3 border rounded-xl text-sm text-[#0C0D10] ` +
                  `placeholder-slate-300 focus:outline-none focus:ring-1 transition-colors resize-none ` +
                  `disabled:bg-slate-50 disabled:text-slate-400 ` +
                  textareaBorder
                }
              />

              {/* Quality indicator — only when idle and quality available */}
              {estado === 'idle' && qConfig && (
                <div className="mt-3 space-y-2.5 transition-all duration-300">
                  <div className="flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${i < qConfig.segments ? SEGMENT_COLORS[i] : 'bg-slate-100'}`} />
                    ))}
                  </div>
                  <div className="flex items-start gap-2">
                    <qConfig.icon className={`w-4 h-4 flex-shrink-0 mt-0.5 ${qConfig.color}`} />
                    <div>
                      <span className={`text-xs font-semibold ${qConfig.color}`}>{qConfig.label}</span>
                      <span className="text-xs text-slate-500"> — {qConfig.message}</span>
                      {qConfig.tip && <p className="text-xs text-slate-400 mt-0.5">{qConfig.tip}</p>}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {estado !== 'clarificacion' && (
              <button
                type="submit"
                disabled={isLoading || !caso.trim()}
                className="w-full bg-[#C49A3C] hover:bg-[#E2B865] disabled:opacity-50 disabled:cursor-not-allowed text-[#0C0D10] font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
              >
                {estado === 'loading-preguntas' ? (
                  <><Loader2 className="w-4 h-4 animate-spin" />Entendiendo tu caso...</>
                ) : estado === 'loading-busqueda' ? (
                  <><Loader2 className="w-4 h-4 animate-spin" />Analizando tu caso...</>
                ) : (
                  <><Sparkles className="w-4 h-4" />Analizar con IA</>
                )}
              </button>
            )}
          </form>
        </div>

        {/* ── Clarification card ─────────────────────────────────────────── */}
        {estado === 'clarificacion' && clarificacion && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 space-y-5">
            {/* Header */}
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-500 flex-shrink-0" />
              <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                Ayúdame a entender mejor tu caso
              </p>
            </div>

            {/* AI intro */}
            <p className="text-sm text-slate-700 leading-relaxed">{clarificacion.intro}</p>

            {/* Questions */}
            <ol className="space-y-2">
              {clarificacion.preguntas.map((p, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-blue-200 text-blue-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-sm text-slate-700">{p}</p>
                </li>
              ))}
            </ol>

            {/* Answer form */}
            <form onSubmit={handleContinuar} className="space-y-3">
              <textarea
                required
                rows={3}
                value={respuesta}
                onChange={(e) => setRespuesta(e.target.value)}
                placeholder="Escribe tu respuesta aquí..."
                className="w-full px-4 py-3 border border-blue-200 bg-white rounded-xl text-sm text-[#0C0D10] placeholder-slate-300 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-colors resize-none"
              />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-blue-200 text-blue-600 text-sm font-medium hover:bg-blue-100 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Editar búsqueda
                </button>
                <button
                  type="submit"
                  disabled={!respuesta.trim()}
                  className="flex-1 bg-[#C49A3C] hover:bg-[#E2B865] disabled:opacity-50 disabled:cursor-not-allowed text-[#0C0D10] font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  Continuar búsqueda
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ── Error ──────────────────────────────────────────────────────── */}
        {error && (
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3.5">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700 leading-relaxed">{error}</p>
          </div>
        )}

        {/* ── Results ────────────────────────────────────────────────────── */}
        {estado === 'resultado' && resultado && (
          <div className="bg-white border border-[#EAE4D9] rounded-2xl p-7 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C49A3C]" />
                <h2 className="text-xs font-bold text-[#0C0D10]/60 uppercase tracking-widest">Análisis de la IA</h2>
              </div>
              <button onClick={handleReset} className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 transition-colors">
                <ArrowLeft className="w-3 h-3" />Nueva búsqueda
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { label: 'Materia',         value: resultado.materia        },
                { label: 'Tipo de criterio', value: resultado.tipo          },
                { label: 'Palabras clave',  value: resultado.palabrasClave  },
              ].map(({ label, value }) => (
                <div key={label} className="bg-[#FAF7F2] border border-[#EAE4D9] rounded-xl p-4">
                  <p className="text-[10px] font-bold text-[#C49A3C]/80 uppercase tracking-widest mb-1.5">{label}</p>
                  <p className="text-sm font-semibold text-[#0C0D10]">{value}</p>
                </div>
              ))}
            </div>

            <div className="bg-[#FAF7F2] border border-[#EAE4D9] rounded-xl p-4">
              <p className="text-[10px] font-bold text-[#C49A3C]/80 uppercase tracking-widest mb-1.5">Por qué estos parámetros</p>
              <p className="text-sm text-slate-600 leading-relaxed">{resultado.explicacion}</p>
            </div>

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
          <a href="https://sjf2.scjn.gob.mx" target="_blank" rel="noopener noreferrer" className="text-[#C49A3C] hover:text-[#E2B865] transition-colors">
            Semanario Judicial de la Federación (SCJN)
          </a>
        </p>
      </div>
    </main>
  )
}
