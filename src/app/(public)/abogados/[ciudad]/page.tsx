import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
  MapPin, Star, ShieldCheck, Phone, MessageCircle,
  Globe, GraduationCap, Briefcase, ArrowLeft, Mail, ChevronRight,
} from "lucide-react"
import ContactButton from "@/components/ContactButton"
import { prisma } from "@/lib/prisma"
import {
  CIUDADES,
  CITY_SLUGS,
  ESPECIALIDADES,
  getCiudadesCercanas,
  type CiudadData,
} from "@/lib/seo-data"

const displayFont = { fontFamily: "var(--font-cormorant)" }

// ─── Lawyer helpers ───────────────────────────────────────────────────────────

async function getLawyer(slug: string) {
  return prisma.lawyer.findUnique({
    where: { slug, isActive: true },
    include: {
      specialties: { include: { specialty: true }, orderBy: { isPrimary: "desc" } },
      reviews: { where: { isVisible: true }, include: { user: true } },
      memberships: { include: { plan: true }, orderBy: { createdAt: "desc" }, take: 1 },
    },
  })
}

function avgRating(reviews: { rating: number }[]) {
  if (!reviews.length) return 0
  return reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
}

// ─── Types ────────────────────────────────────────────────────────────────────

type Props = { params: Promise<{ ciudad: string }> }

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ciudad } = await params

  if (CITY_SLUGS.has(ciudad)) {
    const c = CIUDADES[ciudad]
    const title = `Abogados en ${c.nombre} | Lexia`
    const description = `Encuentra abogados verificados en ${c.nombre}, ${c.estado}. Derecho familiar, penal, laboral, civil y más. Contacto directo sin intermediarios.`.slice(0, 155)
    return {
      title,
      description,
      openGraph: {
        title,
        description: `Directorio de abogados en ${c.nombre}, ${c.estado}`,
        url: `https://lexiamx.com/abogados/${ciudad}`,
        type: "website",
      },
      alternates: { canonical: `https://lexiamx.com/abogados/${ciudad}` },
    }
  }

  // Lawyer profile metadata
  const lawyer = await getLawyer(ciudad)
  if (!lawyer) return { title: "Abogado no encontrado | Lexia" }

  const primarySpecialty =
    lawyer.specialties.find((s) => s.isPrimary)?.specialty.name ??
    lawyer.specialties[0]?.specialty.name ?? "Abogado"

  return {
    title: `${lawyer.name} — ${primarySpecialty} en ${lawyer.city} | Lexia`,
    description:
      lawyer.bio?.slice(0, 155) ??
      `Perfil de ${lawyer.name}, abogado de ${primarySpecialty} en ${lawyer.city}, ${lawyer.state}. Contacto directo en Lexia.`,
    alternates: { canonical: `https://lexiamx.com/abogados/${ciudad}` },
  }
}

// ─── Static params (cities only; lawyer slugs rendered on demand) ─────────────

