"use server"

import { prisma } from "@/lib/prisma"
import { PROMO } from "@/lib/promo"

export async function getLugaresRestantes(): Promise<number> {
  const total = await prisma.lawyer.count({ where: { isActive: true } })
  return Math.max(PROMO.lugaresTotal - total, 0)
}
