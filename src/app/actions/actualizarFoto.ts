"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function actualizarFoto(photoUrl: string) {
  const session = await getServerSession(authOptions)
  if (!session) return { error: "No autorizado" }

  await prisma.lawyer.update({
    where: { id: session.user.id },
    data: { photoUrl: photoUrl || null },
  })

  revalidatePath("/mi-perfil")
  revalidatePath("/mi-perfil/editar")
  revalidatePath(`/abogados/${session.user.slug}`)

  return { ok: true }
}
