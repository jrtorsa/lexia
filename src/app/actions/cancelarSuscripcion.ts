"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { sendCancellationEmail } from "@/lib/email"

export async function cancelarSuscripcion() {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/login")

  await prisma.$transaction([
    // Mark membership as cancelled
    prisma.membership.updateMany({
      where: {
        lawyerId: session.user.id,
        status: { in: ["TRIAL", "ACTIVE", "PAST_DUE"] },
      },
      data: { status: "CANCELLED" },
    }),
    // Remove profile from the public directory
    prisma.lawyer.update({
      where: { id: session.user.id },
      data: { isActive: false },
    }),
  ])

  const lawyer = await prisma.lawyer.findUnique({
    where: { id: session.user.id },
    select: { email: true, name: true },
  })
  if (lawyer) {
    sendCancellationEmail({ to: lawyer.email, name: lawyer.name }).catch(() => {})
  }

  redirect("/mi-perfil/suscripcion?cancelado=1")
}
