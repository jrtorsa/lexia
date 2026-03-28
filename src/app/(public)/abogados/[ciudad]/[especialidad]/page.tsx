import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { MapPin, ChevronRight, Scale, MessageCircle, ArrowRight } from "lucide-react"
import {
  CIUDADES,
  ESPECIALIDADES,
  CITY_SLUGS,
  getCiudadesCercanas,
  getComboContent,
} from "@/lib/seo-data"

const displayFont = { fontFamily: "var(--font-cormorant)" }

// ─── Types ────────────────────────────────────────────────────────────────────

type Props = { params: Promise<{ ciudad: string; especialidad: string }> }

// ─── Static params ────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const combos: { ciudad: string; especialidad: string }[] = []
  for (const ciudadSlug of Array.from(CITY_SLUGS)) {
    for (const especSlug of Object.keys(ESPECIALIDADES)) {
      combos.push({ ciudad: ciudadSlug, especialidad: especSlug })
    }
  }
  return combos
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ciudad, especialidad } = await params

  const c = CIUDADES[ciudad]
  const e = ESPECIALIDADES[especialidad]
  if (!c || !e) return { title: "Página no encontrada | Lexia" }

  const title = `Abogados de ${e.nombre} en ${c.nombre} | Lexia`
  const description = `Encuentra abogados especializados en ${e.nombre} en ${c.nombre}, ${c.estado}. ${e.descripcion}. Cédula verificada, contacto directo.`.slice(0, 155)

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://lexiamx.com/abogados/${ciudad}/${especialidad}`,
      type: "website",
    },
    alternates: { canonical: `https://lexiamx.com/abogados/${ciudad}/${especialidad}` },
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function Page({ params }: Props) {
  const { ciudad: ciudadSlug, especialidad: especSlug } = await params

  const c = CIUDADES[ciudadSlug]
  const e = ESPECIALIDADES[especSlug]

  if (!c || !e) notFound()

  const combo = getComboContent(ciudadSlug, especSlug)
  const cercanas = getCiudadesCercanas(ciudadSlug)
  const otrasEspecialidades = Object.values(ESPECIALIDADES).filter((x) => x.slug !== especSlug)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: `Abogados de ${e.nombre} en ${c.nombre}`,
    description: `Directorio de abogados especializados en ${e.nombre} en ${c.nombre}, ${c.estado}.`,
    areaServed: {
      "@type": "City",
      name: c.nombreCompleto,
      containedInPlace: {
        "@type": "State",
        name: c.estado,
        containedInPlace: { "@type": "Country", name: "México" },
      },
    },
    serviceType: e.nombre,
    url: `https://lexiamx.com/abogados/${ciudadSlug}/${especSlug}`,
  }

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://lexiamx.com" },
      { "@type": "ListItem", position: 2, name: "Abogados", item: "https://lexiamx.com/abogados" },
      { "@type": "ListItem", position: 3, name: c.nombre, item: `https://lexiamx.com/abogados/${ciudadSlug}` },
      {
        "@type": "ListItem",
        position: 4,
        name: e.nombre,
        item: `https://lexiamx.com/abogados/${ciudadSlug}/${especSlug}`,
      },
    ],
  }

  const faqLd = combo.faqs.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: combo.faqs.map((f) => ({
          "@type": "Question",
          name: f.pregunta,
          acceptedAnswer: { "@type": "Answer", text: f.respuesta },
        })),
      }
    : null

  return (
    <main className="min-h-screen bg-[#FAF7F2]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}

      {/* Hero */}
      <div className="bg-[#1A1C26] border-b border-white/8">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-[#FAF7F2]/35 mb-6 flex-wrap">
            <Link href="/" className="hover:text-[#C49A3C] transition-colors">Inicio</Link>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <Link href="/abogados" className="hover:text-[#C49A3C] transition-colors">Abogados</Link>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <Link href={`/abogados/${ciudadSlug}`} className="hover:text-[#C49A3C] transition-colors">
              {c.nombre}
            </Link>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <span className="text-[#FAF7F2]/60">{e.nombre}</span>
          </nav>

          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5 bg-[rgba(196,154,60,0.12)] border border-[rgba(196,154,60,0.25)] rounded-full px-3 py-1 text-xs text-[#C49A3C]">
              <Scale className="w-3.5 h-3.5" />
              {e.nombre}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[#FAF7F2]/35 text-xs">
              <MapPin className="w-3.5 h-3.5" />
              {c.nombre}, {c.estado}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl text-[#FAF7F2] leading-tight mb-4" style={displayFont}>
            Abogados de {e.nombre} en {c.nombre}
          </h1>

          <p className="text-[#FAF7F2]/55 text-base max-w-2xl leading-relaxed">
            {e.descripcion}. Encuentra al especialista que necesitas en {c.nombre}, {c.estado}.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-10 space-y-10">

        {/* Main content card */}
        <section className="bg-white border border-[#EAE4D9] rounded-2xl p-8">
          <h2 className="text-2xl text-[#0C0D10] mb-5" style={displayFont}>
            {e.nombre} en {c.nombre}
          </h2>
          <div className="space-y-3 text-[#0C0D10]/65 leading-relaxed text-sm">
            <p>{combo.intro}</p>
            <p>{combo.detalle}</p>
            <p>{e.contenidoBase}</p>
          </div>
        </section>

        {/* CTA search */}
        <section className="bg-[rgba(196,154,60,0.06)] border border-[rgba(196,154,60,0.2)] rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-medium text-[#0C0D10] text-sm" style={displayFont}>
              Busca abogados de {e.nombre} en {c.nombre}
            </p>
            <p className="text-[#0C0D10]/50 text-xs mt-1">
              Perfiles verificados con cédula SEP. Contacto directo sin intermediarios.
            </p>
          </div>
          <Link
            href={`/abogados?ciudad=${encodeURIComponent(c.nombre)}&especialidad=${encodeURIComponent(e.nombre)}`}
            className="inline-flex items-center gap-2 bg-[#C49A3C] hover:bg-[#E2B865] text-[#0C0D10] font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors flex-shrink-0"
          >
            Ver abogados
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        {/* FAQs */}
        {combo.faqs.length > 0 && (
          <section className="bg-white border border-[#EAE4D9] rounded-2xl p-8">
            <h2 className="text-2xl text-[#0C0D10] mb-7" style={displayFont}>
              Preguntas frecuentes sobre {e.nombre} en {c.nombre}
            </h2>
            <div className="space-y-6">
              {combo.faqs.map((faq, i) => (
                <div key={i} className={i > 0 ? "pt-6 border-t border-[#EAE4D9]" : ""}>
                  <h3 className="font-medium text-[#0C0D10] text-sm mb-2">{faq.pregunta}</h3>
                  <p className="text-[#0C0D10]/60 text-sm leading-relaxed">{faq.respuesta}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Other specialties in this city */}
        <section>
          <h2 className="text-xl text-[#0C0D10] mb-5" style={displayFont}>
            Otras especialidades en {c.nombre}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {otrasEspecialidades.map((esp) => (
              <Link
                key={esp.slug}
                href={`/abogados/${ciudadSlug}/${esp.slug}`}
                className="group bg-white border border-[#EAE4D9] rounded-xl p-3 hover:border-[#C49A3C] transition-all"
              >
                <p className="font-medium text-[#0C0D10]/80 text-xs group-hover:text-[#C49A3C] transition-colors" style={displayFont}>
                  {esp.nombre}
                </p>
                <span className="inline-flex items-center gap-0.5 text-[#C49A3C] text-[10px] mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  Ver <ChevronRight className="w-2.5 h-2.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Same specialty in nearby cities */}
        {cercanas.length > 0 && (
          <section>
            <h2 className="text-xl text-[#0C0D10] mb-4" style={displayFont}>
              {e.nombre} en ciudades cercanas
            </h2>
            <div className="flex flex-wrap gap-3">
              {cercanas.map((ciudadCercana) => (
                <Link
                  key={ciudadCercana.slug}
                  href={`/abogados/${ciudadCercana.slug}/${especSlug}`}
                  className="flex items-center gap-2 bg-white border border-[#EAE4D9] rounded-xl px-4 py-2.5 text-sm text-[#0C0D10]/70 hover:border-[#C49A3C] hover:text-[#C49A3C] transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  {ciudadCercana.nombre}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA register */}
        <section className="bg-[#1A1C26] border border-[rgba(196,154,60,0.2)] rounded-2xl p-8 text-center">
          <h2 className="text-2xl text-[#FAF7F2] mb-3" style={displayFont}>
            ¿Eres abogado de {e.nombre} en {c.nombre}?
          </h2>
          <p className="text-[#FAF7F2]/50 text-sm mb-6 max-w-md mx-auto">
            Aparece en los resultados de búsqueda de Lexia para clientes en {c.nombre} que buscan especialistas en {e.nombre}.
            Registro gratuito, sin comisiones.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link
              href="/registro"
              className="inline-flex items-center gap-2 bg-[#C49A3C] hover:bg-[#E2B865] text-[#0C0D10] font-semibold text-sm px-6 py-3 rounded-xl transition-colors"
            >
              Registra tu perfil gratis
            </Link>
            <Link
              href={`/abogados?ciudad=${encodeURIComponent(c.nombre)}&especialidad=${encodeURIComponent(e.nombre)}`}
              className="inline-flex items-center gap-2 border border-[rgba(196,154,60,0.3)] text-[#FAF7F2]/70 hover:text-[#C49A3C] hover:border-[#C49A3C] font-medium text-sm px-6 py-3 rounded-xl transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Buscar abogados
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
