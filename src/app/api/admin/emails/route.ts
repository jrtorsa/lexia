import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { sendWelcomeEmail, sendProfileReminderEmail } from '@/lib/email'

function isAdmin(email?: string | null) {
  return email && email === process.env.ADMIN_EMAIL
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!isAdmin(session?.user.email)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  let body: { type?: string; lawyerId?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Solicitud inválida' }, { status: 400 })
  }

  const { type, lawyerId } = body
  if (!type || !lawyerId) {
    return NextResponse.json({ error: 'type y lawyerId son requeridos' }, { status: 400 })
  }

  const lawyer = await prisma.lawyer.findUnique({
    where: { id: lawyerId },
    select: { name: true, email: true },
  })
  if (!lawyer) {
    return NextResponse.json({ error: 'Abogado no encontrado' }, { status: 404 })
  }

  try {
    if (type === 'welcome') {
      await sendWelcomeEmail({ to: lawyer.email, name: lawyer.name })
    } else if (type === 'reminder') {
      await sendProfileReminderEmail({ to: lawyer.email, name: lawyer.name })
    } else {
      return NextResponse.json({ error: 'Tipo de email inválido' }, { status: 400 })
    }
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Error al enviar el email' }, { status: 500 })
  }
}
