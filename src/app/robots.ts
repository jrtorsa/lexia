import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/mi-perfil/",
          "/api/",
        ],
      },
    ],
    sitemap: "https://lexiamx.com/sitemap.xml",
  }
}
