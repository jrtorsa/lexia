// generar-articulos.mjs
// Genera artículos legales optimizados para SEO y AEO con Claude
// Uso: node generar-articulos.mjs
// Cron sugerido: cada lunes a las 8am

import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";

// ─── Config ───────────────────────────────────────────────────────────────────
const envFile = readFileSync(".env.local", "utf-8");
const env = Object.fromEntries(
  envFile.split("\n")
    .filter(line => line && !line.startsWith("#") && line.includes("="))
    .map(line => {
      const [key, ...rest] = line.split("=");
      return [key.trim(), rest.join("=").trim()];
    })
);

const anthropic = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY);

const ARTICULOS_POR_CORRIDA = 5;

// ─── Paso 1: Claude decide los temas ─────────────────────────────────────────
async function decidirTemas(slugsExistentes) {
  console.log("🧠 Claude eligiendo temas SEO/AEO...\n");

  const prompt = `Eres un estratega de contenido SEO y AEO (Answer Engine Optimization) para Lexia, un directorio legal mexicano enfocado en Chihuahua y norte de México.

AEO significa optimizar para que herramientas como ChatGPT, Perplexity y Google SGE citen el contenido como respuesta directa a preguntas legales.

Estos son los slugs de artículos que YA EXISTEN y NO debes repetir:
${slugsExistentes.join("\n")}

Genera exactamente ${ARTICULOS_POR_CORRIDA} ideas de artículos nuevos que:
1. Respondan preguntas legales frecuentes en México (especialmente Chihuahua, Juárez, norte)
2. Tengan alta intención de búsqueda ("cómo", "qué pasa si", "cuánto", "puedo", "tengo derecho")
3. Sean respondibles directamente por IA (AEO) — preguntas concretas con respuesta concreta
4. Cubran diferentes especialidades: laboral, familiar, penal, civil, mercantil, fiscal, amparo
5. Incluyan variedad: algunos sobre Chihuahua específicamente, otros nacionales

Responde SOLO con JSON válido, sin texto adicional:
[
  {
    "slug": "slug-del-articulo",
    "title": "Título del artículo (pregunta o declaración clara)",
    "meta_title": "Título SEO con keyword principal y año | Lexia",
    "meta_description": "Descripción de 150-160 caracteres con keyword y CTA",
    "category": "Derecho Laboral|Derecho Familiar|Derecho Penal|Derecho Civil|Derecho Mercantil|Derecho Fiscal|Amparo|Derecho de Tránsito",
    "specialty_slug": "laboral|familiar|penal|civil|mercantil|fiscal|amparo|transito",
    "specialty_label": "Derecho Laboral|Derecho Familiar|etc",
    "reading_time": 8,
    "excerpt": "Resumen de 2-3 oraciones que enganche al lector",
    "keyword_principal": "la keyword exacta que buscaría alguien en Google",
    "enfoque_aeo": "La pregunta exacta que respondería este artículo para una IA"
  }
]`;

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 2000,
    messages: [{ role: "user", content: prompt }],
  });

  const text = message.content[0].text;
  const match = text.match(/\[[\s\S]*\]/);
  if (!match) throw new Error("Claude no retornó JSON válido para los temas");
  return JSON.parse(match[0]);
}

