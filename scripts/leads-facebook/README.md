# Importar leads de Facebook (Meta Business Suite)

Cómo bajar y cargar los leads del formulario de Meta a `prospectos` en Supabase.

## Contexto

No hay integración automática (webhook / Graph API) con Meta — el proceso es
manual: exportar un CSV desde Meta Business Suite y correr un script local.
Antes de este script existían `importar-leads-facebook.mjs`, `-2.mjs` y
`-3.mjs` con arrays de leads hardcodeados a mano y nunca commiteados; se
dejaron de correr y ~750 leads se quedaron sin importar. Este script los
reemplaza: lee un CSV real en vez de requerir transcripción manual.

## Cómo bajar el CSV de Meta Business Suite

1. Entra a [Meta Business Suite](https://business.facebook.com/) → **Todas
   las herramientas → Leads** (o directo desde el formulario del anuncio en
   Ads Manager → Publishing Tools → Instant Forms → Download).
2. Exporta el CSV del rango de fechas que necesites. El export viene con
   headers en español: `Correo electrónico`, `Nombre`, `Teléfono`,
   `Fecha de creación` (además de otras columnas que el script ignora).
3. Guárdalo donde sea de tu máquina (ej. `~/Downloads/`) — **no lo pongas
   dentro del repo**, tiene datos personales reales y `*.csv` está en
   `.gitignore` como red de seguridad, pero evita depender de eso.

## Cómo correrlo

Corre los comandos **desde la raíz del repo** (el script lee `.env.local`
de forma relativa al directorio desde donde se invoca `node`, no de su
propia carpeta):

1. Simulación, sin tocar la base de datos:

   ```
   node scripts/leads-facebook/importar-leads-facebook-csv.mjs "ruta/al/export.csv" --dry-run
   ```

   Lee el resumen: cuántos se leyeron, cuántos ya existen (por email),
   cuántos chocan por teléfono contra la BD (requieren revisión manual) y
   cuántos se insertarían limpios.
2. Si el resumen se ve bien, corre el import real (mismo comando sin `--dry-run`):

   ```
   node scripts/leads-facebook/importar-leads-facebook-csv.mjs "ruta/al/export.csv"
   ```

3. Verifica en Supabase:

   ```sql
   SELECT COUNT(*) FROM prospectos WHERE fuente = 'facebook_lead_ad';
   ```

## Columnas que espera el CSV

El script detecta columnas por **nombre de header**, no por posición, así
que tolera variantes en español/inglés. Necesita poder identificar:

| Campo | Headers reconocidos (normalizados: minúsculas, sin acentos/espacios) |
|---|---|
| Email (obligatorio) | `email`, `correo`, `correo electrónico` |
| Nombre | `nombre`, `name`, `full_name` |
| Teléfono | `telefono`, `teléfono`, `phone`, `phone_number`, `celular`, `whatsapp` |
| Fecha de creación | `fecha de creación`, `fecha`, `created_time` |

Si no encuentra columna de email, el script se detiene con error — sin
email no hay forma de deduplicar de forma confiable.

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
