const df = { fontFamily: "var(--font-cormorant)" }

export default function TerminosPage() {
  return (
    <div className="bg-[#FAF7F2]">
      <section
        className="py-16 text-center"
        style={{ background: "linear-gradient(160deg, #0C0D10 0%, #1A1C26 100%)" }}
      >
        <p className="text-xs font-semibold tracking-widest uppercase text-[#C49A3C] mb-3">Legal</p>
        <h1 className="text-5xl font-light text-white mb-3" style={df}>Términos de Uso</h1>
        <p className="text-[#FAF7F2]/40 text-sm">Última actualización: 1 de enero de 2026</p>
      </section>

      <section className="py-16 max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-white border border-[#EAE4D9] rounded-2xl p-8 sm:p-12 text-sm leading-relaxed text-slate-600 space-y-8">

          <div>
            <h2 className="text-2xl font-light text-[#0C0D10] mb-3" style={df}>1. Aceptación de los términos</h2>
            <p>
              Al acceder o utilizar la plataforma Lexia (lexia.mx), usted acepta quedar vinculado por los presentes Términos de Uso. Si no está de acuerdo con alguno de estos términos, le pedimos que no utilice la plataforma.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-light text-[#0C0D10] mb-3" style={df}>2. Descripción del servicio</h2>
            <p>
              Lexia es un directorio en línea que facilita el contacto entre personas que buscan servicios legales y abogados que ofrecen dichos servicios en México. Lexia no presta servicios legales directamente, no actúa como intermediario en la relación abogado-cliente y no garantiza el resultado de ningún asunto legal.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-light text-[#0C0D10] mb-3" style={df}>3. Registro y cuentas</h2>
            <p>Los abogados que deseen aparecer en el directorio deben:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Proporcionar información veraz, completa y actualizada.</li>
              <li>Contar con cédula profesional vigente expedida por la SEP.</li>
              <li>Mantener la confidencialidad de sus credenciales de acceso.</li>
              <li>Notificar a Lexia de cualquier uso no autorizado de su cuenta.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-light text-[#0C0D10] mb-3" style={df}>4. Conductas prohibidas</h2>
            <p>Queda prohibido:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Publicar información falsa, engañosa o fraudulenta.</li>
              <li>Usar la plataforma para fines distintos a la búsqueda o promoción de servicios legales.</li>
              <li>Intentar acceder sin autorización a cuentas de otros usuarios o sistemas de Lexia.</li>
              <li>Publicar contenido que viole derechos de terceros, sea difamatorio u ofensivo.</li>
              <li>Hacer scraping masivo o uso automatizado de la plataforma sin autorización.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-light text-[#0C0D10] mb-3" style={df}>5. Planes y pagos</h2>
            <p>
              Los planes de pago se facturan mensualmente. Lexia se reserva el derecho de modificar los precios con 30 días de anticipación. El usuario puede cancelar su suscripción en cualquier momento desde el panel de suscripción; el acceso continuará hasta el fin del período pagado, sin reembolso por el período no utilizado salvo lo dispuesto por ley.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-light text-[#0C0D10] mb-3" style={df}>6. Limitación de responsabilidad</h2>
            <p>
              Lexia no es responsable por la calidad, legalidad, puntualidad o resultado de los servicios prestados por los abogados listados en el directorio. La relación contractual se establece directamente entre el cliente y el abogado. En ningún caso la responsabilidad de Lexia excederá el monto pagado por el usuario en los últimos tres meses.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-light text-[#0C0D10] mb-3" style={df}>7. Propiedad intelectual</h2>
            <p>
              El diseño, logotipos, textos y demás elementos de la plataforma son propiedad de Lexia o de sus licenciantes. El contenido publicado por los abogados en sus perfiles es responsabilidad exclusiva de cada usuario, quien otorga a Lexia una licencia no exclusiva para mostrarlo en la plataforma.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-light text-[#0C0D10] mb-3" style={df}>8. Ley aplicable y jurisdicción</h2>
            <p>
              Estos términos se rigen por las leyes vigentes en los Estados Unidos Mexicanos. Para cualquier controversia derivada de su interpretación o cumplimiento, las partes se someten a la jurisdicción de los tribunales competentes en Ciudad de México, renunciando a cualquier otro fuero que pudiera corresponderles.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-light text-[#0C0D10] mb-3" style={df}>9. Contacto</h2>
            <p>
              Para dudas sobre estos términos, escríbenos a <strong>legal@lexia.mx</strong>.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
