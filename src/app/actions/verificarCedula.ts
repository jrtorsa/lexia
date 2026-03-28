"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { makeToken } from "@/lib/cedula-token"
import { sendCedulaAdminRequest } from "@/lib/email"

export async function verificarCedula(cedula: string): Promise<
  | { ok: true; pending: true }
  | { ok: false; error: string }
> {
  const session = await getServerSession(authOptions)
  if (!session) return { ok: false, error: "No autorizado" }

  const num = cedula.trim()
  if (!num || num.length < 5) return { ok: false, error: "Ingresa un número de cédula válido" }

  const lawyer = await prisma.lawyer.findUnique({
    where: { id: session.user.id },
    select: { id: true, name: true, email: true, cedulaStatus: true },
  })

  if (!lawyer) return { ok: false, error: "Abogado no encontrado" }

  // Save cédula and mark as pending
  await prisma.lawyer.update({
    where: { id: lawyer.id },
    data: { cedula: num, cedulaStatus: "pending", isVerified: false },
  })

  // Build approve/reject URLs
  const base = process.env.NEXTAUTH_URL ?? "https://lexiamx.com"
  const aprobarUrl  = `${base}/api/admin/cedula?id=${lawyer.id}&action=aprobar&token=${makeToken(lawyer.id, "aprobar")}`
  const rechazarUrl = `${base}/api/admin/cedula?id=${lawyer.id}&action=rechazar&token=${makeToken(lawyer.id, "rechazar")}`

  // Email admin (non-blocking)
  sendCedulaAdminRequest({
    lawyerId:    lawyer.id,
    lawyerName:  lawyer.name,
    lawyerEmail: lawyer.email,
    cedula:      num,
    aprobarUrl,
    rechazarUrl,
  }).catch(console.error)

  revalidatePath("/mi-perfil/editar")

  return { ok: true, pending: true }
}
