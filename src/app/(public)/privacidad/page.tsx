const df = { fontFamily: "var(--font-cormorant)" }

export default function PrivacidadPage() {
  return (
    <div className="bg-[#FAF7F2]">
      <section
        className="py-16 text-center"
        style={{ background: "linear-gradient(160deg, #0C0D10 0%, #1A1C26 100%)" }}
      >
        <p className="text-xs font-semibold tracking-widest uppercase text-[#C49A3C] mb-3">Legal</p>
        <h1 className="text-5xl font-light text-white mb-3" style={df}>Aviso de Privacidad</h1>
        <p className="text-[#FAF7F2]/40 text-sm">Última actualización: 1 de enero de 2026</p>
      </section>

      <section className="py-16 max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-white border border-[#EAE4D9] rounded-2xl p-8 sm:p-12 prose prose-slate max-w-none text-sm leading-relaxed text-slate-600 space-y-8">

          <div>
            <h2 className="text-2xl font-light text-[#0C0D10] mb-3" style={df}>1. Responsable del tratamiento</h2>
            <p>
              Lexia (en adelante "Lexia", "nosotros" o "la plataforma"), con domicilio en Ciudad de México, es el responsable del tratamiento de sus datos personales conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) y su Reglamento.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-light text-[#0C0D10] mb-3" style={df}>2. Datos que recabamos</h2>
            <p>Según el tipo de usuario, recabamos los siguientes datos:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Visitantes:</strong> dirección IP, cookies de sesión, datos de navegación.</li>
              <li><strong>Abogados registrados:</strong> nombre completo, correo electrónico, teléfono, cédula profesional SEP, especialidades, ciudad y estado, fotografía de perfil.</li>
              <li><strong>Clientes que contactan:</strong> nombre, correo electrónico, teléfono (cuando se proporcionan voluntariamente en formularios de contacto).</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-light text-[#0C0D10] mb-3" style={df}>3. Finalidades del tratamiento</h2>
            <p>Sus datos personales serán utilizados para:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Crear y administrar su cuenta y perfil en el directorio.</li>
              <li>Verificar la autenticidad de la cédula profesional ante el SEP.</li>
              <li>Facilitar el contacto entre clientes y abogados.</li>
              <li>Enviar notificaciones relacionadas con su cuenta y suscripción.</li>
              <li>Mejorar nuestros servicios mediante análisis estadísticos internos.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-light text-[#0C0D10] mb-3" style={df}>4. Transferencia de datos</h2>
            <p>
              Lexia no vende ni renta sus datos personales a terceros. Podemos compartir sus datos con proveedores de servicios tecnológicos (hosting, pagos, correo transaccional) únicamente para operar la plataforma, bajo acuerdos de confidencialidad. En caso de obligación legal, podríamos compartirlos con autoridades competentes.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-light text-[#0C0D10] mb-3" style={df}>5. Cookies</h2>
            <p>
              Utilizamos cookies técnicas necesarias para el funcionamiento de la plataforma (sesión de usuario, preferencias) y cookies analíticas para medir el tráfico de forma agregada. No utilizamos cookies de rastreo publicitario de terceros. Puede deshabilitar las cookies en la configuración de su navegador, aunque algunas funciones podrían verse afectadas.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-light text-[#0C0D10] mb-3" style={df}>6. Derechos ARCO</h2>
            <p>
              Usted tiene derecho a Acceder, Rectificar, Cancelar u Oponerse al tratamiento de sus datos personales (derechos ARCO). Para ejercerlos, envíe una solicitud a <strong>privacidad@lexia.mx</strong> indicando su nombre completo, correo registrado y el derecho que desea ejercer. Responderemos en un plazo máximo de 20 días hábiles.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-light text-[#0C0D10] mb-3" style={df}>7. Cambios a este aviso</h2>
            <p>
              Lexia se reserva el derecho de modificar este aviso de privacidad en cualquier momento. Cualquier cambio relevante será notificado mediante un aviso visible en la plataforma o por correo electrónico.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-light text-[#0C0D10] mb-3" style={df}>8. Contacto</h2>
            <p>
              Para cualquier consulta relacionada con este aviso, puede escribirnos a <strong>privacidad@lexia.mx</strong>.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
