"use server"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function crearResena(input: {
  lawyerId: string
  nombre: string
  rating: number
  comment: string
}) {
  if (!input.nombre || !input.comment || !input.rating) {
    return { error: "Todos los campos son requeridos" }
  }
  if (input.rating < 1 || input.rating > 5) {
    return { error: "Rating inválido" }
  }
  if (input.comment.length < 10) {
    return { error: "El comentario es muy corto" }
  }

  await prisma.review.create({
    data: {
      lawyerId: input.lawyerId,
      userId: input.nombre, // guardamos el nombre como userId para anonimos
      rating: input.rating,
      comment: input.comment,
      isVisible: true,
    },
  })

  revalidatePath(`/abogados/${input.lawyerId}`)
  return { success: true }
}
