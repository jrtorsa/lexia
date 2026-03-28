"use server"

import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"

type RegistroInput = {
  email: string
  password: string
  name: string
  phone?: string
  whatsapp?: string
  city: string
  state: string
  cedula?: string
  university?: string
  graduationYear?: string
  yearsExperience?: string
  bio?: string
  specialties: string[]
  plan: "free" | "premium" | "despacho"
}

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/^lic\.\s*/i, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
}

async function uniqueSlug(base: string): Promise<string> {
  let slug = base
  let i = 1
  while (await prisma.lawyer.findUnique({ where: { slug } })) {
    slug = `${base}-${i++}`
  }
  return slug
}

export async function registrarAbogado(input: RegistroInput) {
  // Verify email not taken
  const exists = await prisma.lawyer.findUnique({ where: { email: input.email } })
  if (exists) return { error: "Este correo ya está registrado." }

  const passwordHash = await bcrypt.hash(input.password, 12)
  const slug = await uniqueSlug(toSlug(input.name))

  // Ensure specialties exist in DB (upsert by name)
  const specialtyRecords = await Promise.all(
    input.specialties.map((name) =>
      prisma.specialty.upsert({
        where: { name },
        update: {},
        create: {
          name,
          slug: toSlug(name),
        },
      })
    )
  )

  // Ensure plan exists
  const planName = input.plan === "free" ? "Básico" : input.plan === "premium" ? "Premium" : "Despacho"
  const planRecord = await prisma.plan.upsert({
    where: { name: planName } as never,
    update: {},
    create: {
      name: planName,
      price: input.plan === "free" ? 0 : input.plan === "premium" ? 599 : 1499,
      features: [],
      highlighted: input.plan === "premium",
    },
  })

  await prisma.lawyer.create({
    data: {
      email: input.email,
      password: passwordHash,
      name: input.name,
      slug,
      phone: input.phone || null,
      whatsapp: input.whatsapp || null,
      city: input.city,
      state: input.state,
      cedula: input.cedula || null,
      university: input.university || null,
      graduationYear: input.graduationYear ? parseInt(input.graduationYear) : null,
      yearsExperience: input.yearsExperience ? parseInt(input.yearsExperience) : null,
      bio: input.bio || null,
      specialties: {
        create: specialtyRecords.map((s, i) => ({
          specialtyId: s.id,
          isPrimary: i === 0,
        })),
      },
      memberships: {
        create: {
          planId: planRecord.id,
          status: input.plan === "free" ? "ACTIVE" : "TRIAL",
        },
      },
    },
  })

  return { success: true }
}
