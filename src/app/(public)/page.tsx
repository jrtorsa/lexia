import Link from "next/link"
import {
  Search,
  UserCheck,
  MessageCircle,
  Scale,
  ShieldCheck,
  Star,
  TrendingUp,
  Users,
  ChevronRight,
  CheckCircle2,
  ArrowRight,
} from "lucide-react"

// ─── Static data ──────────────────────────────────────────────────────────────

const especialidades = [
  { nombre: "Derecho Familiar", slug: "familiar", icono: "⚖", desc: "Divorcios, custodia, pensiones" },
  { nombre: "Derecho Penal", slug: "penal", icono: "§", desc: "Defensa penal, amparos, delitos" },
  { nombre: "Derecho Laboral", slug: "laboral", icono: "◈", desc: "Despidos, liquidaciones, IMSS" },
  { nombre: "Derecho Fiscal", slug: "fiscal", icono: "◉", desc: "SAT, declaraciones, controversias" },
  { nombre: "Derecho Civil", slug: "civil", icono: "▣", desc: "Contratos, herencias, testamentos" },
  { nombre: "Derecho Inmobiliario", slug: "inmobiliario", icono: "◫", desc: "Compraventa, arrendamiento" },
  { nombre: "Derecho Mercantil", slug: "mercantil", icono: "◆", desc: "Empresas, contratos comerciales" },
  { nombre: "Amparo", slug: "amparo", icono: "◎", desc: "Amparo directo e indirecto" },
]

const pasos = [
  {
    numero: "01",
    titulo: "Describe tu caso",
    desc: "Cuéntanos brevemente qué problema legal tienes y en qué ciudad te encuentras.",
    icono: Search,
  },
  {
    numero: "02",
    titulo: "Compara abogados",
    desc: "Revisa perfiles, especialidades, años de experiencia y reseñas de otros clientes.",
    icono: UserCheck,
  },
  {
    numero: "03",
    titulo: "Contacta directamente",
    desc: "Envía un mensaje, llama o escribe por WhatsApp. Sin intermediarios.",
    icono: MessageCircle,
  },
]

const planes = [
  {
    nombre: "Básico",
    precio: "Gratis",
    desc: "Para empezar a recibir clientes",
    destacado: false,
    caracteristicas: [
      "Perfil público en el directorio",
      "Hasta 2 especialidades",
      "Contacto por formulario",
      "1 foto de perfil",
    ],
    cta: "Crear perfil gratis",
    href: "/registro",
  },
  {
    nombre: "Premium",
    precio: "$599",
    periodo: "/ mes MXN",
    desc: "Para abogados que quieren destacar",
    destacado: true,
    caracteristicas: [
      "Todo lo del plan Básico",
      "Posición preferente en búsquedas",
      "Hasta 5 especialidades",
      "Botón de WhatsApp directo",
      "Estadísticas de visitas y contactos",
      "Badge de perfil verificado",
    ],
    cta: "Empezar prueba gratis",
    href: "/registro?plan=premium",
  },
  {
    nombre: "Despacho",
    precio: "$1,499",
    periodo: "/ mes MXN",
    desc: "Para despachos con varios socios",
    destacado: false,
    caracteristicas: [
      "Todo lo del plan Premium",
      "Hasta 5 abogados del mismo despacho",
      "Página de despacho unificada",
      "Soporte prioritario",
      "Integración con agenda propia",
    ],
    cta: "Contactar ventas",
    href: "/contacto?plan=despacho",
  },
]

const stats = [
  { valor: "4,800+", etiqueta: "Abogados registrados" },
  { valor: "32", etiqueta: "Estados de la República" },
  { valor: "120+", etiqueta: "Especialidades" },
  { valor: "28,000+", etiqueta: "Clientes atendidos" },
]

// ─── Display font helper ───────────────────────────────────────────────────────
const displayFont = { fontFamily: "var(--font-cormorant)" }

