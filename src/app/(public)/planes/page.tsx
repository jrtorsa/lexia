import Link from "next/link"
import { CheckCircle2, ArrowRight } from "lucide-react"
import { PROMO } from "@/lib/promo"
import { getLugaresRestantes } from "@/app/actions/getLugares"

const df = { fontFamily: "var(--font-cormorant)" }

const PLANES = [
  {
    nombre: "Básico",
    precio: "Gratis",
    periodo: "",
    desc: "Para empezar a recibir clientes",
    destacado: false,
    caracteristicas: [
      "Perfil público en el directorio",
      "Hasta 2 especialidades",
      "Contacto por formulario",
    ],
    cta: "Crear perfil gratis",
    href: "/registro",
  },
  {
    nombre: "Premium",
    precio: "$599",
    periodo: "/mes MXN",
    desc: "Para abogados que quieren destacar",
    destacado: true,
    caracteristicas: [
      "Posición preferente en búsquedas",
      "Botón de WhatsApp directo",
      "Estadísticas de visitas y contactos",
      "Badge de perfil verificado",
      "Hasta 5 especialidades",
    ],
    cta: "Empezar prueba gratis",
    href: "/registro?plan=premium",
  },
  {
    nombre: "Despacho",
    precio: "$1,499",
    periodo: "/mes MXN",
    desc: "Para despachos con varios socios",
    destacado: false,
    caracteristicas: [
      "Hasta 5 abogados del despacho",
      "Página unificada del despacho",
      "Soporte prioritario",
      "Estadísticas avanzadas",
    ],
    cta: "Contactar ventas",
    href: "/contacto?plan=despacho",
  },
]

const COMPARATIVA = [
  { feature: "Perfil en el directorio",        basico: true,  premium: true,  despacho: true  },
  { feature: "Especialidades",                  basico: "2",   premium: "5",   despacho: "Ilimitadas" },
  { feature: "Contacto por formulario",         basico: true,  premium: true,  despacho: true  },
  { feature: "Botón de WhatsApp",               basico: false, premium: true,  despacho: true  },
  { feature: "Posición preferente",             basico: false, premium: true,  despacho: true  },
  { feature: "Badge de verificado",             basico: false, premium: true,  despacho: true  },
  { feature: "Estadísticas de visitas",         basico: false, premium: true,  despacho: true  },
  { feature: "Múltiples abogados del despacho", basico: false, premium: false, despacho: true  },
  { feature: "Soporte prioritario",             basico: false, premium: false, despacho: true  },
]

