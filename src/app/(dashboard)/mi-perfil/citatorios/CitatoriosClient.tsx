'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { CalendarDays, Plus, X, Upload, Sparkles, Calendar, Building2, FileText, Clock, Trash2, CheckCircle2, AlertCircle, Users } from 'lucide-react'

interface Citatorio {
  id: string
  titulo: string
  expediente: string | null
  juzgado: string | null
  actor: string | null
  demandado: string | null
  fecha: string
  notas: string | null
  googleEventId: string | null
  createdAt: string
}

interface FormState {
  titulo: string
  expediente: string
  juzgado: string
  actor: string
  demandado: string
  fecha: string
  notas: string
}

const EMPTY_FORM: FormState = { titulo: '', expediente: '', juzgado: '', actor: '', demandado: '', fecha: '', notas: '' }

function getDateStatus(iso: string): 'today' | 'upcoming' | 'past' {
  const d = new Date(iso)
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const dDay = new Date(d.getFullYear(), d.getMonth(), d.getDate())
  if (dDay.getTime() === today.getTime()) return 'today'
  if (d > now) return 'upcoming'
  return 'past'
}

function getDayMonth(iso: string) {
  const d = new Date(iso)
  return {
    day: new Intl.DateTimeFormat('es-MX', { day: '2-digit', timeZone: 'America/Mexico_City' }).format(d),
    month: new Intl.DateTimeFormat('es-MX', { month: 'short', timeZone: 'America/Mexico_City' }).format(d).toUpperCase(),
    time: new Intl.DateTimeFormat('es-MX', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Mexico_City' }).format(d),
  }
}

export default function CitatoriosClient({ hasGoogle }: { hasGoogle: boolean }) {
  const [citatorios, setCitatorios] = useState<Citatorio[]>([])
  const [loading, setLoading] = useState(true)
  const [panelOpen, setPanelOpen] = useState(false)
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ msg: string; type: 'ok' | 'err' } | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const showToast = (msg: string, type: 'ok' | 'err' = 'ok') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 4000)
  }

  const loadCitatorios = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/citatorios')
      if (res.ok) setCitatorios(await res.json())
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { loadCitatorios() }, [loadCitatorios])

  // Lock body scroll when panel is open
  useEffect(() => {
    document.body.style.overflow = panelOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [panelOpen])

  function handleFileChange(file: File | null) {
    if (!file) return
    setImageFile(file)
    const reader = new FileReader()
    reader.onload = (e) => setImagePreview(e.target?.result as string)
    reader.readAsDataURL(file)
  }

  async function analyzeImage() {
    if (!imageFile) return
    setAnalyzing(true)
    try {
      const reader = new FileReader()
      reader.onload = async (e) => {
        const dataUrl = e.target?.result as string
        const base64 = dataUrl.split(',')[1]
        const mediaType = imageFile.type || 'image/jpeg'

        const res = await fetch('/api/ia-citatorio', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageBase64: base64, mediaType }),
        })

        if (res.ok) {
          const data = await res.json()
          setForm(prev => ({
            titulo: data.titulo || prev.titulo,
            expediente: data.expediente || prev.expediente,
            juzgado: data.juzgado || prev.juzgado,
            actor: data.actor || prev.actor,
            demandado: data.demandado || prev.demandado,
            fecha: prev.fecha,
            notas: data.notas || prev.notas,
          }))
          showToast('Datos extraídos del citatorio')
        } else {
          showToast('No se pudo analizar la imagen', 'err')
        }
        setAnalyzing(false)
      }
      reader.readAsDataURL(imageFile)
    } catch {
      showToast('Error al analizar la imagen', 'err')
      setAnalyzing(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.titulo || !form.fecha) return
    setSaving(true)

    const res = await fetch('/api/citatorios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    setSaving(false)
    if (res.ok) {
      const saved: Citatorio = await res.json()
      showToast(saved.googleEventId ? 'Citatorio guardado y agregado a Google Calendar' : 'Citatorio guardado')
      setCitatorios(prev => [...prev, saved].sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()))
      closePanel()
    } else {
      showToast('Error al guardar el citatorio', 'err')
    }
  }

  async function handleDelete(id: string) {
    setDeletingId(id)
    const res = await fetch(`/api/citatorios?id=${id}`, { method: 'DELETE' })
    setDeletingId(null)
    if (res.ok) {
      setCitatorios(prev => prev.filter(c => c.id !== id))
      showToast('Citatorio eliminado')
    } else {
      showToast('Error al eliminar', 'err')
    }
  }

  function closePanel() {
    setPanelOpen(false)
    setForm(EMPTY_FORM)
    setImageFile(null)
    setImagePreview(null)
  }

  const upcoming = citatorios.filter(c => getDateStatus(c.fecha) !== 'past')
  const past = citatorios.filter(c => getDateStatus(c.fecha) === 'past')

  return (
    <div className="p-4 sm:p-8 relative">
      {/* Header */}
      <div className="flex items-start sm:items-center justify-between gap-3 mb-6 sm:mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-[#0C0D10]" style={{ fontFamily: 'var(--font-cormorant)' }}>
            Mis Citatorios
          </h1>
          <p className="text-sm text-[#0C0D10]/50 mt-0.5">
            Audiencias y diligencias judiciales
          </p>
        </div>
        <button
          onClick={() => setPanelOpen(true)}
          className="flex items-center gap-2 bg-[#C49A3C] hover:bg-[#E2B865] text-[#0C0D10] text-sm font-semibold px-3 sm:px-4 py-2.5 rounded-lg transition-colors flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Nuevo citatorio</span>
          <span className="sm:hidden">Nuevo</span>
        </button>
      </div>

      {/* Google Calendar notice */}
      {!hasGoogle && (
        <div className="mb-6 flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-amber-900">Conecta Google Calendar</p>
            <p className="text-xs text-amber-700 mt-0.5">
              Inicia sesión con Google para sincronizar tus citatorios automáticamente.
            </p>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 border-2 border-[#C49A3C]/30 border-t-[#C49A3C] rounded-full animate-spin" />
        </div>
      ) : citatorios.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#C49A3C]/10 flex items-center justify-center mb-4">
            <CalendarDays className="w-8 h-8 text-[#C49A3C]/60" />
          </div>
          <p className="text-[#0C0D10]/60 text-sm">No tienes citatorios registrados.</p>
          <button
            onClick={() => setPanelOpen(true)}
            className="mt-4 text-sm text-[#C49A3C] hover:text-[#E2B865] font-medium transition-colors"
          >
            Agregar el primero →
          </button>
        </div>
      ) : (
        <div className="space-y-10">
          {upcoming.length > 0 && (
            <section>
              <h2 className="text-xs font-semibold tracking-widest uppercase text-[#0C0D10]/40 mb-4">
                Próximas ({upcoming.length})
              </h2>
              <div className="space-y-3">
                {upcoming.map(c => (
                  <CitatorioCard key={c.id} citatorio={c} onDelete={handleDelete} deletingId={deletingId} />
                ))}
              </div>
            </section>
          )}
          {past.length > 0 && (
            <section>
              <h2 className="text-xs font-semibold tracking-widest uppercase text-[#0C0D10]/40 mb-4">
                Pasadas ({past.length})
              </h2>
              <div className="space-y-3 opacity-60">
                {past.slice().reverse().map(c => (
                  <CitatorioCard key={c.id} citatorio={c} onDelete={handleDelete} deletingId={deletingId} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {/* Slide-over panel — full screen on mobile, max-lg on desktop */}
      {panelOpen && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40 backdrop-blur-sm" onClick={closePanel} />
          <div className="fixed inset-0 sm:inset-y-0 sm:right-0 sm:left-auto sm:w-full sm:max-w-lg bg-white z-50 shadow-2xl flex flex-col overflow-x-hidden">
            {/* Panel header */}
            <div className="p-4 sm:p-6 border-b border-[#EAE4D9] flex items-center justify-between flex-shrink-0">
              <h2 className="text-lg font-semibold text-[#0C0D10]" style={{ fontFamily: 'var(--font-cormorant)' }}>
                Nuevo citatorio
              </h2>
              <button onClick={closePanel} className="text-[#0C0D10]/40 hover:text-[#0C0D10] transition-colors p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Panel body — scrollable */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
              <div className="p-4 sm:p-6 space-y-5">
                {/* Image upload */}
                <div>
                  <label className="block text-xs font-semibold text-[#0C0D10]/60 mb-2 tracking-wide uppercase">
                    Imagen del citatorio (opcional)
                  </label>
                  {imagePreview ? (
                    <div className="relative">
                      <img src={imagePreview} alt="preview" className="w-full h-40 sm:h-48 object-cover rounded-lg border border-[#EAE4D9]" />
                      <button
                        type="button"
                        onClick={() => { setImageFile(null); setImagePreview(null) }}
                        className="absolute top-2 right-2 bg-white/90 hover:bg-white text-[#0C0D10] rounded-full p-1 shadow-sm transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={analyzeImage}
                        disabled={analyzing}
                        className="mt-2 w-full flex items-center justify-center gap-2 bg-[#0C0D10] hover:bg-[#1A1C26] disabled:opacity-60 text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
                      >
                        {analyzing ? (
                          <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Analizando...</>
                        ) : (
                          <><Sparkles className="w-4 h-4" />Analizar con IA</>
                        )}
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="w-full border-2 border-dashed border-[#EAE4D9] hover:border-[#C49A3C]/40 rounded-xl py-6 sm:py-8 flex flex-col items-center gap-2 text-[#0C0D10]/40 hover:text-[#0C0D10]/60 transition-colors"
                    >
                      <Upload className="w-6 h-6" />
                      <span className="text-sm">Subir foto del citatorio</span>
                      <span className="text-xs">JPG, PNG, WebP</span>
                    </button>
                  )}
                  <input ref={fileRef} type="file" accept="image/*" className="hidden"
                    onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)} />
                </div>

                <hr className="border-[#EAE4D9]" />

                <Field label="Título / Tipo de audiencia" required icon={<FileText className="w-3.5 h-3.5" />}>
                  <input type="text" required value={form.titulo}
                    onChange={(e) => setForm(p => ({ ...p, titulo: e.target.value }))}
                    placeholder="Ej: Audiencia Preliminar, Desahogo de Pruebas"
                    className={inputClass} />
                </Field>

                <Field label="Fecha y hora" required icon={<Clock className="w-3.5 h-3.5" />}>
                  <input type="datetime-local" required value={form.fecha}
                    onChange={(e) => setForm(p => ({ ...p, fecha: e.target.value }))}
                    className={inputClass + ' max-w-full'} />
                </Field>

                <Field label="Juzgado / Tribunal" icon={<Building2 className="w-3.5 h-3.5" />}>
                  <input type="text" value={form.juzgado}
                    onChange={(e) => setForm(p => ({ ...p, juzgado: e.target.value }))}
                    placeholder="Ej: Juzgado 3 de Distrito en Materia Laboral"
                    className={inputClass} />
                </Field>

                <Field label="Número de expediente" icon={<Calendar className="w-3.5 h-3.5" />}>
                  <input type="text" value={form.expediente}
                    onChange={(e) => setForm(p => ({ ...p, expediente: e.target.value }))}
                    placeholder="Ej: 123/2024"
                    className={inputClass} />
                </Field>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Actor(a)">
                    <input type="text" value={form.actor}
                      onChange={(e) => setForm(p => ({ ...p, actor: e.target.value }))}
                      placeholder="Nombre del actor"
                      className={inputClass} />
                  </Field>
                  <Field label="Demandado(a)">
                    <input type="text" value={form.demandado}
                      onChange={(e) => setForm(p => ({ ...p, demandado: e.target.value }))}
                      placeholder="Nombre del demandado"
                      className={inputClass} />
                  </Field>
                </div>

                <Field label="Notas adicionales">
                  <textarea value={form.notas}
                    onChange={(e) => setForm(p => ({ ...p, notas: e.target.value }))}
                    placeholder="Sala, partes, prevenciones, domicilio..."
                    rows={3} className={inputClass + ' resize-none'} />
                </Field>

                {hasGoogle && (
                  <p className="flex items-center gap-1.5 text-xs text-[#0C0D10]/45">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                    Se creará un evento en tu Google Calendar automáticamente
                  </p>
                )}
              </div>

              {/* Sticky submit */}
              <div className="sticky bottom-0 p-4 sm:p-6 bg-white border-t border-[#EAE4D9]">
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full bg-[#C49A3C] hover:bg-[#E2B865] disabled:opacity-60 text-[#0C0D10] font-semibold text-sm py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <><div className="w-4 h-4 border-2 border-[#0C0D10]/30 border-t-[#0C0D10] rounded-full animate-spin" />Guardando...</>
                  ) : 'Guardar citatorio'}
                </button>
              </div>
            </form>
          </div>
        </>
      )}

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:w-auto z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg text-sm font-medium ${
          toast.type === 'ok' ? 'bg-[#0C0D10] text-white' : 'bg-red-600 text-white'
        }`}>
          {toast.type === 'ok' ? <CheckCircle2 className="w-4 h-4 text-[#C49A3C]" /> : <AlertCircle className="w-4 h-4" />}
          {toast.msg}
        </div>
      )}
    </div>
  )
}

const inputClass =
  'w-full px-3.5 py-2.5 text-sm border border-[#EAE4D9] rounded-lg text-[#0C0D10] bg-white placeholder-[#0C0D10]/30 focus:outline-none focus:border-[#C49A3C] focus:ring-1 focus:ring-[rgba(196,154,60,0.2)] transition-colors'

function Field({ label, required, icon, children }: {
  label: string; required?: boolean; icon?: React.ReactNode; children: React.ReactNode
}) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs font-semibold text-[#0C0D10]/60 mb-1.5 tracking-wide uppercase">
        {icon}{label}{required && <span className="text-[#C49A3C]">*</span>}
      </label>
      {children}
    </div>
  )
}

function CitatorioCard({ citatorio, onDelete, deletingId }: {
  citatorio: Citatorio
  onDelete: (id: string) => void
  deletingId: string | null
}) {
  const status = getDateStatus(citatorio.fecha)
  const { day, month, time } = getDayMonth(citatorio.fecha)

  const statusColors = {
    today:    'bg-green-500 text-white',
    upcoming: 'bg-[#C49A3C] text-[#0C0D10]',
    past:     'bg-[#0C0D10]/8 text-[#0C0D10]/50',
  }
  const cardBorder = {
    today:    'border-green-200 bg-green-50/50',
    upcoming: 'border-[#EAE4D9] bg-white',
    past:     'border-[#EAE4D9] bg-white',
  }

  return (
    <div className={`flex gap-3 sm:gap-4 border rounded-xl p-3 sm:p-4 group transition-colors ${cardBorder[status]}`}>
      {/* Date badge */}
      <div className={`flex flex-col items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex-shrink-0 font-semibold ${statusColors[status]}`}>
        <span className="text-lg sm:text-xl leading-none">{day}</span>
        <span className="text-[9px] sm:text-[10px] tracking-wider mt-0.5">{month}</span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="font-medium text-[#0C0D10] text-sm truncate">{citatorio.titulo}</p>
            <p className="text-xs text-[#0C0D10]/50 mt-0.5">{time}h</p>
          </div>
          {/* Delete — always visible on touch, hover-only on desktop */}
          <button
            onClick={() => onDelete(citatorio.id)}
            disabled={deletingId === citatorio.id}
            className="text-[#0C0D10]/30 hover:text-red-500 transition-all flex-shrink-0 disabled:opacity-30 sm:opacity-0 sm:group-hover:opacity-100 p-1 -m-1"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3 mt-2">
          {citatorio.juzgado && (
            <span className="flex items-center gap-1 text-xs text-[#0C0D10]/50">
              <Building2 className="w-3 h-3 flex-shrink-0" />
              <span className="truncate max-w-[160px] sm:max-w-none">{citatorio.juzgado}</span>
            </span>
          )}
          {citatorio.expediente && (
            <span className="flex items-center gap-1 text-xs text-[#0C0D10]/50">
              <FileText className="w-3 h-3 flex-shrink-0" />{citatorio.expediente}
            </span>
          )}
          {citatorio.googleEventId && (
            <span className="flex items-center gap-1 text-xs text-green-600">
              <CheckCircle2 className="w-3 h-3" />En Calendar
            </span>
          )}
        </div>
        {(citatorio.actor || citatorio.demandado) && (
          <div className="flex items-start gap-1 mt-1.5">
            <Users className="w-3 h-3 text-[#0C0D10]/35 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-[#0C0D10]/45 line-clamp-1">
              {[citatorio.actor && `Actor: ${citatorio.actor}`, citatorio.demandado && `Dem: ${citatorio.demandado}`].filter(Boolean).join(' · ')}
            </p>
          </div>
        )}
        {citatorio.notas && (
          <p className="text-xs text-[#0C0D10]/40 mt-1 line-clamp-1">{citatorio.notas}</p>
        )}
      </div>
    </div>
  )
}
