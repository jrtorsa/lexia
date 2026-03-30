"use server"

import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function restablecerContrasena(
  token: string,
  password: string
): Promise<{ ok: boolean; error?: string }> {
  if (!token || !password || password.length < 8) {
    return { ok: false, error: "La contraseña debe tener al menos 8 caracteres." }
  }

  const lawyer = await prisma.lawyer.findFirst({
    where: {
      resetToken: token,
      resetTokenExpiry: { gt: new Date() },
    },
  })

  if (!lawyer) {
    return { ok: false, error: "El enlace es inválido o ya expiró. Solicita uno nuevo." }
  }

  const hashed = await bcrypt.hash(password, 12)

  await prisma.lawyer.update({
    where: { id: lawyer.id },
    data: {
      password: hashed,
      resetToken: null,
      resetTokenExpiry: null,
    },
  })

  return { ok: true }
}
