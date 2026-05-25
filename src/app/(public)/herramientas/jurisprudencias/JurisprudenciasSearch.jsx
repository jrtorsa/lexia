'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, ExternalLink, ChevronRight, BookOpen, Info } from 'lucide-react'

const df = { fontFamily: 'var(--font-cormorant)' }

const MATERIAS = [
  { label: 'Todas las materias', value: '' },
  { label: 'Constitucional',     value: '1' },
  { label: 'Administrativa',     value: '2' },
  { label: 'Civil',              value: '3' },
  { label: 'Penal',              value: '4' },
  { label: 'Laboral',            value: '5' },
  { label: 'Fiscal',             value: '7' },
]

const TIPOS = [
  { label: 'Jurisprudencias y Tesis Aisladas', value: '' },
  { label: 'Jurisprudencia',                   value: '1' },
  { label: 'Tesis Aislada',                    value: '2' },
]

const EPOCAS = [
  { label: 'Todas las épocas', value: '' },
  { label: '11a Época',        value: '11' },
  { label: '10a Época',        value: '10' },
  { label: '9a Época',         value: '9' },
]

const selectClass =
  'w-full px-3.5 py-2.5 border border-[#EAE4D9] rounded-lg text-sm text-[#0C0D10] ' +
  'focus:outline-none focus:border-[#C49A3C] focus:ring-1 focus:ring-[rgba(196,154,60,0.2)] ' +
  'transition-colors bg-white'

export default function JurisprudenciasSearch() {
  const [query,   setQuery]   = useState('')
  const [materia, setMateria] = useState('')
  const [tipo,    setTipo]    = useState('')
  const [epoca,   setEpoca]   = useState('')

  function handleBuscar(e) {
    e.preventDefault()
    if (!query.trim()) return

    const params = new URLSearchParams()
    params.set('searchField', query.trim())
    if (tipo)    params.set('tipoTesis', tipo)
    if (materia) params.set('materia',   materia)
    if (epoca)   params.set('epoca',     epoca)

    window.open(
      `https://sjf2.scjn.gob.mx/busqueda-principal-tesis?${params.toString()}`,
      '_blank',
      'noopener,noreferrer'
    )
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
            Consulta tesis y jurisprudencias del Semanario Judicial de la Federación
            directamente desde Lexia.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-12">
        <div className="bg-white border border-[#EAE4D9] rounded-2xl p-7 shadow-sm">
          <form onSubmit={handleBuscar} className="space-y-5">

            {/* Search input */}
            <div>
              <label className="text-xs font-semibold text-[#0C0D10]/60 uppercase tracking-widest block mb-1.5">
                Palabras clave *
              </label>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0C0D10]/30 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder='Ej: "derecho a la salud", "presunción de inocencia"'
                  className={
                    'w-full pl-10 pr-4 py-3 border border-[#EAE4D9] rounded-xl text-sm text-[#0C0D10] ' +
                    'placeholder-slate-300 focus:outline-none focus:border-[#C49A3C] ' +
                    'focus:ring-1 focus:ring-[rgba(196,154,60,0.2)] transition-colors'
                  }
                />
              </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#0C0D10]/60 uppercase tracking-widest block mb-1.5">
                  Materia
                </label>
                <select value={materia} onChange={(e) => setMateria(e.target.value)} className={selectClass}>
                  {MATERIAS.map((m) => (
                    <option key={m.value} value={m.value}>{m.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#0C0D10]/60 uppercase tracking-widest block mb-1.5">
                  Tipo
                </label>
                <select value={tipo} onChange={(e) => setTipo(e.target.value)} className={selectClass}>
                  {TIPOS.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#0C0D10]/60 uppercase tracking-widest block mb-1.5">
                  Época
                </label>
                <select value={epoca} onChange={(e) => setEpoca(e.target.value)} className={selectClass}>
                  {EPOCAS.map((ep) => (
                    <option key={ep.value} value={ep.value}>{ep.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#C49A3C] hover:bg-[#E2B865] text-[#0C0D10] font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <Search className="w-4 h-4" />
              Buscar en el SJF
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </button>
          </form>
        </div>

        {/* Footer note */}
        <div className="flex items-start gap-2 mt-5 justify-center">
          <Info className="w-3.5 h-3.5 text-[#0C0D10]/30 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-[#0C0D10]/40 text-center">
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
      </div>
    </main>
  )
}