// ─── Paso 2: Claude genera el artículo completo ───────────────────────────────
async function generarArticulo(tema) {
  const prompt = `Eres un abogado mexicano experto en comunicación legal clara. Escribe un artículo completo para el blog de Lexia (lexiamx.com), un directorio legal enfocado en Chihuahua y norte de México.

TEMA: ${tema.title}
KEYWORD PRINCIPAL: ${tema.keyword_principal}
ENFOQUE AEO: ${tema.enfoque_aeo}
ESPECIALIDAD: ${tema.specialty_label}
CATEGORÍA: ${tema.category}

REQUISITOS DEL ARTÍCULO:
1. Longitud: 1,200 - 1,800 palabras
2. Estructura: H2 y H3 claros, listas cuando aplique
3. AEO: el primer párrafo debe responder directamente la pregunta principal (para que IA como ChatGPT lo cite)
4. SEO: incluye la keyword principal de forma natural en el primer párrafo, en un H2 y en la conclusión
5. Tono: profesional pero accesible, como un abogado que explica sin jerga innecesaria
6. Contexto: menciona Chihuahua, México, leyes mexicanas (LFT, Código Civil, etc.) cuando aplique
7. Formato: HTML limpio con etiquetas h2, h3, p, ul, li, strong
8. Al final incluye siempre este bloque exacto (no lo modifiques):
<div class="cta-block">
  <h3>¿Necesitas un abogado de ${tema.specialty_label}?</h3>
  <p>En Lexia tenemos abogados verificados especializados en ${tema.specialty_label} en todo México. Contáctalos directamente sin intermediarios.</p>
</div>

9. Incluye al menos un bloque de nota importante con este formato:
<div class="bg-amber-50 border-l-4 border-amber-400 p-4 my-6 rounded-r-lg"><p class="text-amber-800 text-sm font-medium">TU NOTA IMPORTANTE AQUÍ</p></div>

Responde SOLO con el HTML del contenido del artículo, sin texto adicional, sin backticks, sin markdown.`;

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4000,
    messages: [{ role: "user", content: prompt }],
  });

  return message.content[0].text.trim();
}

// ─── Paso 3: Guardar en Supabase ──────────────────────────────────────────────
async function guardarArticulo(tema, contenido) {
  const hoy = new Date().toISOString().split("T")[0];

  const row = {
    slug:             tema.slug,
    title:            tema.title,
    meta_title:       tema.meta_title,
    meta_description: tema.meta_description,
    category:         tema.category,
    specialty_slug:   tema.specialty_slug,
    specialty_label:  tema.specialty_label,
    published_at:     hoy,
    reading_time:     tema.reading_time,
    excerpt:          tema.excerpt,
    content:          contenido,
    estado:           "publicado",
    fuente:           "agente-editorial",
  };

  const { error } = await supabase
    .from("articulos")
    .upsert(row, { onConflict: "slug", ignoreDuplicates: false });

  if (error) throw new Error(`Supabase error: ${error.message}`);
}

// ─── Runner ───────────────────────────────────────────────────────────────────
async function main() {
  console.log("\n✍️  LEXIA — Generador de Artículos");
  console.log(`   SEO + AEO | ${ARTICULOS_POR_CORRIDA} artículos`);
  console.log("═".repeat(45));

  // Obtener slugs existentes para no repetir
  const { data: existentes } = await supabase
    .from("articulos")
    .select("slug");
  const slugsExistentes = (existentes || []).map(r => r.slug);
  console.log(`   Artículos existentes: ${slugsExistentes.length}\n`);

  // Paso 1: Claude elige temas
  const temas = await decidirTemas(slugsExistentes);
  console.log(`📋 Temas elegidos por Claude:`);
  temas.forEach((t, i) => console.log(`   ${i + 1}. ${t.title}`));
  console.log();

  // Paso 2: Generar y guardar cada artículo
  const resumen = { generados: 0, errores: 0 };

  for (const tema of temas) {
    try {
      console.log(`\n✍️  Generando: ${tema.title}`);
      const contenido = await generarArticulo(tema);
      await guardarArticulo(tema, contenido);
      console.log(`   ✅ Publicado → /blog/${tema.slug}`);
      resumen.generados++;

      // Pausa para no saturar la API
      await new Promise(r => setTimeout(r, 2000));
    } catch (e) {
      console.error(`   ❌ Error: ${e.message}`);
      resumen.errores++;
    }
  }

  console.log("\n" + "═".repeat(45));
  console.log("📊 RESUMEN");
  console.log(`   Generados: ${resumen.generados}`);
  console.log(`   Errores:   ${resumen.errores}`);
  console.log("═".repeat(45) + "\n");
}

main().catch(console.error);
