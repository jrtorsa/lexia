import Link from "next/link"
import {
  Search, Users, ShieldCheck, Star, ArrowRight,
  Home, Briefcase, Scale, FileText, Heart,
  Building2, Globe, Lightbulb, Car, Landmark,
  CheckCircle2, MapPin, ChevronRight, Phone,
} from "lucide-react"
import { prisma } from "@/lib/prisma"

const df = { fontFamily: "var(--font-cormorant)" }

// ─── Data ─────────────────────────────────────────────────────────────────────
const ESPECIALIDADES = [
  { nombre: "Derecho Familiar",     slug: "familiar",     icon: Heart,     desc: "Divorcios, custodia, pensiones alimenticias" },
  { nombre: "Derecho Penal",        slug: "penal",        icon: ShieldCheck,desc: "Defensa penal, amparos, delitos del fuero" },
  { nombre: "Derecho Laboral",      slug: "laboral",      icon: Briefcase, desc: "Despidos injustificados, liquidaciones, IMSS" },
  { nombre: "Derecho Fiscal",       slug: "fiscal",       icon: FileText,  desc: "SAT, declaraciones, controversias fiscales" },
  { nombre: "Derecho Civil",        slug: "civil",        icon: Scale,     desc: "Contratos, herencias, testamentos, pagarés" },
  { nombre: "Derecho Inmobiliario", slug: "inmobiliario", icon: Home,      desc: "Compraventa, arrendamiento, escrituración" },
  { nombre: "Derecho Mercantil",    slug: "mercantil",    icon: Building2, desc: "Empresas, contratos comerciales, sociedades" },
  { nombre: "Amparo",               slug: "amparo",       icon: Landmark,  desc: "Amparo directo e indirecto ante tribunales" },
  { nombre: "Derecho Migratorio",   slug: "migratorio",   icon: Globe,     desc: "Visas, residencia, naturalización" },
  { nombre: "Prop. Intelectual",    slug: "pi",           icon: Lightbulb, desc: "Marcas, patentes, derechos de autor" },
  { nombre: "Derecho de Tránsito",  slug: "transito",     icon: Car,       desc: "Accidentes, multas, infracciones viales" },
  { nombre: "Derecho Corporativo",  slug: "corporativo",  icon: Users,     desc: "Fusiones, adquisiciones, gobierno corporativo" },
]

const CIUDADES = [
  { nombre: "Ciudad de México", slug: "cdmx",        count: "1,240+" },
  { nombre: "Guadalajara",      slug: "guadalajara",  count: "480+" },
  { nombre: "Monterrey",        slug: "monterrey",    count: "390+" },
  { nombre: "Puebla",           slug: "puebla",       count: "210+" },
  { nombre: "Tijuana",          slug: "tijuana",      count: "180+" },
  { nombre: "León",             slug: "leon",         count: "140+" },
  { nombre: "Querétaro",        slug: "queretaro",    count: "135+" },
  { nombre: "Mérida",           slug: "merida",       count: "120+" },
  { nombre: "San Luis Potosí",  slug: "san-luis-potosi", count: "110+" },
  { nombre: "Cancún",           slug: "cancun",       count: "95+"  },
  { nombre: "Chihuahua",        slug: "chihuahua",    count: "88+"  },
  { nombre: "Hermosillo",       slug: "hermosillo",   count: "72+"  },
]

const ESTADOS_MX = [
  "Aguascalientes","Baja California","Baja California Sur","Campeche",
  "Chiapas","Chihuahua","Ciudad de México","Coahuila","Colima",
  "Durango","Guanajuato","Guerrero","Hidalgo","Jalisco","México",
  "Michoacán","Morelos","Nayarit","Nuevo León","Oaxaca","Puebla",
  "Querétaro","Quintana Roo","San Luis Potosí","Sinaloa","Sonora",
  "Tabasco","Tamaulipas","Tlaxcala","Veracruz","Yucatán","Zacatecas",
]

