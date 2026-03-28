import { Mail, MapPin, Clock, MessageSquare } from "lucide-react"

const df = { fontFamily: "var(--font-cormorant)" }

export default function ContactoPage() {
  return (
    <div className="bg-[#FAF7F2]">
      {/* Header */}
      <section
        className="py-16 text-center"
        style={{ background: "linear-gradient(160deg, #0C0D10 0%, #1A1C26 100%)" }}
      >
        <p className="text-xs font-semibold tracking-widest uppercase text-[#C49A3C] mb-3">Ayuda</p>
        <h1 className="text-5xl font-light text-white mb-3" style={df}>Contáctanos</h1>
        <p className="text-[#FAF7F2]/50 text-sm max-w-sm mx-auto">
          Respondemos todos los mensajes en menos de 24 horas hábiles.
        </p>
      </section>

      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-5 gap-8">
          {/* Info */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-light text-[#0C0D10] mb-6" style={df}>Información de contacto</h2>
              <div className="space-y-5">
                {[
                  { icon: Mail,         label: "Correo general",    value: "hola@lexia.mx" },
                  { icon: MessageSquare,label: "Soporte técnico",    value: "soporte@lexia.mx" },
                  { icon: MapPin,        label: "Ubicación",          value: "Ciudad de México, México" },
                  { icon: Clock,         label: "Horario de atención", value: "Lun–Vie · 9:00–18:00 CST" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-lg bg-[rgba(196,154,60,0.1)] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-[#C49A3C]" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-0.5">{label}</p>
                      <p className="text-sm font-medium text-[#0C0D10]">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0C0D10] rounded-xl p-5 text-white">
              <p className="font-semibold mb-1 text-sm" style={df}>¿Eres abogado?</p>
              <p className="text-[#FAF7F2]/50 text-xs leading-relaxed">
                Para soporte de tu cuenta o dudas sobre tu suscripción escríbenos a{" "}
                <span className="text-[#C49A3C]">soporte@lexia.mx</span> indicando el correo de tu cuenta.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3 bg-white border border-[#EAE4D9] rounded-2xl p-7">
            <h2 className="text-2xl font-light text-[#0C0D10] mb-6" style={df}>Envíanos un mensaje</h2>
            <form className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    placeholder="Tu nombre completo"
                    className="w-full border border-[#EAE4D9] rounded-lg px-3.5 py-2.5 text-sm text-[#0C0D10] placeholder-slate-300 focus:outline-none focus:border-[#C49A3C] transition-colors bg-[#FAF7F2]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">Correo electrónico</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="tu@correo.com"
                    className="w-full border border-[#EAE4D9] rounded-lg px-3.5 py-2.5 text-sm text-[#0C0D10] placeholder-slate-300 focus:outline-none focus:border-[#C49A3C] transition-colors bg-[#FAF7F2]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">Asunto</label>
                <select
                  name="asunto"
                  className="w-full border border-[#EAE4D9] rounded-lg px-3.5 py-2.5 text-sm text-[#0C0D10] focus:outline-none focus:border-[#C49A3C] transition-colors bg-[#FAF7F2]"
                >
                  <option value="">Selecciona un asunto</option>
                  <option value="soporte">Soporte técnico</option>
                  <option value="cuenta">Problema con mi cuenta</option>
                  <option value="suscripcion">Dudas sobre suscripción</option>
                  <option value="reporte">Reportar un perfil</option>
                  <option value="prensa">Prensa / alianzas</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">Mensaje</label>
                <textarea
                  name="mensaje"
                  rows={5}
                  placeholder="Cuéntanos cómo podemos ayudarte..."
                  className="w-full border border-[#EAE4D9] rounded-lg px-3.5 py-2.5 text-sm text-[#0C0D10] placeholder-slate-300 focus:outline-none focus:border-[#C49A3C] transition-colors bg-[#FAF7F2] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#C49A3C] hover:bg-[#E2B865] text-[#0C0D10] font-semibold text-sm py-3 rounded-xl transition-colors"
              >
                Enviar mensaje
              </button>

              <p className="text-xs text-slate-400 text-center">
                Al enviar, aceptas nuestra{" "}
                <a href="/privacidad" className="text-[#C49A3C] hover:underline">política de privacidad</a>.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
