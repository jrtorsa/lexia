// Consultas de abogados compartidas entre /abogados y las páginas combo
// (/abogados/[ciudad]/[especialidad]). Usa `Lawyer.cityNormalizado` (ver
// src/lib/normalizar-ciudad.ts) para agrupar por ciudad real, no por el
// texto libre capturado en el registro.

import { Prisma } from "@prisma/client"
import { prisma } from "@/lib/prisma"
import type { Lawyer } from "@/lib/mock-lawyers"

// Umbral mínimo de abogados reales para que un combo ciudad+especialidad
// sea indexable. Fuente única — la página combo (robots noindex) y el
// sitemap (qué URLs incluir) tienen que usar exactamente este mismo valor,
// o se manda una señal contradictoria a Google (noindex + en el sitemap).
export const UMBRAL_INDEXABLE = 2

// Las 8 especialidades que ya tienen plantilla de texto en seo-data.ts.
// Propiedad Intelectual / Derecho Migratorio existen en la BD pero no
// tienen plantilla todavía — quedan fuera hasta ampliar especialidades
// (ver LEXIA_CONTEXT.md).
const ESPECIALIDADES_CON_PLANTILLA = [
  "derecho-familiar", "derecho-penal", "derecho-laboral", "derecho-civil",
  "derecho-mercantil", "derecho-inmobiliario", "derecho-fiscal", "amparo",
]

const LAWYER_INCLUDE = {
  specialties: { include: { specialty: true } },
  reviews: { include: { user: true } },
  memberships: { include: { plan: true }, orderBy: { createdAt: "desc" as const }, take: 1 },
}

type LawyerRow = Awaited<ReturnType<typeof prisma.lawyer.findFirst<{ include: typeof LAWYER_INCLUDE }>>>

export function toLawyerCard(l: NonNullable<LawyerRow>): Lawyer {
  const plan = l.memberships[0]?.plan.name ?? "Básico"
  return {
    id: l.id,
    name: l.name,
    slug: l.slug,
    photoUrl: l.photoUrl,
    city: l.city,
    state: l.state,
    bio: l.bio ?? "",
    yearsExperience: l.yearsExperience ?? 0,
    isVerified: l.isVerified,
    cedula: l.cedula,
    university: l.university,
    graduationYear: l.graduationYear,
    phone: l.phone,
    whatsapp: l.whatsapp,
    website: l.website,
    linkedin: l.linkedin,
    specialties: l.specialties.map((s) => ({
      name: s.specialty.name,
      slug: s.specialty.slug,
      isPrimary: s.isPrimary,
    })),
    reviews: l.reviews.map((r) => ({
      rating: r.rating,
      comment: r.comment ?? null,
      autorNombre: r.user?.name ?? "Anónimo",
    })),
    membership: plan === "Premium" ? "premium" : plan === "Despacho" ? "despacho" : "free",
  }
}

/** Abogados activos de una ciudad normalizada + especialidad, listos para <LawyerCard>. */
export async function fetchLawyersByCombo(cityNormalizado: string, especialidadNombre: string): Promise<Lawyer[]> {
  const rows = await prisma.lawyer.findMany({
    where: {
      isActive: true,
      cityNormalizado,
      specialties: { some: { specialty: { name: especialidadNombre } } },
    },
    include: LAWYER_INCLUDE,
    orderBy: [
      { memberships: { _count: "desc" } },
      { createdAt: "desc" },
    ],
  })
  return rows.map(toLawyerCard)
}

/** Solo el conteo — usado en generateMetadata/generateStaticParams sin traer todos los datos. */
export async function countLawyersByCombo(cityNormalizado: string, especialidadNombre: string): Promise<number> {
  return prisma.lawyer.count({
    where: {
      isActive: true,
      cityNormalizado,
      specialties: { some: { specialty: { name: especialidadNombre } } },
    },
  })
}

/** Todas las ciudades normalizadas con al menos un abogado activo (para generateStaticParams). */
export async function getCityNormalizadoBuckets(): Promise<string[]> {
  const rows = await prisma.lawyer.findMany({
    where: { isActive: true, cityNormalizado: { not: null } },
    distinct: ["cityNormalizado"],
    select: { cityNormalizado: true },
  })
  return rows.map((r) => r.cityNormalizado!).sort()
}

/**
 * Nombre/estado a mostrar para una ciudad normalizada. Para "ciudad-de-mexico"
 * (bucket agrupado de zona metro) el nombre es fijo. Para el resto, se deriva
 * del valor de `city`/`state` más frecuente entre los abogados de ese bucket
 * — evita mantener un registro manual de 35 ciudades a mano.
 */
export async function getCiudadDisplay(cityNormalizado: string): Promise<{ nombre: string; estado: string } | null> {
  if (cityNormalizado === "ciudad-de-mexico") {
    return { nombre: "Ciudad de México", estado: "Ciudad de México" }
  }

  const rows = await prisma.lawyer.groupBy({
    by: ["city", "state"],
    where: { isActive: true, cityNormalizado },
    _count: true,
    orderBy: { _count: { city: "desc" } },
    take: 1,
  })
  if (rows.length === 0) return null
  return { nombre: rows[0].city.trim(), estado: rows[0].state.trim() }
}

/**
 * Combos ciudad+especialidad con UMBRAL_INDEXABLE o más abogados reales —
 * exactamente las URLs que deben aparecer en el sitemap (las que la página
 * combo marca como `index, follow`). Solo entre las 8 especialidades con
 * plantilla — ver ESPECIALIDADES_CON_PLANTILLA.
 */
export async function getIndexableCombos(): Promise<{ ciudad: string; especialidadSlug: string; n: number }[]> {
  const rows = await prisma.$queryRaw<{ ciudad: string; especialidadSlug: string; n: bigint }[]>`
    SELECT l."cityNormalizado" AS ciudad, s.slug AS "especialidadSlug", count(*) AS n
    FROM "Lawyer" l
    JOIN "LawyerSpecialty" ls ON ls."lawyerId" = l.id
    JOIN "Specialty" s ON s.id = ls."specialtyId"
    WHERE l."isActive" = true
      AND l."cityNormalizado" IS NOT NULL
      AND s.slug IN (${Prisma.join(ESPECIALIDADES_CON_PLANTILLA)})
    GROUP BY l."cityNormalizado", s.slug
    HAVING count(*) >= ${UMBRAL_INDEXABLE}
  `
  return rows.map((r) => ({ ciudad: r.ciudad, especialidadSlug: r.especialidadSlug, n: Number(r.n) }))
}
