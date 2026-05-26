import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { sendCedulaRejectedWithReasonEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.email !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  let lawyerId: string, reason: string
  try {
    const body = await request.json()
    lawyerId = String(body.lawyerId ?? '').trim()
    reason   = String(body.reason   ?? '').trim()
  } catch {
    return NextResponse.json({ error: 'Solicitud inválida' }, { status: 400 })
  }

  if (!lawyerId || !reason) {
    return NextResponse.json({ error: 'lawyerId y reason son requeridos' }, { status: 400 })
  }

  const lawyer = await prisma.lawyer.findUnique({
    where: { id: lawyerId },
    select: { name: true, email: true },
  })
  if (!lawyer) return NextResponse.json({ error: 'Abogado no encontrado' }, { status: 404 })

  await prisma.lawyer.update({
    where: { id: lawyerId },
    data: { cedulaStatus: 'rejected', isVerified: false },
  })

  sendCedulaRejectedWithReasonEmail({ to: lawyer.email, name: lawyer.name, reason }).catch(console.error)

  return NextResponse.json({ ok: true })
}
