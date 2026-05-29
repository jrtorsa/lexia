// migrar-blog.js
// Uso: node migrar-blog.js (desde la raíz de tu proyecto Lexia)

import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
);

// Importa los posts desde tu archivo existente
const { POSTS } = await import("./src/lib/blog.js");

async function main() {
  console.log("\n📚 Migración de artículos a Supabase");
  console.log("═".repeat(40));
  console.log(`   Total artículos: ${POSTS.length}\n`);

  const rows = POSTS.map((post) => ({
    slug:             post.slug,
    title:            post.title,
    meta_title:       post.metaTitle,
    meta_description: post.metaDescription,
    category:         post.category,
    specialty_slug:   post.specialtySlug,
    specialty_label:  post.specialtyLabel,
    published_at:     post.publishedAt,
    reading_time:     post.readingTime,
    excerpt:          post.excerpt,
    content:          post.content,
    estado:           "publicado",
    fuente:           "manual",
  }));

  const { error } = await supabase
    .from("articulos")
    .upsert(rows, { onConflict: "slug", ignoreDuplicates: false });

  if (error) {
    console.error("❌ Error al migrar:", error.message);
    return;
  }

  console.log(`✅ ${rows.length} artículos migrados correctamente`);
  rows.forEach((r) => console.log(`   • ${r.slug}`));
  console.log("═".repeat(40) + "\n");
}

main().catch(console.error);