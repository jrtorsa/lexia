'use client'

import { useState, useMemo } from 'react'
import { Search, Filter, Pencil, Mail, Send, CheckCircle2, AlertCircle, ShieldCheck, XCircle } from 'lucide-react'
import EditLawyerModal, { LawyerRow, PlanBadge, CedulaStatusBadge } from './EditLawyerModal'

type VerifiedFilter = 'all' | 'verified' | 'unverified'
type StatusFilter = 'all' | 'pending' | 'approved' | 'rejected' | 'null'

interface Props {
  lawyers: LawyerRow[]
}

export default function AdminSearch({ lawyers: initial }: Props) {
  const [lawyers, setLawyers] = useState<LawyerRow[]>(initial)
  const [query, setQuery] = useState('')
  const [filterVerified, setFilterVerified] = useState<VerifiedFilter>('all')
  const [filterStatus, setFilterStatus] = useState<StatusFilter>('all')
  const [editingLawyer, setEditingLawyer] = useState<LawyerRow | null>(null)
  const [sendingEmail, setSendingEmail] = useState<string | null>(null) // `${type}-${lawyerId}`
  const [toast, setToast] = useState<{ msg: string; type: 'ok' | 'err' } | null>(null)

  function showToast(msg: string, type: 'ok' | 'err' = 'ok') {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3500)
  }

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    return lawyers.filter(l => {
      const matchQ = !q || [l.name, l.email, l.city, l.cedula ?? ''].some(v =>
        v.toLowerCase().includes(q)
      )
      const matchV =
        filterVerified === 'all' ||
        (filterVerified === 'verified' ? l.isVerified : !l.isVerified)
      const matchS =
        filterStatus === 'all' ||
        (filterStatus === 'null' ? l.cedulaStatus === null : l.cedulaStatus === filterStatus)
      return matchQ && matchV && matchS
    })
  }, [lawyers, query, filterVerified, filterStatus])

  function handleSaved(updates: Partial<LawyerRow> & { id: string }) {
    setLawyers(prev => prev.map(l => l.id === updates.id ? { ...l, ...updates } : l))
    setEditingLawyer(null)
    showToast('Abogado actualizado')
  }

  async function sendEmail(type: 'welcome' | 'reminder', lawyerId: string) {
    const key = `${type}-${lawyerId}`
    setSendingEmail(key)
    const res = await fetch('/api/admin/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, lawyerId }),
    })
    setSendingEmail(null)
    showToast(
      res.ok
        ? type === 'welcome' ? 'Bienvenida enviada' : 'Recordatorio enviado'
        : 'Error al enviar el email',
      res.ok ? 'ok' : 'err'
    )
  }

  const selectClass = 'text-xs border border-[#EAE4D9] rounded-lg px-2.5 py-1.5 text-[#0C0D10]/70 bg-white focus:outline-none focus:border-[#C49A3C] transition-colors'

  return (
    <>
      <div className="bg-white rounded-2xl border border-[#EAE4D9] overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#EAE4D9] flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center gap-2 flex-shrink-0">
            <Filter className="w-4 h-4 text-[#C49A3C]" />
            <h2 className="font-semibold text-[#0C0D10] text-sm">Buscador de abogados</h2>
            <span className="text-[11px] text-[#0C0D10]/40 bg-[#FAF7F2] px-1.5 py-0.5 rounded-full">
              {filtered.length} / {lawyers.length}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:ml-auto">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#0C0D10]/30" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Nombre, email, ciudad, cédula..."
                className="pl-8 pr-3 py-1.5 text-xs border border-[#EAE4D9] rounded-lg text-[#0C0D10] bg-white w-52 focus:outline-none focus:border-[#C49A3C] transition-colors placeholder-[#0C0D10]/30"
              />
            </div>

            {/* Filtro verificado */}
            <select value={filterVerified} onChange={e => setFilterVerified(e.target.value as VerifiedFilter)} className={selectClass}>
              <option value="all">Todos</option>
              <option value="verified">Verificados</option>
              <option value="unverified">No verificados</option>
            </select>

            {/* Filtro cedulaStatus */}
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value as StatusFilter)} className={selectClass}>
              <option value="all">Cualquier status</option>
              <option value="pending">Cédula pendiente</option>
              <option value="approved">Cédula aprobada</option>
              <option value="rejected">Cédula rechazada</option>
              <option value="null">Sin status</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {filtered.length === 0 ? (
            <div className="px-5 py-10 text-center text-sm text-[#0C0D10]/40">
              Sin resultados para &ldquo;{query}&rdquo;
            </div>
          ) : (
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#FAF7F2] text-[#0C0D10]/40 uppercase tracking-wide text-[10px]">
                  <th className="px-4 py-2.5 text-left font-semibold">Nombre</th>
                  <th className="px-4 py-2.5 text-left font-semibold">Email</th>
                  <th className="px-4 py-2.5 text-left font-semibold">Ciudad</th>
                  <th className="px-4 py-2.5 text-left font-semibold">Cédula</th>
                  <th className="px-4 py-2.5 text-left font-semibold">Status cédula</th>
                  <th className="px-4 py-2.5 text-left font-semibold">Plan</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAE4D9]">
                {filtered.map(l => (
                  <tr key={l.id} className="hover:bg-[#FAF7F2]/60 transition-colors">
                    {/* Nombre */}
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium text-[#0C0D10] truncate max-w-[140px]">{l.name}</span>
                        {l.isVerified && <ShieldCheck className="w-3 h-3 text-[#C49A3C] flex-shrink-0" />}
                        {!l.isActive && <span title="Inactivo"><XCircle className="w-3 h-3 text-red-400 flex-shrink-0" /></span>}
                      </div>
                    </td>
                    {/* Email */}
                    <td className="px-4 py-2.5 text-[#0C0D10]/60 truncate max-w-[160px]">{l.email}</td>
                    {/* Ciudad */}
                    <td className="px-4 py-2.5 text-[#0C0D10]/60 whitespace-nowrap">{l.city}, {l.state}</td>
                    {/* Cédula */}
                    <td className="px-4 py-2.5 font-mono text-[#0C0D10]/70">{l.cedula ?? <span className="text-[#0C0D10]/25">—</span>}</td>
                    {/* Status */}
                    <td className="px-4 py-2.5"><CedulaStatusBadge status={l.cedulaStatus} /></td>
                    {/* Plan */}
                    <td className="px-4 py-2.5"><PlanBadge plan={l.plan} /></td>
                    {/* Acciones */}
                    <td className="px-4 py-2.5">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Editar */}
                        <button
                          onClick={() => setEditingLawyer(l)}
                          title="Editar"
                          className="flex items-center gap-1 px-2 py-1 rounded-md bg-[#FAF7F2] hover:bg-[#EAE4D9] text-[#0C0D10]/60 transition-colors"
                        >
                          <Pencil className="w-3 h-3" />
                          <span>Editar</span>
                        </button>
                        {/* Bienvenida */}
                        <button
                          onClick={() => sendEmail('welcome', l.id)}
                          disabled={sendingEmail !== null}
                          title="Enviar bienvenida"
                          className="p-1.5 rounded-md hover:bg-[#FAF7F2] text-[#0C0D10]/40 hover:text-[#C49A3C] transition-colors disabled:opacity-40"
                        >
                          {sendingEmail === `welcome-${l.id}`
                            ? <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
                            : <Mail className="w-3 h-3" />
                          }
                        </button>
                        {/* Recordatorio */}
                        <button
                          onClick={() => sendEmail('reminder', l.id)}
                          disabled={sendingEmail !== null}
                          title="Recordatorio de perfil"
                          className="p-1.5 rounded-md hover:bg-[#FAF7F2] text-[#0C0D10]/40 hover:text-[#C49A3C] transition-colors disabled:opacity-40"
                        >
                          {sendingEmail === `reminder-${l.id}`
                            ? <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
                            : <Send className="w-3 h-3" />
                          }
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal */}
      {editingLawyer && (
        <EditLawyerModal
          lawyer={editingLawyer}
          onClose={() => setEditingLawyer(null)}
          onSaved={handleSaved}
        />
      )}

      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-xl text-sm font-medium ${
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