export default async function PlanesPage() {
  const lugaresRestantes = await getLugaresRestantes()
  return (
    <div className="bg-[#FAF7F2]">
      {/* Header */}
      <section
        className="py-20 text-center"
        style={{ background: "linear-gradient(160deg, #0C0D10 0%, #1A1C26 100%)" }}
      >
        <p className="text-xs font-semibold tracking-widest uppercase text-[#C49A3C] mb-3">Para abogados</p>
        <h1 className="text-5xl font-light text-white mb-4" style={df}>
          Planes simples y transparentes
        </h1>
        <p className="text-[#FAF7F2]/50 text-sm max-w-md mx-auto">
          Sin permanencia. Sin comisiones por cliente. Cancela cuando quieras.
        </p>
      </section>

      {/* Cards */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-3 gap-6">
          {PLANES.map(({ nombre, precio, periodo, desc, destacado, caracteristicas, cta, href }) => (
            <div
              key={nombre}
              className={`rounded-2xl p-7 flex flex-col ${
                destacado
                  ? "bg-[#0C0D10] border border-[rgba(196,154,60,0.3)]"
                  : "bg-white border border-[#EAE4D9]"
              }`}
            >
              {destacado && (
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-[#C49A3C]">
                    Más popular
                  </span>
                  {PROMO.activa && (
                    <span className="text-[10px] font-bold tracking-widest uppercase bg-[#C49A3C] text-[#0C0D10] px-2 py-0.5 rounded-full">
                      {PROMO.badge}
                    </span>
                  )}
                </div>
              )}
              <h2
                className={`text-3xl font-light mb-1 ${destacado ? "text-white" : "text-[#0C0D10]"}`}
                style={df}
              >
                {nombre}
              </h2>
              <p className={`text-xs mb-6 ${destacado ? "text-[#FAF7F2]/40" : "text-slate-400"}`}>{desc}</p>
              <div className="mb-7">
                {destacado && PROMO.activa ? (
                  <div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-5xl font-light text-[#E2B865]" style={df}>Gratis</span>
                      <span className="text-xs text-[#FAF7F2]/40">por {PROMO.mesesGratis} meses</span>
                    </div>
                    <p className="text-xs text-[#FAF7F2]/35">
                      Después: <del>{PROMO.precioOriginal}</del>{PROMO.periodo}
                    </p>
                    <p className="text-[10px] text-[#C49A3C] mt-1.5 font-semibold">
                      ¡Solo quedan {lugaresRestantes} lugares!
                    </p>
                  </div>
                ) : (
                  <div>
                    <span
                      className={`text-5xl font-light ${destacado ? "text-[#E2B865]" : "text-[#0C0D10]"}`}
                      style={df}
                    >
                      {precio}
                    </span>
                    <span className={`text-sm ml-1 ${destacado ? "text-[#FAF7F2]/40" : "text-slate-400"}`}>
                      {periodo}
                    </span>
                  </div>
                )}
              </div>
              <ul className="space-y-3 flex-1 mb-8">
                {caracteristicas.map((c) => (
                  <li key={c} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2
                      className={`w-4 h-4 flex-shrink-0 mt-0.5 ${destacado ? "text-[#C49A3C]" : "text-green-500"}`}
                    />
                    <span className={destacado ? "text-[#FAF7F2]/70" : "text-slate-600"}>{c}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={href}
                className={`text-center text-sm font-semibold px-5 py-3 rounded-xl transition-colors flex items-center justify-center gap-2 ${
                  destacado
                    ? "bg-[#C49A3C] hover:bg-[#E2B865] text-[#0C0D10]"
                    : "bg-[#F5F0E8] hover:bg-[#EAE4D9] text-[#0C0D10]"
                }`}
              >
                {cta}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          Los precios incluyen IVA. Facturación disponible para personas morales.
        </p>
      </section>

      {/* Tabla comparativa */}
      <section className="pb-20 max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-light text-[#0C0D10] text-center mb-10" style={df}>
          Comparativa de planes
        </h2>
        <div className="bg-white border border-[#EAE4D9] rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-4 border-b border-[#EAE4D9]">
            <div className="p-4" />
            {["Básico", "Premium", "Despacho"].map((p) => (
              <div key={p} className="p-4 text-center border-l border-[#EAE4D9]">
                <p className="text-sm font-semibold text-[#0C0D10]" style={df}>{p}</p>
              </div>
            ))}
          </div>
          {/* Rows */}
          {COMPARATIVA.map(({ feature, basico, premium, despacho }, i) => (
            <div
              key={feature}
              className={`grid grid-cols-4 border-b border-[#EAE4D9] last:border-0 ${i % 2 === 1 ? "bg-[#FAF7F2]" : ""}`}
            >
              <div className="p-4 text-sm text-slate-600">{feature}</div>
              {[basico, premium, despacho].map((val, j) => (
                <div key={j} className="p-4 text-center border-l border-[#EAE4D9]">
                  {typeof val === "boolean" ? (
                    val
                      ? <CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" />
                      : <span className="text-slate-200 text-lg">—</span>
                  ) : (
                    <span className="text-xs font-medium text-[#0C0D10]">{val}</span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-20 max-w-3xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-light text-[#0C0D10] text-center mb-10" style={df}>Preguntas frecuentes</h2>
        <div className="space-y-4">
          {[
            {
              q: "¿Puedo cambiar de plan en cualquier momento?",
              a: "Sí. Puedes actualizar o bajar de plan desde tu panel. El cambio aplica al siguiente ciclo de facturación.",
            },
            {
              q: "¿Qué incluye la prueba gratuita?",
              a: "Al registrarte obtienes acceso completo al plan Premium durante 14 días sin ingresar tarjeta. Al terminar el periodo, tu perfil pasa automáticamente al plan Básico.",
            },
            {
              q: "¿Cómo se procesan los pagos?",
              a: "Los pagos se procesan de forma segura a través de Stripe. Aceptamos tarjetas de crédito y débito Visa, Mastercard y American Express. Lexia no almacena datos de tarjeta.",
            },
            {
              q: "¿Hay reembolsos?",
              a: "Ofrecemos reembolso completo si cancelas dentro de los primeros 7 días del primer mes. Después de ese periodo, no hay reembolsos por el ciclo en curso.",
            },
          ].map(({ q, a }) => (
            <div key={q} className="bg-white border border-[#EAE4D9] rounded-xl p-6">
              <h3 className="font-semibold text-[#0C0D10] text-sm mb-2">{q}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
