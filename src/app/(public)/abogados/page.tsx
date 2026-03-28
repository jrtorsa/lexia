import { Search, SlidersHorizontal, X } from "lucide-react"
import LawyerCard from "@/components/LawyerCard"
import { prisma } from "@/lib/prisma"
import type { Lawyer } from "@/lib/mock-lawyers"

const ESPECIALIDADES = [
  "Todas",
  "Derecho Familiar",
  "Derecho Penal",
  "Derecho Laboral",
  "Derecho Fiscal",
  "Derecho Civil",
  "Derecho Inmobiliario",
  "Derecho Mercantil",
  "Amparo",
]

const ESTADOS = [
  "Todos",
  "CDMX",
  "Ciudad de México",
  "Jalisco",
  "Nuevo León",
  "Puebla",
  "Baja California",
]

const displayFont = { fontFamily: "var(--font-cormorant)" }

interface PageProps {
  searchParams: Promise<{ especialidad?: string; estado?: string; q?: string }>
}

// Map DB lawyer to the shape LawyerCard expects
function toLawyerCard(l: Awaited<ReturnType<typeof fetchLawyers>>[number]): Lawyer {
  const plan = l.memberships[0]?.plan.name ?? "Básico"
  return {
    id: l.id,
    name: l.name,
    slug: l.slug,
    photoUrl: l.photoUrl,
    city: l.city,
    state: l.state,
    bio: l.bio ?? "",
    yearsExperience: l.yearsExperience ?? 0,
    isVerified: l.isVerified,
    cedula: l.cedula,
    university: l.university,
    graduationYear: l.graduationYear,
    phone: l.phone,
    whatsapp: l.whatsapp,
    website: l.website,
    linkedin: l.linkedin,
    specialties: l.specialties.map((s) => ({
      name: s.specialty.name,
      slug: s.specialty.slug,
      isPrimary: s.isPrimary,
    })),
    reviews: l.reviews.map((r) => ({
      rating: r.rating,
      comment: r.comment ?? null,
      autorNombre: r.user?.name ?? "Anónimo",
    })),
    membership: plan === "Premium" ? "premium" : plan === "Despacho" ? "despacho" : "free",
  }
}

async function fetchLawyers(filters: { especialidad?: string; estado?: string; q?: string }) {
  return prisma.lawyer.findMany({
    where: {
      isActive: true,
      ...(filters.especialidad && filters.especialidad !== "Todas"
        ? { specialties: { some: { specialty: { name: filters.especialidad } } } }
        : {}),
      ...(filters.estado && filters.estado !== "Todos"
        ? { OR: [{ state: filters.estado }, { city: filters.estado }] }
        : {}),
      ...(filters.q
        ? {
            OR: [
              { name: { contains: filters.q, mode: "insensitive" } },
              { city: { contains: filters.q, mode: "insensitive" } },
              { specialties: { some: { specialty: { name: { contains: filters.q, mode: "insensitive" } } } } },
            ],
          }
        : {}),
    },
    include: {
      specialties: { include: { specialty: true } },
      reviews: { include: { user: true } },
      memberships: { include: { plan: true }, orderBy: { createdAt: "desc" }, take: 1 },
    },
    orderBy: [
      { memberships: { _count: "desc" } },
      { createdAt: "desc" },
    ],
  })
}

