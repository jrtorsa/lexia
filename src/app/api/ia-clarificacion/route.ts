import { NextRequest, NextResponse } from 'next/server'

const SYSTEM_PROMPT = `Eres un asistente legal mexicano. El usuario escribió un término muy corto para buscar jurisprudencia. Tu tarea es hacer 2 preguntas cortas y específicas para entender mejor su caso y poder buscar criterios relevantes en el SJF.

Responde ÚNICAMENTE con JSON sin backticks:
{
  "intro": "string (una oración reconociendo el tema, ej: Veo que buscas sobre horas extra.)",
  "preguntas": [
    "string (pregunta 1, máximo 15 palabras)",
    "string (pregunta 2, máximo 15 palabras)"
  ]
}`

export async function POST(request: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Servicio de IA no configurado.' }, { status: 503 })
  }

  let caso: string
  try {
    const body = await request.json()
    caso = String(body.caso ?? '').trim()
  } catch {
    return NextResponse.json({ error: 'Solicitud inválida.' }, { status: 400 })
  }

  if (!caso) {
    return NextResponse.json({ error: 'El campo caso es requerido.' }, { status: 400 })
  }

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
        max_tokens: 300,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: caso }],
      }),
    })
  } catch {
    return NextResponse.json({ error: 'No se pudo conectar con el servicio de IA.' }, { status: 502 })
  }

  if (!anthropicRes.ok) {
    const errBody = await anthropicRes.json().catch(() => ({}))
    console.error('[ia-clarificacion] Anthropic error:', anthropicRes.status, errBody)
    return NextResponse.json({ error: 'Error en el servicio de IA.' }, { status: 502 })
  }

  const data = await anthropicRes.json()
  const raw: string = data?.content?.[0]?.text ?? ''
  const text = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim()

  try {
    return NextResponse.json(JSON.parse(text))
  } catch {
    console.error('[ia-clarificacion] JSON parse failed. Raw:', raw)
    return NextResponse.json({ error: 'Respuesta inesperada de la IA.' }, { status: 500 })
  }
}
