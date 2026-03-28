import Link from "next/link"
import { ArrowRight, Heart, ShieldCheck, Briefcase, FileText, Scale, Home, MessageCircle } from "lucide-react"

const df = { fontFamily: "var(--font-cormorant)" }

const CATEGORIAS = [
  {
    slug: "familiar",
    icon: Heart,
    titulo: "Derecho Familiar",
    color: "text-rose-400",
    bgColor: "bg-rose-400/10",
    preguntas: [
      {
        q: "¿Cómo puedo pedir el divorcio en México?",
        a: "En México existe el divorcio incausado (sin necesidad de expresar motivo), que puede solicitarlo cualquiera de los cónyuges ante un juez de lo familiar. Solo es necesario acreditar el matrimonio y presentar una propuesta de convenio sobre bienes, hijos y pensión. El proceso tarda entre 3 y 6 meses dependiendo del estado.",
      },
      {
        q: "¿Quién tiene la custodia de los hijos cuando hay divorcio?",
        a: "Los jueces privilegian la custodia compartida cuando ambos padres son aptos. Si hay desacuerdo, el juez evalúa el interés superior del menor considerando edad, vínculos afectivos y estabilidad. Menores de 12 años generalmente se asignan a la madre salvo causa grave; mayores de 12 pueden expresar su preferencia.",
      },
      {
        q: "¿Cuánto se debe pagar de pensión alimenticia?",
        a: "La ley no fija un porcentaje exacto — el monto se determina según las necesidades del menor y la capacidad económica del obligado. Los tribunales suelen establecer entre el 20 % y el 40 % del ingreso neto demostrable. Puedes solicitar pensión provisional desde que presentas la demanda.",
      },
      {
        q: "¿Cómo tramito una herencia sin testamento?",
        a: "Se inicia un juicio sucesorio intestamentario ante un juez de lo civil o notario. Los herederos legítimos son, en orden: cónyuge e hijos, padres, hermanos, y demás parientes. El proceso puede ser notarial si todos los herederos son mayores de edad y están de acuerdo, lo cual es más rápido y económico.",
      },
    ],
  },
  {
    slug: "penal",
    icon: ShieldCheck,
    titulo: "Derecho Penal",
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    preguntas: [
      {
        q: "Me detuvo la policía, ¿cuáles son mis derechos?",
        a: "Tienes derecho a: 1) Permanecer en silencio. 2) Ser informado del motivo de la detención. 3) Comunicarte con un familiar o abogado. 4) Ser presentado ante el Ministerio Público dentro de 48 horas (o 96 en delincuencia organizada). 5) No declarar sin tu abogado presente. Nunca debes firmar documentos sin asesoría legal.",
      },
      {
        q: "¿Qué es un amparo y cuándo lo puedo pedir?",
        a: "El amparo es el mecanismo constitucional que protege tus derechos frente a actos de autoridad. En materia penal, puedes solicitarlo contra una orden de aprehensión, acto de tortura, detención arbitraria, o sentencia definitiva. Existen plazos estrictos: generalmente 15 días hábiles desde que conoces el acto. Un abogado penalista puede orientarte si aplica en tu caso.",
      },
      {
        q: "Me acusan de un delito que no cometí, ¿qué hago?",
        a: "Contacta de inmediato a un abogado penalista. No declares sin asesoría. El Ministerio Público tiene la carga de probar tu culpabilidad; tú no estás obligado a probar tu inocencia. Reúne pruebas, testigos y cualquier evidencia que muestre dónde estabas o que contradiga la acusación. El sistema acusatorio oral garantiza tu presunción de inocencia.",
      },
      {
        q: "¿Qué diferencia hay entre el fuero común y el fuero federal?",
        a: "Los delitos del fuero común son los más frecuentes (robo, fraude, homicidio en riña) y los atiende la Fiscalía del estado. Los del fuero federal afectan a la federación o involucran organizaciones criminales, narcotráfico, secuestro, trata de personas, y los investiga la FGR. Un mismo hecho puede involucrar ambos fueros.",
      },
    ],
  },
  {
    slug: "laboral",
    icon: Briefcase,
    titulo: "Derecho Laboral",
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10",
    preguntas: [
      {
        q: "Me despidieron sin causa justificada, ¿qué me corresponde?",
        a: "Tienes derecho a liquidación completa: 3 meses de salario + 20 días por año trabajado + partes proporcionales de aguinaldo, vacaciones y prima vacacional. Además puedes demandar salarios caídos desde el despido hasta la resolución. Tienes 2 meses para presentar demanda ante el CEJUNT o Tribunal Laboral.",
      },
      {
        q: "¿Mi empleador puede descontarme el IMSS de mi salario?",
        a: "No. Las cuotas del IMSS a cargo del patrón (aproximadamente el 20 % de tu salario) nunca pueden descontarse al trabajador. Solo se descuenta la cuota obrera (alrededor del 2 % del salario) que sí es parte de tus aportaciones. Si te descuentan más, es una violación a la Ley Federal del Trabajo.",
      },
      {
        q: "¿Qué es el outsourcing y cómo me afecta la reforma de 2021?",
        a: "La reforma de 2021 prohibió el outsourcing de personal. Las empresas deben contratar directamente a sus trabajadores o usar servicuios especializados bajo esquemas estrictamente regulados. Como trabajador, esto te garantiza el derecho a utilidades (PTU) sobre las ganancias de la empresa que realmente te beneficia económicamente.",
      },
      {
        q: "¿Puedo demandar acoso laboral (mobbing)?",
        a: "Sí. El acoso laboral está reconocido en la LFT como causa de rescisión sin responsabilidad del trabajador, lo que te da derecho a la misma liquidación que un despido injustificado. También puedes presentar una queja ante la STPS. Documenta todo: mensajes, correos, testigos y fechas.",
      },
    ],
  },
  {
    slug: "civil",
    icon: Scale,
    titulo: "Derecho Civil",
    color: "text-violet-400",
    bgColor: "bg-violet-400/10",
    preguntas: [
      {
        q: "Me prestaron dinero y no me pagan, ¿qué puedo hacer?",
        a: "Si tienes un pagaré o contrato escrito, puedes iniciar un juicio ejecutivo mercantil, que es más rápido porque el título ejecutivo ya demuestra la deuda. Si solo tienes testigos o transferencias bancarias, se demanda por la vía ordinaria. En ambos casos puedes solicitar embargo preventivo de bienes desde el inicio del juicio.",
      },
      {
        q: "¿Cómo hago válido un contrato verbal?",
        a: "Los contratos verbales son válidos en México para la mayoría de los actos cotidianos, pero son difíciles de probar. Se puede acreditar su existencia con testigos, mensajes, correos electrónicos, transferencias bancarias o conductas de las partes. Para contratos importantes (arrendamiento largo plazo, compraventa de inmueble), la ley exige forma escrita y en algunos casos escritura notarial.",
      },
      {
        q: "Me rentaron una casa y el dueño no quiere devolverme el depósito",
        a: "El depósito debe devolverse al término del contrato si no hay daños documentados. Si el arrendador se niega injustificadamente, puedes demandar su devolución más daños y perjuicios ante el juzgado civil. Conserva el recibo de depósito, el contrato, fotos del estado del inmueble y cualquier comunicación escrita.",
      },
      {
        q: "¿Qué es la prescripción y cómo afecta mi caso?",
        a: "La prescripción extingue un derecho cuando no se ejerce en el plazo legal. Los plazos varían: deudas civiles prescriben en 10 años, mercantiles en 3 a 10 años según el tipo, daños extracontractuales en 2 años. Una vez prescrito, el deudor puede negarse a pagar legalmente. Por eso es crucial no esperar para buscar asesoría.",
      },
    ],
  },
  {
    slug: "fiscal",
    icon: FileText,
    titulo: "Derecho Fiscal",
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
    preguntas: [
      {
        q: "El SAT me está auditando, ¿qué debo hacer?",
        a: "No ignores ninguna notificación del SAT. Tienes plazos estrictos para responder (normalmente 15 a 20 días hábiles). Reúne toda tu documentación contable, facturas y estados de cuenta. Un contador o abogado fiscal puede revisitar si la auditoría tiene fundamento y qué información debes proporcionar para evitar que se presuma ingresos no declarados.",
      },
      {
        q: "¿Puedo impugnar una multa o crédito fiscal del SAT?",
        a: "Sí. Tienes dos vías: el Recurso de Revocación (ante el mismo SAT, plazo de 30 días) o el Juicio Contencioso Administrativo ante el TFJA (plazo de 30 días hábiles). En casos donde estén en juego derechos constitucionales también es posible el amparo. La asesoría de un abogado fiscal desde el inicio maximiza tus posibilidades de éxito.",
      },
      {
        q: "Soy freelancer, ¿cómo debo facturar correctamente?",
        a: "Los trabajadores independientes deben estar dados de alta en el SAT. Puedes tributar en el Régimen Simplificado de Confianza (RESICO) si tus ingresos son menores a 3.5 millones anuales, pagando una tasa reducida. Debes emitir CFDI por cada pago recibido y presentar declaraciones mensuales y anuales. Un contador puede optimizar tu carga fiscal legalmente.",
      },
    ],
  },
  {
    slug: "inmobiliario",
    icon: Home,
    titulo: "Derecho Inmobiliario",
    color: "text-teal-400",
    bgColor: "bg-teal-400/10",
    preguntas: [
      {
        q: "¿Qué debo revisar antes de comprar una casa?",
        a: "Verifica: 1) Que el vendedor sea el dueño registrado (certificado de libertad de gravamen del RPP). 2) Que el inmueble no tenga adeudos de predial o agua. 3) Que no haya litigios pendientes. 4) Que las medidas y colindancias coincidan con el título. 5) Que los permisos de construcción estén en orden. Hazlo antes de firmar cualquier contrato o dar anticipo.",
      },
      {
        q: "Me rento una casa y el arrendador quiere subirme la renta, ¿puede hacerlo?",
        a: "Solo puede modificar la renta al término del contrato o en la fecha pactada para revisión. Durante la vigencia del contrato, el monto es inamovible salvo acuerdo escrito entre las partes. Si el contrato venció y sigues pagando, se convierte en contrato por tiempo indefinido y el arrendador puede solicitar ajuste previo aviso.",
      },
      {
        q: "¿Cómo funciona la escrituración de un inmueble?",
        a: "La escrituración formaliza la compraventa ante Notario Público e inscribe el nuevo propietario en el Registro Público de la Propiedad. Incluye el pago de impuestos (ISR para el vendedor, ISAI para el comprador). Los honorarios notariales varían por estado pero suelen ser del 1 % al 2 % del valor del inmueble. Sin escritura, la compraventa no es oponible a terceros.",
      },
    ],
  },
]

