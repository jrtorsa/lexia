import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

function isAdmin(email?: string | null) {
  return email && email === process.env.ADMIN_EMAIL
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions)
  if (!isAdmin(session?.user.email)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { id } = await params

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Solicitud inválida' }, { status: 400 })
  }

  const ALLOWED = ['name', 'email', 'phone', 'city', 'state', 'cedula', 'isVerified', 'isActive', 'cedulaStatus'] as const
  const data: Record<string, unknown> = {}

  for (const key of ALLOWED) {
    if (key in body) {
      data[key] = body[key] // null is valid JSON and passes through correctly
    }
  }

  if ('isVerified' in data) data.isVerified = Boolean(data.isVerified)
  if ('isActive' in data)   data.isActive   = Boolean(data.isActive)

  try {
    const updated = await prisma.lawyer.update({
      where: { id },
      data,
      select: {
        id: true, name: true, email: true, phone: true,
        city: true, state: true, cedula: true,
        isVerified: true, isActive: true, cedulaStatus: true,
      },
    })
    return NextResponse.json(updated)
  } catch {
    return NextResponse.json({ error: 'Error al actualizar el abogado' }, { status: 500 })
  }
}