export async function generateStaticParams() {
  return Array.from(CITY_SLUGS).map((slug) => ({ ciudad: slug }))
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function Page({ params }: Props) {
  const { ciudad } = await params

  if (CITY_SLUGS.has(ciudad)) {
    return <CiudadPage slug={ciudad} />
  }

  // Lawyer profile
  const lawyer = await getLawyer(ciudad)
  if (!lawyer) notFound()

  const avg = avgRating(lawyer.reviews)
  const primarySpecialty =
    lawyer.specialties.find((s) => s.isPrimary)?.specialty.name ??
    lawyer.specialties[0]?.specialty.name
  const initials = lawyer.name
    .replace(/^Lic\.\s*/i, "")
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
  const planName = lawyer.memberships[0]?.plan.name ?? "Básico"
  const isPremium = planName === "Premium" || planName === "Despacho"

  return (
    <main className="min-h-screen bg-[#FAF7F2]">
      {/* Hero header */}
      <div className="bg-[#1A1C26] border-b border-white/8">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-8">
          <Link
            href="/abogados"
            className="inline-flex items-center gap-1.5 text-xs text-[#FAF7F2]/40 hover:text-[#C49A3C] transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Directorio de abogados
          </Link>

          <div className="flex gap-5 items-start">
            <div className="w-20 h-20 rounded-xl bg-[rgba(196,154,60,0.1)] border border-[rgba(196,154,60,0.3)] flex items-center justify-center flex-shrink-0 overflow-hidden">
              {lawyer.photoUrl ? (
                <Image
                  src={lawyer.photoUrl}
                  alt={lawyer.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-2xl font-semibold text-[#C49A3C]" style={displayFont}>
                  {initials}
                </span>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl md:text-3xl text-[#FAF7F2] leading-tight" style={displayFont}>
                  {lawyer.name}
                </h1>
                {lawyer.isVerified && (
                  <span className="inline-flex items-center gap-1.5 bg-[rgba(196,154,60,0.15)] border border-[rgba(196,154,60,0.3)] rounded-full px-3 py-1 text-xs text-[#C49A3C] flex-shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Cédula verificada
                  </span>
                )}
                {isPremium && (
                  <span className="text-[10px] font-semibold tracking-widest uppercase text-[#C49A3C] bg-[rgba(196,154,60,0.1)] px-2 py-0.5 rounded-full">
                    Destacado
                  </span>
                )}
              </div>

              <p className="text-[#C49A3C] text-sm font-medium mt-1">{primarySpecialty}</p>

              <div className="flex items-center gap-4 mt-2 flex-wrap">
                <div className="flex items-center gap-1 text-[#FAF7F2]/40 text-sm">
                  <MapPin className="w-3.5 h-3.5" />
                  {lawyer.city}, {lawyer.state}
                </div>
                {lawyer.yearsExperience && (
                  <div className="flex items-center gap-1 text-[#FAF7F2]/40 text-sm">
                    <Briefcase className="w-3.5 h-3.5" />
                    {lawyer.yearsExperience} años de experiencia
                  </div>
                )}
                {lawyer.reviews.length > 0 && (
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star
                        key={n}
                        className={`w-3.5 h-3.5 ${n <= Math.round(avg) ? "fill-amber-400 text-amber-400" : "text-[#FAF7F2]/20 fill-[#FAF7F2]/20"}`}
                      />
                    ))}
                    <span className="text-xs font-semibold text-[#FAF7F2]/70 ml-1">{avg.toFixed(1)}</span>
                    <span className="text-xs text-[#FAF7F2]/30 ml-0.5">({lawyer.reviews.length})</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-5">
            {lawyer.bio && (
              <div className="bg-white border border-[#EAE4D9] rounded-2xl p-6">
                <h2 className="text-lg text-[#0C0D10] mb-3" style={displayFont}>Sobre mí</h2>
                <p className="text-[#0C0D10]/65 leading-relaxed text-sm">{lawyer.bio}</p>
              </div>
            )}

            <div className="bg-white border border-[#EAE4D9] rounded-2xl p-6">
              <h2 className="text-lg text-[#0C0D10] mb-4" style={displayFont}>Especialidades</h2>
              <div className="flex flex-wrap gap-2">
                {lawyer.specialties.map((s) => (
                  <Link
                    key={s.specialtyId}
                    href={`/abogados?especialidad=${encodeURIComponent(s.specialty.name)}`}
                    className={`text-sm px-3 py-1 rounded-full transition-colors ${
                      s.isPrimary
                        ? "bg-[rgba(196,154,60,0.12)] text-[#C49A3C] border border-[rgba(196,154,60,0.3)] hover:bg-[rgba(196,154,60,0.2)]"
                        : "bg-[#F5F0E8] text-[#0C0D10]/60 border border-[#EAE4D9] hover:border-[#C49A3C] hover:text-[#C49A3C]"
                    }`}
                  >
                    {s.specialty.name}
                  </Link>
                ))}
              </div>
            </div>

            {(lawyer.university || lawyer.cedula) && (
              <div className="bg-white border border-[#EAE4D9] rounded-2xl p-6">
                <h2 className="text-lg text-[#0C0D10] mb-5" style={displayFont}>Formación</h2>
                <div className="space-y-4">
                  {lawyer.university && (
                    <div className="flex gap-4">
                      <div className="w-9 h-9 bg-[#FAF7F2] border border-[#EAE4D9] rounded-lg flex items-center justify-center flex-shrink-0">
                        <GraduationCap className="w-4 h-4 text-[#C49A3C]" />
                      </div>
                      <div>
                        <p className="font-medium text-[#0C0D10] text-sm">Licenciatura en Derecho</p>
                        <p className="text-[#0C0D10]/50 text-xs">{lawyer.university}</p>
                        {lawyer.graduationYear && (
                          <p className="text-[#0C0D10]/35 text-xs mt-0.5">Generación {lawyer.graduationYear}</p>
                        )}
                      </div>
                    </div>
                  )}
                  {lawyer.cedula && (
                    <div className="flex gap-4">
                      <div className="w-9 h-9 bg-[#FAF7F2] border border-[rgba(196,154,60,0.3)] rounded-lg flex items-center justify-center flex-shrink-0">
                        <ShieldCheck className="w-4 h-4 text-[#C49A3C]" />
                      </div>
                      <div>
                        <p className="font-medium text-[#0C0D10] text-sm">Cédula Profesional SEP</p>
                        <p className="text-[#0C0D10]/50 text-xs font-mono tracking-wide mt-0.5">{lawyer.cedula}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="bg-white border border-[#EAE4D9] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg text-[#0C0D10]" style={displayFont}>
                  Reseñas {lawyer.reviews.length > 0 && `(${lawyer.reviews.length})`}
                </h2>
                {lawyer.reviews.length > 0 && (
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span className="font-semibold text-[#0C0D10] text-sm">{avg.toFixed(1)}</span>
                  </div>
                )}
              </div>

              {lawyer.reviews.length === 0 ? (
                <p className="text-[#0C0D10]/35 text-sm">Aún sin reseñas. ¡Sé el primero en opinar!</p>
              ) : (
                <div className="space-y-5">
                  {lawyer.reviews.map((r, i) => (
                    <div key={r.id}>
                      {i > 0 && <div className="h-px bg-[#EAE4D9] mb-5" />}
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-medium text-[#0C0D10] text-sm">
                          {r.user?.name ?? "Anónimo"}
                        </span>
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((n) => (
                            <Star
                              key={n}
                              className={`w-3.5 h-3.5 ${n <= r.rating ? "fill-amber-400 text-amber-400" : "text-[#EAE4D9] fill-[#EAE4D9]"}`}
                            />
                          ))}
                        </div>
                      </div>
                      {r.comment && (
                        <p className="text-[#0C0D10]/55 text-sm leading-relaxed">{r.comment}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">
            <div className="bg-white border border-[#EAE4D9] rounded-2xl p-5 sticky top-20">
              <h3 className="text-lg text-[#0C0D10] mb-5" style={displayFont}>Contactar</h3>

              <div className="space-y-2.5">
                {lawyer.whatsapp && (
                  <ContactButton
                    lawyerId={lawyer.id}
                    lawyerName={lawyer.name}
                    type="WHATSAPP"
                    href={`https://wa.me/${lawyer.whatsapp}?text=${encodeURIComponent(`Hola ${lawyer.name}, te contacto desde Lexia. Me gustaría obtener información sobre tus servicios legales.`)}`}
                    label="Escribir por WhatsApp"
                    variant="whatsapp"
                    className="w-full text-sm font-medium py-2.5 px-4 rounded-xl"
                  />
                )}
                {lawyer.phone && (
                  <ContactButton
                    lawyerId={lawyer.id}
                    lawyerName={lawyer.name}
                    type="CALL"
                    href={`tel:${lawyer.phone}`}
                    label={lawyer.phone}
                    variant="phone"
                    className="w-full text-sm font-medium py-2.5 px-4 rounded-xl"
                  />
                )}
                {lawyer.email && (
                  <ContactButton
                    lawyerId={lawyer.id}
                    lawyerName={lawyer.name}
                    type="EMAIL"
                    href={`mailto:${lawyer.email}?subject=Consulta desde Lexia&body=${encodeURIComponent(`Hola ${lawyer.name},\n\nTe contacto desde Lexia. Me gustaría obtener información sobre tus servicios legales.\n\nGracias.`)}`}
                    label="Enviar mensaje"
                    variant="email"
                    className="w-full text-sm font-medium py-2.5 px-4 rounded-xl"
                  />
                )}
              </div>

              <div className="h-px bg-[#EAE4D9] my-4" />

              <div className="space-y-2">
                {lawyer.website && (
                  <a
                    href={`https://${lawyer.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-[#0C0D10]/45 hover:text-[#C49A3C] transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5 flex-shrink-0" />
                    {lawyer.website}
                  </a>
                )}
                {lawyer.linkedin && (
                  <a
                    href={`https://${lawyer.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-[#0C0D10]/45 hover:text-[#C49A3C] transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5 flex-shrink-0" />
                    LinkedIn
                  </a>
                )}
              </div>

              <p className="text-[#0C0D10]/25 text-[11px] text-center mt-4">
                Lexia no cobra comisiones por contacto
              </p>
            </div>

            <div className="bg-white border border-[#EAE4D9] rounded-2xl p-5">
              <h3 className="text-base text-[#0C0D10] mb-3" style={displayFont}>Abogados similares</h3>
              <Link
                href={`/abogados?especialidad=${encodeURIComponent(primarySpecialty ?? "")}`}
                className="text-[#C49A3C] text-sm hover:text-[#E2B865] transition-colors"
              >
                Ver más {primarySpecialty} →
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}

// ─── City SEO page component ──────────────────────────────────────────────────

function CiudadPage({ slug }: { slug: string }) {
  const c = CIUDADES[slug] as CiudadData
  const especialidades = Object.values(ESPECIALIDADES)
  const cercanas = getCiudadesCercanas(slug)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: `Abogados en ${c.nombre}`,
    description: `Directorio de abogados verificados en ${c.nombre}, ${c.estado}. Derecho familiar, penal, laboral, civil y más.`,
    areaServed: {
      "@type": "City",
      name: c.nombreCompleto,
      containedInPlace: {
        "@type": "State",
        name: c.estado,
        containedInPlace: { "@type": "Country", name: "México" },
      },
    },
    url: `https://lexiamx.com/abogados/${slug}`,
  }

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://lexiamx.com" },
      { "@type": "ListItem", position: 2, name: "Abogados", item: "https://lexiamx.com/abogados" },
      { "@type": "ListItem", position: 3, name: c.nombre, item: `https://lexiamx.com/abogados/${slug}` },
    ],
  }

  const faqsData = [
    {
      pregunta: `¿Cómo encuentro un abogado confiable en ${c.nombre}?`,
      respuesta: `En Lexia puedes buscar abogados verificados en ${c.nombre} por especialidad. Todos los perfiles incluyen cédula profesional, reseñas de clientes y datos de contacto directo. Recomendamos revisar la especialidad del abogado, sus años de experiencia y las opiniones de otros clientes antes de tomar una decisión.`,
    },
    {
      pregunta: `¿Cuánto cobra un abogado en ${c.nombre}?`,
      respuesta: `Los honorarios de los abogados en ${c.nombre} varían según la especialidad y la complejidad del caso. Una consulta inicial puede costar entre $500 y $2,000 pesos. Los asuntos laborales, familiares o penales pueden involucrar honorarios desde $5,000 hasta $50,000 o más dependiendo del procedimiento. Te recomendamos solicitar una primera consulta para obtener un presupuesto preciso.`,
    },
    {
      pregunta: `¿Los abogados en Lexia de ${c.nombre} están verificados?`,
      respuesta: `Sí. Lexia verifica la cédula profesional de los abogados registrados en nuestra plataforma a través de la Dirección General de Profesiones de la SEP. Los perfiles con el sello de verificación han acreditado que cuentan con título y cédula legalmente expedidos. Esto te da certeza sobre la formación y habilitación del profesionista.`,
    },
    {
      pregunta: `¿Puedo contactar directamente a un abogado en ${c.nombre} desde Lexia?`,
      respuesta: `Sí. Los perfiles de abogados en ${c.nombre} incluyen teléfono, WhatsApp y correo electrónico para contacto directo. Lexia no intermedia ni cobra comisión por el contacto: la relación profesional es directamente entre tú y el abogado. Esto significa que los honorarios son acordados libremente entre ambas partes.`,
    },
  ]

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqsData.map((f) => ({
      "@type": "Question",
      name: f.pregunta,
      acceptedAnswer: { "@type": "Answer", text: f.respuesta },
    })),
  }

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      {/* Hero */}
      <div className="bg-[#1A1C26] border-b border-white/8">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-[#FAF7F2]/35 mb-6">
            <Link href="/" className="hover:text-[#C49A3C] transition-colors">Inicio</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/abogados" className="hover:text-[#C49A3C] transition-colors">Abogados</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#FAF7F2]/60">{c.nombre}</span>
          </nav>

          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-5 h-5 text-[#C49A3C]" />
            <span className="text-[#C49A3C] text-sm font-medium tracking-wide uppercase">{c.estado}</span>
          </div>

          <h1 className="text-4xl md:text-5xl text-[#FAF7F2] leading-tight mb-4" style={displayFont}>
            Abogados en {c.nombre}
          </h1>

          <p className="text-[#FAF7F2]/55 text-base max-w-2xl leading-relaxed">
            Directorio de abogados verificados en {c.nombreCompleto}. Contacto directo, sin intermediarios.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-10 space-y-10">

        {/* City description */}
        <section className="bg-white border border-[#EAE4D9] rounded-2xl p-8">
          <h2 className="text-2xl text-[#0C0D10] mb-5" style={displayFont}>
            Servicios jurídicos en {c.nombre}
          </h2>
          <div className="space-y-3 text-[#0C0D10]/65 leading-relaxed text-sm">
            <p>{c.contexto}</p>
            <p>{c.contextoEconomico}</p>
            <p>
              Lexia es el directorio de abogados verificados más completo para {c.nombre} y el estado de {c.estado}.
              Todos los perfiles incluyen cédula profesional validada, reseñas de clientes reales y datos de contacto
              directo. Puedes buscar por especialidad, filtrar por experiencia y comunicarte sin intermediarios con
              el abogado que mejor se adapte a tu situación.
            </p>
          </div>
        </section>

        {/* Specialties grid */}
        <section>
          <h2 className="text-2xl text-[#0C0D10] mb-6" style={displayFont}>
            Especialidades en {c.nombre}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {especialidades.map((e) => (
              <Link
                key={e.slug}
                href={`/abogados/${slug}/${e.slug}`}
                className="group bg-white border border-[#EAE4D9] rounded-xl p-4 hover:border-[#C49A3C] hover:shadow-sm transition-all"
              >
                <p className="font-medium text-[#0C0D10] text-sm group-hover:text-[#C49A3C] transition-colors" style={displayFont}>
                  {e.nombre}
                </p>
                <p className="text-[#0C0D10]/40 text-xs mt-1 leading-snug">{e.descripcion}</p>
                <span className="inline-flex items-center gap-0.5 text-[#C49A3C] text-xs mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  Ver abogados <ChevronRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white border border-[#EAE4D9] rounded-2xl p-8">
          <h2 className="text-2xl text-[#0C0D10] mb-7" style={displayFont}>
            Preguntas frecuentes sobre abogados en {c.nombre}
          </h2>
          <div className="space-y-6">
            {faqsData.map((faq, i) => (
              <div key={i} className={i > 0 ? "pt-6 border-t border-[#EAE4D9]" : ""}>
                <h3 className="font-medium text-[#0C0D10] text-sm mb-2">{faq.pregunta}</h3>
                <p className="text-[#0C0D10]/60 text-sm leading-relaxed">{faq.respuesta}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Nearby cities */}
        {cercanas.length > 0 && (
          <section>
            <h2 className="text-xl text-[#0C0D10] mb-4" style={displayFont}>
              Abogados en ciudades cercanas
            </h2>
            <div className="flex flex-wrap gap-3">
              {cercanas.map((ciudad) => (
                <Link
                  key={ciudad.slug}
                  href={`/abogados/${ciudad.slug}`}
                  className="flex items-center gap-2 bg-white border border-[#EAE4D9] rounded-xl px-4 py-2.5 text-sm text-[#0C0D10]/70 hover:border-[#C49A3C] hover:text-[#C49A3C] transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  {ciudad.nombre}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="bg-[#1A1C26] border border-[rgba(196,154,60,0.2)] rounded-2xl p-8 text-center">
          <h2 className="text-2xl text-[#FAF7F2] mb-3" style={displayFont}>
            ¿Eres abogado en {c.nombre}?
          </h2>
          <p className="text-[#FAF7F2]/50 text-sm mb-6 max-w-md mx-auto">
            Registra tu perfil gratis en Lexia y conecta con clientes en {c.nombre} y el estado de {c.estado}.
            Sin comisiones. Contacto directo.
          </p>
          <Link
            href="/registro"
            className="inline-flex items-center gap-2 bg-[#C49A3C] hover:bg-[#E2B865] text-[#0C0D10] font-semibold text-sm px-6 py-3 rounded-xl transition-colors"
          >
            Registra tu perfil gratis
          </Link>
        </section>
      </div>
    </main>
  )
}
