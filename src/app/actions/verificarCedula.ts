"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

interface SepRecord {
  numero:  string
  nombre:  string
  paterno: string
  materno: string
  desins:  string   // institución
  carrera: string
  tipo:    string
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
    const res = await fetch(
      "https://www.cedulaprofesional.sep.gob.mx/cedula/numCedula.action",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `numero=${encodeURIComponent(num)}`,
        // 8 second timeout
        signal: AbortSignal.timeout(8000),
      },
    )

    if (!res.ok) return { ok: false, error: "El servicio del SEP no está disponible. Intenta más tarde." }

    records = await res.json()
  } catch {
    return { ok: false, error: "No se pudo conectar con el SEP. Verifica tu conexión e intenta de nuevo." }
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
    ok: true,
    nombre:      [r.nombre, r.paterno, r.materno].filter(Boolean).join(" "),
    carrera:     r.carrera,
    institucion: r.desins,
  }
}