const PLANES = [
  {
    nombre: "Básico", precio: "Gratis", periodo: "",
    desc: "Para empezar a recibir clientes",
    destacado: false,
    caracteristicas: ["Perfil público en el directorio", "Hasta 2 especialidades", "Contacto por formulario"],
    cta: "Crear perfil gratis", href: "/registro",
  },
  {
    nombre: "Premium", precio: "$599", periodo: "/mes MXN",
    desc: "Para abogados que quieren destacar",
    destacado: true,
    caracteristicas: ["Posición preferente en búsquedas", "WhatsApp directo", "Estadísticas de visitas", "Badge verificado", "Hasta 5 especialidades"],
    cta: "Empezar prueba gratis", href: "/registro?plan=premium",
  },
  {
    nombre: "Despacho", precio: "$1,499", periodo: "/mes MXN",
    desc: "Para despachos con varios socios",
    destacado: false,
    caracteristicas: ["Hasta 5 abogados del despacho", "Página unificada del despacho", "Soporte prioritario"],
    cta: "Contactar ventas", href: "/contacto?plan=despacho",
  },
]

// ─── Featured lawyers ─────────────────────────────────────────────────────────
async function getFeaturedLawyers() {
  try {
    return await prisma.lawyer.findMany({
      where: { isActive: true },
      include: {
        specialties: { include: { specialty: true }, where: { isPrimary: true }, take: 1 },
        reviews: { where: { isVisible: true } },
        memberships: { include: { plan: true }, orderBy: { createdAt: "desc" }, take: 1 },
      },
      orderBy: { createdAt: "desc" },
      take: 6,
    })
  } catch {
    return []
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function HomePage() {
  const lawyers = await getFeaturedLawyers()

  return (
    <div className="bg-[#FAF7F2]">
      <Hero />
      <StatsBar />
      <EspecialidadesSection />
      <ComoFunciona />
      <CiudadesSection />
      {lawyers.length > 0 && <AbogadosDestacados lawyers={lawyers} />}
      <ParaAbogados />
      <PlanesSection />
      <CTAFinal />
    </div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      className="relative pt-24 pb-20 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #0C0D10 0%, #1A1C26 60%, #141620 100%)" }}
    >
      {/* Gold radial glows */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full"
        style={{ background: "radial-gradient(ellipse, rgba(196,154,60,0.10) 0%, transparent 70%)" }} />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[500px] h-[400px]"
        style={{ background: "radial-gradient(ellipse at bottom right, rgba(196,154,60,0.06) 0%, transparent 70%)" }} />

      {/* Subtle grid texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: "linear-gradient(#C49A3C 1px, transparent 1px), linear-gradient(90deg, #C49A3C 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-7 animate-fade-up animate-fade-up-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C49A3C] animate-gold-pulse" />
          <span className="text-xs font-medium tracking-widest uppercase text-[#C49A3C]">
            El directorio jurídico de México
          </span>
        </div>

        {/* Headline */}
        <h1
          className="text-5xl sm:text-6xl lg:text-7xl font-light leading-[1.08] tracking-tight text-white mb-5 animate-fade-up animate-fade-up-2"
          style={df}
        >
          El abogado que necesitas,
          <br />
          <em className="italic" style={{ color: "#E2B865" }}>cuando lo necesitas</em>
        </h1>

        <p className="text-[#FAF7F2]/55 text-lg max-w-xl mx-auto mb-10 animate-fade-up animate-fade-up-3">
          Conectamos a personas y empresas con los mejores abogados de México.
          Sin intermediarios. Sin costos ocultos.
        </p>

        {/* Search box */}
        <form
          action="/abogados"
          method="GET"
          className="animate-fade-up animate-fade-up-4 max-w-2xl mx-auto"
        >
          <div className="flex flex-col sm:flex-row gap-2 bg-white/8 backdrop-blur-sm border border-white/12 rounded-2xl p-2">
            {/* Keyword */}
            <div className="flex-1 flex items-center gap-3 bg-white rounded-xl px-4 py-3">
              <Search className="w-4 h-4 text-[#C49A3C] flex-shrink-0" />
              <input
                name="q"
                placeholder="¿Qué tipo de asunto legal tienes?"
                className="flex-1 text-sm text-[#0C0D10] placeholder-slate-400 bg-transparent outline-none min-w-0"
              />
            </div>

            {/* State */}
            <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 sm:min-w-[170px]">
              <MapPin className="w-4 h-4 text-[#C49A3C] flex-shrink-0" />
              <select
                name="estado"
                className="text-sm text-[#0C0D10] bg-transparent outline-none w-full"
              >
                <option value="">Todo México</option>
                {ESTADOS_MX.map((e) => <option key={e}>{e}</option>)}
              </select>
            </div>

            {/* CTA */}
            <button
              type="submit"
              className="bg-[#C49A3C] hover:bg-[#E2B865] text-[#0C0D10] font-semibold text-sm px-6 py-3 rounded-xl transition-colors whitespace-nowrap flex items-center gap-2 justify-center"
            >
              Buscar abogado
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* Quick specialties */}
          <div className="flex flex-wrap justify-center gap-2 mt-4 animate-fade-up animate-fade-up-5">
            {["Divorcio", "Accidente", "Despido", "Herencia", "Amparo", "Empresa"].map((q) => (
              <Link
                key={q}
                href={`/abogados?q=${encodeURIComponent(q)}`}
                className="text-xs px-3 py-1.5 rounded-full border border-white/15 text-white/55 hover:border-[#C49A3C]/50 hover:text-[#E2B865] transition-colors"
              >
                {q}
              </Link>
            ))}
          </div>
        </form>
      </div>
    </section>
  )
}

