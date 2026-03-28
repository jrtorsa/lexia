"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

const SEP_BASE   = "https://cedulaprofesional.sep.gob.mx/api"
const SEP_CLIENT = "rnp-angular-app-prod"
const SEP_APIKEY = "65da8s675f8s75fda675s8d76as87d5as675da"

interface SepRecord {
  cedula:           string
  nombre:           string
  primerApellido:   string
  segundoApellido:  string
  profesion:        string
  institucion:      string
  nivelEducativo:   string
  anioRegistro:     string
}

async function getSepToken(): Promise<string> {
  const res = await fetch(`${SEP_BASE}/auth/token`, {
    headers: {
      "X-Client-Id": SEP_CLIENT,
      "X-API-Key":   SEP_APIKEY,
    },
    signal: AbortSignal.timeout(8000),
  })
  if (!res.ok) {
    const body = await res.text().catch(() => "")
    console.error("[SEP] token error", res.status, body)
    throw new Error(`Token SEP error ${res.status}`)
  }
  const data = await res.json()
  if (!data.access_token) {
    console.error("[SEP] token response missing access_token", data)
    throw new Error("Token inválido del SEP")
  }
  return data.access_token
}

export async function verificarCedula(cedula: string): Promise<
  | { ok: true;  nombre: string; carrera: string; institucion: string }
  | { ok: false; error: string }
> {
  const session = await getServerSession(authOptions)
  if (!session) return { ok: false, error: "No autorizado" }

  const num = cedula.trim()
  if (!num || num.length < 5) return { ok: false, error: "Ingresa un número de cédula válido" }

  let records: SepRecord[]

  try {
    const token = await getSepToken()

    const res = await fetch(`${SEP_BASE}/solr/profesionista/consultar/byDetalle`, {
      method: "POST",
      headers: {
        "Content-Type":  "application/json",
        "Authorization": `Bearer ${token}`,
        "X-API-Key":     SEP_APIKEY,
        "Referer":       "https://cedulaprofesional.sep.gob.mx/",
        "Origin":        "https://cedulaprofesional.sep.gob.mx",
      },
      body: JSON.stringify({ numCedula: num }),
      signal: AbortSignal.timeout(10000),
    })

    if (!res.ok) {
      const body = await res.text().catch(() => "")
      console.error("[SEP] Solr error", res.status, body)
      return { ok: false, error: `SEP respondió ${res.status}. Intenta más tarde.` }
    }

    records = await res.json()
  } catch (err) {
    console.error("[SEP] fetch error", err)
    return { ok: false, error: `Error de conexión con el SEP: ${err instanceof Error ? err.message : String(err)}` }
  }

  if (!records || records.length === 0) {
    return { ok: false, error: "Cédula no encontrada en el registro del SEP." }
  }

  const r = records[0]

  await prisma.lawyer.update({
    where: { id: session.user.id },
    data: { isVerified: true, cedula: num },
  })

  revalidatePath("/mi-perfil")
  revalidatePath("/mi-perfil/editar")
  revalidatePath(`/abogados/${session.user.slug}`)

  return {
    ok:          true,
    nombre:      [r.nombre, r.primerApellido, r.segundoApellido].filter(Boolean).join(" "),
    carrera:     r.profesion ?? r.nivelEducativo ?? "Derecho",
    institucion: r.institucion,
  }
}
