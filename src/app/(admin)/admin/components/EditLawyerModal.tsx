'use client'

import { useState } from 'react'
import { X, CheckCircle2, AlertCircle, Mail, Send } from 'lucide-react'

export interface LawyerRow {
  id: string
  name: string
  email: string
  phone: string | null
  city: string
  state: string
  cedula: string | null
  isVerified: boolean
  isActive: boolean
  cedulaStatus: string | null
  plan: string
}

interface Props {
  lawyer: LawyerRow
  onClose: () => void
  onSaved: (updates: Partial<LawyerRow> & { id: string }) => void
}

const inputClass =
  'w-full px-3 py-2 text-sm border border-[#EAE4D9] rounded-lg text-[#0C0D10] bg-white placeholder-[#0C0D10]/30 focus:outline-none focus:border-[#C49A3C] focus:ring-1 focus:ring-[rgba(196,154,60,0.2)] transition-colors'

const labelClass = 'block text-[11px] font-semibold text-[#0C0D10]/50 mb-1 tracking-wide uppercase'

export default function EditLawyerModal({ lawyer, onClose, onSaved }: Props) {
  const [form, setForm] = useState({
    name: lawyer.name,
    email: lawyer.email,
    phone: lawyer.phone ?? '',
    city: lawyer.city,
    state: lawyer.state,
    cedula: lawyer.cedula ?? '',
    isVerified: lawyer.isVerified,
    isActive: lawyer.isActive,
    cedulaStatus: lawyer.cedulaStatus ?? '',
  })
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ msg: string; type: 'ok' | 'err' } | null>(null)
  const [sendingEmail, setSendingEmail] = useState<'welcome' | 'reminder' | null>(null)

  function showToast(msg: string, type: 'ok' | 'err' = 'ok') {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3500)
  }

  function set(key: keyof typeof form, value: string | boolean) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    const body = {
      name: form.name,
      email: form.email,
      phone: form.phone || null,
      city: form.city,
      state: form.state,
      cedula: form.cedula || null,
      isVerified: form.isVerified,
      isActive: form.isActive,
      cedulaStatus: form.cedulaStatus === '' ? null : form.cedulaStatus,
    }

    const res = await fetch(`/api/admin/lawyers/${lawyer.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    setSaving(false)

    if (res.ok) {
      const updated = await res.json()
      onSaved({ ...updated, plan: lawyer.plan })
      showToast('Cambios guardados')
    } else {
      showToast('Error al guardar', 'err')
    }
  }

  async function sendEmail(type: 'welcome' | 'reminder') {
    setSendingEmail(type)
    const res = await fetch('/api/admin/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, lawyerId: lawyer.id }),
    })
    setSendingEmail(null)
    showToast(
      res.ok
        ? type === 'welcome' ? 'Email de bienvenida enviado' : 'Recordatorio enviado'
        : 'Error al enviar el email',
      res.ok ? 'ok' : 'err'
    )
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-white rounded-2xl border border-[#EAE4D9] shadow-2xl w-full max-w-lg pointer-events-auto max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 border-b border-[#EAE4D9] flex items-center justify-between flex-shrink-0">
            <div>
              <h2 className="font-semibold text-[#0C0D10] text-base" style={{ fontFamily: 'var(--font-cormorant)' }}>
                Editar abogado
              </h2>
              <p className="text-[11px] text-[#0C0D10]/40 mt-0.5 truncate">{lawyer.email}</p>
            </div>
            <button onClick={onClose} className="text-[#0C0D10]/30 hover:text-[#0C0D10] transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSave} className="overflow-y-auto flex-1">
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className={labelClass}>Nombre completo</label>
                  <input type="text" required value={form.name} onChange={e => set('name', e.target.value)} className={inputClass} />
                </div>
                <div className="col-span-2">
                  <label className={labelClass}>Correo electrónico</label>
                  <input type="email" required value={form.email} onChange={e => set('email', e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Teléfono</label>
                  <input type="text" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="55 1234 5678" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Cédula profesional</label>
                  <input type="text" value={form.cedula} onChange={e => set('cedula', e.target.value)} placeholder="0000000" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Ciudad</label>
                  <input type="text" required value={form.city} onChange={e => set('city', e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Estado</label>
                  <input type="text" required value={form.state} onChange={e => set('state', e.target.value)} className={inputClass} />
                </div>
                <div className="col-span-2">
                  <label className={labelClass}>Status de cédula</label>
                  <select
                    value={form.cedulaStatus}
                    onChange={e => set('cedulaStatus', e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Sin status</option>
                    <option value="pending">Pendiente</option>
                    <option value="approved">Aprobada</option>
                    <option value="rejected">Rechazada</option>
                  </select>
                </div>
              </div>

              {/* Toggles */}
              <div className="flex gap-4 pt-1">
                <Toggle label="Verificado" checked={form.isVerified} onChange={v => set('isVerified', v)} />
                <Toggle label="Activo" checked={form.isActive} onChange={v => set('isActive', v)} />
              </div>

              {/* Plan — read only */}
              <div className="flex items-center gap-2 py-2 px-3 bg-[#FAF7F2] rounded-lg border border-[#EAE4D9]">
                <span className="text-[11px] text-[#0C0D10]/50 uppercase tracking-wide font-semibold">Plan</span>
                <PlanBadge plan={lawyer.plan} />
                <span className="text-[11px] text-[#0C0D10]/35 ml-auto">Solo lectura</span>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 pb-6 space-y-3 flex-shrink-0">
              <button
                type="submit"
                disabled={saving}
                className="w-full bg-[#C49A3C] hover:bg-[#E2B865] disabled:opacity-60 text-[#0C0D10] font-semibold text-sm py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#0C0D10]/30 border-t-[#0C0D10] rounded-full animate-spin" />
                    Guardando...
                  </>
                ) : 'Guardar cambios'}
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  disabled={sendingEmail !== null}
                  onClick={() => sendEmail('welcome')}
                  className="flex items-center justify-center gap-1.5 border border-[#EAE4D9] hover:border-[#C49A3C]/40 hover:bg-[#FAF7F2] text-[#0C0D10]/60 text-xs font-medium py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                  {sendingEmail === 'welcome'
                    ? <div className="w-3.5 h-3.5 border border-[#0C0D10]/30 border-t-[#0C0D10] rounded-full animate-spin" />
                    : <Mail className="w-3.5 h-3.5" />
                  }
                  Bienvenida
                </button>
                <button
                  type="button"
                  disabled={sendingEmail !== null}
                  onClick={() => sendEmail('reminder')}
                  className="flex items-center justify-center gap-1.5 border border-[#EAE4D9] hover:border-[#C49A3C]/40 hover:bg-[#FAF7F2] text-[#0C0D10]/60 text-xs font-medium py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                  {sendingEmail === 'reminder'
                    ? <div className="w-3.5 h-3.5 border border-[#0C0D10]/30 border-t-[#0C0D10] rounded-full animate-spin" />
                    : <Send className="w-3.5 h-3.5" />
                  }
                  Recordatorio
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-xl text-sm font-medium ${
            toast.type === 'ok' ? 'bg-[#0C0D10] text-white' : 'bg-red-600 text-white'
          }`}
        >
          {toast.type === 'ok'
            ? <CheckCircle2 className="w-4 h-4 text-[#C49A3C]" />
            : <AlertCircle className="w-4 h-4" />
          }
          {toast.msg}
        </div>
      )}
    </>
  )
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer select-none">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative w-10 h-5.5 rounded-full transition-colors flex-shrink-0 ${checked ? 'bg-[#C49A3C]' : 'bg-[#EAE4D9]'}`}
        style={{ height: '22px', width: '40px' }}
      >
        <span
          className={`absolute top-0.5 w-4.5 h-4.5 rounded-full bg-white shadow-sm transition-transform ${checked ? 'translate-x-5' : 'translate-x-0.5'}`}
          style={{ width: '18px', height: '18px' }}
        />
      </button>
      <span className="text-sm text-[#0C0D10]/70">{label}</span>
    </label>
  )
}

export function PlanBadge({ plan }: { plan: string }) {
  if (plan === 'Premium')
    return <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium bg-[rgba(196,154,60,0.12)] text-[#C49A3C]">Premium</span>
  if (plan === 'Despacho')
    return <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium bg-violet-50 text-violet-600">Despacho</span>
  if (plan === 'Básico')
    return <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium bg-blue-50 text-blue-600">Básico</span>
  return <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium bg-[#F5F0E8] text-[#0C0D10]/40">Sin plan</span>
}

export function CedulaStatusBadge({ status }: { status: string | null }) {
  if (status === 'approved')
    return <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium bg-emerald-50 text-emerald-700">Aprobada</span>
  if (status === 'pending')
    return <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium bg-amber-50 text-amber-700">Pendiente</span>
  if (status === 'rejected')
    return <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium bg-red-50 text-red-600">Rechazada</span>
  return <span className="text-[10px] text-[#0C0D10]/30">—</span>
}
