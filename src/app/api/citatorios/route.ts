import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const citatorios = await prisma.citatorio.findMany({
    where: { lawyerId: session.user.id },
    orderBy: { fecha: 'asc' },
  })

  return NextResponse.json(citatorios)
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  let body: { titulo?: string; expediente?: string; juzgado?: string; fecha?: string; notas?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Solicitud inválida.' }, { status: 400 })
  }

  const { titulo, expediente, juzgado, fecha, notas } = body
  if (!titulo || !fecha) {
    return NextResponse.json({ error: 'Título y fecha son requeridos.' }, { status: 400 })
  }

  const citatorio = await prisma.citatorio.create({
    data: {
      lawyerId: session.user.id,
      titulo,
      expediente: expediente || null,
      juzgado: juzgado || null,
      fecha: new Date(fecha),
      notas: notas || null,
    },
  })

  // Attempt Google Calendar event if lawyer has token
  let googleEventId: string | null = null
  const token = session.user.googleAccessToken

  if (token) {
    try {
      const start = new Date(fecha)
      const end = new Date(start.getTime() + 60 * 60 * 1000)

      const description = [
        expediente && `Expediente: ${expediente}`,
        juzgado && `Juzgado: ${juzgado}`,
        notas,
      ].filter(Boolean).join('\n')

      const calRes = await fetch(
        'https://www.googleapis.com/calendar/v3/calendars/primary/events',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            summary: titulo,
            description,
            start: { dateTime: start.toISOString(), timeZone: 'America/Mexico_City' },
            end: { dateTime: end.toISOString(), timeZone: 'America/Mexico_City' },
            reminders: {
              useDefault: false,
              overrides: [
                { method: 'email', minutes: 1440 },
                { method: 'popup', minutes: 60 },
              ],
            },
          }),
        }
      )

      if (calRes.ok) {
        const event = await calRes.json()
        googleEventId = event.id
        await prisma.citatorio.update({
          where: { id: citatorio.id },
          data: { googleEventId },
        })
      } else {
        console.error('[citatorios] Calendar API error:', calRes.status, await calRes.text())
      }
    } catch (err) {
      console.error('[citatorios] Calendar error:', err)
    }
  }

  return NextResponse.json({ ...citatorio, googleEventId })
}

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'ID requerido.' }, { status: 400 })

  const citatorio = await prisma.citatorio.findUnique({ where: { id } })
  if (!citatorio || citatorio.lawyerId !== session.user.id) {
    return NextResponse.json({ error: 'No encontrado.' }, { status: 404 })
  }

  // Delete Google Calendar event if present
  const token = session.user.googleAccessToken
  if (token && citatorio.googleEventId) {
    await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events/${citatorio.googleEventId}`,
      { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } }
    ).catch(() => {})
  }

  await prisma.citatorio.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
