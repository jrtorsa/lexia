import { NextResponse } from "next/server"

export const preferredRegion = ["gru1"] // São Paulo — closest to Mexico on Vercel
export const maxDuration = 30

const SEP_BASE   = "https://cedulaprofesional.sep.gob.mx/api"
const SEP_CLIENT = "rnp-angular-app-prod"
const SEP_APIKEY = "65da8s675f8s75fda675s8d76as87d5as675da"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const cedula = searchParams.get("cedula") ?? "6545070"

  const steps: Record<string, unknown> = {}

  // Step 1: Get token
  try {
    const tokenRes = await fetch(`${SEP_BASE}/auth/token`, {
      headers: { "X-Client-Id": SEP_CLIENT, "X-API-Key": SEP_APIKEY },
      signal: AbortSignal.timeout(20000),
    })
    const tokenBody = await tokenRes.text()
    steps.token_status = tokenRes.status
    steps.token_ok = tokenRes.ok
    steps.token_body = tokenBody.slice(0, 300)

    if (!tokenRes.ok) {
      return NextResponse.json({ steps, error: "Token request failed" })
    }

    const tokenData = JSON.parse(tokenBody)
    const token = tokenData.access_token
    steps.token_received = !!token

    // Step 2: Query cedula
    const solrRes = await fetch(`${SEP_BASE}/solr/profesionista/consultar/byDetalle`, {
      method: "POST",
      headers: {
        "Content-Type":  "application/json",
        "Authorization": `Bearer ${token}`,
        "X-API-Key":     SEP_APIKEY,
        "Referer":       "https://cedulaprofesional.sep.gob.mx/",
        "Origin":        "https://cedulaprofesional.sep.gob.mx",
      },
      body: JSON.stringify({ numCedula: cedula }),
      signal: AbortSignal.timeout(20000),
    })

    const solrBody = await solrRes.text()
    steps.solr_status = solrRes.status
    steps.solr_ok = solrRes.ok
    steps.solr_body = solrBody.slice(0, 500)

    return NextResponse.json({ steps, cedula })
  } catch (err) {
    steps.exception = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ steps, error: "Exception thrown" }, { status: 500 })
  }
}
