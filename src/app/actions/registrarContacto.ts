"use server"

import { prisma } from "@/lib/prisma"
import { sendContactNotification } from "@/lib/email"

export type ContactType = "WHATSAPP" | "CALL" | "EMAIL" | "MESSAGE"

export async function registrarContacto(lawyerId: string, type: ContactType) {
  try {
    const lawyer = await prisma.lawyer.findUnique({
      where: { id: lawyerId },
      select: { email: true, name: true },
    })

    await prisma.contact.create({
      data: {
        lawyerId,
        name:  "Visitante",
        email: "anonimo@lexiamx.com",
        type,
      },
    })

    // Notify lawyer by email (non-blocking)
    if (lawyer) {
      sendContactNotification({
        lawyerEmail: lawyer.email,
        lawyerName:  lawyer.name,
        visitorName:  "Visitante",
        visitorEmail: "anonimo@lexiamx.com",
        type,
      }).catch((e) => console.error("[email] contact notification failed:", e?.message))
    }
  } catch (e: unknown) {
    console.error("[contact] tracking failed:", e instanceof Error ? e.message : e)
  }
}
