"use server"

import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { makeToken } from "@/lib/cedula-token"
import { sendCedulaAdminRequest } from "@/lib/email"

function toSlug(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
}

export async function actualizarPerfil(data: {
  name: string
  bio: string
  cedula: string
  yearsExperience: string
  university: string
  graduationYear: string
  state: string
  city: string
  phone: string
  whatsapp: string
  website: string
  linkedin: string
  specialties: string[]
}) {
  const session = await getServerSession(authOptions)
  if (!session) return { error: "No autorizado" }

  const lawyerId = session.user.id
  const newCedula = data.cedula?.trim() || undefined

  try {
  // Check if cedula changed and needs verification
  let cedulaStatusUpdate: { cedulaStatus: string; isVerified: boolean } | undefined
  if (newCedula) {
    const current = await prisma.lawyer.findUnique({
      where: { id: lawyerId },
      select: { cedula: true, cedulaStatus: true, name: true, email: true },
    })
    const cedulaChanged = current?.cedula !== newCedula
    const notVerified = current?.cedulaStatus !== "approved"
    if (cedulaChanged || notVerified) {
      cedulaStatusUpdate = { cedulaStatus: "pending", isVerified: false }
      const base = process.env.NEXTAUTH_URL ?? "https://lexiamx.com"
      sendCedulaAdminRequest({
        lawyerId,
        lawyerName: current!.name,
        lawyerEmail: current!.email,
        cedula: newCedula,
        aprobarUrl:  `${base}/api/admin/cedula?id=${lawyerId}&action=aprobar&token=${makeToken(lawyerId, "aprobar")}`,
        rechazarUrl: `${base}/api/admin/cedula?id=${lawyerId}&action=rechazar&token=${makeToken(lawyerId, "rechazar")}`,
      }).catch(console.error)
    }
  }

  await prisma.lawyer.update({
    where: { id: lawyerId },
    data: {
      name: data.name?.trim() || undefined,
      bio: data.bio?.trim() || null,
      cedula: newCedula,
      ...cedulaStatusUpdate,
      yearsExperience: data.yearsExperience ? parseInt(data.yearsExperience) : null,
      university: data.university?.trim() || null,
      graduationYear: data.graduationYear ? parseInt(data.graduationYear) : null,
      state: data.state || undefined,
      city: data.city?.trim() || undefined,
      phone: data.phone?.trim() || null,
      whatsapp: data.whatsapp?.trim() || null,
      website: data.website?.trim() || null,
      linkedin: data.linkedin?.trim() || null,
    },
  })

  if (data.specialties.length > 0) {
    await prisma.lawyerSpecialty.deleteMany({ where: { lawyerId } })

    for (let i = 0; i < data.specialties.length; i++) {
      const name = data.specialties[i]
      const specialty = await prisma.specialty.upsert({
        where: { name },
        create: { name, slug: toSlug(name) },
        update: {},
      })
      await prisma.lawyerSpecialty.create({
        data: { lawyerId, specialtyId: specialty.id, isPrimary: i === 0 },
      })
    }
  }

  revalidatePath("/mi-perfil")
  revalidatePath("/mi-perfil/editar")
  revalidatePath(`/abogados/${session.user.slug}`)
  return { ok: true }
  } catch (err) {
    console.error("[actualizarPerfil]", err)
    return { error: err instanceof Error ? err.message : String(err) }
  }
}
