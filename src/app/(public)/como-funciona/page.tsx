import Link from "next/link"
import { Search, ShieldCheck, Phone, CheckCircle2, ArrowRight, Star, Users } from "lucide-react"

const df = { fontFamily: "var(--font-cormorant)" }

const PASOS_CLIENTE = [
  {
    num: "01",
    icon: Search,
    titulo: "Describe tu problema",
    desc: "Ingresa el tipo de asunto legal que tienes o elige una especialidad. Puedes filtrar por ciudad o estado para encontrar abogados cerca de ti.",
  },
  {
    num: "02",
    icon: Users,
    titulo: "Compara perfiles",
    desc: "Revisa la experiencia, especialidades, reseñas y calificaciones de cada abogado. Todos los perfiles están verificados con cédula profesional SEP.",
  },
  {
    num: "03",
    icon: Phone,
    titulo: "Contacta directamente",
    desc: "Escríbele por WhatsApp, envía un mensaje o llama directamente. Sin intermediarios, sin costos ocultos y sin letra pequeña.",
  },
]

const PASOS_ABOGADO = [
  {
    num: "01",
    titulo: "Crea tu perfil",
    desc: "Regístrate gratis en minutos. Agrega tu cédula profesional, especialidades, experiencia y datos de contacto.",
  },
  {
    num: "02",
    titulo: "Verifica tu cédula",
    desc: "Enviamos tu cédula al verificador del SEP. Una vez confirmada, aparece el badge de verificado en tu perfil.",
  },
  {
    num: "03",
    titulo: "Recibe clientes",
    desc: "Tu perfil aparece en búsquedas relevantes. Los clientes te contactan directamente — tú decides cómo responder y qué cobrar.",
  },
]

const FAQS = [
  {
    q: "¿Es gratuito buscar un abogado en Lexia?",
    a: "Sí, completamente gratuito para quien busca asesoría legal. Nunca cobramos ni tomamos comisión por conectarte con un abogado.",
  },
  {
    q: "¿Cómo verifican a los abogados?",
    a: "Verificamos la cédula profesional de cada abogado directamente contra el sistema del SEP (Secretaría de Educación Pública). Solo mostramos el badge de verificado cuando la cédula es válida.",
  },
  {
    q: "¿Lexia cobra comisión por cada cliente que consigo?",
    a: "No. Los abogados pagan una suscripción mensual por visibilidad en el directorio — nunca una comisión sobre lo que cobres a tus clientes.",
  },
  {
    q: "¿Puedo registrarme como abogado gratis?",
    a: "Sí. El plan Básico es gratuito e incluye un perfil público en el directorio. Los planes de pago ofrecen mayor visibilidad y herramientas adicionales.",
  },
  {
    q: "¿Qué pasa si tengo un problema con un abogado del directorio?",
    a: "Lexia facilita el contacto pero no interviene en la relación abogado-cliente. Si tienes una queja grave, puedes reportarla y evaluaremos restringir el perfil.",
  },
]

export default function ComoFuncionaPage() {
  return (
    <div className="bg-[#FAF7F2]">
      {/* Header */}
      <section
        className="py-20 text-center"
        style={{ background: "linear-gradient(160deg, #0C0D10 0%, #1A1C26 100%)" }}
      >
        <p className="text-xs font-semibold tracking-widest uppercase text-[#C49A3C] mb-3">Guía</p>
        <h1 className="text-5xl font-light text-white mb-4" style={df}>
          Cómo funciona Lexia
        </h1>
        <p className="text-[#FAF7F2]/50 text-base max-w-md mx-auto">
          La forma más sencilla de encontrar al abogado adecuado para tu caso.
        </p>
      </section>

      {/* Para clientes */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#C49A3C] mb-2">Si buscas un abogado</p>
          <h2 className="text-4xl font-light text-[#0C0D10]" style={df}>Solo entra, busca y contacta</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {PASOS_CLIENTE.map(({ num, icon: Icon, titulo, desc }) => (
            <div key={num} className="text-center">
              <div className="relative mx-auto w-16 h-16 rounded-2xl bg-white border border-[#EAE4D9] flex items-center justify-center mb-5 shadow-sm">
                <Icon className="w-6 h-6 text-[#C49A3C]" />
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#0C0D10] text-white text-xs flex items-center justify-center font-bold" style={df}>
                  {parseInt(num)}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-[#0C0D10] mb-2" style={df}>{titulo}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/abogados"
            className="inline-flex items-center gap-2 bg-[#C49A3C] hover:bg-[#E2B865] text-[#0C0D10] font-semibold text-sm px-7 py-3.5 rounded-xl transition-colors"
          >
            Buscar abogado ahora
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-[#EAE4D9] max-w-4xl mx-auto" />

      {/* Para abogados */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#C49A3C] mb-2">Si eres abogado</p>
          <h2 className="text-4xl font-light text-[#0C0D10]" style={df}>Publica tu perfil en 3 pasos</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {PASOS_ABOGADO.map(({ num, titulo, desc }) => (
            <div key={num} className="bg-white border border-[#EAE4D9] rounded-xl p-6">
              <span className="text-4xl font-light text-[#EAE4D9]" style={df}>{num}</span>
              <h3 className="text-lg font-semibold text-[#0C0D10] mt-2 mb-2" style={df}>{titulo}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#0C0D10] rounded-2xl p-8 mt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white font-semibold text-lg" style={df}>¿Listo para crecer tu práctica?</p>
            <p className="text-[#FAF7F2]/50 text-sm mt-1">Plan Básico gratuito. Sin permanencia.</p>
          </div>
          <Link
            href="/registro"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-[#C49A3C] hover:bg-[#E2B865] text-[#0C0D10] font-semibold text-sm px-6 py-3 rounded-xl transition-colors"
          >
            Crear mi perfil gratis
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Trust signals */}
      <section className="py-16 bg-white border-y border-[#EAE4D9]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            {[
              { icon: ShieldCheck, title: "Cédulas verificadas", desc: "Cada abogado está validado contra el registro oficial del SEP." },
              { icon: Star,        title: "Reseñas reales",       desc: "Solo clientes que han contactado al abogado pueden dejar reseñas." },
              { icon: CheckCircle2,title: "Sin comisiones",        desc: "Nunca cobramos comisión por los casos que el abogado consiga." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#F5F0E8] flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#C49A3C]" />
                </div>
                <h3 className="font-semibold text-[#0C0D10]" style={df}>{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-light text-[#0C0D10]" style={df}>Preguntas frecuentes</h2>
        </div>
        <div className="space-y-4">
          {FAQS.map(({ q, a }) => (
            <div key={q} className="bg-white border border-[#EAE4D9] rounded-xl p-6">
              <h3 className="font-semibold text-[#0C0D10] mb-2 text-sm">{q}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