// ─── Stats bar ────────────────────────────────────────────────────────────────
function StatsBar() {
  const STATS = [
    { valor: "4,800+", etiqueta: "Abogados registrados", icon: Users },
    { valor: "32",     etiqueta: "Estados cubiertos",    icon: MapPin },
    { valor: "28k+",   etiqueta: "Clientes atendidos",   icon: Star },
    { valor: "100%",   etiqueta: "Perfiles verificados", icon: ShieldCheck },
  ]
  return (
    <div className="bg-[#1A1C26] border-b border-white/8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/8">
        {STATS.map(({ valor, etiqueta, icon: Icon }) => (
          <div key={etiqueta} className="flex flex-col sm:flex-row items-center gap-3 py-5 px-4 sm:px-6">
            <div className="w-8 h-8 rounded-lg bg-[rgba(196,154,60,0.1)] flex items-center justify-center flex-shrink-0">
              <Icon className="w-4 h-4 text-[#C49A3C]" />
            </div>
            <div className="text-center sm:text-left">
              <p className="font-bold text-white text-xl leading-none" style={df}>{valor}</p>
              <p className="text-[#FAF7F2]/40 text-xs mt-0.5">{etiqueta}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Especialidades ───────────────────────────────────────────────────────────
function EspecialidadesSection() {
  return (
    <section className="py-20 bg-[#FAF7F2]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-[#C49A3C] mb-2">Áreas de práctica</p>
            <h2 className="text-4xl font-light text-[#0C0D10]" style={df}>
              Encuentra al experto<br />que necesitas
            </h2>
          </div>
          <Link
            href="/abogados"
            className="text-sm font-medium text-[#C49A3C] hover:text-[#0C0D10] transition-colors flex items-center gap-1.5"
          >
            Ver todas las especialidades <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {ESPECIALIDADES.map(({ nombre, slug, icon: Icon, desc }) => (
            <Link
              key={slug}
              href={`/abogados?especialidad=${encodeURIComponent(nombre)}`}
              className="group bg-white border border-[#EAE4D9] rounded-xl p-4 hover:border-[#C49A3C] hover:shadow-sm transition-all"
            >
              <div className="w-9 h-9 rounded-lg bg-[#F5F0E8] group-hover:bg-[rgba(196,154,60,0.12)] flex items-center justify-center mb-3 transition-colors">
                <Icon className="w-4 h-4 text-[#C49A3C]" />
              </div>
              <p className="text-sm font-semibold text-[#0C0D10] leading-snug mb-1">{nombre}</p>
              <p className="text-xs text-slate-400 leading-snug line-clamp-2">{desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Cómo funciona ────────────────────────────────────────────────────────────
function ComoFunciona() {
  const PASOS = [
    {
      num: "01",
      titulo: "Busca",
      desc: "Ingresa tu problema legal o elige una especialidad. Filtra por ciudad o estado.",
      icon: Search,
    },
    {
      num: "02",
      titulo: "Compara",
      desc: "Revisa perfiles, experiencia, calificaciones y tarifas de múltiples abogados.",
      icon: ShieldCheck,
    },
    {
      num: "03",
      titulo: "Contacta",
      desc: "Escríbele directamente por WhatsApp, mensaje o teléfono. Sin intermediarios.",
      icon: Phone,
    },
  ]

  return (
    <section className="py-20 bg-white border-y border-[#EAE4D9]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#C49A3C] mb-2">Proceso</p>
          <h2 className="text-4xl font-light text-[#0C0D10]" style={df}>
            Solo entra, busca y contacta
          </h2>
          <p className="text-slate-500 mt-3 max-w-md mx-auto text-sm">
            En menos de 5 minutos puedes estar hablando con un abogado calificado.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-8 left-1/3 right-1/3 h-px bg-[#EAE4D9]" />
          <div className="hidden md:block absolute top-8 left-2/3 right-0 h-px bg-[#EAE4D9]" />

          {PASOS.map(({ num, titulo, desc, icon: Icon }) => (
            <div key={num} className="relative text-center">
              <div className="relative mx-auto w-16 h-16 rounded-2xl bg-[#F5F0E8] border border-[#EAE4D9] flex items-center justify-center mb-5">
                <Icon className="w-6 h-6 text-[#C49A3C]" />
                <span
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#0C0D10] text-white text-xs flex items-center justify-center font-bold"
                  style={df}
                >
                  {num.replace("0", "")}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-[#0C0D10] mb-2" style={df}>{titulo}</h3>
              <p className="text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">{desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/abogados"
            className="inline-flex items-center gap-2 bg-[#0C0D10] text-white text-sm font-medium px-7 py-3.5 rounded-xl hover:bg-[#1A1C26] transition-colors"
          >
            Buscar abogado ahora
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─── Ciudades ─────────────────────────────────────────────────────────────────
function CiudadesSection() {
  return (
    <section className="py-20 bg-[#F5F0E8]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="mb-10">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#C49A3C] mb-2">Por ciudad</p>
          <h2 className="text-4xl font-light text-[#0C0D10]" style={df}>
            Abogados en toda la República
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-px bg-[#EAE4D9] rounded-xl overflow-hidden border border-[#EAE4D9]">
          {CIUDADES.map(({ nombre, slug, count }) => (
            <Link
              key={slug}
              href={`/abogados?estado=${encodeURIComponent(nombre.split(" ").join("+"))}`}
              className="group bg-white hover:bg-[#FAF7F2] px-5 py-4 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#0C0D10] group-hover:text-[#C49A3C] transition-colors">{nombre}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{count} abogados</p>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#C49A3C] transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Abogados destacados ──────────────────────────────────────────────────────
type FeaturedLawyer = Awaited<ReturnType<typeof getFeaturedLawyers>>[number]

function AbogadosDestacados({ lawyers }: { lawyers: FeaturedLawyer[] }) {
  return (
    <section className="py-20 bg-white border-y border-[#EAE4D9]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-[#C49A3C] mb-2">Verificados</p>
            <h2 className="text-4xl font-light text-[#0C0D10]" style={df}>
              Abogados destacados
            </h2>
          </div>
          <Link href="/abogados" className="text-sm font-medium text-[#C49A3C] flex items-center gap-1.5 hover:text-[#0C0D10] transition-colors">
            Ver directorio completo <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {lawyers.map((l) => {
            const avgRating = l.reviews.length > 0
              ? l.reviews.reduce((s, r) => s + r.rating, 0) / l.reviews.length
              : null
            const plan = l.memberships[0]?.plan.name ?? "Básico"
            const isPremium = plan !== "Básico"
            const specialty = l.specialties[0]?.specialty.name

            return (
              <Link
                key={l.id}
                href={`/abogados/${l.slug}`}
                className={`group bg-white rounded-xl border p-5 hover:shadow-md transition-all flex flex-col gap-3 ${isPremium ? "border-[#C49A3C]/40" : "border-[#EAE4D9]"}`}
              >
                {/* Top */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold text-[#C49A3C] flex-shrink-0"
                      style={{ background: "rgba(196,154,60,0.10)", fontFamily: "var(--font-cormorant)" }}
                    >
                      {l.name.replace(/^Lic\.\s*/i, "").charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#0C0D10] truncate">{l.name}</p>
                      <p className="text-xs text-slate-400">{l.city}, {l.state}</p>
                    </div>
                  </div>
                  {isPremium && (
                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#C49A3C] bg-[rgba(196,154,60,0.1)] px-2 py-1 rounded-full flex-shrink-0">
                      {plan}
                    </span>
                  )}
                </div>

                {/* Specialty */}
                {specialty && (
                  <span className="text-xs bg-[#F5F0E8] text-[#0C0D10] px-3 py-1 rounded-full self-start">
                    {specialty}
                  </span>
                )}

                {/* Bio */}
                {l.bio && (
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{l.bio}</p>
                )}

                {/* Rating + CTA */}
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-[#EAE4D9]">
                  <div className="flex items-center gap-1">
                    {avgRating !== null ? (
                      <>
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-semibold text-[#0C0D10]">{avgRating.toFixed(1)}</span>
                        <span className="text-xs text-slate-400">({l.reviews.length})</span>
                      </>
                    ) : (
                      <span className="text-xs text-slate-400">Sin reseñas aún</span>
                    )}
                  </div>
                  <span className="text-xs font-medium text-[#C49A3C] group-hover:text-[#0C0D10] transition-colors flex items-center gap-0.5">
                    Ver perfil <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Para abogados ────────────────────────────────────────────────────────────
function ParaAbogados() {
  const BENEFICIOS = [
    "Perfil verificado con tu cédula profesional",
    "Recibe contactos directos de clientes",
    "Posicionamiento en búsquedas locales",
    "Panel para gestionar tu presencia",
  ]
  return (
    <section
      className="py-20"
      style={{ background: "linear-gradient(135deg, #0C0D10 0%, #1A1C26 100%)" }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-[#C49A3C] mb-3">Para abogados</p>
            <h2 className="text-4xl font-light text-white leading-snug mb-5" style={df}>
              Haz crecer tu práctica<br />
              <em className="italic" style={{ color: "#E2B865" }}>con Lexia</em>
            </h2>
            <p className="text-[#FAF7F2]/55 text-sm leading-relaxed mb-8">
              Miles de personas buscan asesoría legal todos los días. Con tu perfil en Lexia,
              te encontrarán cuando más te necesitan — sin comisiones por cada cliente.
            </p>
            <div className="space-y-3 mb-8">
              {BENEFICIOS.map((b) => (
                <div key={b} className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#C49A3C] flex-shrink-0" />
                  <span className="text-sm text-[#FAF7F2]/70">{b}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3 flex-wrap">
              <Link
                href="/registro"
                className="inline-flex items-center gap-2 bg-[#C49A3C] hover:bg-[#E2B865] text-[#0C0D10] font-semibold text-sm px-6 py-3 rounded-xl transition-colors"
              >
                Crear mi perfil gratis
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/registro?plan=premium"
                className="inline-flex items-center gap-2 border border-white/20 text-white text-sm px-6 py-3 rounded-xl hover:bg-white/8 transition-colors"
              >
                Ver planes
              </Link>
            </div>
          </div>

          {/* Right side: mini stat cards */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { valor: "4.8★",   etiqueta: "Calificación promedio",   sub: "de nuestros abogados" },
              { valor: "23",     etiqueta: "Contactos promedio/mes",   sub: "en plan Premium" },
              { valor: "72h",    etiqueta: "Tiempo de activación",     sub: "tras verificación" },
              { valor: "0%",     etiqueta: "Comisión por cliente",     sub: "tú cobras directo" },
            ].map(({ valor, etiqueta, sub }) => (
              <div
                key={etiqueta}
                className="rounded-xl border border-white/10 p-5"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <p className="text-3xl font-light text-[#E2B865] mb-1" style={df}>{valor}</p>
                <p className="text-xs font-semibold text-white">{etiqueta}</p>
                <p className="text-xs text-[#FAF7F2]/35 mt-0.5">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Planes ───────────────────────────────────────────────────────────────────
function PlanesSection() {
  return (
    <section id="planes" className="py-20 bg-[#FAF7F2]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#C49A3C] mb-2">Precios</p>
          <h2 className="text-4xl font-light text-[#0C0D10]" style={df}>
            Planes simples y transparentes
          </h2>
          <p className="text-slate-500 text-sm mt-3">Sin permanencia. Cancela cuando quieras.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PLANES.map(({ nombre, precio, periodo, desc, destacado, caracteristicas, cta, href }) => (
            <div
              key={nombre}
              className={`rounded-2xl p-6 flex flex-col ${
                destacado
                  ? "bg-[#0C0D10] text-white border border-[rgba(196,154,60,0.3)]"
                  : "bg-white border border-[#EAE4D9]"
              }`}
            >
              {destacado && (
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#C49A3C] mb-4">
                  Más popular
                </span>
              )}
              <h3 className={`text-2xl font-light mb-1 ${destacado ? "text-white" : "text-[#0C0D10]"}`} style={df}>
                {nombre}
              </h3>
              <p className={`text-xs mb-4 ${destacado ? "text-[#FAF7F2]/40" : "text-slate-400"}`}>{desc}</p>
              <div className="mb-6">
                <span className={`text-4xl font-light ${destacado ? "text-[#E2B865]" : "text-[#0C0D10]"}`} style={df}>
                  {precio}
                </span>
                <span className={`text-sm ml-1 ${destacado ? "text-[#FAF7F2]/40" : "text-slate-400"}`}>{periodo}</span>
              </div>
              <ul className="space-y-2.5 flex-1 mb-7">
                {caracteristicas.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${destacado ? "text-[#C49A3C]" : "text-green-500"}`} />
                    <span className={destacado ? "text-[#FAF7F2]/70" : "text-slate-600"}>{c}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={href}
                className={`text-center text-sm font-semibold px-5 py-3 rounded-xl transition-colors ${
                  destacado
                    ? "bg-[#C49A3C] hover:bg-[#E2B865] text-[#0C0D10]"
                    : "bg-[#F5F0E8] hover:bg-[#EAE4D9] text-[#0C0D10]"
                }`}
              >
                {cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CTA Final ────────────────────────────────────────────────────────────────
function CTAFinal() {
  return (
    <section className="py-16 bg-white border-t border-[#EAE4D9]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <div className="w-10 h-px bg-[#C49A3C] mx-auto mb-6" />
        <h2 className="text-4xl font-light text-[#0C0D10] mb-4" style={df}>
          ¿Tienes un problema legal?
        </h2>
        <p className="text-slate-500 text-sm mb-8 max-w-md mx-auto">
          Más de 4,800 abogados verificados listos para ayudarte.
          Encuentra el tuyo en minutos.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/abogados"
            className="inline-flex items-center justify-center gap-2 bg-[#C49A3C] hover:bg-[#E2B865] text-[#0C0D10] font-semibold text-sm px-8 py-3.5 rounded-xl transition-colors"
          >
            Buscar abogado
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/registro"
            className="inline-flex items-center justify-center gap-2 border border-[#EAE4D9] text-[#0C0D10] text-sm px-8 py-3.5 rounded-xl hover:bg-[#F5F0E8] transition-colors"
          >
            Soy abogado, quiero registrarme
          </Link>
        </div>
      </div>
    </section>
  )
}
