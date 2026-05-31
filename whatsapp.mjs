// whatsapp.mjs
// Envía mensajes de WhatsApp a prospectos vía Twilio
// Uso: node whatsapp.mjs
// Requiere: TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_WHATSAPP_NUMBER en .env.local

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

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

const TWILIO_URL = `https://api.twilio.com/2010-04-01/Accounts/${env.TWILIO_ACCOUNT_SID}/Messages.json`;
const TWILIO_AUTH = Buffer.from(`${env.TWILIO_ACCOUNT_SID}:${env.TWILIO_AUTH_TOKEN}`).toString("base64");
const FROM = env.TWILIO_WHATSAPP_NUMBER; // whatsapp:+14155238886

const LIMITE = 20; // Mensajes por corrida (sandbox permite pocos)

// ─── Construir mensaje personalizado ─────────────────────────────────────────
function buildmensaje(prospecto) {
  return `Hola ${prospecto.nombre} 👋

Somos *Lexia*, el directorio legal de México. Encontramos tu despacho en ${prospecto.ciudad} y queremos invitarte a crear tu perfil gratis.

✅ Perfil profesional visible para clientes
⚖️ Buscador de jurisprudencias
🧮 Calculadora laboral

Regístrate gratis en: https://lexiamx.com/registro

¿Te interesa? Responde este mensaje y con gusto te ayudamos. 🙌`;
}

// ─── Enviar mensaje por Twilio ────────────────────────────────────────────────
async function enviarWhatsApp(telefono, mensaje) {
  // Limpiar y formatear el teléfono
  const numeroLimpio = telefono.replace(/\s|-|\(|\)/g, "");
  const numeroConCodigo = numeroLimpio.startsWith("+") 
    ? numeroLimpio 
    : `+521${numeroLimpio}`;
  const to = `whatsapp:${numeroConCodigo}`;

  const body = new URLSearchParams({
    From: FROM,
    To: to,
    Body: mensaje,
  });

  const res = await fetch(TWILIO_URL, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${TWILIO_AUTH}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);
  return data.sid;
}

// ─── Runner ───────────────────────────────────────────────────────────────────
async function main() {
  console.log("\n💬 LEXIA — Agente de WhatsApp");
  console.log("═".repeat(40));

  // Obtener prospectos con teléfono que no han sido contactados por WhatsApp
  const prospectos = [{
  nombre: "Raul",
  ciudad: "Chihuahua",
  telefono: "6392649868",
  id: "test"
}];

  console.log(`📋 ${prospectos.length} prospectos con teléfono\n`);

  const resumen = { enviados: 0, errores: 0 };

  for (const prospecto of prospectos) {
    try {
      const mensaje = buildmensaje(prospecto);
      const sid = await enviarWhatsApp(prospecto.telefono, mensaje);

      // Actualizar estado en Supabase
      await supabase
        .from("prospectos")
        .update({ 
          estado: "contactado_whatsapp",
          contactado_at: new Date().toISOString()
        })
        .eq("id", prospecto.id);

      console.log(`  ✅ ${prospecto.nombre} (${prospecto.telefono}) → ${sid}`);
      resumen.enviados++;

      // Pausa entre mensajes para evitar rate limiting
      await new Promise(r => setTimeout(r, 1000));
    } catch (e) {
      console.error(`  ❌ ${prospecto.nombre} (${prospecto.telefono}): ${e.message}`);
      resumen.errores++;
    }
  }

  console.log("\n" + "═".repeat(40));
  console.log("📊 RESUMEN");
  console.log(`   Enviados: ${resumen.enviados}`);
  console.log(`   Errores:  ${resumen.errores}`);
  console.log("═".repeat(40) + "\n");
}

main().catch(console.error);
