import { notFound } from "next/navigation"
import Link from "next/link"
import {
  MapPin, Star, ShieldCheck, Phone, MessageCircle,
  Globe, GraduationCap, Briefcase, ArrowLeft, Mail,
} from "lucide-react"
import { prisma } from "@/lib/prisma"

const displayFont = { fontFamily: "var(--font-cormorant)" }

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

export default async function AbogadoPerfilPage(props: PageProps<'/abogados/[slug]'>) {
  const { slug } = await props.params
  const lawyer = await getLawyer(slug)
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
            <div className="w-16 h-16 rounded-xl bg-[rgba(196,154,60,0.1)] border border-[rgba(196,154,60,0.3)] flex items-center justify-center flex-shrink-0">
              <span className="text-2xl font-semibold text-[#C49A3C]" style={displayFont}>
                {initials}
              </span>
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
                  <a
                    href={`https://wa.me/${lawyer.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-[#22C55E]/10 border border-[#22C55E]/25 text-[#16A34A] hover:bg-[#22C55E]/20 text-sm font-medium py-2.5 px-4 rounded-xl transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Escribir por WhatsApp
                  </a>
                )}
                {lawyer.phone && (
                  <a
                    href={`tel:${lawyer.phone}`}
                    className="flex items-center justify-center gap-2 w-full border border-[#EAE4D9] text-[#0C0D10]/70 hover:border-[#C49A3C] hover:text-[#C49A3C] text-sm font-medium py-2.5 px-4 rounded-xl transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    {lawyer.phone}
                  </a>
                )}
                <button className="flex items-center justify-center gap-2 w-full border border-[#EAE4D9] text-[#0C0D10]/70 hover:border-[#C49A3C] hover:text-[#C49A3C] text-sm font-medium py-2.5 px-4 rounded-xl transition-colors">
                  <Mail className="w-4 h-4" />
                  Enviar mensaje
                </button>
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
