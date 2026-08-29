# Importar leads de Facebook (Meta Business Suite)

Cómo bajar y cargar los leads del formulario de Meta a `prospectos` en Supabase.

## Contexto

No hay integración automática (webhook / Graph API) con Meta — el proceso es
manual: exportar un CSV desde Meta Business Suite y correr un script local.
Antes de este script existían `importar-leads-facebook.mjs`, `-2.mjs` y
`-3.mjs` con arrays de leads hardcodeados a mano y nunca commiteados; se
dejaron de correr y ~750 leads se quedaron sin importar. Este script los
reemplaza: lee un CSV real en vez de requerir transcripción manual.

## Uso

1. En Meta Business Suite → Leads, exporta el CSV (headers en español:
   `Correo electrónico`, `Nombre`, `Teléfono`, `Fecha de creación`).
2. Revisa primero en modo simulación, sin tocar la base de datos:

   ```
   node importar-leads-facebook-csv.mjs "ruta/al/export.csv" --dry-run
   ```

   Lee el resumen: cuántos se leyeron, cuántos ya existen (por email),
   cuántos chocan por teléfono contra la BD (requieren revisión manual) y
   cuántos se insertarían limpios.
3. Si el resumen se ve bien, corre el import real:

   ```
   node importar-leads-facebook-csv.mjs "ruta/al/export.csv"
   ```

4. Verifica en Supabase:

   ```sql
   SELECT COUNT(*) FROM prospectos WHERE fuente = 'facebook_lead_ad';
   ```

## Qué hace el script

- Detecta las columnas por nombre de header (tolerante a variantes en
  español/inglés), no por posición fija.
- Normaliza `email` (trim + minúsculas) y `telefono` (compara por los
  últimos 10 dígitos, ignorando `+52`, `01`, espacios y guiones).
- Es idempotente: correrlo dos veces con el mismo CSV no duplica nada,
  dedup contra el estado real de la tabla (no contra corridas anteriores).
- Guarda `created_at` con la fecha real del lead ("Fecha de creación" de
  Meta) en vez de la fecha de importación.
- Si dos filas del propio CSV comparten teléfono (mismo lead reenviado con
  otro email), se queda con la fila de fecha más reciente y descarta la
  otra automáticamente (se reporta, no es silencioso).
- Si un lead choca por teléfono contra un registro ya existente en la BD,
  NO se resuelve solo — se lista en el resumen para revisión manual.

## Notas de schema

- `prospectos.email` tiene `UNIQUE` — es el identificador primario de dedup.
- `prospectos.telefono` tiene `UNIQUE` parcial (excluye NULL/vacío) —
  por eso el script reporta colisiones de teléfono en vez de ignorarlas.
- `prospectos.nombre` **ya no** es único (se quitó el constraint
  `prospectos_nombre_unique`): dos personas distintas pueden llamarse igual
  y no deben bloquearse entre sí.

## Recordatorio automático

Cron semanal (`/api/cron/leads-facebook-reminder`, lunes 9:00 AM UTC) manda
un correo a `jr.torsa@gmail.com` recordando bajar el CSV y correr este
script, para que no se vuelva a acumular un backlog de leads sin importar.
