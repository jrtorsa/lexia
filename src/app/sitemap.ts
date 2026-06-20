import type { MetadataRoute } from "next"
import { ESPECIALIDADES, CITY_SLUGS } from "@/lib/seo-data"
import { createClient } from "@supabase/supabase-js"
import { prisma } from "@/lib/prisma"

function toSlug(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
}

async function getCiudadesActivas(): Promise<string[]> {
  try {
    const rows = await prisma.lawyer.groupBy({
      by: ["city"],
      where: { isActive: true },
    })
    return rows.map((r) => toSlug(r.city)).filter(Boolean)
  } catch {
    return []
  }
}

async function getArticulosPublicados(): Promise<{ slug: string; created_at: string }[]> {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    )
    const { data } = await supabase
      .from("articulos")
      .select("slug, created_at")
      .eq("estado", "publicado")
      .order("created_at", { ascending: false })
    return (data ?? []) as { slug: string; created_at: string }[]
  } catch {
    return []
  }
}

async function getAbogadosActivos(): Promise<{ slug: string; updatedAt: Date }[]> {
  try {
    return prisma.lawyer.findMany({
      where: { isActive: true },
      select: { slug: true, updatedAt: true },
    })
  } catch {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://lexiamx.com"
  const now = new Date()

  const staticPages = [
    { url: "/",              priority: 1.0, freq: "daily"   },
    { url: "/abogados",      priority: 0.9, freq: "daily"   },
    { url: "/como-funciona", priority: 0.7, freq: "monthly" },
    { url: "/planes",        priority: 0.8, freq: "monthly" },
    { url: "/registro",      priority: 0.8, freq: "monthly" },
    { url: "/login",         priority: 0.5, freq: "monthly" },
    { url: "/contacto",      priority: 0.5, freq: "monthly" },
    { url: "/privacidad",    priority: 0.3, freq: "yearly"  },
    { url: "/terminos",      priority: 0.3, freq: "yearly"  },
  ]

  const [ciudades, articulos, abogados] = await Promise.all([
    getCiudadesActivas(),
    getArticulosPublicados(),
    getAbogadosActivos(),
  ])

  const comboPages = Array.from(CITY_SLUGS).flatMap((c) =>
    Object.keys(ESPECIALIDADES).map((e) => `/abogados/${c}/${e}`)
  )

  return [
    ...staticPages.map(({ url, priority, freq }) => ({
      url: base + url,
      lastModified: now,
      changeFrequency: freq as MetadataRoute.Sitemap[number]["changeFrequency"],
      priority,
    })),
    ...ciudades.map((slug) => ({
      url: `${base}/abogados/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...comboPages.map((url) => ({
      url: base + url,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...articulos.map(({ slug, created_at }) => ({
      url: `${base}/blog/${slug}`,
      lastModified: new Date(created_at),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...abogados.map(({ slug, updatedAt }) => ({
      url: `${base}/abogados/${slug}`,
      lastModified: updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ]
}
