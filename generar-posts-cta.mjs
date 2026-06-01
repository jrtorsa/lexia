// generar-posts-cta.mjs
// Genera posts de CTA creativos para Facebook con Claude
// Uso: node generar-posts-cta.mjs
// Guarda los posts en Supabase tabla "posts_facebook"

import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";

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
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

// ─── CTAs disponibles ─────────────────────────────────────────────────────────
const CTAS = [
  {
    tipo: "calculadora",
    url: "https://lexiamx.com/calculadora-finiquito",
    descripcion: "Calculadora gratuita de finiquito y liquidación laboral",
    angulos: [
      "trabajador que no sabe cuánto le deben al salir de su trabajo",
      "empleado que sospecha que su empresa le quiere pagar menos",
      "persona que acaba de renunciar y quiere calcular su finiquito",
      "trabajador que fue despedido y quiere saber si le están pagando bien",
      "alguien que firmó un finiquito y duda si cobró lo correcto",
    ],
  },
  {
    tipo: "jurisprudencias",
    url: "https://lexiamx.com/herramientas/jurisprudencias",
    descripcion: "Buscador de jurisprudencias de la SCJN con IA",
    angulos: [
      "abogado que pierde horas buscando criterios en el SJF",
      "estudiante de derecho que necesita encontrar tesis rápido",
      "persona que quiere entender qué dice la ley sobre su caso",
      "abogado que prepara una demanda y necesita jurisprudencia de apoyo",
      "litigante que quiere encontrar criterios favorables para su caso",
    ],
  },
  {
    tipo: "registro",
    url: "https://lexiamx.com/registro",
    descripcion: "Registro gratuito para abogados en el directorio Lexia",
    angulos: [
      "abogado que quiere conseguir más clientes sin pagar publicidad cara",
      "abogado recién titulado que quiere darse a conocer",
      "despacho pequeño que quiere competir con los grandes",
      "abogado independiente que trabaja por referencias y quiere escalar",
      "abogado que ya tiene clientes pero quiere diversificar sus fuentes",
    ],
  },
];

// ─── Generar post con Claude ──────────────────────────────────────────────────
async function generarPost(cta) {
  const angulo = cta.angulos[Math.floor(Math.random() * cta.angulos.length)];

  const prompt = `Eres un experto en marketing digital para servicios legales en México, especializado en crear posts virales para Facebook.

Genera un post de Facebook CORTO (máximo 150 palabras) para Lexia (lexiamx.com), un directorio legal mexicano.

CTA: ${cta.descripcion}
URL: ${cta.url}
ÁNGULO: Habla desde la perspectiva de ${angulo}

REGLAS ESTRICTAS:
1. Empieza con una pregunta o dato impactante que genere curiosidad o miedo a perderse algo
2. Usa emojis estratégicamente (máximo 5)
3. Máximo 3 párrafos muy cortos
4. El CTA debe ser urgente y claro
5. Incluye 3-4 hashtags relevantes al final
6. NO pongas la URL en el texto — va en el link del post
7. Tono: directo, cercano, como si un amigo te avisara de algo importante
8. Contexto mexicano — menciona México o situaciones mexicanas

Responde SOLO con el texto del post, sin explicaciones ni comillas.`;

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 500,
    messages: [{ role: "user", content: prompt }],
  });

  return message.content[0].text.trim();
}

// ─── Runner ───────────────────────────────────────────────────────────────────
async function main() {
  console.log("\n✍️  LEXIA — Generador de Posts CTA");
  console.log("═".repeat(40));

  // Generar 9 posts (3 por cada CTA)
  const posts = [];

  for (const cta of CTAS) {
    console.log(`\n📝 Generando posts para: ${cta.tipo}`);
    for (let i = 0; i < 3; i++) {
      const texto = await generarPost(cta);
      posts.push({
        tipo: cta.tipo,
        url: cta.url,
        texto,
        publicado: false,
        publicado_at: null,
        created_at: new Date().toISOString(),
      });
      console.log(`   ✅ Post ${i + 1} generado`);
      await new Promise(r => setTimeout(r, 1000));
    }
  }

  // Guardar en Supabase
  const { error } = await supabase
    .from("posts_facebook")
    .insert(posts);

  if (error) {
    console.error("❌ Error al guardar:", error.message);
    return;
  }

  console.log(`\n✅ ${posts.length} posts guardados en Supabase`);

  // Preview de los posts generados
  console.log("\n" + "═".repeat(40));
  console.log("📋 PREVIEW:");
  posts.forEach((p, i) => {
    console.log(`\n[${p.tipo.toUpperCase()}] Post ${i + 1}:`);
    console.log(p.texto.substring(0, 100) + "...");
  });
  console.log("═".repeat(40) + "\n");
}

main().catch(console.error);
