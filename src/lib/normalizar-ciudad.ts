// Normalización de Lawyer.city para agrupar las páginas combo SEO
// (ciudad+especialidad). El campo `city` es texto libre capturado en el
// registro, así que llega con acentos/mayúsculas inconsistentes y, en
// algunos casos, el mismo lugar escrito de formas distintas.
//
// TODO: migrar a catálogo City (tabla + Lawyer.cityId FK) cuando se
// construya el selector de ciudades en el formulario de registro — este
// mapa de alias es la solución rápida mientras el registro siga siendo
// un campo de texto libre. Ver LEXIA_CONTEXT.md, sección del rediseño de
// combos, para el detalle de la decisión.
//
// Para agregar una ciudad nueva: solo agrega sus variantes conocidas al
// arreglo correspondiente de abajo. Si es zona metropolitana de CDMX,
// agrégala a CDMX_METRO. Si es otro lugar con más de una forma de
// escritura, dale su propia entrada en OTRAS_VARIANTES.

// ─── Zona metro de Ciudad de México ────────────────────────────────────────
// Todo esto se agrupa en una sola página combo ("ciudad-de-mexico"): la
// ciudad propiamente + alcaldías + municipios conurbados del Edomex.
const CDMX_METRO = [
  "ciudad de mexico", "mexico", "cdmx", "cd. mexico",
  "coyoacan", "xochimilco", "miguel hidalgo",
  "ecatepec", "ecatepec de morelos",
  "coacalco", "coacalco de berriozabal",
  "cuautitlan izcalli", "naucalpan", "tlalnepantla",
  "chalco", "tultepec", "ciudad lopez mateos",
]

// ─── Otras ciudades con más de una forma de escritura ──────────────────────
// (mismo lugar, sin plegar a CDMX — quedan con su propia página combo)
const OTRAS_VARIANTES: Record<string, string[]> = {
  cancun: ["cancun", "cancun q.roo"],
  "ciudad-juarez": ["ciudad juarez", "juarez"],
}

// ─── Solo limpieza de puntuación/formato (no fusiona con nada más) ─────────
const LIMPIEZA_SIMPLE: Record<string, string> = {
  "san martin texmelucan.": "san-martin-texmelucan",
}

// ─── Excluidos a propósito ──────────────────────────────────────────────────
// Datos sucios o ambiguos: NO se les inventa una ciudad. Se excluyen de
// los combos y quedan pendientes de contactar al abogado para confirmar.
// El match de "Mexico" + state="México" es un caso especial: el texto
// solo no basta para saber si es CDMX o un municipio del Edomex sin
// nombre — se valida junto con el estado, no solo con la ciudad.
function esExcluido(cityRaw: string, stateRaw: string): boolean {
  const city = cityRaw.trim()
  const cityNorm = quitarAcentos(city.toLowerCase())
  if (city === "Ce") return true
  if (cityNorm === "estado de mexico") return true
  if (cityNorm === "todos los municipios del estado de mexico.") return true
  if (/torres/i.test(city)) return true
  if (city === "Mexico" && stateRaw === "México") return true
  return false
}

function quitarAcentos(s: string): string {
  return s
    .replace(/á/g, "a").replace(/é/g, "e").replace(/í/g, "i")
    .replace(/ó/g, "o").replace(/ú/g, "u").replace(/ñ/g, "n").replace(/ü/g, "u")
}

function aSlug(s: string): string {
  return s.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
}

/**
 * Normaliza Lawyer.city + Lawyer.state al bucket usado para generar las
 * páginas combo. Devuelve null si el dato es sucio/ambiguo (a propósito,
 * no se adivina una ciudad).
 */
export function normalizarCiudad(cityRaw: string, stateRaw: string): string | null {
  if (esExcluido(cityRaw, stateRaw)) return null

  const norm = quitarAcentos(cityRaw.trim().toLowerCase())

  if (LIMPIEZA_SIMPLE[norm]) return LIMPIEZA_SIMPLE[norm]
  if (CDMX_METRO.includes(norm)) return "ciudad-de-mexico"

  for (const [bucket, variantes] of Object.entries(OTRAS_VARIANTES)) {
    if (variantes.includes(norm)) return bucket
  }

  return aSlug(norm)
}
