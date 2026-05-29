import Link from "next/link"
import Image from "next/image"

const TOOLS = [
  {
    icon: "⚖️",
    title: "Buscador de Jurisprudencia",
    desc: "Consulta tesis y criterios del Poder Judicial",
    href: "/herramientas/jurisprudencias",
    badge: null,
  },
  {
    icon: "🧮",
    title: "Calculadora de Finiquito",
    desc: "Calcula liquidación según la LFT al instante",
    href: "/herramientas",
    badge: null,
  },
  {
    icon: "📋",
    title: "Citatorios",
    desc: "Genera citatorios con apoyo de IA",
    href: "/mi-perfil/citatorios",
    badge: "Requiere cuenta",
  },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-ink border-b border-white/8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Lexia MX"
              width={600}
              height={400}
              className="h-14 w-auto rounded-sm"
              style={{ width: "auto" }}
              priority
            />
          </Link>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-8 text-sm text-cream/60">
            <Link
              href="/abogados"
              className="hover:text-cream transition-colors relative group"
            >
              Buscar abogado
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
            </Link>

            <Link
              href="/blog"
              className="hover:text-cream transition-colors relative group"
            >
              Blog
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
            </Link>

            {/* Para abogados dropdown */}
            <div className="relative group/menu">
              <button className="flex items-center gap-1 hover:text-cream transition-colors py-5">
                Herramientas
                <svg className="w-3.5 h-3.5 opacity-50 group-hover/menu:opacity-100 transition-all group-hover/menu:rotate-180 duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown panel */}
              <div className="absolute right-0 top-full pt-1 opacity-0 pointer-events-none group-hover/menu:opacity-100 group-hover/menu:pointer-events-auto transition-all duration-200 translate-y-1 group-hover/menu:translate-y-0">
                <div className="bg-[#12141C] border border-white/10 rounded-2xl shadow-2xl p-3 w-72 flex flex-col gap-1">
                  {TOOLS.map(({ icon, title, desc, href, badge }) => (
                    <Link
                      key={href}
                      href={href}
                      className="flex items-start gap-3 px-3 py-3 rounded-xl hover:bg-white/6 transition-colors group/card"
                    >
                      <span className="text-xl mt-0.5 flex-shrink-0">{icon}</span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-medium text-cream/90 group-hover/card:text-gold transition-colors leading-tight">
                            {title}
                          </p>
                          {badge && (
                            <span className="text-[10px] font-semibold text-gold/70 border border-gold/25 px-1.5 py-0.5 rounded-full leading-none">
                              {badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-cream/40 mt-0.5 leading-snug">{desc}</p>
                      </div>
                    </Link>
                  ))}

                </div>
              </div>
            </div>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm text-cream/60 hover:text-cream transition-colors px-3 py-1.5"
            >
              Iniciar sesión
            </Link>
            <Link
              href="/registro"
              className="text-sm bg-gold hover:bg-gold-light text-ink font-semibold px-4 py-1.5 rounded transition-colors"
            >
              Registrarse
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
