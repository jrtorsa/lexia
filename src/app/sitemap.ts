import type { MetadataRoute } from "next"
import { ESPECIALIDADES, CITY_SLUGS } from "@/lib/seo-data"
import { createClient } from "@supabase/supabase-js"

async function getArticulosPublicados(): Promise<{ slug: string; published_at: string }[]> {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
    )
    const { data } = await supabase
      .from("articulos")
      .select("slug, published_at")
      .eq("estado", "publicado")
      .order("published_at", { ascending: false })
    return (data ?? []) as { slug: string; published_at: string }[]
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

  const articulos = await getArticulosPublicados()

  const cityPages = Array.from(CITY_SLUGS).map((c) => `/abogados/${c}`)

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
    ...cityPages.map((url) => ({
      url: base + url,
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
    ...articulos.map(({ slug, published_at }) => ({
      url: `https://www.lexiamx.com/blog/${slug}`,
      lastModified: new Date(published_at),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ]
}
