import { NextRequest, NextResponse } from 'next/server'

const SYSTEM_PROMPT = `Eres un experto en derecho mexicano especializado en búsqueda de jurisprudencias en el Semanario Judicial de la Federación (SJF). Cuando el usuario describa su caso, responde ÚNICAMENTE con un objeto JSON con esta estructura exacta, sin texto adicional ni backticks:
{
  "palabrasClave": "string (3-6 palabras clave separadas por espacios)",
  "materia": "string (una de: Constitucional, Administrativa, Civil, Penal, Laboral, Fiscal)",
  "tipo": "string (Jurisprudencia o Tesis Aislada)",
  "explicacion": "string (2-3 oraciones explicando por qué esos parámetros)"
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
        max_tokens: 1000,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: caso }],
      }),
    })
  } catch {
    return NextResponse.json({ error: 'No se pudo conectar con el servicio de IA.' }, { status: 502 })
  }

  if (!anthropicRes.ok) {
    const errBody = await anthropicRes.json().catch(() => ({}))
    console.error('[ia-jurisprudencias] Anthropic error:', anthropicRes.status, errBody)
    return NextResponse.json({ error: 'Error en el servicio de IA. Intenta de nuevo.' }, { status: 502 })
  }

  const anthropicData = await anthropicRes.json()
  const raw: string = anthropicData?.content?.[0]?.text ?? ''

  // Strip markdown code fences if present (```json ... ``` or ``` ... ```)
  const text = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim()

  try {
    const result = JSON.parse(text)
    return NextResponse.json(result)
  } catch {
    console.error('[ia-jurisprudencias] JSON parse failed. Raw response:', raw)
    return NextResponse.json({ error: 'La IA devolvió una respuesta inesperada. Intenta de nuevo.' }, { status: 500 })
  }
}
