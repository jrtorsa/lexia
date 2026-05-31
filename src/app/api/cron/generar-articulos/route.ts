import { NextResponse } from "next/server"
import Anthropic from "@anthropic-ai/sdk"
import { createClient } from "@supabase/supabase-js"

export const dynamic = "force-dynamic"
export const maxDuration = 300

// ─── Clientes ─────────────────────────────────────────────────────────────────

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )
}

// ─── Constantes ───────────────────────────────────────────────────────────────

const CATEGORIAS = [
  { category: "Derecho Laboral",      specialty_slug: "laboral",   specialty_label: "Derecho Laboral" },
  { category: "Derecho Familiar",     specialty_slug: "familiar",  specialty_label: "Derecho Familiar" },
  { category: "Derecho Penal",        specialty_slug: "penal",     specialty_label: "Derecho Penal" },
  { category: "Derecho Civil",        specialty_slug: "civil",     specialty_label: "Derecho Civil" },
  { category: "Amparo",               specialty_slug: "amparo",    specialty_label: "Amparo" },
  { category: "Derecho de Tránsito",  specialty_slug: "transito",  specialty_label: "Derecho de Tránsito" },
  { category: "Derecho Mercantil",    specialty_slug: "mercantil", specialty_label: "Derecho Mercantil" },
]

const FB_CTAS = [
  { tipo: "calculadora",     url: "https://lexiamx.com/herramientas",                descripcion: "calculadora de finiquito y liquidación laboral gratuita" },
  { tipo: "jurisprudencias", url: "https://lexiamx.com/herramientas/jurisprudencias", descripcion: "buscador gratuito de jurisprudencias del Poder Judicial de la Federación" },
  { tipo: "registro",        url: "https://lexiamx.com/registro",                    descripcion: "registro gratuito para abogados que quieren conseguir más clientes en Lexia" },
]

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface ArticuloGenerado {
  slug: string
  title: string
  meta_title: string
  meta_description: string
  excerpt: string
  content: string
  reading_time: number
}

interface PostFacebook {
  tipo: string
  url: string
  texto: string
  hashtags: string
  publicado: boolean
  created_at: string
}

// ─── Artículos ────────────────────────────────────────────────────────────────

async function generarArticulos(): Promise<number> {
  const supabase = getSupabase()
  const shuffled = [...CATEGORIAS].sort(() => Math.random() - 0.5).slice(0, 5)
  let generados = 0

  for (const cat of shuffled) {
    const prompt = `Genera un artículo legal informativo en español para el blog de Lexia (directorio legal mexicano).

Categoría: ${cat.category}
Especialidad: ${cat.specialty_label}

Responde SOLO con un JSON (sin backticks ni texto adicional):
{
  "slug": "slug-unico-descriptivo-en-espanol",
  "title": "Título del artículo (máximo 70 caracteres)",
  "meta_title": "Meta título SEO (máximo 60 caracteres) | Lexia",
  "meta_description": "Descripción SEO entre 120 y 155 caracteres que invite a leer",
  "excerpt": "Resumen del artículo en 1-2 oraciones que enganche al lector",
  "content": "<h2>Primera sección</h2><p>Contenido...</p>",
  "reading_time": 5
}

Reglas del artículo:
- content debe tener mínimo 800 palabras en HTML válido (usa h2, h3, p, ul, li)
- Tono profesional pero accesible para el público general mexicano
- Incluye ejemplos prácticos y situaciones comunes en México
- El slug debe ser único, descriptivo y en minúsculas con guiones
- Solo menciona leyes mexicanas reales (LFT, CPPF, CCF, etc.)`

    try {
      const message = await anthropic.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 4096,
        messages: [{ role: "user", content: prompt }],
      })

      const text = (message.content[0] as { text: string }).text
      const match = text.match(/\{[\s\S]*\}/)
      if (!match) continue

      const articulo = JSON.parse(match[0]) as ArticuloGenerado

      const { error } = await supabase.from("articulos").upsert(
        {
          ...articulo,
          category:        cat.category,
          specialty_slug:  cat.specialty_slug,
          specialty_label: cat.specialty_label,
          estado:          "publicado",
          published_at:    new Date().toISOString().split("T")[0],
        },
        { onConflict: "slug", ignoreDuplicates: true },
      )

      if (!error) generados++
    } catch (e) {
      console.error(`[generar-articulos] error [${cat.category}]:`, e)
    }

    await new Promise(r => setTimeout(r, 500))
  }

  return generados
}

// ─── Posts de Facebook ────────────────────────────────────────────────────────

async function generarPostsFacebook(): Promise<number> {
  const supabase = getSupabase()
  let generados = 0

  for (const cta of FB_CTAS) {
    const prompt = `Eres un experto en marketing digital para redes sociales en México, especializado en servicios legales.

Genera 3 posts distintos para Facebook sobre: ${cta.descripcion}

Reglas de cada post:
- Empieza con una pregunta inicial impactante que enganche
- Máximo 150 palabras en total
- Emojis creativos y estratégicos (sin exagerar)
- Tono cercano y mexicano (coloquial, directo, de tú a tú)
- NO incluyas URLs, links ni nombres de dominio en el texto
- Termina con 3 a 4 hashtags relevantes
- Cada uno debe ser completamente diferente al anterior en enfoque y redacción

Responde SOLO con un array JSON (sin backticks ni texto adicional):
[
  {
    "texto": "Texto completo del post con emojis incluidos",
    "hashtags": "#Hashtag1 #Hashtag2 #Hashtag3 #Hashtag4"
  },
  { "texto": "...", "hashtags": "..." },
  { "texto": "...", "hashtags": "..." }
]`

    try {
      const message = await anthropic.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: 2048,
        messages: [{ role: "user", content: prompt }],
      })

      const text = (message.content[0] as { text: string }).text
      const match = text.match(/\[[\s\S]*\]/)
      if (!match) continue

      const posts = JSON.parse(match[0]) as Array<{ texto: string; hashtags: string }>

      const rows: PostFacebook[] = posts.map(p => ({
        tipo:       cta.tipo,
        url:        cta.url,
        texto:      p.texto,
        hashtags:   p.hashtags,
        publicado:  false,
        created_at: new Date().toISOString(),
      }))

      const { error } = await supabase.from("posts_facebook").insert(rows)
      if (!error) generados += rows.length
      else console.error(`[posts-facebook] supabase error [${cta.tipo}]:`, error.message)
    } catch (e) {
      console.error(`[posts-facebook] error [${cta.tipo}]:`, e)
    }

    await new Promise(r => setTimeout(r, 500))
  }

  return generados
}

// ─── Handler ──────────────────────────────────────────────────────────────────

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization")
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const articulosGenerados = await generarArticulos()
  const postsFacebookGenerados = await generarPostsFacebook()

  return NextResponse.json({
    ok: true,
    articulos: articulosGenerados,
    posts_facebook: postsFacebookGenerados,
  })
}
