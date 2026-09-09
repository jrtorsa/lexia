# LEXIA — Documento de Contexto Vivo

> **Última actualización:** 9 de septiembre de 2026
> **Propósito:** Estado actual del proyecto Lexia. Este archivo es la fuente de
> verdad para retomar contexto en cualquier sesión.

---

## 🔄 Instrucciones de mantenimiento (para Claude Code)

Este documento debe mantenerse vivo. Reglas:

1. **Al inicio de cada sesión:** lee este archivo completo para tener el contexto
   actualizado antes de hacer cualquier cosa.
2. **Al final de cada sesión** (cuando el usuario lo pida con "actualiza el
   contexto" o similar): reescribe las secciones que cambiaron, actualiza la
   fecha de "Última actualización", y haz commit con mensaje
   `docs: actualiza LEXIA_CONTEXT tras sesión [fecha]`.
3. **Qué SÍ va aquí:** estado de crons, números clave de la operación, decisiones
   importantes, hallazgos, pendientes, **lecciones aprendidas** (acumulativas —
   agregar, no reemplazar, salvo que una lección deje de aplicar) y una
   **autoevaluación** breve de cómo fue el proceso de trabajo en la sesión.
4. **Qué NO va aquí:** credenciales, API keys, tokens, datos personales de
   prospectos. Nunca. (Esos van en .env, que está en .gitignore.)
5. **Verifica antes de escribir números:** no copies cifras de memoria; confirma
   contra la BD/dashboards reales antes de actualizar métricas.

---

## Stack técnico

Next.js 14 + Supabase + Vercel + Prisma + Resend + Anthropic (Claude Haiku)

- Proyecto: `/Users/pancholopez/lexia/lexia`
- Supabase Lexia: `kvilklxdnimqdvcltauy`
- Supabase Korima/Blindado: `mkiogyvnapotvosxtnpl`
- Admin email: jr.torsa@gmail.com
- GitHub: jrtorsa
- Dominio email: lexiamx.com (verificado en Resend, DMARC al 100%)

---

## 🚦 Estado de crons (Vercel)

⚠️ **Nota crítica sobre Vercel Hobby:** el plan Hobby NO tiene pausa individual
por cron. Solo un toggle global que apaga TODOS los crons. Además, ese toggle se
resetea a "activado" con cualquier deploy que toque `vercel.json`. Por eso los
crons que se quieren mantener apagados se eliminan de `vercel.json` Y llevan un
kill switch por código. Ver CRONS.md para el detalle.

| Cron | Horario | Estado | Nota |
|---|---|---|---|
| `/api/cron/email` | 14:00 UTC diario | ✅ ACTIVO | Sube a **25/día** (era 10). Warmup gradual hacia 40. |
| `/api/cron/generar-articulos` | Lun 6 AM | ✅ Activo | Genera artículos SEO |
| `/api/cron/cedulas-pendientes` | 9 AM diario | ✅ Activo | Notifica admin |
| `/api/cron/leads-facebook-reminder` | Lun 9 AM | ✅ Activo | Recordatorio semanal manual de CSV |
| `/api/cron/whatsapp-prospectos` | — | ❌ ELIMINADO | Cuenta WhatsApp deshabilitada por Meta (error 63112). Fuera de vercel.json + kill switch. |
| `/api/cron/captacion` (Google Maps) | — | ❌ ELIMINADO | 0% conversión, 90% bounce (emails inventados por Haiku). Fuera de vercel.json + kill switch. |

---

## 📊 Estado de la base de datos (8 sep 2026)

**Prospectos por estado (total 1,370):**
- `prospecto` (cola de email): 642
- `contactado_whatsapp`: 634 (congelado — WhatsApp eliminado)
- `contactado` (email): 91
- `invalido`: 3

**Por fuente:**
- `facebook_lead_ad`: 909 (única fuente activa y sana)
- `google-maps`: 461 (fuente muerta, no reactivar sin rediseño)

**Otros:**
- Abogados: 71 activos / 74 registrados
- Reseñas: 131 (promedio 5.00★ — se ve poco natural, pendiente naturalizar)
- Artículos blog: 110

---

## 🎯 Calidad de fuentes (dato clave para decisiones)

| Métrica | facebook_lead_ad | google-maps |
|---|---|---|
| Conversión a abogado | **2.64%** (24/909) | **0.00%** (0/461) |
| Bounce rate | 7.3% | 90.9% |
| Costo por lead | $6.56 MXN | (API Google + Haiku) |

**Conclusión:** Facebook es la ÚNICA fuente que funciona. Los emails de
google-maps los inventaba Claude Haiku → 90% rebotan. Estrategia actual:
exprimir Facebook, no diversificar en canales de baja calidad.

---

## Canales de contacto

**Email (Resend) — ACTIVO y sano:**
- Plan gratis (hasta 100/día, 3,000/mes — muy por debajo del límite)
- Envía 25/día (subiendo gradual hacia 40 si el bounce se mantiene <5%)
- 0 bounces en envíos recientes, 36.7% engagement, DMARC 100%
- Fix aplicado (sep): `sanitizeTag()` limpia acentos en tags (bug 422 resuelto)

**WhatsApp — MUERTO:**
- Cuenta WhatsApp Business deshabilitada por Meta (error Twilio 63112)
- Token de Meta nunca se logró (rol de system user bloqueado)
- Recuperación = tema de reputación con Meta, no de config. No apostar a esto.

**SMS — NO VIABLE en Twilio:**
- Números mexicanos de Twilio no soportan SMS (solo voz), confirmado
- Alternativa (Alphanumeric Sender ID) = ~3 semanas de registro. No prioritario.

---

## Facebook (marketing) — resumen última medición (ago 2026)

- Campañas: Lead Gen (963 leads, $6.56 c/u) + Website traffic (13,169 visitas)
- Reels: rinden ~70x más que posts de enlace, pero se publican ~0/semana
  (OPORTUNIDAD sin explotar)
- Demografía: hombres 25-64, CDMX/Puebla dominan (demanda NACIONAL)
- Import de leads: MANUAL vía CSV semanal (`importar-leads-facebook-csv.mjs`,
  ya commiteado en repo). Bug de paginación corregido (sep).

---

## SEO / Google (últimos 3 meses, medido ago 2026)

- Impresiones creciendo fuerte: ~600/sem (jun) → ~4,700/sem (ago)
- Clics orgánicos: ~36/sem. CTR 1.22% (inflado por impresiones basura en inglés)
- Bing aporta casi tanto orgánico como Google
- Veta ganadora: derecho laboral (liquidación, salarios caídos, despido)
- 6 títulos SEO reescritos (pendiente confirmar si se aplicaron)

---

## ✅ Hecho en la sesión del 8 sep 2026

- Diagnosticado y arreglado el bug 422 de email (tags con acento) → email revivió
- Subido límite de email de 10 → 25/día
- Eliminado cron de WhatsApp (cuenta muerta por Meta)
- Eliminado cron de Google Maps (0% conversión, 90% bounce)
- Revertidos 127 leads quemados de WhatsApp a la cola de email
- Importados 89 leads nuevos de Facebook + corregido bug de paginación
- Confirmado dominio sano vía reportes DMARC (Google + Microsoft)

---

## 🧠 Lecciones aprendidas (acumulativo — no borrar, solo agregar)

**"Aceptado" ≠ "entregado" — nunca marques éxito solo por la respuesta síncrona.**
Tanto Resend (email) como Twilio (WhatsApp) devuelven 200/201 "aceptado" antes de
saber si el mensaje realmente llega. El bug de WhatsApp (127 prospectos marcados
`contactado_whatsapp` sin que el mensaje llegara nunca) y el diagnóstico del 422
de email comparten esta causa. Si el código marca un `estado` como "contactado"
basándose solo en la respuesta inmediata del proveedor, hay que verificar el
status real (poll o webhook) antes de confiar en esa marca.

**Supabase/PostgREST trunca a 1000 filas sin paginación explícita, en silencio.**
Un `.select()` sin `.range()`/`.limit()` deja de traer todo en cuanto la tabla
crece — sin error, solo datos incompletos. Pasó con el import de leads: la tabla
llegó a 1,370 filas, el fetch de dedup trajo solo 1000, y un `dry-run` prometió
114 inserciones limpias cuando solo 89 lo eran. Cualquier query que alimente
lógica de dedup/decisión debe paginar explícitamente desde el día uno.

**El toggle de "pausar crons" del plan Hobby de Vercel es frágil y global.**
Se resetea a "activado" con cualquier deploy que toque `vercel.json`, sin
importar qué entrada se modificó — pasó dos veces (WhatsApp se reactivó solo
tras un deploy no relacionado). La única forma confiable de mantener un cron
apagado: quitarlo de `vercel.json` **y** agregar un kill switch explícito en
código (una env var que hay que declarar `"true"` a propósito en Vercel).

**Datos de contacto inferidos por IA, sin verificación real, son basura a
escala.** Los emails que Claude Haiku inventaba a partir del nombre/website de
un despacho (captación de Google Maps) convirtieron 0% y rebotaron 90.9%,
contra 2.64%/7.3% de Facebook (donde la persona escribe su propio email). No
hay atajo de IA para datos de contacto — si no viene directo de la fuente,
trátalo como sospechoso hasta validarlo con una muestra chica real.

**Los exports semanales de Meta Business Suite no son incrementales.** Cada CSV
re-incluye leads de semanas anteriores, no solo los nuevos. El dedup del
importador tiene que comparar contra el estado actual completo de la tabla,
nunca asumir que "esta semana" son solo leads nunca vistos.

**Los proveedores de email no retienen el detalle de entregas para siempre.**
Resend purga el detalle de mensajes después de aproximadamente una semana
(404 al consultar un `resend_id` viejo por API). No se puede auditar bounce
histórico completo después del hecho — si se quiere medir calidad de una
fuente en el futuro, hay que dar de alta el webhook de Resend
(`email.bounced`, `email.complained`) desde el día uno, no después.

**Gotcha de debugging:** el User-Agent default de `urllib` de Python (no
`curl`) puede ser bloqueado por Cloudflare (error 1010) frente a APIs como la
de Resend. Si un script en batch falla 100% pero una llamada individual con
`curl` funciona, sospechar del User-Agent antes que de la lógica propia.

---

## 🔍 Autoevaluación de proceso (sesión del 8-9 sep 2026)

**Qué funcionó bien:**
- Verificar todo contra BD/API en vivo en cada paso, en vez de confiar en
  resúmenes de turnos anteriores — esto expuso tanto el bug de paginación como
  una discrepancia real en los conteos que el usuario señaló (593 vs. la
  baseline correcta de 553). Sin esa disciplina, ambos hubieran quedado sin
  detectar.
- Cuando el usuario pidió apoyo con un mockup de banca falsa (saldo hipotecario
  con datos inventados, y luego un clon de la app de Scotiabank con su nombre
  real encima), pausé a preguntar el propósito real en vez de asumir buena fe
  o negarme de entrada sin explicar por qué — permitió aterrizar en un límite
  claro y razonado en vez de una negativa genérica.

**Qué se pudo hacer mejor:**
- La señal del bug de paginación ("Prospectos ya existentes en BD: 1000", un
  número sospechosamente redondo) estaba visible en el log del *primer*
  `dry-run` de la semana, pero no la noté hasta que el import real ya había
  producido 25 errores reales. Debí cuestionar ese número exacto de 1000 antes
  de aprobar la inserción.
- Al medir bounce rate vía la API de Resend, perdí varios minutos con un
  script que fallaba 100% (bloqueo de Cloudflare por User-Agent) antes de
  aislar la causa — ya sabía que un `curl` individual sí funcionaba, así que
  pude haber sospechado del cliente HTTP mucho antes.

---

## 📌 Pendientes / decisiones abiertas

**Contacto y crons:**
- [ ] Vigilar bounce rate con email a 25/día; si <5%, subir a 30 y luego 40
- [ ] Automatizar import de leads FB (requiere token de Meta — proyecto trabado)

**Marketing / crecimiento:**
- [ ] Aplicar los 6 títulos SEO reescritos (confirmar si ya se hizo)
- [ ] Empezar a publicar Reels (formato de mayor rendimiento, hoy sin usar)
- [ ] Ampliar captación de abogados a CDMX/Puebla (desajuste geográfico:
      demanda nacional vs oferta norteña)

**Infraestructura:**
- [ ] Considerar Vercel Pro para control individual de crons (el toggle de
      Hobby es frágil y ya reactivó crons por accidente 2 veces)
- [ ] Endurecer DMARC de p=none a p=quarantine (cuando se quiera blindar)

**Calidad de datos:**
- [ ] Naturalizar reseñas (todas 5.00★ se ve sospechoso)
- [ ] Si se rediseña captación de Google Maps: NO dejar que la IA invente
      emails. Solo usar emails de dominio de website real y verificable.
