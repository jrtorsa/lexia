import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-ink border-t border-white/8 text-cream/50 mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4">
              <Image
                src="/logo.png"
                alt="Lexia MX"
                width={600}
                height={400}
                className="h-12 w-auto rounded-sm"
                style={{ width: "auto" }}
              />
            </div>
            <p className="text-sm leading-relaxed max-w-[200px]">
              El directorio de abogados más completo de México.
            </p>
            <div className="flex items-center gap-2 mt-5">
              <div className="h-px w-8 bg-gold/40" />
              <span className="text-gold/60 text-xs tracking-widest uppercase">México</span>
            </div>
          </div>

          {/* Para clientes */}
          <div>
            <h4 className="text-cream text-xs font-semibold tracking-widest uppercase mb-4">
              Para clientes
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/abogados" className="hover:text-cream transition-colors">
                  Buscar abogado
                </Link>
              </li>
              <li>
                <Link href="/preguntas" className="hover:text-cream transition-colors">
                  Asesoría gratuita
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-cream transition-colors">
                  Blog legal
                </Link>
              </li>
              <li>
                <Link href="/como-funciona" className="hover:text-cream transition-colors">
                  Cómo funciona
                </Link>
              </li>
            </ul>
          </div>

          {/* Para abogados */}
          <div>
            <h4 className="text-cream text-xs font-semibold tracking-widest uppercase mb-4">
              Para abogados
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/registro" className="hover:text-cream transition-colors">
                  Crear perfil
                </Link>
              </li>
              <li>
                <Link href="/planes" className="hover:text-cream transition-colors">
                  Planes y precios
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-cream transition-colors">
                  Iniciar sesión
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-cream text-xs font-semibold tracking-widest uppercase mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/privacidad" className="hover:text-cream transition-colors">
                  Privacidad
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="hover:text-cream transition-colors">
                  Términos de uso
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-cream transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/8 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span>© {new Date().getFullYear()} Lexia. Todos los derechos reservados.</span>
          <span className="text-cream/30">Hecho en México</span>
        </div>
      </div>
    </footer>
  )
}