export default async function AbogadosPage({ searchParams }: PageProps) {
  const { especialidad, estado, q } = await searchParams

  const rows = await fetchLawyers({ especialidad, estado, q })
  const sorted = rows
    .map(toLawyerCard)
    .sort((a, b) => {
      const order = { premium: 0, despacho: 0, free: 1 }
      return order[a.membership] - order[b.membership]
    })

  const hasFilters =
    !!(especialidad && especialidad !== "Todas") ||
    !!(estado && estado !== "Todos") ||
    !!q

  return (
    <main className="min-h-screen bg-[#FAF7F2]">
      {/* Page header */}
      <div className="bg-[#1A1C26] border-b border-white/8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
          <p className="text-[#C49A3C] text-xs font-semibold tracking-[0.22em] uppercase mb-3">
            Directorio
          </p>
          <h1
            className="text-3xl md:text-4xl text-[#FAF7F2] leading-tight"
            style={displayFont}
          >
            {sorted.length === 0
              ? "Sin resultados"
              : `${sorted.length} abogado${sorted.length !== 1 ? "s" : ""} disponible${sorted.length !== 1 ? "s" : ""}`}
          </h1>
          {(especialidad && especialidad !== "Todas") || (estado && estado !== "Todos") ? (
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              {especialidad && especialidad !== "Todas" && (
                <span className="text-xs bg-[rgba(196,154,60,0.15)] text-[#C49A3C] px-3 py-1 rounded-full">
                  {especialidad}
                </span>
              )}
              {estado && estado !== "Todos" && (
                <span className="text-xs bg-[rgba(196,154,60,0.15)] text-[#C49A3C] px-3 py-1 rounded-full">
                  {estado}
                </span>
              )}
            </div>
          ) : null}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-60 flex-shrink-0">
            <form
              method="GET"
              className="bg-white border border-[#EAE4D9] rounded-2xl p-5 space-y-6 sticky top-20"
            >
              <div>
                <label className="text-[11px] font-semibold text-[#0C0D10]/60 block mb-2 tracking-widest uppercase">
                  Buscar
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#0C0D10]/30" />
                  <input
                    name="q"
                    defaultValue={q ?? ""}
                    placeholder="Nombre, ciudad..."
                    className="w-full pl-8 pr-3 py-2 text-sm border border-[#EAE4D9] rounded-lg text-[#0C0D10] placeholder-[#0C0D10]/30 focus:outline-none focus:border-[#C49A3C] focus:ring-1 focus:ring-[rgba(196,154,60,0.2)] transition-colors bg-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#0C0D10]/60 block mb-3 tracking-widest uppercase">
                  Especialidad
                </label>
                <div className="space-y-1">
                  {ESPECIALIDADES.map((esp) => (
                    <label key={esp} className="flex items-center gap-2.5 cursor-pointer group py-0.5">
                      <input
                        type="radio"
                        name="especialidad"
                        value={esp}
                        defaultChecked={especialidad === esp || (!especialidad && esp === "Todas")}
                        className="w-3.5 h-3.5 accent-[#C49A3C]"
                      />
                      <span className="text-xs text-[#0C0D10]/60 group-hover:text-[#0C0D10] transition-colors">
                        {esp}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#0C0D10]/60 block mb-3 tracking-widest uppercase">
                  Estado
                </label>
                <div className="space-y-1">
                  {ESTADOS.map((est) => (
                    <label key={est} className="flex items-center gap-2.5 cursor-pointer group py-0.5">
                      <input
                        type="radio"
                        name="estado"
                        value={est}
                        defaultChecked={estado === est || (!estado && est === "Todos")}
                        className="w-3.5 h-3.5 accent-[#C49A3C]"
                      />
                      <span className="text-xs text-[#0C0D10]/60 group-hover:text-[#0C0D10] transition-colors">
                        {est}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#C49A3C] hover:bg-[#E2B865] text-[#0C0D10] font-semibold text-sm py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Aplicar filtros
              </button>

              {hasFilters && (
                <a
                  href="/abogados"
                  className="flex items-center justify-center gap-1.5 text-xs text-[#0C0D10]/40 hover:text-[#0C0D10]/70 transition-colors"
                >
                  <X className="w-3 h-3" />
                  Limpiar filtros
                </a>
              )}
            </form>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            {sorted.length === 0 ? (
              <div className="text-center py-24">
                <div className="text-5xl text-[#C49A3C]/20 mb-4" style={displayFont}>§</div>
                <p className="text-[#0C0D10]/40 text-base mb-3">
                  No se encontraron abogados con esos filtros.
                </p>
                <a href="/abogados" className="text-[#C49A3C] text-sm hover:text-[#E2B865] transition-colors">
                  Ver todos los abogados →
                </a>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {sorted.map((lawyer) => (
                  <LawyerCard key={lawyer.id} lawyer={lawyer} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
