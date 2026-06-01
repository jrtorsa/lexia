// indexar.mjs
// Solicita indexación a Google para artículos nuevos de Lexia
// Uso: node indexar.mjs
// Requiere: credentials.json de Google Service Account en la misma carpeta

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { GoogleAuth } from "google-auth-library";

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

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

// ─── Google Auth ──────────────────────────────────────────────────────────────
const auth = new GoogleAuth({
  keyFile: "./credentials.json", // tu archivo JSON de la cuenta de servicio
  scopes: ["https://www.googleapis.com/auth/indexing"],
});

async function getAccessToken() {
  const client = await auth.getClient();
  const token = await client.getAccessToken();
  return token.token;
}

// ─── Solicitar indexación a Google ───────────────────────────────────────────
async function indexarURL(url) {
  const token = await getAccessToken();

  const res = await fetch("https://indexing.googleapis.com/v3/urlNotifications:publish", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({
      url,
      type: "URL_UPDATED",
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message || `HTTP ${res.status}`);
  return data;
}

// ─── Runner ───────────────────────────────────────────────────────────────────
async function main() {
  console.log("\n🔍 LEXIA — Indexador de Google");
  console.log("═".repeat(40));

  // Obtener artículos publicados en los últimos 7 días
  const hace7dias = new Date();
  hace7dias.setDate(hace7dias.getDate() - 7);

  const { data: articulos, error } = await supabase
    .from("articulos")
    .select("slug, title, published_at")
    .eq("estado", "publicado")
    .gte("created_at", hace7dias.toISOString())
    .order("created_at", { ascending: false });

  if (error) {
    console.error("❌ Error al obtener artículos:", error.message);
    return;
  }

  console.log(`📋 ${articulos.length} artículos para indexar\n`);

  const resumen = { indexados: 0, errores: 0 };

  for (const articulo of articulos) {
    const url = `https://www.lexiamx.com/blog/${articulo.slug}`;
    try {
      await indexarURL(url);
      console.log(`  ✅ ${url}`);
      resumen.indexados++;
      await new Promise(r => setTimeout(r, 500));
    } catch (e) {
      console.error(`  ❌ ${url}: ${e.message}`);
      console.error(`  ❌ ${url}: ${e.message}`);
      if (resumen.errores === 1) process.exit(1); // para en el primer error
      resumen.errores++;
    }
  }

  console.log("\n" + "═".repeat(40));
  console.log(`📊 Indexados: ${resumen.indexados} | Errores: ${resumen.errores}`);
  console.log("═".repeat(40) + "\n");
}

main().catch(console.error);