const DISCLAIMER = "La información en esta página es orientativa y no constituye asesoría legal formal. Cada caso es único. Consulta con un abogado para recibir orientación específica sobre tu situación."

export default function PreguntasPage() {
  return (
    <div className="bg-[#FAF7F2]">
      {/* Header */}
      <section
        className="py-20 text-center"
        style={{ background: "linear-gradient(160deg, #0C0D10 0%, #1A1C26 100%)" }}
      >
        <p className="text-xs font-semibold tracking-widest uppercase text-[#C49A3C] mb-3">
          Para clientes
        </p>
        <h1 className="text-5xl font-light text-white mb-4" style={df}>
          Asesoría legal gratuita
        </h1>
        <p className="text-[#FAF7F2]/50 text-sm max-w-md mx-auto">
          Respuestas a las preguntas legales más frecuentes en México. Sin costo, sin registro.
        </p>
        <Link
          href="/abogados"
          className="inline-flex items-center gap-2 mt-8 bg-[#C49A3C] hover:bg-[#E2B865] text-[#0C0D10] font-semibold text-sm px-6 py-3 rounded-xl transition-colors"
        >
          Hablar con un abogado
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* Quick nav */}
      <section className="bg-white border-b border-[#EAE4D9] sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex gap-1 overflow-x-auto py-3 scrollbar-hide">
          {CATEGORIAS.map(({ slug, titulo, icon: Icon }) => (
            <a
              key={slug}
              href={`#${slug}`}
              className="flex-shrink-0 flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#0C0D10] px-3 py-1.5 rounded-lg hover:bg-[#FAF7F2] transition-colors whitespace-nowrap"
            >
              <Icon className="w-3.5 h-3.5" />
              {titulo}
            </a>
          ))}
        </div>
      </section>

      {/* Categories */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-16">
        {CATEGORIAS.map(({ slug, icon: Icon, titulo, color, bgColor, preguntas }) => (
          <section key={slug} id={slug} className="scroll-mt-16">
            {/* Category header */}
            <div className="flex items-center gap-3 mb-8">
              <div className={`w-10 h-10 rounded-xl ${bgColor} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <h2 className="text-3xl font-light text-[#0C0D10]" style={df}>{titulo}</h2>
              <div className="flex-1 h-px bg-[#EAE4D9] ml-2" />
            </div>

            {/* Questions */}
            <div className="space-y-4">
              {preguntas.map(({ q, a }) => (
                <div key={q} className="bg-white border border-[#EAE4D9] rounded-xl p-6">
                  <h3 className="font-semibold text-[#0C0D10] text-sm mb-3 leading-snug">{q}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{a}</p>
                </div>
              ))}
            </div>

            {/* Find lawyer CTA for this specialty */}
            <div className="mt-6 flex justify-end">
              <Link
                href={`/abogados/chihuahua/${slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C49A3C] hover:text-[#E2B865] transition-colors"
              >
                Ver abogados de {titulo}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </section>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-8">
        <p className="text-xs text-slate-400 text-center border-t border-[#EAE4D9] pt-8 leading-relaxed">
          {DISCLAIMER}
        </p>
      </div>

      {/* Bottom CTA */}
      <section className="py-16 bg-[#0C0D10]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-12 h-12 rounded-full bg-[#C49A3C]/10 border border-[#C49A3C]/30 flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="w-5 h-5 text-[#C49A3C]" />
          </div>
          <h2 className="text-4xl font-light text-white mb-4" style={df}>
            ¿Tu pregunta no está aquí?
          </h2>
          <p className="text-[#FAF7F2]/50 text-sm mb-8 max-w-md mx-auto">
            Nuestro directorio tiene abogados verificados en todas las especialidades. Contáctalos directamente — la primera consulta suele ser gratuita.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/abogados"
              className="inline-flex items-center justify-center gap-2 bg-[#C49A3C] hover:bg-[#E2B865] text-[#0C0D10] font-semibold text-sm px-7 py-3.5 rounded-xl transition-colors"
            >
              Buscar abogado ahora
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center gap-2 border border-white/15 hover:border-white/30 text-white/70 hover:text-white font-semibold text-sm px-7 py-3.5 rounded-xl transition-colors"
            >
              Escríbenos
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
