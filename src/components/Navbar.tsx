import Link from "next/link"
import { Scale } from "lucide-react"

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-ink border-b border-white/8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-sm bg-gold/10 border border-gold/30 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
              <Scale className="w-3.5 h-3.5 text-gold" />
            </div>
            <span
              className="text-xl font-medium tracking-wide text-cream"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Lexia
            </span>
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
              href="#especialidades"
              className="hover:text-cream transition-colors relative group"
            >
              Especialidades
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              href="#para-abogados"
              className="hover:text-cream transition-colors relative group"
            >
              Para abogados
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
            </Link>
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
