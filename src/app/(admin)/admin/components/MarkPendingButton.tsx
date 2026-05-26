'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Clock } from 'lucide-react'

export function MarkPendingButton({ lawyerId }: { lawyerId: string }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleClick() {
    setLoading(true)
    const res = await fetch(`/api/admin/lawyers/${lawyerId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cedulaStatus: 'pending' }),
    })
    setLoading(false)
    if (res.ok) router.refresh()
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="flex items-center justify-center gap-1 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 text-[11px] font-medium hover:bg-amber-100 transition-colors disabled:opacity-50 w-full"
    >
      <Clock className="w-3 h-3 flex-shrink-0" />
      {loading ? 'Guardando...' : 'Marcar pendiente'}
    </button>
  )
}
