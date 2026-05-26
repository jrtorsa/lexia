import { NextRequest, NextResponse } from 'next/server'

const SYSTEM_PROMPT = `Eres un asistente legal mexicano. Analiza esta imagen de un citatorio o notificación judicial y extrae la información relevante. Responde ÚNICAMENTE con JSON sin backticks:
{
  "titulo": "string (tipo de audiencia o acto procesal, ej: Audiencia Preliminar, Desahogo de Pruebas, Junta de Conciliación)",
  "expediente": "string o null (número de expediente si aparece)",
  "juzgado": "string o null (nombre completo del juzgado, tribunal o sala)",
  "fecha": "string o null (fecha y hora tal como aparece en el documento)",
  "notas": "string o null (información adicional: sala, partes, domicilio, prevenciones)"
}`

export async function POST(request: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return NextResponse.json({ error: 'Servicio de IA no configurado.' }, { status: 503 })

  let imageBase64: string
  let mediaType: string
  try {
    const body = await request.json()
    imageBase64 = String(body.imageBase64 ?? '')
    mediaType = String(body.mediaType ?? 'image/jpeg')
  } catch {
    return NextResponse.json({ error: 'Solicitud inválida.' }, { status: 400 })
  }

  if (!imageBase64) return NextResponse.json({ error: 'Imagen requerida.' }, { status: 400 })

  let anthropicRes: Response
  try {
    anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 600,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image',
                source: { type: 'base64', media_type: mediaType, data: imageBase64 },
              },
              { type: 'text', text: 'Analiza este citatorio y extrae los datos.' },
            ],
          },
        ],
      }),
    })
  } catch {
    return NextResponse.json({ error: 'No se pudo conectar con el servicio de IA.' }, { status: 502 })
  }

  if (!anthropicRes.ok) {
    const errBody = await anthropicRes.json().catch(() => ({}))
    console.error('[ia-citatorio] Anthropic error:', anthropicRes.status, errBody)
    return NextResponse.json({ error: 'Error en el servicio de IA.' }, { status: 502 })
  }

  const data = await anthropicRes.json()
  const raw: string = data?.content?.[0]?.text ?? ''
  const text = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim()

  try {
    return NextResponse.json(JSON.parse(text))
  } catch {
    console.error('[ia-citatorio] JSON parse failed. Raw:', raw)
    return NextResponse.json({ error: 'No se pudo leer la imagen. Intenta de nuevo.' }, { status: 500 })
  }
}
