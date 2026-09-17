# LEXIA — Documento de Contexto Vivo

> **Última actualización:** 15 de septiembre de 2026
> **Propósito:** Estado actual del proyecto Lexia. Este archivo es la fuente de
> verdad para retomar contexto en cualquier sesión.

---

## 🎯 HALLAZGO ESTRATÉGICO (15 sep 2026) — leer primero

**El cuello de botella de Lexia NO es captar abogados — van 80 activos,
sobran. El cuello de botella es CONVERTIR tráfico en contactos.** Solo
**15 contactos a abogados en 30 días**, y **86% de los abogados (69 de 80)
no recibieron ni un solo contacto** en ese periodo (ver detalle en
"Tracking de contactos" más abajo).

**Causa raíz encontrada:** el anuncio B2C de Facebook ("¿Te quedas horas
extra sin que te paguen?...") trae **16,176 visitas** de clientes
potenciales — pero mandaba a la home genérica (`lexiamx.com`), no a una
lista de abogados laborales. El visitante llegaba buscando "un abogado
laboral" y no encontraba cómo contactar a ninguno sin navegar y filtrar
manualmente — se iba antes de convertir.

**Acción tomada hoy:** se cambió el destino del anuncio a
`/abogados?especialidad=Derecho%20Laboral` (página que ya existía y ya
funcionaba: 39 abogados con especialidad laboral, 34 con botón de
WhatsApp visible de inmediato en la tarjeta, **0 clics** entre aterrizar
y poder contactar). Se agregó UTM al link para poder medir el efecto.

**Pendiente:** medir en 2-3 semanas si los contactos mensuales suben
respecto al baseline. **Baseline a comparar: 16,176 visitas → 15
contactos/mes** (con destino a la home).

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
- Abogados: 80 activos / 83 registrados (confirmado 11 sep, antes 71/74). Viven
  en la tabla `"Lawyer"` (`isActive=true`), **NO** en `prospectos`. Sus emails
  son auto-registrados por el propio abogado (es su credencial de login, no
  algo inferido) — bounce mínimo, muy distinto al problema de google-maps.
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

**Email (Resend) — ACTIVO y sano, pero el límite diario ya estorba:**
- Plan gratis: **100/día COMPARTIDOS** entre el cron (25/día) + campañas
  dirigidas puntuales + transaccionales (bienvenida, contacto, etc.) — ya no
  es "muy por debajo del límite". El 11 sep se llegó a 106 (25 del cron +
  80 de la campaña de la calculadora + 1 test) — la campaña salió completa
  porque corrió antes de tocar el techo, no porque hubiera margen real.
- Envía 25/día vía cron (subiendo gradual hacia 40 si el bounce se mantiene <5%)
- 0 bounces en envíos recientes, 36.7% engagement, DMARC 100%
- Fix aplicado (sep): `sanitizeTag()` limpia acentos en tags (bug 422 resuelto)
- **Decisión pendiente:** evaluar Resend Pro ($20/mes) — elimina el límite
  diario, permitiría subir el cron a 40/día sin competir por cuota con
  campañas puntuales.

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

**Estado de campañas activas (15 sep 2026):**
- **B2B "¿Eres abogado…?"** (capta abogados nuevos): **EN PAUSA** — correcto,
  ya sobran abogados activos (ver hallazgo estratégico arriba).
- **B2C "¿Te quedas horas extra…?"** (trae clientes/prospectos): **ACTIVA**,
  $75 MXN/día. Destino corregido hoy de la home genérica a
  `/abogados?especialidad=Derecho%20Laboral` — ver hallazgo estratégico arriba
  para el porqué.

---

## SEO / Google (últimos 3 meses, medido ago 2026)

- Impresiones creciendo fuerte: ~600/sem (jun) → ~4,700/sem (ago)
- Clics orgánicos: ~36/sem. CTR 1.22% (inflado por impresiones basura en inglés)
- Bing aporta casi tanto orgánico como Google
- Veta ganadora: derecho laboral (liquidación, salarios caídos, despido)
- 6 títulos SEO reescritos (pendiente confirmar si se aplicaron)

---

## 🧰 Herramientas del sitio (costo y protección)

| Herramienta | Costo por uso | Protección | Estado |
|---|---|---|---|
| Buscador de jurisprudencias | ~$0.001/búsqueda (Claude Haiku, solo traduce la consulta a parámetros y linkea al portal SCJN) | Rate limit 25/hora por IP (Upstash Redis) + límite suave de 7 búsquedas gratis para anónimos (localStorage, cosmético) + alerta por correo a partir de 300 llamadas/día | ✅ Verificado en producción: la búsqueda #26 desde la misma IP devuelve 429. Fail-open si Redis cae (deja pasar la búsqueda, pero loguea advertencia). |
| Calculadora de finiquito | $0 — 100% cálculo en el navegador (`useMemo`), sin llamada a ninguna API | No aplica (no hay endpoint que proteger) | ✅ Libre para promocionar sin restricción. Vive en `src/app/(public)/herramientas/page.tsx`. |

**Env vars de Upstash en Vercel (nombres reales, no los "estándar" de la
librería):** `UPSTASH_REDIS_REST_KV_REST_API_URL` / `UPSTASH_REDIS_REST_KV_REST_API_TOKEN`
(usar el token de escritura, no el `_READ_ONLY_TOKEN`). Código en
`src/lib/ratelimitJurisprudencias.ts`.

---

## 📞 Tracking de contactos (visitante → abogado)

**Sí se mide.** Tabla `Contact` (Prisma) registra cada clic en los botones
de contacto del perfil (`lawyerId` + `type`: `WHATSAPP`/`CALL`/`EMAIL` +
`createdAt`), vía el componente `src/components/ContactButton.tsx` →
server action `registrarContacto()`. También notifica al abogado por
email en cada contacto (no bloqueante).

**Volumen real (medido 11 sep):**
- Total histórico: **63 contactos** en 5.5 meses (desde 28 mar 2026)
- Últimos 30 días: **15** (WhatsApp 8, Email 7, Call 0)
- Solo 11 de 80 abogados activos recibieron algún contacto en 30 días —
  **69 (86%) con cero**

**Huecos de instrumentación (menores, no bloqueantes):**
- Falta evento `gtag` en los botones de contacto — GA4 no ve esta
  conversión, aunque el patrón `gtag('event', ...)` ya se usa en otro
  lado del código (`AbogadosSearchForm.tsx`).
- El evento de Facebook Pixel `Contact` solo se dispara en WhatsApp; el
  evento `Lead` sí cubre los tres tipos.

**Decisión:** NO construir un dashboard de reporte por abogado todavía —
con solo 15 contactos/mes el volumen es demasiado bajo para que valga la
pena. Prioridad es subir la conversión primero (ver hallazgo estratégico
arriba); el reporte se revisita si el volumen sube.

---

## ✉️ Emails suprimidos en Resend (abogados activos)

**2 de 80 abogados activos** tienen su email en la lista de supresión de
Resend (`GET /suppressions`) — quedan como "activos" en la BD pero
incontactables por correo, sin que nadie se entere (ambos rebotaron su
correo de bienvenida en el mismo segundo del registro, consistente con
typo al momento de registrarse):
- **Geovanny** (`abogadosespinosa2026@icloud.com`) — hard bounce ("user
  does not exist"), suprimido desde 19 ago. Sin teléfono/WhatsApp en
  perfil — no hay forma de contactarlo para corregir el email.
- **Sandra** (`sandycamarillo2016@hotmail.com`) — suprimido desde 27 jul,
  detalle del bounce original ya purgado por Resend. **Sí tiene WhatsApp
  registrado** — rescatable, contactar para validar/corregir su email.

**Causa raíz:** el registro no valida el formato del email en el
servidor (solo `type="email"` de HTML5 en el navegador, que no detecta
buzones inexistentes) y no hay forma de detectar cuando el correo de
bienvenida rebota (mismo problema de fondo que "aceptado ≠ entregado",
ver lecciones aprendidas). **Fix Nivel 1 propuesto (no implementado):**
tras `sendWelcomeEmail()`, hacer polling del status vía `GET /emails/{id}`
y avisar al admin si rebota, sin necesidad de webhook ni migración de
esquema. Baja prioridad — son solo 2 casos de 80.

---

## 📧 Campañas de email dirigidas (aparte del cron de prospectos)

Envíos puntuales a abogados YA REGISTRADOS (tabla `Lawyer`), distintos del
cron de captación de prospectos. Scripts en `scripts/campanas/`, no tocan
`vercel.json` ni ningún estado en BD.

| # | Campaña | Destinatarios | Estado |
|---|---|---|---|
| 1 | Calculadora de finiquito | 80 abogados activos | ✅ Enviada 11 sep (script puntual — no el cron). Resultado real: **77 entregados/clicked, 1 bounce soft (recuperable, reintentar), 2 suppressed** (ver sección de emails suprimidos). Pendiente medir `clicked` agregado. |
| 2 | Buscador de jurisprudencias | ~80 abogados activos | 📅 Planeada ~1 semana después del #1, si el #1 rinde bien. |

Script: `scripts/campanas/envio-calculadora-finiquito.mjs` — modos
`--dry-run` / `--test` / `--send`, delay 500ms entre envíos, tags
sanitizados con `sanitizeTag()` (mismo fix del bug 422).

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

## ✅ Hecho en la sesión del 11 sep 2026

- Protegido el buscador de jurisprudencias: rate limit 25/hora por IP (Upstash
  Redis) + límite suave de 7 búsquedas para anónimos + alerta diaria a 300
  llamadas. Corregidos los nombres reales de las env vars de Upstash en Vercel
  (no coincidían con los "estándar" de la librería). Verificado en producción.
- Diagnosticada la calculadora de finiquito: 100% cálculo local, sin costo,
  sin necesidad de protección.
- Confirmado (tabla `Lawyer`, vía Prisma — Supabase/PostgREST no tiene permiso
  sobre esa tabla): 80 abogados activos de 83 registrados.
- Creado y ejecutado `scripts/campanas/envio-calculadora-finiquito.mjs`:
  envío dirigido a los 80 abogados activos, 100% entregado, verificado
  directamente contra la API de Resend (no solo el log del script).
- Diagnosticado el tope de 100/día de Resend: se compartía entre el cron
  (25/día) y la campaña (80 + 1 test) = 106 ese día. La campaña en sí no
  sufrió ningún corte — se confirmó con `GET /emails` de Resend que los 80
  llegaron con `last_event: delivered/clicked`, sin huecos ni duplicados.

---

## ✅ Hecho en la sesión del 15 sep 2026

- Importados 55 leads nuevos de Facebook (CSV semanal, 63 leídos, 7 ya
  existían, 1 choque de teléfono omitido, 0 errores) — `prospectos` pasó
  de 1,370 a 1,425.
- Diagnosticado el tracking de contactos: confirmado que sí existe
  (tabla `Contact`), medido el volumen real (63 histórico, 15/30 días),
  identificados los huecos de GA4/Pixel.
- Diagnosticados los 2 emails suprimidos en Resend entre los abogados
  activos, causa raíz (sin validación server-side, sin detección de
  bounce) y propuesta de fix (no implementado).
- **Hallazgo estratégico:** diagnosticado el agujero de conversión de la
  campaña B2C de Facebook (16,176 visitas → 15 contactos) — el anuncio
  mandaba a la home en vez de a una lista filtrada de abogados
  laboralistas. Destino del anuncio corregido.

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

## 🚧 Rediseño de páginas combo ciudad+especialidad (en curso, 17 sep 2026)

Las páginas `/abogados/[ciudad]/[especialidad]` no mostraban abogados reales
(plantilla de texto casi idéntica entre ciudades) — Search Console las
reportaba como "sin indexar"/"duplicada sin canónica". Plan aprobado, en
ejecución por pasos, cada uno con su propio commit local:

1. **✅ Hecho y comiteado (`7dec321`):** fix de 3 menciones hardcodeadas de
   "Chihuahua" en las plantillas compartidas (`derecho-familiar`,
   `derecho-laboral`, `derecho-civil` en `src/lib/seo-data.ts`) que
   aparecían igual en páginas de otras ciudades. Auditadas las 8 plantillas
   completas — las demás menciones de "Chihuahua" son referencias
   correctas a nivel estado/circuito judicial, no se tocan.
2. Normalizar `Lawyer.city` (columna `cityNormalizado` + mapa de alias
   legible en un solo lugar, con `// TODO: migrar a catálogo City cuando
   se construya el selector de registro`). Enfoque LIGERO confirmado (no
   catálogo `City`/FK por ahora). Solo se corrige el typo de puntuación de
   "San Martín Texmelucan." — los otros 4 registros sucios (Ce, Estado de
   México, "todos los municipios...", colonia de Ecatepec) quedan FUERA de
   combos y en lista aparte para contactar a esos abogados.
3. `generateStaticParams` generado desde BD (no lista fija de 12
   municipios) + agrupación de zona metro CDMX en una sola página.
4. `LawyerCard` real (con botón de contacto) en cada combo.
5. Umbral N=2 abogados para indexar, `noindex` condicional debajo del
   umbral. Deploy + verificación en vivo.

**Sin pushear a propósito** — se acumulan los pasos en commits locales y
se pushea todo junto cuando el bloque esté completo y probado, para no
generar deploys sueltos (cada deploy resetea el toggle de crons de Vercel
Hobby a "activado", ya causó una reactivación accidental antes).

**Patrón de título rescatado para el paso de metadata (no perderlo):**
había un override manual sin comitear desde abril (`META_OVERRIDES` en
`seo-data.ts` + su uso en el combo `page.tsx`) con un buen título hecho a
mano: *"Abogados Familiares en Chihuahua | Divorcio y Custodia | Lexia"*.
Ese código se descarta (queda obsoleto con la metadata generada desde BD),
pero el PATRÓN se reutiliza como plantilla para las 96 páginas:
```
Abogados de {Especialidad} en {Ciudad} | {subtemas relevantes} | Lexia
```
generando `{subtemas relevantes}` automáticamente (ej. conteo real de
abogados, o los 2-3 subtemas más buscados de esa especialidad), no a mano
por combo. El mecanismo de override manual se conserva solo como
excepción futura para un combo insignia si algún día se justifica — no
como default.

**Importante — resuelve una duda abierta de sesiones anteriores:** el
título personalizado de "Abogados Familiares en Chihuahua" nunca se vio
en producción no por un problema de caché de Vercel (como se sospechó
antes) — el código (`META_OVERRIDES`/`getComboMeta`, en `seo-data.ts` Y
en el combo `page.tsx`) simplemente nunca se comiteó ni se desplegó.

---

## 📌 Pendientes / decisiones abiertas

**Contacto y crons:**
- [ ] Vigilar bounce rate con email a 25/día; si <5%, subir a 30 y luego 40
- [ ] Automatizar import de leads FB (requiere token de Meta — proyecto trabado)
- [ ] Verificar mañana que el cron de email (14:00 UTC) manda sus 25 tras el
      reinicio de cuota (hoy se llegó a 106/100 entre cron + campaña)

**Marketing / crecimiento:**
- [ ] Aplicar los 6 títulos SEO reescritos (confirmar si ya se hizo)
- [ ] Empezar a publicar Reels (formato de mayor rendimiento, hoy sin usar)
- [ ] Ampliar captación de abogados a CDMX/Puebla (desajuste geográfico:
      demanda nacional vs oferta norteña)
- [ ] Medir `clicked` de la campaña de la calculadora de finiquito (en 2-3 días)
- [ ] Correo #2 a abogados: buscador de jurisprudencias (~1 semana después
      del #1, si rinde bien)
- [ ] **PRIORITARIO:** medir en 2-3 semanas si los contactos/mes suben del
      baseline (15) tras corregir el destino del anuncio B2C
- [ ] Agregar evento `gtag` a los botones de contacto (WhatsApp/llamada/email)
      para que GA4 vea la conversión real del negocio
- [ ] Contactar a Sandra por WhatsApp para validar/corregir su email
      suprimido en Resend
- [ ] Evaluar implementar el fix Nivel 1 de detección de bounce en el
      registro (avisar admin si el correo de bienvenida rebota)

**Infraestructura:**
- [ ] Considerar Vercel Pro para control individual de crons (el toggle de
      Hobby es frágil y ya reactivó crons por accidente 2 veces)
- [ ] Decidir si subir a Resend Pro ($20/mes) — elimina el límite de 100/día
      que ya compite entre el cron y las campañas dirigidas
- [ ] Endurecer DMARC de p=none a p=quarantine (cuando se quiera blindar)

**Calidad de datos:**
- [ ] Naturalizar reseñas (todas 5.00★ se ve sospechoso)
- [ ] Si se rediseña captación de Google Maps: NO dejar que la IA invente
      emails. Solo usar emails de dominio de website real y verificable.
