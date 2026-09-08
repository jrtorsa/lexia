# Crons de Lexia

Documentación de los cron jobs en `vercel.json`. El plan de Vercel del
proyecto es **Hobby**, que no tiene pausa individual por cron — solo un
toggle global en el dashboard que apagaría *todos* los crons a la vez.
Por eso, la única forma confiable de desactivar un cron específico sin
tocar los demás es **quitar su entrada de `vercel.json`** (no pausarlo
desde el dashboard).

## Activos

| Path | Horario | Qué hace |
|---|---|---|
| `/api/cron/cedulas-pendientes` | `0 9 * * *` (diario) | Avisa al admin de cédulas de abogados pendientes >24h |
| `/api/cron/generar-articulos` | `0 6 * * 1` (lunes) | Genera artículos de blog con Claude |
| `/api/cron/email` | `0 14 * * *` (diario) | Invitaciones por email a `estado='prospecto'` (Resend), warmup 10→25→30→40 |
| `/api/cron/leads-facebook-reminder` | `0 9 * * 1` (lunes) | Recordatorio para bajar el CSV de Meta Business Suite |

## Removido — `/api/cron/whatsapp-prospectos`

**Quitado de `vercel.json` el 2026-09-06. NO reactivar sin verificar con Meta/Twilio primero.**

- Horario que tenía: `0 15 * * *` (diario).
- **Causa:** la cuenta de WhatsApp Business fue deshabilitada por Meta
  (Twilio error `63112`, confirmado con datos reales de la API de Twilio
  el 2026-09-05). El código marcaba `estado='contactado_whatsapp'` con
  cada intento porque Twilio acepta el mensaje de forma síncrona (HTTP 201,
  `status: "queued"`) aunque la entrega vaya a fallar — el fallo real llega
  async y el código no lo estaba verificando. Resultado: ~127 prospectos
  se marcaron como "contactados" sin que el mensaje llegara nunca.
- **Ya arreglado en código** (`src/app/api/cron/whatsapp-prospectos/route.ts`,
  todavía existe el archivo, solo no está registrado en `vercel.json`):
  - Poll del status real del mensaje en Twilio antes de marcar éxito.
  - Kill switch explícito: el handler retorna temprano a menos que
    `process.env.WHATSAPP_ENABLED === "true"`. Esa env var **no existe**
    hoy en Vercel (verificado vía `vercel env ls production`), así que
    el código queda deshabilitado por defecto aunque alguien lo vuelva a
    poner en `vercel.json` sin querer.
- **Los 127 prospectos afectados** ya se revirtieron a `estado='prospecto'`
  (identificados uno por uno cruzando contra los logs reales de Twilio,
  no por suposición) — están de vuelta en la cola del cron de email.

### Para reactivarlo en el futuro

1. Confirmar con Meta Business Suite / soporte de Twilio que la cuenta de
   WhatsApp Business ya no está deshabilitada.
2. Agregar `WHATSAPP_ENABLED=true` en las env vars de Vercel (Production).
3. Regresar la entrada a `vercel.json`:
   ```json
   {
     "path": "/api/cron/whatsapp-prospectos",
     "schedule": "0 15 * * *"
   }
   ```
4. Correrlo manualmente una vez (`vercel crons run` o vía curl con
   `CRON_SECRET`) contra un solo prospecto de prueba antes de dejarlo
   correr contra toda la cola.

## Removido — `/api/cron/captacion`

**Quitado de `vercel.json` el 2026-09-08. Apagado DEFINITIVO — no es un
problema técnico transitorio como WhatsApp, es un problema de calidad de
datos estructural del enfoque actual.**

- Horario que tenía: `0 7 * * 0` (domingo).
- **Causa — dos datos, ambos medidos directamente, no estimados:**
  - **0% de conversión**: de 461 prospectos con `fuente='google-maps'`
    insertados históricamente, **cero** llegaron a registrarse como
    abogado (cruce `prospectos.email` contra `Lawyer.email`). `facebook_lead_ad`,
    en comparación, convierte al 2.64% (24 de 909).
  - **90.9% de bounce rate**: de una muestra de 11 emails enviados a esta
    fuente (dentro de la ventana de retención de datos de Resend, ~pocos
    días), 10 rebotaron. `facebook_lead_ad` en la misma ventana: 7.3% de
    bounce sobre 55 envíos.
  - Causa raíz de ambos números: el email de cada prospecto de
    `google-maps` no lo escribe la persona — lo **infiere Claude Haiku**
    a partir del nombre del despacho y su sitio web (`enriquecerConClaude()`
    en `route.ts`). La mayoría de esas inferencias no son casillas reales.
  - Riesgo adicional: bombardear ese % de bounce rate hacia arriba
    justo después de estabilizar la reputación del dominio (fix de
    `sanitizeTag`, warmup gradual del cron de email) sería contraproducente.
  - (Aparte, ya independiente de esta decisión: el cron llevaba 12 semanas
    sin producir NADA desde antes, por falta de `GOOGLE_API_KEY` en Vercel
    Production — ver commit/conversación del 2026-09-08.)
- **No se borró el código** (`src/app/api/cron/captacion/route.ts` sigue
  en el repo completo) — por si algún día se rediseña el flujo para usar
  emails reales (ej. capturados manualmente, o vía un formulario de
  contacto del despacho) en vez de inferidos por IA.
- **Kill switch explícito en código**, mismo patrón que WhatsApp: el
  handler retorna temprano a menos que `process.env.CAPTACION_ENABLED === "true"`.
  Esa env var no existe en Vercel, así que queda deshabilitado por
  defecto aunque el toggle global de Hobby (ver nota abajo) lo reactive
  de rebote en `vercel.json`.
- **Cola limpia**: verificado que 0 prospectos de `google-maps` quedan en
  `estado='prospecto'` al momento de apagar el cron (los 461 ya se
  repartieron entre `contactado_whatsapp`, `contactado` e `invalido`) —
  no hay leads muertos esperando a que el cron de email los alcance.

### Para reconsiderarlo en el futuro

Esto no se reactiva simplemente arreglando la API key. Hace falta:
1. Rediseñar cómo se obtiene el email — no inferirlo con IA. Opciones:
   scraping real del sitio del despacho buscando un email publicado,
   o cambiar a un canal que no dependa de email (ej. solo WhatsApp/SMS
   al teléfono real que sí da Google Places, sin inventar nada).
2. Si se corrige el email, medir de nuevo con un lote chico antes de
   soltarlo — no asumir que arreglar la fuente del dato arregla la
   conversión.
3. Recién entonces, agregar `CAPTACION_ENABLED=true` en Vercel y
   regresar la entrada a `vercel.json`.

## Nota sobre el toggle global de Hobby

El 2026-08-29 se hizo un deploy que solo tocaba `vercel.json` (agregar
`leads-facebook-reminder`) y, sin que nadie lo pidiera, el cron de
WhatsApp — que llevaba 37 días sin correr — se reactivó al día siguiente.
El cron de email muestra el mismo patrón (actividad normal hasta el 22
de julio, silencio hasta el 30 de agosto). La hipótesis con más evidencia
es que el toggle global de "pausar crons" de Hobby se resetea a
"activado" cada vez que un deploy toca `vercel.json`, sin importar qué
entradas específicas se hayan modificado. **Cualquier deploy que toque
este archivo puede reactivar TODOS los crons**, no solo el que se editó
— hay que revisar el dashboard de Vercel (Project Settings → Cron Jobs)
después de cada deploy que toque `vercel.json` para confirmar que nada
se reactivó sin querer.