// ─── Sections ─────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #1A1C26 0%, #0C0D10 55%, #12100E 100%)" }}
    >
      {/* Gold radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% -5%, rgba(196,154,60,0.14) 0%, transparent 65%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6 pt-24 pb-28 md:pt-32 md:pb-36 text-center">
        {/* Badge */}
        <div className="animate-fade-up animate-fade-up-1 inline-flex items-center gap-2 border border-[rgba(196,154,60,0.35)] rounded-full px-4 py-1.5 text-xs text-[#C49A3C]/80 mb-10 tracking-widest uppercase">
          <ShieldCheck className="w-3.5 h-3.5" />
          Abogados verificados · Cédula SEP
        </div>

        {/* Decorative rule */}
        <div className="animate-fade-up animate-fade-up-1 flex items-center gap-5 mb-8">
          <div className="flex-1 h-px bg-[rgba(196,154,60,0.25)]" />
          <Scale className="w-4 h-4 text-[rgba(196,154,60,0.45)]" />
          <div className="flex-1 h-px bg-[rgba(196,154,60,0.25)]" />
        </div>

        {/* Main heading */}
        <h1
          className="animate-fade-up animate-fade-up-2 text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] text-[#FAF7F2] leading-[1.05] mb-2"
          style={displayFont}
        >
          Encuentra al abogado
        </h1>
        <h1
          className="animate-fade-up animate-fade-up-3 text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.05] mb-8"
          style={{ ...displayFont, color: "var(--gold)", fontStyle: "italic" }}
        >
          ideal para tu caso
        </h1>

        {/* Decorative rule */}
        <div className="animate-fade-up animate-fade-up-3 flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-[rgba(196,154,60,0.2)]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[rgba(196,154,60,0.4)]" />
          <div className="flex-1 h-px bg-[rgba(196,154,60,0.2)]" />
        </div>

        {/* Subtitle */}
        <p className="animate-fade-up animate-fade-up-3 text-[#FAF7F2]/55 text-lg max-w-lg mx-auto mb-10 leading-relaxed">
          El directorio más completo de abogados certificados en México.
          Gratis para clientes, sin comisiones, sin intermediarios.
        </p>

        {/* Search form */}
        <form
          method="GET"
          action="/abogados"
          className="animate-fade-up animate-fade-up-4 flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto"
        >
          <select
            name="especialidad"
            className="flex-1 bg-white/8 border border-white/15 text-[#FAF7F2] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[rgba(196,154,60,0.6)] focus:ring-1 focus:ring-[rgba(196,154,60,0.3)] transition-colors appearance-none"
            style={{ colorScheme: "dark" }}
          >
            <option value="" className="bg-[#1A1C26] text-[#FAF7F2]">Especialidad</option>
            <option className="bg-[#1A1C26]">Derecho Familiar</option>
            <option className="bg-[#1A1C26]">Derecho Penal</option>
            <option className="bg-[#1A1C26]">Derecho Laboral</option>
            <option className="bg-[#1A1C26]">Derecho Fiscal</option>
            <option className="bg-[#1A1C26]">Derecho Civil</option>
            <option className="bg-[#1A1C26]">Derecho Inmobiliario</option>
            <option className="bg-[#1A1C26]">Derecho Mercantil</option>
            <option className="bg-[#1A1C26]">Amparo</option>
          </select>
          <select
            name="estado"
            className="flex-1 bg-white/8 border border-white/15 text-[#FAF7F2] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[rgba(196,154,60,0.6)] focus:ring-1 focus:ring-[rgba(196,154,60,0.3)] transition-colors appearance-none"
            style={{ colorScheme: "dark" }}
          >
            <option value="" className="bg-[#1A1C26]">Ciudad</option>
            <option className="bg-[#1A1C26]">Ciudad de México</option>
            <option className="bg-[#1A1C26]">Guadalajara</option>
            <option className="bg-[#1A1C26]">Monterrey</option>
            <option className="bg-[#1A1C26]">Puebla</option>
            <option className="bg-[#1A1C26]">Tijuana</option>
          </select>
          <button
            type="submit"
            className="sm:w-auto w-full bg-[#C49A3C] hover:bg-[#E2B865] text-[#0C0D10] font-semibold px-7 py-3 rounded-lg flex items-center justify-center gap-2 text-sm transition-colors"
          >
            <Search className="w-4 h-4" />
            Buscar
          </button>
        </form>

        <p className="animate-fade-up animate-fade-up-5 text-[#FAF7F2]/30 text-sm mt-5">
          Más de 4,800 abogados en todo México
        </p>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="bg-[#0C0D10] border-t border-b border-[rgba(196,154,60,0.12)]">
      <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((s) => (
          <div key={s.etiqueta}>
            <div
              className="text-3xl md:text-4xl text-[#C49A3C] leading-none mb-1"
              style={displayFont}
            >
              {s.valor}
            </div>
            <div className="text-[#FAF7F2]/40 text-xs tracking-wide uppercase mt-1">{s.etiqueta}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function ComoFunciona() {
  return (
    <section className="py-24 px-6 bg-[#FAF7F2]">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <p className="text-[#C49A3C] text-xs font-semibold tracking-[0.22em] uppercase mb-4">
            Proceso
          </p>
          <h2
            className="text-4xl md:text-5xl text-[#0C0D10] leading-tight"
            style={displayFont}
          >
            En tres pasos
            <br />
            <em>estás en contacto</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {pasos.map((paso) => {
            const Icono = paso.icono
            return (
              <div key={paso.numero} className="group">
                <div
                  className="text-7xl md:text-8xl text-[rgba(196,154,60,0.18)] font-bold leading-none mb-5 select-none"
                  style={displayFont}
                >
                  {paso.numero}
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full border border-[rgba(196,154,60,0.35)] flex items-center justify-center group-hover:border-[#C49A3C] transition-colors">
                    <Icono className="w-4 h-4 text-[#C49A3C]" />
                  </div>
                  <h3 className="font-semibold text-[#0C0D10] text-base">{paso.titulo}</h3>
                </div>
                <p className="text-[#0C0D10]/55 text-sm leading-relaxed pl-12">{paso.desc}</p>
              </div>
            )
          })}
        </div>

        <div className="mt-14 flex items-center gap-4">
          <Link
            href="/abogados"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0C0D10] hover:text-[#C49A3C] transition-colors"
          >
            Buscar abogado ahora
            <ArrowRight className="w-4 h-4" />
          </Link>
          <div className="flex-1 h-px bg-[rgba(0,0,0,0.1)]" />
        </div>
      </div>
    </section>
  )
}

function Especialidades() {
  return (
    <section id="especialidades" className="py-24 px-6 bg-white border-t border-[#EAE4D9]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-[#C49A3C] text-xs font-semibold tracking-[0.22em] uppercase mb-4">
            Especialidades
          </p>
          <h2
            className="text-4xl md:text-5xl text-[#0C0D10] leading-tight"
            style={displayFont}
          >
            El experto exacto
            <br />
            <em>para tu caso</em>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {especialidades.map((esp) => (
            <Link
              key={esp.slug}
              href={`/abogados?especialidad=${encodeURIComponent(esp.nombre)}`}
              className="group border border-[#EAE4D9] rounded-xl p-5 hover:border-[#C49A3C] hover:shadow-sm transition-all"
            >
              <div
                className="text-2xl text-[#C49A3C]/60 group-hover:text-[#C49A3C] transition-colors mb-3 font-bold leading-none select-none"
                style={displayFont}
              >
                {esp.icono}
              </div>
              <h3 className="font-medium text-[#0C0D10] text-sm group-hover:text-[#C49A3C] transition-colors leading-snug mb-1">
                {esp.nombre}
              </h3>
              <p className="text-[#0C0D10]/40 text-xs leading-relaxed">{esp.desc}</p>
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <Link
            href="/abogados"
            className="inline-flex items-center gap-1.5 text-sm text-[#C49A3C] hover:text-[#E2B865] transition-colors"
          >
            Ver todos los abogados <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

function ParaAbogados() {
  return (
    <section id="para-abogados" className="py-24 px-6 bg-[#1A1C26]">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text side */}
          <div>
            <p className="text-[#C49A3C] text-xs font-semibold tracking-[0.22em] uppercase mb-5">
              Para abogados
            </p>
            <h2
              className="text-4xl md:text-5xl text-[#FAF7F2] leading-tight mb-6"
              style={displayFont}
            >
              Haz crecer
              <br />
              <em>tu práctica legal</em>
            </h2>
            <p className="text-[#FAF7F2]/50 leading-relaxed mb-8 text-sm">
              Miles de personas buscan abogados en México cada día. Crea tu perfil, aparece en búsquedas relevantes y recibe contactos directos de clientes interesados en tu área de especialización.
            </p>

            <ul className="space-y-3 mb-10">
              {[
                "Perfil profesional con cédula verificada",
                "Aparece en búsquedas por ciudad y especialidad",
                "Recibe contactos por mensaje, WhatsApp o llamada",
                "Estadísticas de visitas y leads recibidos",
                "Sección de preguntas legales para demostrar expertise",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-[#FAF7F2]/70">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C49A3C] flex-shrink-0 mt-1.5" />
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href="/registro"
              className="inline-flex items-center gap-2 bg-[#C49A3C] hover:bg-[#E2B865] text-[#0C0D10] font-semibold text-sm px-6 py-3 rounded-lg transition-colors"
            >
              Crear mi perfil gratis
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Benefits grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { icono: Users, titulo: "Nuevos clientes", desc: "Recibe solicitudes de personas que ya buscan tu especialidad" },
              { icono: Star, titulo: "Reseñas reales", desc: "Construye tu reputación con opiniones de clientes anteriores" },
              { icono: TrendingUp, titulo: "Más visibilidad", desc: "Aparece primero en búsquedas de tu ciudad con el plan Premium" },
              { icono: ShieldCheck, titulo: "Perfil verificado", desc: "El badge de verificación genera confianza inmediata" },
            ].map((b) => {
              const Icono = b.icono
              return (
                <div
                  key={b.titulo}
                  className="border border-white/10 rounded-xl p-5 hover:border-[rgba(196,154,60,0.3)] transition-colors"
                >
                  <div className="w-9 h-9 bg-[rgba(196,154,60,0.1)] rounded-lg flex items-center justify-center mb-3">
                    <Icono className="w-4.5 h-4.5 text-[#C49A3C]" />
                  </div>
                  <h4 className="font-semibold text-[#FAF7F2] text-sm mb-1">{b.titulo}</h4>
                  <p className="text-[#FAF7F2]/40 text-xs leading-relaxed">{b.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function Planes() {
  return (
    <section id="planes" className="py-24 px-6 bg-[#0C0D10]">
      <div className="max-w-5xl mx-auto">
        <div className="mb-14">
          <p className="text-[#C49A3C] text-xs font-semibold tracking-[0.22em] uppercase mb-4">
            Planes
          </p>
          <h2
            className="text-4xl md:text-5xl text-[#FAF7F2] leading-tight"
            style={displayFont}
          >
            Empieza gratis.
            <br />
            <em className="text-[#C49A3C]">Escala cuando quieras.</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {planes.map((plan) => (
            <div
              key={plan.nombre}
              className={`rounded-2xl p-7 border flex flex-col ${
                plan.destacado
                  ? "border-[rgba(196,154,60,0.5)] bg-[#1A1C26] relative"
                  : "border-white/10 bg-white/4"
              }`}
            >
              {plan.destacado && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C49A3C] text-[#0C0D10] text-[10px] font-bold px-4 py-1 rounded-full tracking-widest uppercase">
                  Más popular
                </div>
              )}

              <div className="mb-5">
                <p className={`text-xs font-semibold tracking-widest uppercase mb-2 ${plan.destacado ? "text-[#C49A3C]" : "text-[#FAF7F2]/40"}`}>
                  {plan.nombre}
                </p>
                <div className="flex items-end gap-1.5 mb-1">
                  <span
                    className="text-3xl text-[#FAF7F2] leading-none"
                    style={displayFont}
                  >
                    {plan.precio}
                  </span>
                  {plan.periodo && (
                    <span className="text-xs text-[#FAF7F2]/40 pb-1">{plan.periodo}</span>
                  )}
                </div>
                <p className="text-[#FAF7F2]/40 text-xs">{plan.desc}</p>
              </div>

              <div className="h-px bg-white/8 mb-5" />

              <ul className="space-y-2.5 mb-8 flex-1">
                {plan.caracteristicas.map((c) => (
                  <li key={c} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2
                      className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.destacado ? "text-[#C49A3C]" : "text-[#FAF7F2]/30"}`}
                    />
                    <span className={plan.destacado ? "text-[#FAF7F2]/80" : "text-[#FAF7F2]/50"}>
                      {c}
                    </span>
                  </li>
                ))}
              </ul>

              <Link href={plan.href} className="block mt-auto">
                <button
                  className={`w-full py-2.5 px-5 rounded-lg text-sm font-semibold transition-colors ${
                    plan.destacado
                      ? "bg-[#C49A3C] hover:bg-[#E2B865] text-[#0C0D10]"
                      : "border border-white/20 text-[#FAF7F2]/70 hover:border-white/40 hover:text-[#FAF7F2]"
                  }`}
                >
                  {plan.cta}
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTAFinal() {
  return (
    <section className="py-24 px-6 bg-[#FAF7F2] border-t border-[#EAE4D9]">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-12 h-px bg-[#C49A3C] mx-auto mb-8" />

        <h2
          className="text-4xl md:text-5xl text-[#0C0D10] leading-tight mb-5"
          style={displayFont}
        >
          ¿Tienes un problema legal?
        </h2>
        <p className="text-[#0C0D10]/55 text-lg mb-10">
          No esperes más. Encuentra el abogado indicado para tu caso hoy mismo, gratis.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/abogados"
            className="inline-flex items-center justify-center gap-2 bg-[#C49A3C] hover:bg-[#E2B865] text-[#0C0D10] font-semibold text-sm px-8 py-3 rounded-lg transition-colors"
          >
            Buscar abogado gratis
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/preguntas"
            className="inline-flex items-center justify-center gap-2 border border-[#0C0D10]/20 text-[#0C0D10]/70 hover:text-[#0C0D10] hover:border-[#0C0D10]/40 text-sm px-8 py-3 rounded-lg transition-colors"
          >
            Hacer una pregunta legal
          </Link>
        </div>

        <div className="w-12 h-px bg-[#C49A3C] mx-auto mt-8" />
      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Stats />
      <ComoFunciona />
      <Especialidades />
      <ParaAbogados />
      <Planes />
      <CTAFinal />
    </main>
  )
}
