// asignar-imagenes.mjs
// Asigna imágenes de Supabase Storage a artículos según su categoría
// Uso: node asignar-imagenes.mjs

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

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

const BASE_URL = `${env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/blog-images`;

// ─── Mapeo de categorías a imágenes ──────────────────────────────────────────
const IMAGENES_POR_CATEGORIA = {
  "Derecho Laboral": [
    "Fired Employee Photo.jpg",
    "Fired Employee Photo (1).jpg",
    "Fired Employee Photo (2).jpg",
    "Fired Employee Photo (3).jpg",
    "Lawyer at Work.jpg",
    "Lawyer at Work (1).jpg",
    "Lawyer at Work (2).jpg",
    "Lawyer at Work (3).jpg",
    "Lawyer at Work (4).jpg",
    "Lawyer at Work (5).jpg",
    "Lawyer at Work (6).jpg",
    "Despido Image.jpg",
  ],
  "Derecho Familiar": [
    "Child Custody Photo.jpg",
    "Child Custody Photo (1).jpg",
    "Child Custody Photo (2).jpg",
    "Child Custody Photo (3).jpg",
    "Child Custody Photo (4).jpg",
    "Child Custody Photo (5).jpg",
    "fighting-couple-1.png",
    "fighting-couple-2.png",
    "fighting-couple-3.png",
    "fighting-couple-4.png",
    "fighting-couple-5.png",
    "fighting-couple-6.png",
    "fighting-couple-7.png",
    "fighting-couple-8.png",
    "Single Mom Photo.jpg",
    "Single Mom Photo (1).jpg",
    "Single Mom Photo (2).jpg",
    "Single Mom Photo (3).jpg",
    "Single Dad Photo.jpg",
    "Single Dad Photo (1).jpg",
    "Single Dad Photo (2).jpg",
    "Single Dad Photo (3).jpg",
    "Single Dad Photo (4).jpg",
    "Single Dad Photo (5).jpg",
    "Single Dad Photo (6).jpg",
    "Lawyer Family Photo.jpg",
    "Lawyer Family Photo (1).jpg",
    "Lawyer Family Photo (2).jpg",
    "Lawyer Family Photos.jpg",
    "Lawyer Family Photos (1).jpg",
    "Keira Burton.jpg",
  ],
  "Derecho Penal": [
    "Justice Photo by Sora Shimazaki.jpg",
    "Justice Photo by Pavel Danilyuk.jpg",
    "Justice Photo by Ekaterina Bolovtsova.jpg",
    "Justice Photo by Ekaterina Bolovtsova (1).jpg",
    "Justice Photo Ekaterina Bolovtsova.jpg",
    "Justice Photo Taha Asamett.jpg",
    "williamcho-justice-2060093_1920.jpg",
    "geralt-law-10173009_1920.jpg",
    "norman_gil-corte-10228166_1920.png",
  ],
  "Derecho Civil": [
    "stevepb-binding-contract-948442_1920.jpg",
    "Lawyer Consultation Photo.jpg",
    "Latin Lawyer Photo.jpg",
    "Latin Lawyer Photo (1).jpg",
    "Latin Lawyer Photo (2).jpg",
    "Latin Lawyer Photo (3).jpg",
    "Latin Lawyer Photo (4).jpg",
    "Lawyer Photo from Unsplash.jpg",
    "momagic-attorney-9007284_1920.png",
  ],
  "Derecho Mercantil": [
    "stevepb-binding-contract-948442_1920.jpg",
    "Lawyer at Work (3).jpg",
    "Lawyer at Work (4).jpg",
    "Latin Lawyer Photo.jpg",
    "adart00090-lawyer-7123798_1920.jpg",
    "advogadoaguilar-right-4703943_1920.jpg",
  ],
  "Derecho Fiscal": [
    "Calculator Photo from Pexels.jpg",
    "Online Calculator Photo.jpg",
    "Bank Account Photo.jpg",
    "Bank Account Photo (1).jpg",
    "Lawyer at Work (1).jpg",
    "Lawyer at Work (2).jpg",
  ],
  "Amparo": [
    "Justice Photo by Sora Shimazaki.jpg",
    "Justice Photo by Pavel Danilyuk.jpg",
    "williamcho-justice-2060093_1920.jpg",
    "norman_gil-corte-10228166_1920.png",
    "geralt-law-10173009_1920.jpg",
  ],
  "Derecho de Tránsito": [
    "Justice Photo by Ekaterina Bolovtsova.jpg",
    "pexels-mikhail-nilov-7534757.jpg",
    "pexels-timur-weber-8560741.jpg",
    "pexels-kindelmedia-7714795.jpg",
  ],
};

// Imagen por defecto para categorías no mapeadas
const IMAGEN_DEFAULT = "Lawyer at Work.jpg";

// ─── Función para elegir imagen aleatoria por categoría ───────────────────────
function elegirImagen(categoria) {
  const imagenes = IMAGENES_POR_CATEGORIA[categoria] || [IMAGEN_DEFAULT];
  const imagen = imagenes[Math.floor(Math.random() * imagenes.length)];
  return `${BASE_URL}/${encodeURIComponent(imagen)}`;
}

// ─── Runner ───────────────────────────────────────────────────────────────────
async function main() {
  console.log("\n🖼️  LEXIA — Asignador de Imágenes");
  console.log("═".repeat(40));

  // Obtener artículos sin imagen
  const { data: articulos, error } = await supabase
    .from("articulos")
    .select("id, title, category, imagen_url")
    .is("imagen_url", null);

  if (error) {
    console.error("❌ Error:", error.message);
    return;
  }

  console.log(`📋 ${articulos.length} artículos sin imagen\n`);

  let actualizados = 0;

  for (const articulo of articulos) {
    const imagen_url = elegirImagen(articulo.category);

    const { error: updateError } = await supabase
      .from("articulos")
      .update({ imagen_url })
      .eq("id", articulo.id);

    if (updateError) {
      console.error(`  ❌ ${articulo.title}: ${updateError.message}`);
    } else {
      console.log(`  ✅ ${articulo.category} → ${articulo.title.substring(0, 50)}...`);
      actualizados++;
    }
  }

  console.log("\n" + "═".repeat(40));
  console.log(`📊 ${actualizados} artículos actualizados con imagen`);
  console.log("═".repeat(40) + "\n");
}

main().catch(console.error);
