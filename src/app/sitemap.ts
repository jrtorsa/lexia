import type { MetadataRoute } from "next"
import { ESPECIALIDADES, CITY_SLUGS } from "@/lib/seo-data"

export default function sitemap(): MetadataRoute.Sitemap {
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
  ]
}
