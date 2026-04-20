export interface BlogPost {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  category: string
  specialtySlug: string
  specialtyLabel: string
  publishedAt: string
  readingTime: number
  excerpt: string
  content: string
}

export const POSTS: BlogPost[] = [
  {
    slug: "liquidacion-despido-mexico",
    title: "¿Cuánto me corresponde de liquidación si me despiden en México?",
    metaTitle: "Liquidación por despido en México: cómo calcularla 2025 | Lexia",
    metaDescription:
      "Aprende a calcular tu liquidación si te despiden en México. Fórmula completa: 3 meses + 20 días por año, partes proporcionales, salarios caídos y ejemplos numéricos reales.",
    category: "Derecho Laboral",
    specialtySlug: "laboral",
    specialtyLabel: "Derecho Laboral",
    publishedAt: "2025-03-15",
    readingTime: 9,
    excerpt:
      "Si te despidieron sin causa justificada, tienes derecho a una liquidación completa. Aquí te explicamos la fórmula exacta, con ejemplos numéricos y los pasos para reclamarla.",
    content: `
<h2>¿Qué es la liquidación laboral?</h2>
<p>La liquidación es el conjunto de pagos que un trabajador tiene derecho a recibir cuando es despedido de manera injustificada. En México, este derecho está protegido por la <strong>Ley Federal del Trabajo (LFT)</strong> y representa una de las garantías laborales más importantes para los trabajadores.</p>
<p>Es importante distinguir desde el principio entre dos conceptos: el <strong>finiquito</strong> (que se paga en cualquier terminación de la relación laboral) y la <strong>liquidación</strong> (que solo aplica cuando el despido es injustificado). En este artículo nos enfocamos en la liquidación, que implica montos mayores y requiere que el patrón haya actuado sin causa legal para terminar el contrato.</p>

<h2>Despido justificado vs. despido injustificado</h2>
<p>Antes de calcular cualquier monto, debes saber en qué categoría cae tu situación:</p>
<h3>Despido justificado</h3>
<p>El artículo 47 de la LFT lista las causas por las que un patrón puede despedir a un trabajador sin responsabilidad para la empresa: engaño al contratar, faltas de honradez, actos de violencia, revelación de secretos industriales, más de tres faltas injustificadas en 30 días, desobediencia grave, entre otras. En este caso, el trabajador solo tiene derecho al finiquito, no a la liquidación.</p>
<h3>Despido injustificado</h3>
<p>Cuando el patrón termina la relación laboral sin invocar ninguna causa legal, o cuando la causa invocada no se puede probar, el despido es injustificado. Aquí es donde aplica la liquidación completa.</p>
<div class="bg-amber-50 border-l-4 border-amber-400 p-4 my-6 rounded-r-lg"><p class="text-amber-800 text-sm font-medium">Importante: Si te presionaron para que firmaste tu renuncia voluntaria pero en realidad fue un despido encubierto, puedes alegar despido injustificado. La carga de la prueba recae en el patrón.</p></div>

<h2>La fórmula de la liquidación en México</h2>
<p>Cuando el despido es injustificado, el artículo 50 de la LFT establece que el trabajador tiene derecho a elegir entre dos opciones:</p>
<ul>
  <li><strong>Reinstalación</strong> al puesto con pago de salarios caídos, o</li>
  <li><strong>Indemnización constitucional</strong> más partes proporcionales</li>
</ul>
<p>La indemnización total se compone de tres elementos principales:</p>

<h3>1. Tres meses de salario integrado (indemnización constitucional)</h3>
<p>El artículo 123 constitucional, fracción XXII, garantiza al menos tres meses de salario cuando hay despido injustificado. Este monto se calcula sobre el <strong>salario diario integrado</strong>, que incluye no solo el salario base sino también partes proporcionales de aguinaldo, prima vacacional y cualquier prestación en especie.</p>

<h3>2. Veinte días de salario por año trabajado</h3>
<p>Además de los tres meses constitucionales, el artículo 50 LFT establece una prima de antigüedad de 20 días de salario integrado por cada año de servicio. Para fracciones de año, se paga proporcionalmente.</p>

<h3>3. Partes proporcionales de prestaciones</h3>
<p>Independientemente del tipo de terminación, siempre se deben pagar las partes proporcionales de:</p>
<ul>
  <li><strong>Aguinaldo:</strong> 15 días de salario por año (artículo 87 LFT). Si llevas 8 meses, recibes 10 días proporcionales.</li>
  <li><strong>Vacaciones no gozadas:</strong> los días que te corresponden según tu antigüedad y que no disfrutaste.</li>
  <li><strong>Prima vacacional:</strong> 25% adicional sobre el valor de tus días de vacaciones.</li>
  <li><strong>Salarios devengados:</strong> cualquier salario pendiente de pago.</li>
</ul>

<h2>Ejemplo numérico concreto</h2>
<p>Veamos un caso práctico para entender cómo funciona el cálculo:</p>
<p><strong>Situación:</strong> Trabajador con salario de $15,000 mensuales, 5 años de antigüedad, despedido injustificadamente el 15 de octubre, habiendo disfrutado todas sus vacaciones.</p>

<h3>Paso 1: Calcular el salario diario integrado</h3>
<p>Salario mensual: $15,000 → Salario diario: $15,000 ÷ 30 = <strong>$500/día</strong></p>
<p>Factor de integración (para 5 años): las primeras vacaciones son 12 días, con prima del 25% = 3 días de prima vacacional + aguinaldo de 15 días = 18 días extras ÷ 365 = 0.0493</p>
<p>Salario diario integrado: $500 × (1 + 0.0493) ≈ <strong>$524.66/día</strong></p>

<h3>Paso 2: Indemnización constitucional (3 meses)</h3>
<p>$524.66 × 90 días = <strong>$47,219.18</strong></p>

<h3>Paso 3: Prima de antigüedad (20 días × 5 años)</h3>
<p>$524.66 × 100 días = <strong>$52,466.00</strong></p>

<h3>Paso 4: Partes proporcionales (octubre = 9.5 meses del año)</h3>
<ul>
  <li>Aguinaldo proporcional: ($500 × 15 días × 9.5/12) = <strong>$5,937.50</strong></li>
  <li>Prima vacacional proporcional: $500 × 12 días × 25% × 9.5/12 = <strong>$1,187.50</strong></li>
</ul>

<h3>Total aproximado de liquidación</h3>
<p>$47,219.18 + $52,466.00 + $5,937.50 + $1,187.50 = <strong>$106,810.18</strong></p>
<div class="bg-amber-50 border-l-4 border-amber-400 p-4 my-6 rounded-r-lg"><p class="text-amber-800 text-sm font-medium">Este cálculo es aproximado. El salario integrado exacto varía según las prestaciones específicas de cada empresa. Un abogado laboral puede hacer el cálculo preciso con tu recibo de nómina.</p></div>

<h2>Salarios caídos: un concepto que pocos conocen</h2>
<p>Si decides demandar y ganas el juicio, también tienes derecho a los <strong>salarios caídos</strong>: el salario que dejaste de percibir desde el día del despido hasta que se dicte la sentencia. En juicios que duran 1-2 años, este monto puede ser significativo y sumar decenas de miles de pesos adicionales.</p>
<p>Sin embargo, los salarios caídos están topados a 12 meses más intereses a partir de la reforma de 2019, salvo en casos donde el trabajador acredite haber buscado activamente un nuevo empleo.</p>

<h2>El plazo para demandar: solo 2 meses</h2>
<p>Este es uno de los datos más críticos: el artículo 518 LFT establece un plazo de <strong>prescripción de 2 meses</strong> para ejercer la acción de reinstalación o indemnización por despido injustificado. Este plazo corre a partir del día siguiente al despido.</p>
<p>Si dejas pasar más de 2 meses, pierdes el derecho a demandar, independientemente de qué tan injusto haya sido el despido. Por eso es fundamental actuar con rapidez.</p>

<h2>¿Dónde demandar? El CEJUNT y los Tribunales Laborales</h2>
<p>Con la reforma laboral de 2019, los conflictos laborales ya no se resuelven ante las extintas Juntas de Conciliación y Arbitraje. Ahora el proceso es:</p>
<ul>
  <li><strong>Primero:</strong> Conciliación obligatoria ante el Centro de Conciliación y Registro Laboral (CFCRL) o sus equivalentes estatales. En Chihuahua se tramita ante el <strong>Centro de Justicia Laboral del Estado</strong>.</li>
  <li><strong>Si no hay acuerdo:</strong> Se demanda ante los nuevos Tribunales Laborales del Poder Judicial.</li>
</ul>
<p>El proceso de conciliación es gratuito y puede resolverse en semanas. Si el patrón no se presenta o no hay acuerdo, el expediente pasa al tribunal donde se lleva el juicio oral.</p>

<h2>Cómo negociar tu liquidación</h2>
<p>Muchos despidos se resuelven mediante negociación directa. Algunos consejos prácticos:</p>
<ul>
  <li>Nunca firmes un finiquito o convenio sin leerlo completamente y entender cada número.</li>
  <li>Compara lo ofrecido con lo que te correspondería legalmente.</li>
  <li>Las empresas frecuentemente ofrecen montos inferiores esperando que el trabajador no conozca sus derechos.</li>
  <li>Un convenio firmado ante el CEJUNT es válido y da certeza jurídica a ambas partes.</li>
  <li>Puedes negociar también beneficios adicionales: carta de recomendación, liquidación del seguro del IMSS, continuidad de seguro médico por un período.</li>
</ul>

<h2>Documentos que debes conservar siempre</h2>
<p>Para cualquier reclamación laboral, estos documentos son fundamentales:</p>
<ul>
  <li>Recibos de nómina (al menos los últimos 6 meses)</li>
  <li>Contrato individual de trabajo</li>
  <li>Carta de despido o cualquier comunicación escrita de la empresa</li>
  <li>Credencial de empleado, gafetes, correos electrónicos corporativos</li>
  <li>Cualquier documento que acredite la relación laboral y el salario real</li>
  <li>Datos de contacto de compañeros que puedan ser testigos</li>
</ul>

<div class="cta-block">
  <h3>¿Necesitas un abogado de Derecho Laboral?</h3>
  <p>En Lexia tenemos abogados verificados especializados en Derecho Laboral en todo México. Contáctalos directamente sin intermediarios.</p>
</div>
`,
  },
  {
    slug: "finiquito-vs-liquidacion",
    title: "¿Qué es el finiquito y en qué se diferencia de la liquidación?",
    metaTitle: "Finiquito vs Liquidación en México: diferencias y cálculo 2025 | Lexia",
    metaDescription:
      "Aprende la diferencia entre finiquito y liquidación laboral en México. Qué incluye cada uno, cómo calcularlo y qué hacer si solo te ofrecen el finiquito.",
    category: "Derecho Laboral",
    specialtySlug: "laboral",
    specialtyLabel: "Derecho Laboral",
    publishedAt: "2025-03-20",
    readingTime: 7,
    excerpt:
      "Muchos trabajadores confunden finiquito con liquidación, pero son conceptos distintos con montos muy diferentes. Te explicamos qué incluye cada uno y cuándo tienes derecho a cada uno.",
    content: `
<h2>El error más común al terminar una relación laboral</h2>
<p>Cuando termina una relación de trabajo, es frecuente que los patrones presenten al trabajador un solo documento llamado "finiquito" y le pidan que lo firme rápidamente. Muchos trabajadores lo hacen sin saber que pueden estar renunciando a montos mucho mayores a los que les están pagando. Entender la diferencia entre finiquito y liquidación puede significar decenas de miles de pesos.</p>

<h2>¿Qué es el finiquito?</h2>
<p>El <strong>finiquito</strong> es el documento y el pago que cierra la relación laboral entre un trabajador y un patrón. Se paga <em>siempre</em>, sin importar el motivo por el que terminó el contrato: renuncia voluntaria, jubilación, término de contrato por tiempo determinado, mutuo acuerdo o despido. El finiquito es, en pocas palabras, lo que la empresa te debe por el tiempo que ya trabajaste.</p>

<h3>¿Qué debe incluir el finiquito?</h3>
<p>El finiquito siempre debe contener:</p>
<ul>
  <li><strong>Salarios pendientes:</strong> los días trabajados del último período que aún no te han pagado.</li>
  <li><strong>Aguinaldo proporcional:</strong> la parte del aguinaldo correspondiente a los meses trabajados en el año en curso. El aguinaldo completo equivale a 15 días de salario; si trabajaste 6 meses, te corresponden 7.5 días proporcionales.</li>
  <li><strong>Vacaciones no gozadas:</strong> los días de vacaciones que te corresponden por ley pero que no disfrutaste. El artículo 76 LFT establece una tabla progresiva: 12 días el primer año, 14 el segundo, y así sucesivamente.</li>
  <li><strong>Prima vacacional:</strong> el 25% adicional sobre el valor de los días de vacaciones no gozados.</li>
  <li><strong>Partes proporcionales de cualquier otra prestación contractual</strong> (vales de despensa, bonos, etc.) si el contrato o las políticas internas así lo establecen.</li>
</ul>

<h2>¿Qué es la liquidación?</h2>
<p>La <strong>liquidación</strong>, también llamada "indemnización constitucional", es el pago adicional al que tiene derecho un trabajador cuando es despedido de manera <em>injustificada</em>. A diferencia del finiquito, la liquidación no siempre se debe: solo aplica cuando el patrón termina la relación sin invocar causas legales válidas, o cuando las causas que invoca no son ciertas.</p>
<p>La liquidación incluye:</p>
<ul>
  <li><strong>Tres meses de salario integrado</strong> (indemnización constitucional — artículo 123, fracción XXII de la Constitución)</li>
  <li><strong>Veinte días de salario por año de servicio</strong> (artículo 50 LFT)</li>
  <li><strong>Más el finiquito completo</strong> (las partes proporcionales de todas las prestaciones)</li>
</ul>

<h2>La diferencia clave en una tabla</h2>
<p>Para visualizar mejor la diferencia:</p>
<ul>
  <li><strong>Renuncia voluntaria:</strong> Solo finiquito. No hay liquidación.</li>
  <li><strong>Término de contrato por tiempo determinado:</strong> Solo finiquito. No hay liquidación (salvo que el patrón termine antes del plazo pactado).</li>
  <li><strong>Despido justificado (causas del artículo 47 LFT):</strong> Solo finiquito. No hay liquidación, aunque el patrón debe pagar la prima de antigüedad.</li>
  <li><strong>Despido injustificado:</strong> Finiquito + Liquidación completa (3 meses + 20 días/año). Esta es la situación más favorable para el trabajador.</li>
</ul>

<h2>Ejemplo comparativo de montos</h2>
<p>Tomemos como ejemplo a un trabajador con 3 años de antigüedad, salario de $12,000 mensuales ($400 diarios), despedido a mitad del año (6 meses cumplidos del año en curso), con todas sus vacaciones gozadas:</p>

<h3>Finiquito solamente (si hubiera renunciado)</h3>
<ul>
  <li>Aguinaldo proporcional: $400 × 15 × (6/12) = $3,000</li>
  <li>Prima vacacional proporcional: $400 × 14 días × 25% × (6/12) = $700</li>
  <li><strong>Total finiquito: $3,700</strong></li>
</ul>

<h3>Liquidación completa (despido injustificado)</h3>
<ul>
  <li>3 meses de salario: $400 × 90 = $36,000</li>
  <li>20 días por año (3 años): $400 × 60 = $24,000</li>
  <li>Finiquito: $3,700</li>
  <li><strong>Total con liquidación: $63,700</strong></li>
</ul>
<div class="bg-amber-50 border-l-4 border-amber-400 p-4 my-6 rounded-r-lg"><p class="text-amber-800 text-sm font-medium">La diferencia es de $60,000 en este ejemplo. Por eso es tan importante saber qué tipo de terminación aplica a tu caso antes de firmar cualquier documento.</p></div>

<h2>¿Qué hacer si te ofrecen solo el finiquito pero fue un despido?</h2>
<p>Este es el escenario más común de abuso: el trabajador es despedido pero el patrón solo le presenta un finiquito, o incluso le pide que firme una "renuncia voluntaria". Algunos patrones presionan al trabajador para firmar rápido, a veces diciéndole que "ese es todo lo que le corresponde" o que "si no firma, tardará meses en cobrar".</p>
<p>Si te encontrás en esta situación, sigue estos pasos:</p>
<ul>
  <li><strong>No firmes nada de inmediato.</strong> Tienes derecho a llevarte el documento para revisarlo con calma o con un abogado.</li>
  <li><strong>Si ya firmaste,</strong> un abogado puede revisar si hay vicios de consentimiento o si lo que firmaste no cubre lo que legalmente te corresponde.</li>
  <li><strong>Presenta una queja</strong> ante el Centro de Conciliación y Registro Laboral (CFCRL) dentro de los 2 meses siguientes al despido.</li>
  <li><strong>Recopila evidencia</strong> de que realmente hubo un despido: mensajes, correos, testigos.</li>
</ul>

<h2>El plazo de pago del finiquito: 6 días hábiles</h2>
<p>La LFT establece que el finiquito debe pagarse dentro de los <strong>6 días hábiles siguientes</strong> a la terminación de la relación laboral. Si el patrón no paga en ese plazo, puede ser sancionado y el trabajador puede exigir el pago de salarios vencidos por la mora.</p>
<p>En la práctica, muchas empresas lo pagan de inmediato al entregar la carta de finiquito. Pero si te dicen que "en dos semanas te depositamos", eso es una violación a la ley y puedes reclamarlo.</p>

<h2>La firma de documentos sin leer: el error fatal</h2>
<p>Firmar un finiquito implica, desde el punto de vista legal, que estás de acuerdo con los montos y que reconoces que la empresa te pagó todo lo que te debía. Si después quieres demandar, el patrón presentará ese documento como prueba de que ya liquidó todos tus derechos.</p>
<p>Por eso, antes de firmar cualquier documento al terminar tu empleo:</p>
<ul>
  <li>Verifica que los números cuadren con tu salario real.</li>
  <li>Revisa que estén incluidas todas las prestaciones (aguinaldo, vacaciones, prima).</li>
  <li>Si fue un despido injustificado, exige la liquidación completa, no solo el finiquito.</li>
  <li>Si tienes dudas, solicita un plazo de al menos 24 horas para revisarlo con un abogado.</li>
</ul>

<div class="cta-block">
  <h3>¿Necesitas un abogado de Derecho Laboral?</h3>
  <p>En Lexia tenemos abogados verificados especializados en Derecho Laboral en todo México. Contáctalos directamente sin intermediarios.</p>
</div>
`,
  },
  {
    slug: "demandar-empresa-sin-imss",
    title: "¿Puedo demandar a mi empresa si no me dan el IMSS?",
    metaTitle: "Demandar empresa por no dar IMSS en México 2025 | Lexia",
    metaDescription:
      "Si tu empresa no te inscribió al IMSS, tienes derechos. Aprende cómo denunciar, qué consecuencias enfrenta el patrón y cómo probar la relación laboral.",
    category: "Derecho Laboral",
    specialtySlug: "laboral",
    specialtyLabel: "Derecho Laboral",
    publishedAt: "2025-03-25",
    readingTime: 8,
    excerpt:
      "Trabajar sin seguridad social es ilegal y el patrón puede ser sancionado duramente. Te explicamos qué hacer si tu empresa no te da IMSS, desde la denuncia hasta la demanda.",
    content: `
<h2>La obligación del patrón: inscribir a todos los trabajadores</h2>
<p>En México, el artículo 12 de la Ley del Seguro Social establece que <strong>todos los trabajadores que presten un servicio personal y subordinado a cambio de un salario deben ser inscritos al IMSS</strong> por su patrón. Esta obligación es de orden público: no puede ser renunciada por el trabajador ni excluida en ningún contrato. Si alguien te dice "te pago más pero sin IMSS para que no le descuente", sepa que ese arreglo es ilegal y que el patrón sigue siendo responsable.</p>
<p>La inscripción debe hacerse desde el <strong>primer día de trabajo</strong>. No al mes, no cuando "se formalice la relación": desde el primer día. Cada jornada trabajada sin estar asegurado representa una infracción del patrón y un riesgo para el trabajador.</p>

<h2>¿Qué consecuencias enfrenta el patrón?</h2>
<p>Un patrón que no inscribe a sus trabajadores al IMSS puede enfrentar múltiples consecuencias:</p>

<h3>Multas del IMSS</h3>
<p>El artículo 304 de la Ley del Seguro Social establece multas de entre <strong>20 y 350 veces el salario mínimo general</strong> por no inscribir a los trabajadores, por no pagar las cuotas obrero-patronales o por presentar información falsa. Estas multas se aplican por trabajador y por período, por lo que pueden acumularse rápidamente.</p>

<h3>Pago de cuotas omitidas con recargos</h3>
<p>El IMSS puede determinar los créditos fiscales correspondientes a las cuotas que el patrón debió pagar y no pagó. Estos créditos incluyen la cuota patronal, la cuota obrera (que el patrón retuvo del salario pero no enteró) y recargos por mora. El IMSS tiene facultades de cobro coactivo, incluyendo embargo de cuentas y bienes.</p>

<h3>Responsabilidad civil ante el trabajador</h3>
<p>Si el trabajador sufrió algún daño a causa de no tener seguridad social (por ejemplo, tuvo un accidente de trabajo, una enfermedad o necesitó atención médica que tuvo que pagar de su bolsillo), el patrón es responsable de todos esos gastos y daños. El trabajador puede demandar el pago de las prestaciones que le correspondían del IMSS: gastos médicos, subsidio por incapacidad, pensión por invalidez, etc.</p>

<h2>Las afectaciones concretas al trabajador</h2>
<p>No tener IMSS no es solo un problema administrativo. Las consecuencias prácticas son gravísimas:</p>
<ul>
  <li><strong>Sin acceso a servicios médicos del IMSS:</strong> consultas, hospitalizaciones, cirugías, medicamentos. En México, una hospitalización puede costar entre $50,000 y más de $500,000 pesos si se paga en privado.</li>
  <li><strong>Sin subsidio por incapacidad:</strong> si te enfermas, el IMSS paga el 60% de tu salario mientras estás incapacitado. Sin estar inscrito, no recibes nada.</li>
  <li><strong>Sin INFONAVIT:</strong> tus aportaciones al INFONAVIT (5% de tu salario) son la base para obtener un crédito hipotecario o para retirar el fondo al final de tu vida laboral. Sin IMSS, no acumulas semanas ni aportaciones.</li>
  <li><strong>Sin AFORE ni pensión:</strong> las aportaciones para el retiro (6.5% de tu salario) solo se hacen cuando estás dado de alta en el IMSS. Cada mes sin seguridad social es un mes sin ahorro para tu pensión.</li>
  <li><strong>Sin seguro de vida por riesgos de trabajo:</strong> si tienes un accidente en el trabajo o una enfermedad profesional, el IMSS cubriría tratamiento, rehabilitación y hasta una pensión por invalidez. Sin inscripción, el patrón responde directamente de todos esos gastos.</li>
</ul>
<div class="bg-amber-50 border-l-4 border-amber-400 p-4 my-6 rounded-r-lg"><p class="text-amber-800 text-sm font-medium">Muchos trabajadores solo se dan cuenta de la magnitud del problema cuando se enferman o cuando van a tramitar su pensión y descubren que no tienen semanas cotizadas suficientes.</p></div>

<h2>¿Cómo denunciar al IMSS?</h2>
<p>Si tu patrón no te ha inscrito, puedes denunciarlo directamente ante el IMSS de las siguientes maneras:</p>
<ul>
  <li><strong>Subdelegación del IMSS:</strong> acudir personalmente al módulo de atención de la subdelegación que corresponde al domicilio del patrón, llevando evidencia de la relación laboral.</li>
  <li><strong>Portal web del IMSS:</strong> a través de imss.gob.mx en la sección de denuncias.</li>
  <li><strong>IMSS Digital:</strong> con la aplicación móvil.</li>
  <li><strong>Tel-IMSS:</strong> llamando al 800 623 2323.</li>
</ul>
<p>El IMSS realizará una investigación y, si confirma que hubo relación laboral, puede ordenar al patrón que te inscriba retroactivamente y pague las cuotas omitidas.</p>

<h2>La rescisión sin responsabilidad del trabajador</h2>
<p>El artículo 51 de la LFT establece que el trabajador puede rescindir el contrato <em>sin responsabilidad</em> y con derecho a indemnización completa (como si hubiera sido despedido injustificadamente) cuando el patrón incumple sus obligaciones. No inscribir al trabajador al IMSS es una de esas causas que justifican la rescisión.</p>
<p>Esto significa que si tu patrón no te da IMSS, tienes derecho a darte por despedido y reclamar 3 meses de salario + 20 días por año + partes proporcionales, exactamente igual que si te hubieran despedido injustificadamente.</p>

<h2>Cómo probar la relación laboral</h2>
<p>El reto más grande en estos casos es demostrar que existía una relación laboral cuando el patrón no la reconoce formalmente. Los medios de prueba más útiles son:</p>
<ul>
  <li><strong>Recibos de nómina o de pago</strong> firmados o sellados por la empresa</li>
  <li><strong>Contratos de trabajo</strong> (aunque sean informales)</li>
  <li><strong>Credencial de empleado, uniforme, gafete</strong></li>
  <li><strong>Correos electrónicos corporativos</strong> o comunicaciones internas</li>
  <li><strong>Testigos:</strong> compañeros de trabajo, clientes, proveedores que puedan declarar sobre tu trabajo</li>
  <li><strong>Fotografías, capturas de pantalla</strong> de chats de trabajo (WhatsApp empresarial, etc.)</li>
  <li><strong>Referencias bancarias:</strong> transferencias recibidas regularmente del patrón o de la empresa</li>
</ul>
<p>El principio de primacía de la realidad en derecho laboral establece que, en caso de duda, prevalece la realidad sobre lo que digan los papeles. Si puedes probar que trabajabas ahí, el juez presumirá la relación laboral.</p>

<h2>Plazos de prescripción</h2>
<p>Para las acciones derivadas del incumplimiento de obligaciones de seguridad social, la prescripción es de <strong>5 años</strong>, contados desde la fecha en que debió cumplirse la obligación. Sin embargo, para la rescisión por esta causa, el plazo es de 2 meses desde que conociste el incumplimiento, por lo que es importante actuar pronto.</p>

<h2>Qué hacer paso a paso</h2>
<ul>
  <li><strong>Paso 1:</strong> Recopila toda la evidencia de tu relación laboral (recibos, correos, contratos, fotos).</li>
  <li><strong>Paso 2:</strong> Consulta a un abogado laboral para evaluar si conviene la rescisión, la denuncia ante IMSS o ambas.</li>
  <li><strong>Paso 3:</strong> Presenta la denuncia ante el IMSS para que registren el incumplimiento.</li>
  <li><strong>Paso 4:</strong> Si decides terminar la relación laboral, notifica al patrón por escrito la rescisión con las causas específicas.</li>
  <li><strong>Paso 5:</strong> Acude al Centro de Conciliación para la etapa de conciliación obligatoria antes de presentar demanda formal.</li>
  <li><strong>Paso 6:</strong> Si no hay acuerdo, presenta la demanda ante el Tribunal Laboral con toda la evidencia reunida.</li>
</ul>

<div class="cta-block">
  <h3>¿Necesitas un abogado de Derecho Laboral?</h3>
  <p>En Lexia tenemos abogados verificados especializados en Derecho Laboral en todo México. Contáctalos directamente sin intermediarios.</p>
</div>
`,
  },
  {
    slug: "divorcio-en-mexico",
    title: "Divorcio en México: tipos, costos y tiempos",
    metaTitle: "Divorcio en México 2025: tipos, costos y tiempos | Lexia",
    metaDescription:
      "Todo sobre el divorcio en México: tipos (incausado, voluntario, necesario), cuánto cuesta, cuánto tarda, convenio de divorcio, bienes y custodia de hijos.",
    category: "Derecho Familiar",
    specialtySlug: "familiar",
    specialtyLabel: "Derecho Familiar",
    publishedAt: "2025-04-01",
    readingTime: 10,
    excerpt:
      "El divorcio en México ha cambiado mucho en los últimos años. Hoy el proceso es más ágil, pero sigue siendo complejo cuando hay hijos o bienes en común. Te explicamos todo.",
    content: `
<h2>El divorcio en México hoy</h2>
<p>El proceso de divorcio en México ha evolucionado significativamente en la última década. Con la reforma al Código Civil de 2008, se eliminó la necesidad de invocar causales específicas para divorciarse, lo que simplificó enormemente el proceso. Hoy, en la mayoría de los estados, cualquier cónyuge puede solicitar el divorcio sin tener que probar nada ni culpar al otro.</p>

<h2>Tipos de divorcio en México</h2>

<h3>1. Divorcio incausado (o sin expresión de causa)</h3>
<p>Este es el tipo de divorcio más común en México actualmente. Está disponible en prácticamente todos los estados y permite que cualquiera de los dos cónyuges solicite el divorcio <strong>sin necesidad de explicar los motivos</strong> ni acusar al otro de nada. Basta con expresar la voluntad de disolver el matrimonio.</p>
<p>En el divorcio incausado:</p>
<ul>
  <li>Solo uno de los cónyuges necesita solicitar el divorcio.</li>
  <li>No se requiere que el otro esté de acuerdo.</li>
  <li>El juez no puede negarlo mientras se cumplan los requisitos formales.</li>
  <li>Los efectos del divorcio (bienes, custodia, alimentos) se resuelven en el mismo procedimiento o por separado.</li>
</ul>

<h3>2. Divorcio voluntario (por mutuo consentimiento)</h3>
<p>Cuando ambos cónyuges están de acuerdo en divorciarse y en las condiciones del divorcio, el proceso es mucho más rápido y económico. En este tipo de divorcio, ambas partes presentan conjuntamente una solicitud acompañada de un convenio que regula todos los efectos del divorcio.</p>
<p>El divorcio voluntario puede tramitarse de dos formas:</p>
<ul>
  <li><strong>Divorcio judicial voluntario:</strong> ante un juez civil, cuando hay hijos menores de edad o bienes que dividir.</li>
  <li><strong>Divorcio notarial:</strong> exclusivamente ante notario público, cuando no hay hijos menores de edad, no hay bienes inmuebles que dividir, y ambos están completamente de acuerdo. Es el proceso más rápido (puede resolverse en días).</li>
</ul>

<h3>3. Divorcio necesario (causales)</h3>
<p>Este tipo subsiste en algunos estados y requiere probar causas específicas como adulterio, violencia familiar, abandono del hogar, etc. Sin embargo, con la popularización del divorcio incausado, el divorcio necesario es cada vez menos utilizado. Su principal uso actual es cuando un cónyuge quiere atribuirle la culpa al otro para efectos patrimoniales o de alimentos.</p>

<h2>El convenio de divorcio: el documento más importante</h2>
<p>En todo divorcio en el que hay hijos, bienes o deudas, se debe firmar un <strong>convenio regulador</strong> que establece las condiciones post-divorcio. Este documento es vinculante y su incumplimiento puede dar lugar a ejecución forzada. El convenio debe incluir:</p>
<ul>
  <li><strong>Custodia de los hijos:</strong> quién ejercerá la guardia y custodia (puede ser compartida o exclusiva). Si es exclusiva, cuál de los padres.</li>
  <li><strong>Régimen de visitas:</strong> calendario detallado de cómo el padre no custodio convive con los hijos (fines de semana, vacaciones, días festivos, cumpleaños).</li>
  <li><strong>Alimentos:</strong> monto mensual que el padre no custodio pagará al custodio para la manutención de los hijos. También si alguno de los cónyuges tiene derecho a alimentos del otro.</li>
  <li><strong>División de bienes:</strong> si el matrimonio se celebró bajo sociedad conyugal, cómo se dividen los bienes adquiridos durante el matrimonio. Si fue bajo separación de bienes, cada quien conserva lo suyo.</li>
  <li><strong>Uso del hogar conyugal:</strong> quién se queda en la casa familiar (si la hay), al menos mientras los hijos son menores de edad.</li>
</ul>
<div class="bg-amber-50 border-l-4 border-amber-400 p-4 my-6 rounded-r-lg"><p class="text-amber-800 text-sm font-medium">Un convenio mal redactado puede generar conflictos por años. Asesórate con un abogado familiar para que el convenio proteja realmente los intereses de tus hijos y los tuyos.</p></div>

<h2>El proceso del divorcio incausado paso a paso</h2>
<p>Para la mayoría de las personas, el proceso seguirá estos pasos:</p>
<ul>
  <li><strong>Paso 1:</strong> El cónyuge que solicita el divorcio contrata a un abogado y presenta la demanda ante el Juzgado Civil o Familiar.</li>
  <li><strong>Paso 2:</strong> El juez admite la demanda y ordena notificar al otro cónyuge.</li>
  <li><strong>Paso 3:</strong> El otro cónyuge es notificado y tiene un plazo para contestar y hacer valer sus derechos (especialmente en materia de bienes y custodia).</li>
  <li><strong>Paso 4:</strong> Si hay acuerdo en todos los puntos, el juez puede dictar sentencia en pocas audiencias. Si hay controversia sobre bienes o custodia, se abre la etapa probatoria.</li>
  <li><strong>Paso 5:</strong> El juez dicta sentencia de divorcio y aprueba o modifica el convenio.</li>
  <li><strong>Paso 6:</strong> Se inscribe la sentencia en el Registro Civil para que surta efectos ante terceros.</li>
</ul>

<h2>¿Cuánto tiempo tarda el divorcio?</h2>
<p>Los tiempos varían mucho dependiendo del estado, el juzgado y si hay o no controversia:</p>
<ul>
  <li><strong>Divorcio notarial (sin hijos, sin inmuebles, acuerdo total):</strong> 1-4 semanas.</li>
  <li><strong>Divorcio judicial voluntario (acuerdo total):</strong> 2-4 meses.</li>
  <li><strong>Divorcio incausado sin controversia:</strong> 3-6 meses.</li>
  <li><strong>Divorcio incausado con controversia sobre bienes o custodia:</strong> 1-3 años.</li>
</ul>
<p>En Chihuahua, los juzgados familiares suelen tener tiempos razonables para divorcios no controvertidos, pero los casos con disputa de custodia o bienes importantes pueden extenderse considerablemente.</p>

<h2>¿Cuánto cuesta el divorcio?</h2>
<p>Los costos del divorcio en México tienen dos componentes: honorarios del abogado y gastos judiciales.</p>

<h3>Honorarios del abogado</h3>
<ul>
  <li><strong>Divorcio voluntario simple:</strong> $8,000 - $20,000 MXN (en conjunto entre ambos cónyuges)</li>
  <li><strong>Divorcio incausado sin controversia:</strong> $15,000 - $30,000 MXN</li>
  <li><strong>Divorcio con controversia (bienes o custodia):</strong> $30,000 - $80,000 MXN o más</li>
  <li><strong>Divorcio notarial:</strong> honorarios notariales de $5,000 - $15,000 MXN según el notario y la complejidad</li>
</ul>

<h3>Gastos judiciales y notariales</h3>
<ul>
  <li>Aranceles judiciales: $1,000 - $5,000 MXN según el estado</li>
  <li>Traslado de dominio de bienes inmuebles: 2-4% del valor del inmueble</li>
  <li>Inscripción en el Registro Civil: $500 - $1,500 MXN</li>
</ul>

<h2>Divorcio con hijos menores de edad</h2>
<p>Cuando hay hijos menores, el proceso requiere una atención especial. El juez tiene la obligación de proteger el interés superior del menor y puede ordenar:</p>
<ul>
  <li>Audiencias especiales donde se escucha a los hijos (si tienen edad suficiente para expresar su opinión).</li>
  <li>Estudios psicosociales para evaluar el entorno de cada progenitor.</li>
  <li>La intervención del Ministerio Público como representante del interés de los menores.</li>
</ul>
<p>La tendencia actual en los tribunales es favorecer la <strong>custodia compartida</strong>, siempre que ambos padres estén en condiciones de ejercerla y no haya factores de riesgo para los hijos.</p>

<h2>Régimen matrimonial y división de bienes</h2>
<p>El destino de los bienes en un divorcio depende del régimen matrimonial bajo el que se casaron:</p>
<ul>
  <li><strong>Sociedad conyugal:</strong> los bienes adquiridos durante el matrimonio se dividen en partes iguales entre los cónyuges al divorciarse.</li>
  <li><strong>Separación de bienes:</strong> cada cónyuge conserva lo que adquirió a su nombre. No hay división de bienes.</li>
</ul>
<p>Si no saben bajo qué régimen se casaron, el acta de matrimonio debe especificarlo. Si no lo especifica, en muchos estados se presume sociedad conyugal.</p>

<div class="cta-block">
  <h3>¿Necesitas un abogado de Derecho Familiar?</h3>
  <p>En Lexia tenemos abogados verificados especializados en Derecho Familiar en todo México. Contáctalos directamente sin intermediarios.</p>
</div>
`,
  },
  {
    slug: "que-hacer-detenido-policia-chihuahua",
    title: "¿Qué hacer si me detiene la policía en Chihuahua?",
    metaTitle: "Qué hacer si te detiene la policía en Chihuahua 2025 | Lexia",
    metaDescription:
      "Conoce tus derechos si eres detenido por la policía en Chihuahua. Los 5 derechos inmediatos, qué no hacer nunca, el proceso ante el MP y números de emergencia.",
    category: "Derecho Penal",
    specialtySlug: "penal",
    specialtyLabel: "Derecho Penal",
    publishedAt: "2025-04-05",
    readingTime: 9,
    excerpt:
      "Ser detenido por la policía puede ser aterrador, pero conocer tus derechos marca toda la diferencia. En Chihuahua, el sistema acusatorio garantiza protecciones importantes que debes conocer.",
    content: `
<h2>La importancia de conocer tus derechos</h2>
<p>En México, miles de personas son detenidas cada año y muchas de ellas no conocen los derechos que la Constitución les garantiza en ese momento. El desconocimiento puede llevar a que la gente diga cosas que después se usan en su contra, firme documentos sin entenderlos, o tolere tratos que son ilegales. Conocer tus derechos al ser detenido no es solo una cuestión académica: puede marcar la diferencia entre quedar libre o enfrentar un proceso penal injusto.</p>

<h2>Tus derechos constitucionales al ser detenido</h2>
<p>El artículo 20 de la Constitución Política de los Estados Unidos Mexicanos, en su apartado B, establece los derechos de toda persona imputada. Cuando eres detenido, tienes derecho a:</p>

<h3>1. Guardar silencio</h3>
<p>Tienes derecho a <strong>no declarar contra ti mismo</strong>. Puedes decir simplemente: "Me acojo a mi derecho a guardar silencio y quiero hablar con mi abogado." Nada de lo que digas en ese momento puede obligarte a declarar antes de estar asistido por un abogado defensor. Este es quizás el derecho más importante que tienes.</p>

<h3>2. Hacer una llamada telefónica</h3>
<p>Tienes derecho a hacer <strong>una llamada</strong> para informar a quien decidas (familiar, amigo, abogado) sobre tu detención y el lugar donde te encuentras. La policía está obligada a permitirte hacer esta llamada antes de trasladarte al Ministerio Público.</p>

<h3>3. Ser asistido por un abogado defensor</h3>
<p>Tienes derecho a contar con un <strong>abogado defensor</strong> desde el momento de tu detención. Si no tienes uno, el Estado debe proporcionarte un defensor público de manera gratuita. Nunca declares sin que tu abogado esté presente, aunque los policías o el MP te digan que "es solo para aclarar cosas".</p>

<h3>4. No ser sometido a tortura, tratos crueles o degradantes</h3>
<p>La tortura está prohibida absolutamente por la Constitución, los tratados internacionales y la Ley General para Prevenir, Investigar y Sancionar la Tortura. Si eres víctima de cualquier acto de violencia física o psicológica durante tu detención, tienes derecho a denunciarlo inmediatamente ante el Ministerio Público o la Comisión Estatal de Derechos Humanos.</p>

<h3>5. El plazo de las 48 horas</h3>
<p>La policía o el Ministerio Público solo pueden retenerte por un máximo de <strong>48 horas</strong> para investigar, y luego deben ponerte a disposición de un juez o liberarte. En casos de delincuencia organizada, este plazo puede extenderse hasta 96 horas, pero debe ser justificado. Pasado ese plazo sin que un juez emita orden de detención, debes ser liberado inmediatamente.</p>
<div class="bg-amber-50 border-l-4 border-amber-400 p-4 my-6 rounded-r-lg"><p class="text-amber-800 text-sm font-medium">Memoriza o guarda en tu teléfono el número de la Defensoría Pública de Chihuahua: (614) 429-3300. Si eres detenido, esa puede ser la llamada más importante que hagas.</p></div>

<h2>¿Qué NO hacer nunca si te detienen?</h2>
<p>Hay errores que pueden complicar enormemente una situación que podría resolverse de otra manera:</p>
<ul>
  <li><strong>No opongas resistencia física.</strong> Aunque la detención sea ilegal, resistirse físicamente puede resultar en cargos adicionales por resistencia de particular y ponerte en peligro.</li>
  <li><strong>No declares sin tu abogado.</strong> Aunque el MP te diga que "solo es para aclarar", todo lo que digas puede usarse como evidencia.</li>
  <li><strong>No firmes nada sin leerlo.</strong> Muchos abusos se documentan en papeles que el detenido firma sin entender.</li>
  <li><strong>No insultes ni amenaces a los policías.</strong> Esto puede dar lugar a cargos adicionales y empeorar el trato que recibirás.</li>
  <li><strong>No intentas sobornar.</strong> Ofrecer dinero a un policía es un delito de corrupción que puede agregarle cargos a tu situación.</li>
</ul>

<h2>Detención flagrante vs. orden de aprehensión</h2>
<p>La policía puede detenerte de dos maneras:</p>

<h3>Detención en flagrancia</h3>
<p>Cuando eres sorprendido en el momento mismo de cometer un delito o inmediatamente después, la policía puede detenerte sin necesidad de orden judicial. Esta es la situación más común. Sin embargo, la flagrancia tiene límites estrictos: si el policía no te vio cometer el delito ni te persiguió inmediatamente después, la detención puede ser impugnable.</p>

<h3>Orden de aprehensión</h3>
<p>Si existe una investigación previa y el MP considera que hay elementos para acusarte, puede solicitar al juez una orden de aprehensión. En este caso, la policía puede detenerte en cualquier momento, pero debe mostrarte la orden.</p>

<h2>El proceso en Chihuahua: el sistema acusatorio adversarial</h2>
<p>Chihuahua tiene el honor de haber sido el primer estado en México en implementar el sistema de justicia penal acusatorio (en 2007), que luego se extendió a todo el país en 2016. Este sistema es más garantista que el anterior: es oral, público y basado en el principio de inocencia.</p>
<p>Una vez que la policía te pone a disposición del Ministerio Público, el proceso es:</p>
<ul>
  <li><strong>Formulación de cargos:</strong> El MP te explica de qué se te acusa. Tu abogado puede impugnar los cargos desde este momento.</li>
  <li><strong>Audiencia inicial:</strong> Ante un Juez de Control, se decide si hay mérito para continuar el proceso, si se aplica alguna medida cautelar (prisión preventiva, presentación periódica, etc.) y si existe acuerdo reparatorio.</li>
  <li><strong>Investigación complementaria:</strong> Si el juez ordena la continuación, hay un plazo para que tanto el MP como la defensa reúnan evidencia.</li>
  <li><strong>Juicio oral:</strong> Si no hay salida alterna, el caso va a juicio donde jueces escuchan a ambas partes y dictan sentencia.</li>
</ul>

<h2>¿Qué preguntar al policía que te detiene?</h2>
<p>Tienes derecho a saber:</p>
<ul>
  <li>Su nombre completo y número de placa.</li>
  <li>El motivo de la detención.</li>
  <li>A qué corporación pertenece.</li>
  <li>Adónde te llevan.</li>
</ul>
<p>Pide esta información de manera tranquila y respetuosa. Si te niegas a decirla o evaden responder, mentalmente registra los datos de la patrulla y la hora, ya que serán útiles si necesitas presentar una queja.</p>

<h2>Si eres testigo de una detención ilegal</h2>
<p>Si presencias una detención que parece ilegal o abusiva:</p>
<ul>
  <li>Graba en video si es seguro hacerlo (es legal en espacios públicos).</li>
  <li>Anota o fotografía las placas del vehículo policial.</li>
  <li>Llama al 911 para reportar lo que observas.</li>
  <li>Notifica a familiares del detenido si puedes identificarlos.</li>
</ul>

<h2>Organismos y números de emergencia en Chihuahua</h2>
<ul>
  <li><strong>Emergencias generales:</strong> 911</li>
  <li><strong>Defensoría Pública del Estado de Chihuahua:</strong> (614) 429-3300</li>
  <li><strong>Comisión Estatal de Derechos Humanos (CEDH):</strong> (614) 415-6028</li>
  <li><strong>Fiscalía General del Estado:</strong> 089 (línea de atención ciudadana)</li>
  <li><strong>Tránsito Municipal Chihuahua:</strong> (614) 439-6000</li>
</ul>

<div class="cta-block">
  <h3>¿Necesitas un abogado de Derecho Penal?</h3>
  <p>En Lexia tenemos abogados verificados especializados en Derecho Penal en todo México. Contáctalos directamente sin intermediarios.</p>
</div>
`,
  },
  {
    slug: "herencias-en-mexico",
    title: "Herencias en México: cómo funciona el proceso legal",
    metaTitle: "Herencias en México 2025: proceso legal, costos y tiempos | Lexia",
    metaDescription:
      "Aprende cómo funciona el proceso de herencia en México: con testamento o sin él, juicio sucesorio notarial vs judicial, costos, impuestos y tiempos.",
    category: "Derecho Civil",
    specialtySlug: "civil",
    specialtyLabel: "Derecho Civil",
    publishedAt: "2025-04-10",
    readingTime: 10,
    excerpt:
      "Tramitar una herencia en México puede ser rápido si hay testamento, o extenderse años si no lo hay. Te explicamos todo el proceso, los costos reales y cómo hacer un testamento hoy.",
    content: `
<h2>¿Qué es una herencia y cómo funciona en México?</h2>
<p>Cuando una persona fallece, el conjunto de sus bienes, derechos y obligaciones (activos y pasivos) pasa a sus herederos a través del proceso legal llamado <strong>sucesión hereditaria</strong>. En México, este proceso está regulado principalmente por los Códigos Civiles de cada estado y, cuando los bienes están en distintos estados, puede involucrar legislaciones múltiples.</p>
<p>La herencia puede tramitarse de dos maneras principales: <strong>con testamento</strong> (sucesión testamentaria) o <strong>sin testamento</strong> (sucesión intestamentaria o legítima). La diferencia es crucial tanto en tiempo como en costo y complejidad.</p>

<h2>Herencia con testamento</h2>
<p>El testamento es el documento legal en el que una persona expresa su voluntad sobre cómo distribuir sus bienes después de su muerte. En México, el tipo más común es el <strong>testamento público abierto</strong>, que se otorga ante notario público y queda registrado en el Archivo General de Notarías.</p>

<h3>Ventajas de tener testamento</h3>
<ul>
  <li>El proceso sucesorio es más rápido (generalmente 3-8 meses).</li>
  <li>La voluntad del fallecido es clara y no hay lugar a interpretaciones.</li>
  <li>Reduce el riesgo de conflictos familiares.</li>
  <li>Permite designar a personas no familiares como herederos (amigos, organizaciones, etc.).</li>
  <li>Permite establecer condiciones y cargas para los herederos.</li>
</ul>

<h3>Sucesión testamentaria: el proceso</h3>
<p>Cuando hay testamento y todos los herederos están de acuerdo, el proceso se tramita ante el mismo <strong>notario público</strong> que otorgó el testamento, o ante otro notario. El notario verifica el testamento, llama a los herederos, inventaría los bienes y emite la <strong>declaración de herederos</strong>. Este proceso se llama sucesión notarial y suele durar entre 3 y 8 meses.</p>

<h2>Herencia sin testamento</h2>
<p>Cuando una persona muere sin haber hecho testamento, aplica la <strong>sucesión legítima o intestamentaria</strong>: la ley determina quiénes son los herederos y en qué proporción heredan, siguiendo un orden de prelación establecido en el Código Civil.</p>

<h3>Orden de herederos legítimos (prelación)</h3>
<p>El Código Civil Federal, en sus artículos 1599 y siguientes, establece el siguiente orden de prelación:</p>
<ul>
  <li><strong>Primer orden:</strong> Los descendientes (hijos, nietos, bisnietos). Los hijos heredan en partes iguales. Si algún hijo murió antes, sus propios hijos (los nietos del fallecido) lo representan.</li>
  <li><strong>Segundo orden:</strong> A falta de descendientes, los ascendientes (padre y madre a partes iguales, o solo uno si el otro ya murió).</li>
  <li><strong>Tercer orden:</strong> El cónyuge sobreviviente concurre con los hijos y con los padres del fallecido en proporciones específicas.</li>
  <li><strong>Cuarto orden:</strong> A falta de los anteriores, los colaterales (hermanos, sobrinos).</li>
  <li><strong>Último orden:</strong> A falta de todos los anteriores, el fisco (el Estado).</li>
</ul>
<div class="bg-amber-50 border-l-4 border-amber-400 p-4 my-6 rounded-r-lg"><p class="text-amber-800 text-sm font-medium">La pareja de hecho (concubinato) también tiene derechos sucesorios si se prueba la convivencia ininterrumpida por más de dos años, o si hay hijos en común, según la mayoría de los códigos civiles estatales.</p></div>

<h3>Juicio sucesorio sin testamento</h3>
<p>Sin testamento, la sucesión requiere un <strong>juicio sucesorio</strong> ante el Juzgado Civil correspondiente. Este juicio tiene varias etapas:</p>
<ul>
  <li><strong>Denuncia de la herencia:</strong> Cualquier interesado abre el juicio ante el juzgado del último domicilio del fallecido.</li>
  <li><strong>Declaración de herederos:</strong> El juez emite una resolución que reconoce quiénes son los herederos.</li>
  <li><strong>Inventario y avalúo:</strong> Se elabora un inventario de todos los bienes del fallecido y se valúan.</li>
  <li><strong>Liquidación:</strong> Se pagan las deudas del fallecido con los bienes del caudal hereditario.</li>
  <li><strong>Partición:</strong> El resto se divide entre los herederos según sus proporciones.</li>
</ul>
<p>Este proceso puede durar entre <strong>6 meses y 3 años</strong>, dependiendo del número de herederos, la complejidad de los bienes y si hay conflictos entre los herederos.</p>

<h2>Costos de una herencia en México</h2>
<p>Los costos varían mucho según el valor del patrimonio y la complejidad del proceso:</p>

<h3>Honorarios notariales</h3>
<p>Los aranceles notariales se calculan sobre el valor del patrimonio hereditario y varían por estado. Como referencia general:</p>
<ul>
  <li>Patrimonio de $500,000: honorarios notariales aproximados de $8,000 - $20,000 MXN</li>
  <li>Patrimonio de $2,000,000: honorarios aproximados de $30,000 - $60,000 MXN</li>
  <li>En general, los honorarios representan entre el <strong>1% y el 3% del valor del patrimonio</strong></li>
</ul>

<h3>Honorarios de abogado</h3>
<p>Si el proceso va a juicio (sin testamento o con conflicto entre herederos), los honorarios del abogado pueden ir de $20,000 a $100,000 MXN o más, según la complejidad y duración del proceso.</p>

<h3>Impuestos y gastos adicionales</h3>
<ul>
  <li><strong>ISR por herencia:</strong> En México, la herencia entre familiares directos está exenta de ISR. Sin embargo, si los bienes generan ingresos (rentas, intereses), estos sí causan ISR.</li>
  <li><strong>Impuesto sobre traslado de dominio:</strong> Cuando se transfieren bienes inmuebles, se paga este impuesto municipal (generalmente entre el 2% y el 4% del valor catastral).</li>
  <li><strong>Derechos de registro:</strong> Inscripción de la escritura hereditaria en el Registro Público de la Propiedad.</li>
</ul>

<h2>¿Qué bienes NO entran en la herencia?</h2>
<p>Es importante saber que algunos activos pasan directamente al beneficiario designado y no forman parte del caudal hereditario:</p>
<ul>
  <li><strong>AFORE:</strong> El saldo de la cuenta individual se entrega a los beneficiarios designados ante la AFORE, sin pasar por el juicio sucesorio.</li>
  <li><strong>Seguros de vida con beneficiario:</strong> El pago del seguro va directamente al beneficiario, no a los herederos.</li>
  <li><strong>Cuentas bancarias con beneficiario:</strong> Si el banco tiene designado un beneficiario en la cuenta, el saldo se entrega a esa persona directamente.</li>
  <li><strong>Fideicomisos:</strong> Los bienes en fideicomiso siguen las reglas del contrato de fideicomiso.</li>
</ul>

<h2>Cómo hacer un testamento hoy</h2>
<p>Hacer un testamento es más sencillo y económico de lo que mucha gente cree. Solo necesitas:</p>
<ul>
  <li>Ser mayor de edad y estar en pleno uso de tus facultades.</li>
  <li>Acudir a cualquier notario público con tu identificación oficial.</li>
  <li>Expresar tu voluntad de manera clara.</li>
</ul>
<p>El costo de un testamento público abierto es de aproximadamente <strong>$3,000 a $8,000 MXN</strong> dependiendo del estado y el notario. Es una de las inversiones más inteligentes que puedes hacer para proteger a tu familia.</p>

<h2>El albaceazgo</h2>
<p>El <strong>albacea</strong> es la persona encargada de ejecutar la voluntad del testador o representar a la sucesión durante el proceso. Sus funciones incluyen administrar los bienes, pagar las deudas, realizar los trámites y llevar a cabo la partición. El testador puede designar a quien quiera como albacea; si no lo hace, los herederos lo eligen.</p>

<div class="cta-block">
  <h3>¿Necesitas un abogado de Derecho Civil?</h3>
  <p>En Lexia tenemos abogados verificados especializados en Derecho Civil en todo México. Contáctalos directamente sin intermediarios.</p>
</div>
`,
  },
  {
    slug: "despido-embarazada-mexico",
    title: "¿Me pueden despedir estando embarazada en México?",
    metaTitle: "Despido durante el embarazo en México: tus derechos 2025 | Lexia",
    metaDescription:
      "Si te despidieron embarazada, tienes protección especial. Derecho a reinstalación o indemnización doble, incapacidad por maternidad, subsidio IMSS y cómo denunciar.",
    category: "Derecho Laboral",
    specialtySlug: "laboral",
    specialtyLabel: "Derecho Laboral",
    publishedAt: "2025-04-15",
    readingTime: 8,
    excerpt:
      "El despido durante el embarazo está protegido de manera especial por la ley mexicana. El patrón que despide a una trabajadora embarazada puede enfrentar consecuencias serias, incluyendo pagar el doble de la indemnización.",
    content: `
<h2>La protección especial de la maternidad en México</h2>
<p>La Ley Federal del Trabajo reconoce que las trabajadoras embarazadas se encuentran en una situación de vulnerabilidad especial y establece mecanismos concretos para protegerlas. El artículo 170 de la LFT, junto con las disposiciones del IMSS y la Constitución, crean un sistema de protección que va mucho más allá de la simple prohibición de despido.</p>
<p>En términos prácticos: <strong>despedir a una trabajadora embarazada es prácticamente imposible hacerlo de manera legal</strong>, y los intentos de hacerlo conllevan consecuencias económicas muy graves para el patrón.</p>

<h2>¿El despido durante el embarazo se presume injustificado?</h2>
<p>Sí. Cuando una trabajadora es despedida durante el período de embarazo o en los doce meses siguientes al parto, la ley establece una <strong>presunción de que el despido fue injustificado</strong> y está relacionado con el estado de embarazo o maternidad, salvo que el patrón pueda probar lo contrario con causa legal válida.</p>
<p>Esto invierte la carga de la prueba: normalmente en un despido injustificado el trabajador debe probar que fue despedido; en el caso de trabajadoras embarazadas, es el patrón quien debe probar que el despido fue por causa diferente al embarazo.</p>

<h2>Derechos especiales: reinstalación o indemnización doble</h2>
<p>El artículo 170 fracción VII de la LFT establece que la trabajadora que sea despedida durante el embarazo tiene derecho a elegir entre:</p>
<ul>
  <li><strong>Reinstalación:</strong> Volver a su puesto de trabajo con todos sus derechos y con pago de los salarios caídos desde la fecha del despido hasta la reinstalación.</li>
  <li><strong>Indemnización constitucional doble:</strong> En lugar de los 3 meses normales, la trabajadora tiene derecho a <strong>6 meses de salario</strong> (el doble), más los 20 días por año y más el finiquito completo. Esto hace que la indemnización sea significativamente mayor que en un despido ordinario.</li>
</ul>
<div class="bg-amber-50 border-l-4 border-amber-400 p-4 my-6 rounded-r-lg"><p class="text-amber-800 text-sm font-medium">La indemnización doble se aplica durante el embarazo y hasta por doce meses después del parto. Si te despidieron hace 8 meses y estabas embarazada o recién habías parido, aún puedes reclamarla (dentro del plazo de 2 meses para demandar).</p></div>

<h2>La incapacidad por maternidad: 84 días con goce de sueldo</h2>
<p>Independientemente de si hay o no despido, toda trabajadora asegurada en el IMSS tiene derecho a una <strong>incapacidad por maternidad de 84 días</strong>, divididos en:</p>
<ul>
  <li><strong>42 días antes del parto</strong> (período prenatal)</li>
  <li><strong>42 días después del parto</strong> (período postnatal)</li>
</ul>
<p>Por acuerdo con el patrón, la trabajadora puede transferir hasta 4 semanas del período prenatal al postnatal, dando así un período postnatal más largo si lo prefiere.</p>

<h3>El subsidio del IMSS durante la maternidad</h3>
<p>Durante los 84 días de incapacidad por maternidad, el IMSS paga el <strong>100% del salario base de cotización</strong> de la trabajadora. Este pago lo hace directamente el IMSS (no el patrón), por lo que el patrón no tiene excusa económica para presionar a la trabajadora para que regrese antes.</p>
<p>Requisitos para tener derecho al subsidio del IMSS:</p>
<ul>
  <li>Estar inscrita en el IMSS (es por eso que la inscripción al seguro social es tan importante).</li>
  <li>Tener al menos 30 semanas de cotización en los 12 meses anteriores al embarazo.</li>
  <li>No haber abandonado el trabajo sin causa justificada.</li>
</ul>

<h2>Otros derechos durante el embarazo</h2>
<p>Además de la protección contra el despido, la LFT establece otros derechos para las trabajadoras embarazadas:</p>
<ul>
  <li><strong>No trabajar horas extra:</strong> No pueden obligarte a laborar horas extraordinarias durante el embarazo.</li>
  <li><strong>No trabajo nocturno en ciertos casos:</strong> Las trabajadoras en avanzado estado de gestación tienen derecho a no trabajar turnos nocturnos si así lo requieren.</li>
  <li><strong>Descansos para lactancia:</strong> Después del parto, tienes derecho a dos descansos de 30 minutos al día para amamantar a tu hijo, hasta que el bebé tenga 6 meses.</li>
  <li><strong>Cambio de actividades:</strong> Si tu trabajo implica riesgos para el embarazo (carga de objetos pesados, contacto con sustancias tóxicas, etc.), el patrón debe reasignarte a actividades que no pongan en riesgo tu salud o la del bebé.</li>
  <li><strong>No reducción de salario:</strong> No pueden reducirte el salario por estar embarazada ni transferirte a un puesto de menor categoría.</li>
</ul>

<h2>¿Qué hacer si te despiden estando embarazada?</h2>
<p>Si te despidieron o estás siendo presionada para renunciar, estos son los pasos concretos que debes seguir:</p>
<ul>
  <li><strong>Paso 1:</strong> No firmes ningún documento de renuncia ni finiquito. Si ya firmaste, consulta a un abogado: puede haber vicios de consentimiento.</li>
  <li><strong>Paso 2:</strong> Documenta todo: guarda correos electrónicos, mensajes de WhatsApp, cualquier comunicación donde se hable del despido o de tu embarazo.</li>
  <li><strong>Paso 3:</strong> Solicita a tu médico o al IMSS un certificado de embarazo que acredite tu estado al momento del despido.</li>
  <li><strong>Paso 4:</strong> Consulta a un abogado laboral lo antes posible. El plazo para demandar es de solo <strong>2 meses</strong> desde el despido.</li>
  <li><strong>Paso 5:</strong> Acude al Centro de Conciliación para iniciar el proceso de conciliación obligatoria.</li>
  <li><strong>Paso 6:</strong> Si no hay acuerdo en la conciliación, presenta la demanda ante el Tribunal Laboral.</li>
</ul>

<h2>Discriminación laboral por embarazo: cómo denunciarla</h2>
<p>El despido por embarazo no es solo una violación a la LFT: es también un acto de discriminación prohibido por la Ley Federal para Prevenir y Eliminar la Discriminación (LFPED). Puedes denunciarlo ante:</p>
<ul>
  <li><strong>STPS (Secretaría del Trabajo y Previsión Social):</strong> a través de su sistema de quejas en línea o en sus oficinas.</li>
  <li><strong>CONAPRED (Consejo Nacional para Prevenir la Discriminación):</strong> que puede imponer sanciones administrativas al patrón.</li>
  <li><strong>IMSS:</strong> si el despido implica suspensión del seguro médico durante el embarazo.</li>
</ul>

<h2>Casos especiales</h2>

<h3>Contrato por tiempo determinado</h3>
<p>Si tu contrato tiene fecha de vencimiento y el patrón simplemente no lo renueva porque estás embarazada, también puede considerarse discriminación. Si hay evidencia de que la no renovación está relacionada con el embarazo, tienes recursos legales similares.</p>

<h3>Período de prueba</h3>
<p>El período de prueba (hasta 30 días para trabajos generales, 180 días para posiciones de dirección) no elimina la protección por embarazo. Si te despiden durante el período de prueba y estás embarazada, el patrón igualmente deberá probar que el despido fue por causa diferente al embarazo.</p>

<div class="cta-block">
  <h3>¿Necesitas un abogado de Derecho Laboral?</h3>
  <p>En Lexia tenemos abogados verificados especializados en Derecho Laboral en todo México. Contáctalos directamente sin intermediarios.</p>
</div>
`,
  },
  {
    slug: "que-es-el-amparo",
    title: "¿Qué es el amparo y cuándo puedo pedirlo?",
    metaTitle: "Qué es el amparo en México y cuándo pedirlo 2025 | Lexia",
    metaDescription:
      "Guía completa sobre el juicio de amparo en México: tipos, plazos, quién puede pedirlo, ante qué juez, cuánto cuesta y casos comunes donde el amparo protege tus derechos.",
    category: "Amparo",
    specialtySlug: "amparo",
    specialtyLabel: "Amparo",
    publishedAt: "2025-04-20",
    readingTime: 10,
    excerpt:
      "El amparo es la joya del sistema jurídico mexicano: una herramienta para proteger tus derechos fundamentales contra actos abusivos del Estado. Pero tiene reglas estrictas que debes conocer.",
    content: `
<h2>El amparo: la joya del sistema jurídico mexicano</h2>
<p>El <strong>juicio de amparo</strong> es uno de los instrumentos jurídicos más poderosos del sistema legal mexicano. Fue creado en México a mediados del siglo XIX (el primer amparo fue concedido en 1849) y su modelo ha sido adoptado por muchos países latinoamericanos. Su propósito fundamental es proteger los <strong>derechos fundamentales de las personas</strong> frente a actos de autoridad —del gobierno, los tribunales, el ejército, las policías— que los violen.</p>
<p>Dicho de manera sencilla: si una autoridad hace algo que afecta tus derechos constitucionales (como detenerte ilegalmente, confiscarte bienes sin orden judicial, o un tribunal que dicta una sentencia injusta), el amparo es el mecanismo para que otro tribunal más alto revise ese acto y, si es ilegal, lo anule.</p>

<h2>Tipos de amparo</h2>

<h3>Amparo directo</h3>
<p>El <strong>amparo directo</strong> procede contra sentencias definitivas, laudos o resoluciones que ponen fin a un juicio. Es el que se usa para impugnar sentencias de los tribunales ordinarios (civiles, laborales, penales, familiares) cuando ya se agotaron todos los recursos ordinarios dentro del propio proceso.</p>
<p>Se presenta ante los <strong>Tribunales Colegiados de Circuito</strong> y su objetivo es revisar si la sentencia impugnada respetó las garantías constitucionales del quejoso.</p>

<h3>Amparo indirecto</h3>
<p>El <strong>amparo indirecto</strong> procede en una gran variedad de situaciones: contra actos de autoridad que no son sentencias definitivas, contra leyes que se consideran inconstitucionales, contra actos fuera de juicio, contra omisiones de la autoridad, y en muchos otros casos. Es el más utilizado en la práctica cotidiana.</p>
<p>Se presenta ante los <strong>Juzgados de Distrito</strong> (no ante los tribunales ordinarios) y es un juicio completamente nuevo e independiente del proceso original.</p>

<h2>¿Contra qué puede pedirse el amparo?</h2>

<h3>En materia penal</h3>
<p>El amparo en materia penal es especialmente importante:</p>
<ul>
  <li><strong>Contra órdenes de aprehensión:</strong> Si un juez emitió una orden de aprehensión sin los elementos necesarios, se puede solicitar amparo para suspenderla.</li>
  <li><strong>Contra actos de tortura o tratos inhumanos:</strong> El amparo puede ordenar la liberación inmediata y la investigación de los responsables.</li>
  <li><strong>Contra la prisión preventiva:</strong> Si se considera que no está justificada, el amparo puede buscar su levantamiento.</li>
  <li><strong>Contra sentencias condenatorias:</strong> A través del amparo directo, impugnando la sentencia por violaciones procesales o sustantivas.</li>
</ul>

<h3>En materia civil y familiar</h3>
<ul>
  <li>Sentencias en juicios de divorcio, pensión alimenticia o custodia que violen garantías.</li>
  <li>Embargos o medidas cautelares dictadas sin fundamentación legal.</li>
  <li>Actos de ejecución de sentencias que excedan lo ordenado por el juez.</li>
</ul>

<h3>En materia laboral</h3>
<ul>
  <li>Laudos o sentencias de los Tribunales Laborales que sean inconstitucionales.</li>
  <li>Actos del IMSS o el INFONAVIT que afecten derechos de trabajadores.</li>
</ul>

<h3>En materia fiscal y administrativa</h3>
<ul>
  <li>Contra leyes o reglamentos que se consideren inconstitucionales desde su entrada en vigor.</li>
  <li>Contra actos del SAT, aduanas u otras autoridades fiscales.</li>
</ul>

<h2>Plazos para presentar el amparo</h2>
<p>Este es uno de los aspectos más críticos del amparo: los plazos son cortos y su incumplimiento hace que el amparo sea desechado de plano.</p>
<ul>
  <li><strong>Regla general:</strong> 15 días hábiles contados desde el día siguiente a aquel en que surte efectos la notificación del acto reclamado.</li>
  <li><strong>Contra leyes:</strong> 30 días hábiles si se impugna la ley con motivo de su primer acto de aplicación.</li>
  <li><strong>En materia penal (actos que afectan la libertad):</strong> En cualquier tiempo mientras subsista el acto reclamado.</li>
  <li><strong>Contra sentencias definitivas (amparo directo):</strong> 15 días hábiles desde la notificación de la sentencia.</li>
  <li><strong>En materia agraria:</strong> Plazos especiales más amplios.</li>
</ul>
<div class="bg-amber-50 border-l-4 border-amber-400 p-4 my-6 rounded-r-lg"><p class="text-amber-800 text-sm font-medium">Atención: los días hábiles no incluyen sábados, domingos, días festivos ni los períodos vacacionales del Poder Judicial Federal. Calcula el plazo con cuidado o pide a tu abogado que lo calcule.</p></div>

<h2>¿Quién puede pedir el amparo?</h2>
<p>Puede presentar un amparo cualquier persona (física o moral) que:</p>
<ul>
  <li>Haya sufrido directamente en su esfera jurídica el acto de autoridad que impugna.</li>
  <li>Tenga interés legítimo en la anulación del acto.</li>
</ul>
<p>Los extranjeros también pueden pedir amparo en México si sus derechos constitucionales son violados, salvo en materias de extranjería expresamente excluidas.</p>

<h2>La suspensión del acto reclamado</h2>
<p>Una de las herramientas más poderosas del amparo es la <strong>suspensión del acto reclamado</strong>: el quejoso puede pedir al juez de amparo que, de manera provisional, suspenda los efectos del acto mientras se resuelve el juicio de fondo.</p>
<p>Por ejemplo, si hay una orden de demolición de tu casa que crees es ilegal, puedes pedir amparo con suspensión para que no demuelan tu casa mientras el juicio se resuelve. O si hay una orden de aprehensión, la suspensión impide que seas detenido temporalmente.</p>
<p>La suspensión puede ser automática (en casos que afecten la libertad personal) o discrecional (cuando el juez decide si procede otorgarla según las circunstancias).</p>

<h2>Ante qué juez se presenta</h2>
<ul>
  <li><strong>Amparo indirecto:</strong> Ante el Juzgado de Distrito en el lugar donde se realizó el acto reclamado o donde tiene su domicilio el quejoso (en algunos casos).</li>
  <li><strong>Amparo directo:</strong> Ante el Tribunal Colegiado de Circuito que corresponda según la materia y el estado.</li>
</ul>

<h2>¿Cuánto cuesta el amparo?</h2>
<p>El juicio de amparo en sí mismo no tiene costo (no hay cuotas judiciales para el quejoso). El costo real es el de los <strong>honorarios del abogado</strong>, que dependen de la complejidad del caso:</p>
<ul>
  <li>Amparo directo relativamente simple: $15,000 - $40,000 MXN</li>
  <li>Amparo indirecto complejo (contra ley, con suspensión): $30,000 - $100,000 MXN o más</li>
  <li>En casos penales de alto impacto, los honorarios pueden ser considerablemente mayores</li>
</ul>

<h2>El principio de relatividad: efectos inter partes</h2>
<p>Una característica importante del amparo mexicano es el <strong>principio de relatividad</strong> (también llamado fórmula Otero): la sentencia de amparo solo beneficia al quejoso que lo promovió, no a otras personas en situaciones similares. Si ganas tu amparo, la ley o el acto se anula para ti, pero sigue siendo válido para todos los demás.</p>
<p>Hay excepciones: las declaraciones generales de inconstitucionalidad emitidas por la Suprema Corte sí tienen efectos generales, pero requieren que la misma ley sea impugnada un número suficiente de veces.</p>

<h2>Cuando el amparo NO aplica</h2>
<p>Existen situaciones donde el amparo no procede:</p>
<ul>
  <li>Contra resoluciones de la Suprema Corte de Justicia de la Nación (no hay instancia superior).</li>
  <li>Cuando el quejoso ha consentido expresamente el acto reclamado.</li>
  <li>Cuando el acto ha sido consumado de manera irreparable.</li>
  <li>Cuando no se han agotado los recursos ordinarios previos.</li>
  <li>En materia electoral (existe el juicio ciudadano del TEPJF para ello).</li>
</ul>

<div class="cta-block">
  <h3>¿Necesitas un abogado especialista en Amparo?</h3>
  <p>En Lexia tenemos abogados verificados especializados en Amparo en todo México. Contáctalos directamente sin intermediarios.</p>
</div>
`,
  },
  {
    slug: "accidente-transito-chihuahua",
    title: "Accidente de tráfico en Chihuahua: qué hacer y tus derechos",
    metaTitle: "Accidente de tráfico en Chihuahua 2025: qué hacer y tus derechos | Lexia",
    metaDescription:
      "Guía paso a paso para después de un accidente de tránsito en Chihuahua: cómo documentar, reclamar al seguro, responsabilidad civil, daño moral y números de emergencia.",
    category: "Derecho de Tránsito",
    specialtySlug: "transito",
    specialtyLabel: "Derecho de Tránsito",
    publishedAt: "2025-04-25",
    readingTime: 9,
    excerpt:
      "Los primeros minutos después de un accidente de tráfico son cruciales para proteger tus derechos. Te explicamos exactamente qué hacer, cómo documentarlo y cómo reclamar lo que te corresponde.",
    content: `
<h2>Los primeros 10 minutos después del accidente</h2>
<p>Un accidente de tránsito es una situación de estrés extremo. Saber qué hacer en los primeros minutos puede proteger tu salud, tus derechos legales y tus posibilidades de obtener una compensación justa. Sigue estos pasos en orden:</p>

<h3>1. Verifica que todos estén bien y llama al 911 si hay lesionados</h3>
<p>Lo primero y más importante es la seguridad. Si hay personas lesionadas, llama al 911 inmediatamente. No muevas a una persona lesionada a menos que esté en peligro inminente (como riesgo de incendio), ya que podría agravar lesiones de columna o cuello.</p>

<h3>2. Mueve los vehículos solo si es seguro y necesario</h3>
<p>Si los vehículos están causando un peligro vial y nadie está lesionado, muévelos a la orilla. Antes de moverlos, toma fotos de su posición exacta. En Chihuahua, el Reglamento de Tránsito indica que en accidentes menores sin lesionados, las partes pueden resolver el asunto directamente sin necesidad de esperar a la policía, pero debes documentar todo.</p>

<h3>3. Activa las luces de emergencia y coloca triángulos si los tienes</h3>
<p>Señalizar el lugar del accidente previene accidentes secundarios, especialmente en avenidas con alta velocidad.</p>

<h3>4. No te vayas del lugar</h3>
<p>Abandonar el lugar de un accidente es un delito en México. Incluso si el accidente fue leve, quedarse es obligatorio.</p>

<h2>Cómo documentar correctamente el accidente</h2>
<p>La documentación que hagas en el lugar del accidente puede ser determinante meses después cuando negocies con el seguro o vayas a juicio. Documenta todo esto:</p>

<h3>Fotografías y video</h3>
<ul>
  <li>Posición de los vehículos antes de moverlos (desde varios ángulos y alturas).</li>
  <li>Daños en todos los vehículos involucrados (tuyos y del tercero).</li>
  <li>Las placas de todos los vehículos.</li>
  <li>El estado de la vialidad: señales de tránsito, semáforos, marcas viales.</li>
  <li>Si hay marcas de frenado en el pavimento, fotografíalas.</li>
  <li>Condiciones de visibilidad, estado del clima.</li>
  <li>Lesiones visibles (con permiso de las personas).</li>
</ul>

<h3>Datos del otro conductor</h3>
<ul>
  <li>Nombre completo y domicilio.</li>
  <li>Número de licencia de conducir y estado que la emitió.</li>
  <li>Datos de la aseguradora y número de póliza (obligatorio en México).</li>
  <li>Placas y datos del vehículo (marca, modelo, color, año).</li>
  <li>Número de teléfono.</li>
</ul>

<h3>Datos de testigos</h3>
<p>Si hay testigos del accidente, pídeles su nombre y teléfono. Un testigo independiente puede ser invaluable si hay discrepancias sobre cómo ocurrió el accidente.</p>
<div class="bg-amber-50 border-l-4 border-amber-400 p-4 my-6 rounded-r-lg"><p class="text-amber-800 text-sm font-medium">En Chihuahua, la app "Tránsito Chihuahua" permite reportar accidentes viales directamente. También puedes llamar al (614) 439-6000 para Tránsito Municipal.</p></div>

<h2>¿Cuándo llamar a la policía?</h2>
<p>En Chihuahua, como en la mayoría de los estados, la presencia policial es obligatoria cuando:</p>
<ul>
  <li>Hay personas lesionadas.</li>
  <li>Los conductores no llegan a un acuerdo.</li>
  <li>Hay daños cuantiosos.</li>
  <li>Hay indicios de que el conductor contrario está bajo los efectos de alcohol o drogas.</li>
  <li>El conductor contrario no tiene seguro o sus datos son dudosos.</li>
</ul>
<p>Para accidentes menores sin lesionados y con acuerdo entre las partes, no es estrictamente necesario llamar a la policía, aunque siempre es recomendable obtener un reporte policial para efectos del seguro.</p>

<h2>El peritaje vial en Chihuahua</h2>
<p>Cuando hay lesiones o daños significativos, la policía de tránsito realizará un <strong>peritaje vial</strong>: una investigación técnica del accidente para determinar cómo ocurrió, quién tuvo la culpa, las velocidades aproximadas y otros factores relevantes. El dictamen pericial es una prueba técnica de gran peso en cualquier proceso judicial posterior.</p>
<p>Tienes derecho a solicitar una copia del dictamen pericial una vez concluido. Si crees que el dictamen es incorrecto, puedes contratar a un perito privado para que emita un dictamen contrapericial.</p>

<h2>El seguro obligatorio en México: cómo reclamarlo</h2>
<p>La Ley de Caminos, Puentes y Autotransporte Federal exige que todos los vehículos cuenten con un seguro de responsabilidad civil. En la práctica, esto incluye una cobertura básica para daños a terceros. Para reclamar al seguro del responsable:</p>
<ul>
  <li><strong>Notifica a la aseguradora de forma inmediata.</strong> Cada póliza tiene plazos para reportar siniestros (generalmente 24-72 horas).</li>
  <li><strong>Presenta el reporte policial</strong> si lo hay.</li>
  <li><strong>Proporciona tu versión de los hechos</strong> por escrito, acompañada de toda tu documentación fotográfica.</li>
  <li><strong>Obtén un presupuesto de reparación</strong> en un taller de tu confianza.</li>
  <li><strong>Si hay lesiones,</strong> conserva todas las facturas médicas y dictámenes de incapacidad.</li>
</ul>
<p>Si la aseguradora no responde de manera justa, puedes presentar una queja ante la <strong>CONDUSEF</strong> (Comisión Nacional para la Protección y Defensa de los Usuarios de Servicios Financieros).</p>

<h2>Responsabilidad civil por daños</h2>
<p>El conductor que causa un accidente es civilmente responsable por todos los daños materiales y personales que ocasione. Esto incluye:</p>
<ul>
  <li><strong>Daños materiales:</strong> Reparación o valor del vehículo dañado.</li>
  <li><strong>Gastos médicos:</strong> Todos los costos de atención médica, hospitalización, cirugías, rehabilitación y medicamentos.</li>
  <li><strong>Lucro cesante:</strong> Los ingresos que la víctima dejó de percibir por incapacidad derivada del accidente.</li>
  <li><strong>Daño moral:</strong> El sufrimiento psicológico y emocional causado por el accidente. Este concepto es reconocido por el artículo 1916 del Código Civil Federal y puede representar montos significativos.</li>
</ul>

<h2>¿Qué pasa si el responsable no tiene seguro?</h2>
<p>Desafortunadamente, en México existe un porcentaje importante de vehículos sin seguro. Si el responsable no tiene seguro:</p>
<ul>
  <li>Puedes demandar al responsable directamente en un <strong>juicio civil por daños</strong>.</li>
  <li>El proceso puede ser más largo, pero si el responsable tiene bienes (casa, otro vehículo, cuenta bancaria), pueden ser embargados para cubrir la deuda.</li>
  <li>Revisa si tu propia póliza incluye cobertura de <strong>"daños causados por tercero no asegurado"</strong>; algunas pólizas la incluyen.</li>
</ul>

<h2>Proceso ante juzgado: cívico vs. civil</h2>
<ul>
  <li><strong>Juzgado Cívico:</strong> Para infracciones de tránsito, faltas administrativas, y accidentes menores donde el conflicto es por la multa o la infracción. Son procesos rápidos y de bajo costo.</li>
  <li><strong>Juzgado Civil:</strong> Para reclamar daños y perjuicios de importancia, cuando el monto supera la competencia del juzgado cívico o cuando hay lesiones. Es un proceso más formal, con etapas de pruebas y plazos más largos.</li>
</ul>

<h2>Prescripción de 2 años</h2>
<p>La acción civil para reclamar daños derivados de un accidente de tránsito prescribe en <strong>2 años</strong> a partir de la fecha del accidente. Este plazo es relativamente largo, pero no debe tomarse como señal de que hay tiempo ilimitado: la evidencia se pierde, los testigos olvidan y los procesos requieren tiempo para prepararse.</p>

<h2>Números de emergencia en Chihuahua</h2>
<ul>
  <li><strong>Emergencias:</strong> 911</li>
  <li><strong>Tránsito Municipal Chihuahua:</strong> (614) 439-6000</li>
  <li><strong>Cruz Roja Chihuahua:</strong> (614) 411-2626</li>
  <li><strong>Bomberos:</strong> (614) 411-3131</li>
</ul>

<div class="cta-block">
  <h3>¿Necesitas un abogado de Derecho de Tránsito?</h3>
  <p>En Lexia tenemos abogados verificados especializados en Derecho de Tránsito en todo México. Contáctalos directamente sin intermediarios.</p>
</div>
`,
  },
  {
    slug: "registrar-negocio-mexico",
    title: "¿Cómo registrar un negocio en México paso a paso?",
    metaTitle: "Cómo registrar un negocio en México paso a paso 2025 | Lexia",
    metaDescription:
      "Guía completa para registrar tu negocio en México: persona física vs moral, tipos de sociedad, costos reales, trámites ante SAT, IMSS y municipio de Chihuahua.",
    category: "Derecho Mercantil",
    specialtySlug: "mercantil",
    specialtyLabel: "Derecho Mercantil",
    publishedAt: "2025-05-01",
    readingTime: 11,
    excerpt:
      "Registrar un negocio en México tiene muchos pasos pero no es imposible. Te explicamos la diferencia entre persona física y moral, los tipos de sociedad, cuánto cuesta y los errores más comunes.",
    content: `
<h2>¿Por qué formalizar tu negocio?</h2>
<p>En México, millones de negocios operan en la informalidad, pero hacerlo tiene un costo alto a largo plazo: no puedes acceder a crédito empresarial, no puedes participar en licitaciones gubernamentales, no puedes deducir gastos del negocio, y asumes toda la responsabilidad personal por las deudas del negocio. Formalizar tu empresa abre puertas y protege tu patrimonio personal.</p>

<h2>Primer paso: ¿Persona física o persona moral?</h2>
<p>Esta es la primera decisión que debes tomar y tiene implicaciones importantes en impuestos, responsabilidad y costos.</p>

<h3>Persona física con actividad empresarial</h3>
<p><strong>Ventajas:</strong></p>
<ul>
  <li>Proceso de apertura más simple y económico (solo te das de alta en el SAT).</li>
  <li>Menores costos de contabilidad y cumplimiento.</li>
  <li>Ideal para negocios unipersonales y de menor escala.</li>
  <li>Puedes acogerte al régimen simplificado de confianza (RESICO) con tasas de ISR menores si tus ingresos son inferiores a $3.5 millones anuales.</li>
</ul>
<p><strong>Desventajas:</strong></p>
<ul>
  <li>Responsabilidad ilimitada: si el negocio tiene deudas, tus bienes personales están en riesgo.</li>
  <li>No se puede tener socios formales.</li>
  <li>Imagen menos profesional ante clientes y proveedores grandes.</li>
  <li>Más difícil acceder a financiamiento empresarial.</li>
</ul>

<h3>Persona moral (sociedad)</h3>
<p><strong>Ventajas:</strong></p>
<ul>
  <li>Responsabilidad limitada: en principio, los socios solo arriesgan lo que aportaron.</li>
  <li>Permite múltiples socios con participaciones definidas.</li>
  <li>Mayor credibilidad y profesionalismo.</li>
  <li>Acceso a más productos financieros y licitaciones.</li>
  <li>Posibilidad de crecer y agregar inversionistas.</li>
</ul>
<p><strong>Desventajas:</strong></p>
<ul>
  <li>Costo de constitución: $8,000 - $15,000 MXN ante notario.</li>
  <li>Contabilidad más compleja y costosa.</li>
  <li>Obligaciones más extensas ante el SAT.</li>
</ul>
<div class="bg-amber-50 border-l-4 border-amber-400 p-4 my-6 rounded-r-lg"><p class="text-amber-800 text-sm font-medium">Regla general: si el negocio tiene socios, si el riesgo financiero es alto o si planeas crecer, usa persona moral. Si eres solo tú y el negocio es pequeño, persona física puede ser suficiente para empezar.</p></div>

<h2>Tipos de sociedad en México</h2>

<h3>Sociedad Anónima de Capital Variable (S.A. de C.V.)</h3>
<p>Es la forma más común de organización empresarial en México. El capital está representado por acciones. Requiere al menos 2 socios, capital mínimo de $50,000 MXN ($25,000 exhibidos). Es la opción más conocida por bancos y grandes clientes, ideal para empresas de tamaño mediano en adelante.</p>

<h3>Sociedad de Responsabilidad Limitada de Capital Variable (S.R.L. de C.V.)</h3>
<p>Similar a la S.A. pero con partes sociales en lugar de acciones. Más simple en su administración. Admite máximo 50 socios. Menos conocida pero perfectamente válida para negocios pequeños y medianos.</p>

<h3>Sociedad por Acciones Simplificada (S.A.S.)</h3>
<p>Creada en 2016, la SAS es la opción más moderna y ágil. Puede constituirse completamente en línea a través del portal del SE (Secretaría de Economía). Ingresos máximos anuales de $5 millones. Requiere solo 1 socio. Capital mínimo de $1 peso. Es ideal para startups, emprendedores individuales y negocios de base tecnológica.</p>

<h2>El proceso de constitución paso a paso</h2>

<h3>Paso 1: Verificación del nombre ante la Secretaría de Economía (SE)</h3>
<p>Antes de ir al notario, debes verificar que el nombre que quieres para tu empresa no esté ya registrado. Esto se hace en línea a través del sistema SIGER de la SE. Si el nombre está disponible, puedes reservarlo por 5 días hábiles mientras haces los trámites ante el notario.</p>

<h3>Paso 2: Escritura constitutiva ante notario (para S.A. de C.V. y S.R.L.)</h3>
<p>Con el nombre aprobado, acudes a un notario público para otorgar el Acta Constitutiva. Necesitarás:</p>
<ul>
  <li>Identificaciones de todos los socios.</li>
  <li>RFC de cada socio.</li>
  <li>CURP de cada socio.</li>
  <li>Domicilio fiscal de la empresa.</li>
  <li>Objeto social (actividades que realizará la empresa).</li>
  <li>Capital social y cómo está dividido entre los socios.</li>
  <li>Nombre del administrador o Consejo de Administración.</li>
</ul>
<p><strong>Costo:</strong> Los honorarios notariales para una constitución simple van de $8,000 a $15,000 MXN. Notarías en ciudades grandes pueden cobrar más.</p>

<h3>Paso 3: Inscripción en el Registro Público de Comercio</h3>
<p>El notario generalmente gestiona la inscripción en el Registro Público de Comercio (que depende de la SE). Tiene un costo aproximado de $1,500 - $3,000 MXN. Este paso le da publicidad a tu empresa y la hace oponible ante terceros.</p>

<h3>Paso 4: Alta en el SAT (RFC y e.firma)</h3>
<p>Una vez que tienes el Acta Constitutiva inscrita, debes dar de alta a la persona moral en el SAT para obtener el RFC empresarial. Necesitarás:</p>
<ul>
  <li>Acta Constitutiva con folio del RPCom.</li>
  <li>Comprobante de domicilio fiscal de la empresa.</li>
  <li>RFC e identificación del representante legal.</li>
</ul>
<p>El SAT también otorgará la <strong>e.firma</strong> (antes Firma Electrónica Avanzada o FIEL) de la empresa, que es el equivalente a la firma manuscrita para efectos fiscales y es indispensable para casi todos los trámites en línea.</p>

<h3>Paso 5: Registro en el IMSS (si habrá empleados)</h3>
<p>Si tu empresa tendrá empleados desde el inicio, debes inscribirte como patrón ante el IMSS antes del primer día de trabajo del primer empleado. El registro como patrón es gratuito y se hace en la subdelegación del IMSS correspondiente a tu domicilio fiscal o en línea a través del IDSE (IMSS Desde Su Empresa).</p>

<h3>Paso 6: Apertura de cuenta bancaria empresarial</h3>
<p>Con el RFC y el Acta Constitutiva, ya puedes abrir una cuenta bancaria a nombre de la empresa. Cada banco tiene sus propios requisitos, pero generalmente piden el Acta Constitutiva, el RFC, poderes del representante legal, e identificación.</p>

<h3>Paso 7: Permisos municipales en Chihuahua</h3>
<p>Si tu negocio tiene una ubicación física en Chihuahua, necesitas trámites municipales:</p>
<ul>
  <li><strong>Uso de suelo:</strong> Verifica que el local que elegiste tenga uso de suelo compatible con tu actividad. El trámite se hace ante la Dirección de Desarrollo Urbano del Municipio de Chihuahua.</li>
  <li><strong>Licencia de funcionamiento:</strong> Obligatoria para casi cualquier negocio con establecimiento fijo. Se tramita ante la Tesorería Municipal. Costo: varía según el giro y el tamaño del negocio ($500 - $5,000 MXN aproximadamente).</li>
  <li><strong>Protección civil:</strong> Para negocios con afluencia de público o que manejen materiales peligrosos.</li>
</ul>

<h3>Paso 8: Trámites especiales según el giro</h3>
<ul>
  <li><strong>COFEPRIS:</strong> Si el negocio está relacionado con alimentos, medicamentos, cosméticos, dispositivos médicos u otros bienes regulados sanitariamente.</li>
  <li><strong>IMPI:</strong> Si quieres proteger tu marca, es altamente recomendable registrarla ante el Instituto Mexicano de la Propiedad Industrial. El registro de una marca cuesta aproximadamente $2,500 MXN y dura 10 años.</li>
  <li><strong>Licencia de alcohol:</strong> Si venderás o servirás bebidas alcohólicas, necesitas licencia específica del municipio.</li>
</ul>

<h2>El SARE: apertura rápida de empresas</h2>
<p>El <strong>Sistema de Apertura Rápida de Empresas (SARE)</strong> permite tramitar simultáneamente varios de los permisos municipales en un solo lugar, reduciendo significativamente los tiempos. En Chihuahua, puedes consultar la disponibilidad de este trámite en el portal del municipio.</p>

<h2>¿Cuánto tiempo tarda todo el proceso?</h2>
<ul>
  <li>Verificación de nombre y reserva: 1 día</li>
  <li>Escritura constitutiva ante notario: 3-7 días hábiles</li>
  <li>Inscripción en el RPCom: 5-15 días hábiles</li>
  <li>Alta en el SAT y e.firma: 1-3 días</li>
  <li>Cuenta bancaria: 3-10 días</li>
  <li>Permisos municipales: 5-30 días según el giro</li>
  <li><strong>Total estimado: 3-8 semanas para estar completamente en regla</strong></li>
</ul>

<h2>Errores comunes al constituir una empresa</h2>
<ul>
  <li><strong>No definir bien el objeto social:</strong> Un objeto social muy limitado puede impedirte realizar actividades que necesitas en el futuro. Uno muy amplio puede atraer más obligaciones fiscales. Redáctalo con tu abogado y contador.</li>
  <li><strong>No establecer reglas claras entre socios:</strong> No contar con un convenio de socios desde el principio es fuente de conflictos. Define desde el inicio: quién toma decisiones, cómo se distribuyen utilidades, qué pasa si un socio quiere salir.</li>
  <li><strong>Mezclar finanzas personales y empresariales:</strong> Uno de los errores más comunes y costosos. Desde el primer día, usa solo la cuenta empresarial para ingresos y gastos del negocio.</li>
  <li><strong>No proteger la marca desde el inicio:</strong> Muchos empresarios invierten en marketing y construcción de marca antes de registrarla, y luego descubren que ya existe o que alguien se las registró.</li>
  <li><strong>Descuidar la contabilidad:</strong> Las obligaciones fiscales de una persona moral son más complejas. Contrata a un contador desde el inicio, no cuando ya llevas meses atrasado.</li>
</ul>

<div class="cta-block">
  <h3>¿Necesitas un abogado de Derecho Mercantil?</h3>
  <p>En Lexia tenemos abogados verificados especializados en Derecho Mercantil en todo México. Contáctalos directamente sin intermediarios.</p>
</div>
`,
  },
  // ─── NEW ARTICLES ────────────────────────────────────────────────────────────

  {
    slug: "tabla-liquidacion-laboral-2025",
    title: "Tabla de liquidación laboral en México 2025: montos por antigüedad",
    metaTitle: "Tabla de liquidación laboral México 2025: cuánto te corresponde | Lexia",
    metaDescription:
      "Tabla completa de liquidación laboral en México 2025. Consulta cuánto te corresponde según tu salario y años trabajados. Incluye ejemplos con salarios de $8,000, $15,000 y $25,000 mensuales.",
    category: "Derecho Laboral",
    specialtySlug: "laboral",
    specialtyLabel: "Derecho Laboral",
    publishedAt: "2025-04-20",
    readingTime: 8,
    excerpt:
      "¿Cuánto te corresponde de liquidación según tu salario y antigüedad? Esta tabla te da los montos aproximados para los escenarios más comunes en México en 2025.",
    content: `
<h2>¿Para qué sirve esta tabla?</h2>
<p>Calcular una liquidación laboral requiere aplicar varias fórmulas simultáneamente. Esta guía condensa los resultados en tablas de referencia rápida para los rangos salariales más comunes en México, tomando como base la <strong>Ley Federal del Trabajo vigente en 2025</strong> y el salario mínimo actualizado.</p>
<p>Recuerda que los montos mostrados son aproximaciones. El monto exacto depende del salario diario integrado (que incluye partes proporcionales de aguinaldo y prima vacacional), la fecha exacta del despido y las prestaciones adicionales del contrato colectivo.</p>

<h2>Componentes de la liquidación por despido injustificado</h2>
<p>Antes de ver las tablas, repasemos qué incluye una liquidación completa según el artículo 50 de la LFT:</p>
<ul>
  <li><strong>3 meses de salario integrado</strong> (indemnización constitucional — Art. 123 CPEUM)</li>
  <li><strong>20 días de salario integrado por cada año trabajado</strong> (prima de antigüedad — Art. 50 LFT)</li>
  <li><strong>Aguinaldo proporcional:</strong> 15 días de salario por año, pagadero en la proporción del tiempo trabajado en el año</li>
  <li><strong>Vacaciones proporcionales</strong> no gozadas según la tabla del Art. 76 LFT</li>
  <li><strong>Prima vacacional proporcional:</strong> 25% sobre el valor de los días de vacaciones</li>
  <li><strong>Salarios caídos</strong> si hay juicio (topados a 12 meses desde la reforma de 2019)</li>
</ul>

<h2>Tabla 1: Liquidación por despido injustificado — Salario $8,000/mes</h2>
<p><em>Salario diario: $266.67 | Salario diario integrado estimado: ~$280</em></p>
<div class="overflow-x-auto my-4">
<table class="w-full text-sm border-collapse border border-slate-200">
  <thead><tr class="bg-slate-100"><th class="border border-slate-200 px-3 py-2 text-left">Antigüedad</th><th class="border border-slate-200 px-3 py-2 text-right">3 meses</th><th class="border border-slate-200 px-3 py-2 text-right">20 días/año</th><th class="border border-slate-200 px-3 py-2 text-right">Proporcionales</th><th class="border border-slate-200 px-3 py-2 text-right font-bold">Total estimado</th></tr></thead>
  <tbody>
    <tr><td class="border border-slate-200 px-3 py-2">1 año</td><td class="border border-slate-200 px-3 py-2 text-right">$25,200</td><td class="border border-slate-200 px-3 py-2 text-right">$5,600</td><td class="border border-slate-200 px-3 py-2 text-right">~$2,500</td><td class="border border-slate-200 px-3 py-2 text-right font-bold">~$33,300</td></tr>
    <tr class="bg-slate-50"><td class="border border-slate-200 px-3 py-2">3 años</td><td class="border border-slate-200 px-3 py-2 text-right">$25,200</td><td class="border border-slate-200 px-3 py-2 text-right">$16,800</td><td class="border border-slate-200 px-3 py-2 text-right">~$2,800</td><td class="border border-slate-200 px-3 py-2 text-right font-bold">~$44,800</td></tr>
    <tr><td class="border border-slate-200 px-3 py-2">5 años</td><td class="border border-slate-200 px-3 py-2 text-right">$25,200</td><td class="border border-slate-200 px-3 py-2 text-right">$28,000</td><td class="border border-slate-200 px-3 py-2 text-right">~$3,000</td><td class="border border-slate-200 px-3 py-2 text-right font-bold">~$56,200</td></tr>
    <tr class="bg-slate-50"><td class="border border-slate-200 px-3 py-2">10 años</td><td class="border border-slate-200 px-3 py-2 text-right">$25,200</td><td class="border border-slate-200 px-3 py-2 text-right">$56,000</td><td class="border border-slate-200 px-3 py-2 text-right">~$3,200</td><td class="border border-slate-200 px-3 py-2 text-right font-bold">~$84,400</td></tr>
    <tr><td class="border border-slate-200 px-3 py-2">15 años</td><td class="border border-slate-200 px-3 py-2 text-right">$25,200</td><td class="border border-slate-200 px-3 py-2 text-right">$84,000</td><td class="border border-slate-200 px-3 py-2 text-right">~$3,500</td><td class="border border-slate-200 px-3 py-2 text-right font-bold">~$112,700</td></tr>
    <tr class="bg-slate-50"><td class="border border-slate-200 px-3 py-2">20 años</td><td class="border border-slate-200 px-3 py-2 text-right">$25,200</td><td class="border border-slate-200 px-3 py-2 text-right">$112,000</td><td class="border border-slate-200 px-3 py-2 text-right">~$3,800</td><td class="border border-slate-200 px-3 py-2 text-right font-bold">~$141,000</td></tr>
  </tbody>
</table>
</div>

<h2>Tabla 2: Liquidación por despido injustificado — Salario $15,000/mes</h2>
<p><em>Salario diario: $500 | Salario diario integrado estimado: ~$525</em></p>
<div class="overflow-x-auto my-4">
<table class="w-full text-sm border-collapse border border-slate-200">
  <thead><tr class="bg-slate-100"><th class="border border-slate-200 px-3 py-2 text-left">Antigüedad</th><th class="border border-slate-200 px-3 py-2 text-right">3 meses</th><th class="border border-slate-200 px-3 py-2 text-right">20 días/año</th><th class="border border-slate-200 px-3 py-2 text-right">Proporcionales</th><th class="border border-slate-200 px-3 py-2 text-right font-bold">Total estimado</th></tr></thead>
  <tbody>
    <tr><td class="border border-slate-200 px-3 py-2">1 año</td><td class="border border-slate-200 px-3 py-2 text-right">$47,250</td><td class="border border-slate-200 px-3 py-2 text-right">$10,500</td><td class="border border-slate-200 px-3 py-2 text-right">~$4,700</td><td class="border border-slate-200 px-3 py-2 text-right font-bold">~$62,450</td></tr>
    <tr class="bg-slate-50"><td class="border border-slate-200 px-3 py-2">3 años</td><td class="border border-slate-200 px-3 py-2 text-right">$47,250</td><td class="border border-slate-200 px-3 py-2 text-right">$31,500</td><td class="border border-slate-200 px-3 py-2 text-right">~$5,200</td><td class="border border-slate-200 px-3 py-2 text-right font-bold">~$83,950</td></tr>
    <tr><td class="border border-slate-200 px-3 py-2">5 años</td><td class="border border-slate-200 px-3 py-2 text-right">$47,250</td><td class="border border-slate-200 px-3 py-2 text-right">$52,500</td><td class="border border-slate-200 px-3 py-2 text-right">~$5,600</td><td class="border border-slate-200 px-3 py-2 text-right font-bold">~$105,350</td></tr>
    <tr class="bg-slate-50"><td class="border border-slate-200 px-3 py-2">10 años</td><td class="border border-slate-200 px-3 py-2 text-right">$47,250</td><td class="border border-slate-200 px-3 py-2 text-right">$105,000</td><td class="border border-slate-200 px-3 py-2 text-right">~$6,000</td><td class="border border-slate-200 px-3 py-2 text-right font-bold">~$158,250</td></tr>
    <tr><td class="border border-slate-200 px-3 py-2">15 años</td><td class="border border-slate-200 px-3 py-2 text-right">$47,250</td><td class="border border-slate-200 px-3 py-2 text-right">$157,500</td><td class="border border-slate-200 px-3 py-2 text-right">~$6,500</td><td class="border border-slate-200 px-3 py-2 text-right font-bold">~$211,250</td></tr>
    <tr class="bg-slate-50"><td class="border border-slate-200 px-3 py-2">20 años</td><td class="border border-slate-200 px-3 py-2 text-right">$47,250</td><td class="border border-slate-200 px-3 py-2 text-right">$210,000</td><td class="border border-slate-200 px-3 py-2 text-right">~$7,000</td><td class="border border-slate-200 px-3 py-2 text-right font-bold">~$264,250</td></tr>
  </tbody>
</table>
</div>

<h2>Tabla 3: Liquidación por despido injustificado — Salario $25,000/mes</h2>
<p><em>Salario diario: $833.33 | Salario diario integrado estimado: ~$875</em></p>
<div class="overflow-x-auto my-4">
<table class="w-full text-sm border-collapse border border-slate-200">
  <thead><tr class="bg-slate-100"><th class="border border-slate-200 px-3 py-2 text-left">Antigüedad</th><th class="border border-slate-200 px-3 py-2 text-right">3 meses</th><th class="border border-slate-200 px-3 py-2 text-right">20 días/año</th><th class="border border-slate-200 px-3 py-2 text-right">Proporcionales</th><th class="border border-slate-200 px-3 py-2 text-right font-bold">Total estimado</th></tr></thead>
  <tbody>
    <tr><td class="border border-slate-200 px-3 py-2">1 año</td><td class="border border-slate-200 px-3 py-2 text-right">$78,750</td><td class="border border-slate-200 px-3 py-2 text-right">$17,500</td><td class="border border-slate-200 px-3 py-2 text-right">~$7,800</td><td class="border border-slate-200 px-3 py-2 text-right font-bold">~$104,050</td></tr>
    <tr class="bg-slate-50"><td class="border border-slate-200 px-3 py-2">3 años</td><td class="border border-slate-200 px-3 py-2 text-right">$78,750</td><td class="border border-slate-200 px-3 py-2 text-right">$52,500</td><td class="border border-slate-200 px-3 py-2 text-right">~$8,600</td><td class="border border-slate-200 px-3 py-2 text-right font-bold">~$139,850</td></tr>
    <tr><td class="border border-slate-200 px-3 py-2">5 años</td><td class="border border-slate-200 px-3 py-2 text-right">$78,750</td><td class="border border-slate-200 px-3 py-2 text-right">$87,500</td><td class="border border-slate-200 px-3 py-2 text-right">~$9,300</td><td class="border border-slate-200 px-3 py-2 text-right font-bold">~$175,550</td></tr>
    <tr class="bg-slate-50"><td class="border border-slate-200 px-3 py-2">10 años</td><td class="border border-slate-200 px-3 py-2 text-right">$78,750</td><td class="border border-slate-200 px-3 py-2 text-right">$175,000</td><td class="border border-slate-200 px-3 py-2 text-right">~$10,000</td><td class="border border-slate-200 px-3 py-2 text-right font-bold">~$263,750</td></tr>
    <tr><td class="border border-slate-200 px-3 py-2">15 años</td><td class="border border-slate-200 px-3 py-2 text-right">$78,750</td><td class="border border-slate-200 px-3 py-2 text-right">$262,500</td><td class="border border-slate-200 px-3 py-2 text-right">~$10,800</td><td class="border border-slate-200 px-3 py-2 text-right font-bold">~$352,050</td></tr>
    <tr class="bg-slate-50"><td class="border border-slate-200 px-3 py-2">20 años</td><td class="border border-slate-200 px-3 py-2 text-right">$78,750</td><td class="border border-slate-200 px-3 py-2 text-right">$350,000</td><td class="border border-slate-200 px-3 py-2 text-right">~$11,500</td><td class="border border-slate-200 px-3 py-2 text-right font-bold">~$440,250</td></tr>
  </tbody>
</table>
</div>

<div class="bg-amber-50 border-l-4 border-amber-400 p-4 my-6 rounded-r-lg"><p class="text-amber-800 text-sm font-medium">Importante: Estas tablas son orientativas. El salario diario integrado real puede ser mayor si tu empresa te otorga prestaciones superiores a la ley (vales, fondo de ahorro, bonos). Un abogado laboral puede hacer el cálculo exacto con tu recibo de nómina.</p></div>

<h2>Tabla de vacaciones por antigüedad (Art. 76 LFT, reforma 2023)</h2>
<p>La reforma al artículo 76 LFT, vigente desde 2023, aumentó significativamente los días de vacaciones mínimos:</p>
<div class="overflow-x-auto my-4">
<table class="w-full text-sm border-collapse border border-slate-200">
  <thead><tr class="bg-slate-100"><th class="border border-slate-200 px-3 py-2 text-left">Año trabajado</th><th class="border border-slate-200 px-3 py-2 text-right">Días de vacaciones (antes de 2023)</th><th class="border border-slate-200 px-3 py-2 text-right font-bold">Días de vacaciones (desde 2023)</th></tr></thead>
  <tbody>
    <tr><td class="border border-slate-200 px-3 py-2">1er año</td><td class="border border-slate-200 px-3 py-2 text-right">6</td><td class="border border-slate-200 px-3 py-2 text-right font-bold">12</td></tr>
    <tr class="bg-slate-50"><td class="border border-slate-200 px-3 py-2">2do año</td><td class="border border-slate-200 px-3 py-2 text-right">8</td><td class="border border-slate-200 px-3 py-2 text-right font-bold">14</td></tr>
    <tr><td class="border border-slate-200 px-3 py-2">3er año</td><td class="border border-slate-200 px-3 py-2 text-right">10</td><td class="border border-slate-200 px-3 py-2 text-right font-bold">16</td></tr>
    <tr class="bg-slate-50"><td class="border border-slate-200 px-3 py-2">4to año</td><td class="border border-slate-200 px-3 py-2 text-right">12</td><td class="border border-slate-200 px-3 py-2 text-right font-bold">18</td></tr>
    <tr><td class="border border-slate-200 px-3 py-2">5to año</td><td class="border border-slate-200 px-3 py-2 text-right">14</td><td class="border border-slate-200 px-3 py-2 text-right font-bold">20</td></tr>
    <tr class="bg-slate-50"><td class="border border-slate-200 px-3 py-2">Del 6to al 10mo</td><td class="border border-slate-200 px-3 py-2 text-right">+2 días cada 5 años</td><td class="border border-slate-200 px-3 py-2 text-right font-bold">+2 días cada año</td></tr>
  </tbody>
</table>
</div>

<h2>¿Qué pasa con el tope de salario?</h2>
<p>La LFT establece que la prima de antigüedad de 20 días por año se calcula sobre el salario integrado, pero con un tope: no puede exceder el <strong>doble del salario mínimo</strong> vigente en la zona geográfica correspondiente. En 2025, el salario mínimo general es de <strong>$278.80 diarios</strong> en la zona libre de la frontera norte y <strong>$248.93</strong> en el resto del país.</p>
<p>Esto significa que la prima de antigüedad tiene un tope de ~$497.86 diarios para la mayor parte del país. Los trabajadores con salarios muy altos pueden verse afectados por este tope en el cálculo de los 20 días por año, aunque no en la indemnización constitucional de 3 meses.</p>

<h2>El plazo para reclamar: actúa antes de 2 meses</h2>
<p>El artículo 518 LFT fija un plazo de prescripción de <strong>2 meses</strong> para demandar el pago de la liquidación por despido injustificado. Este plazo corre a partir del día siguiente al despido. Si dejas pasar este tiempo, pierdes el derecho a demandar aunque el despido haya sido completamente injusto.</p>

<div class="cta-block">
  <h3>¿Necesitas calcular tu liquidación exacta?</h3>
  <p>En Lexia tenemos abogados laborales verificados que pueden calcular tu liquidación real y acompañarte en el proceso de reclamación. Consúltalos directamente.</p>
</div>
`,
  },

  {
    slug: "cuanto-cobra-abogado-chihuahua",
    title: "¿Cuánto cobra un abogado en Chihuahua en 2025?",
    metaTitle: "Cuánto cobra un abogado en Chihuahua 2025: guía de honorarios | Lexia",
    metaDescription:
      "Guía actualizada de honorarios de abogados en Chihuahua 2025. Cuánto cuesta un abogado laboral, familiar, penal o mercantil. Consulta inicial, honorarios por éxito y cuotas fijas.",
    category: "Derecho Laboral",
    specialtySlug: "laboral",
    specialtyLabel: "Derecho Laboral",
    publishedAt: "2025-04-20",
    readingTime: 7,
    excerpt:
      "Los honorarios de un abogado en Chihuahua varían enormemente según la especialidad, la complejidad del caso y el perfil del despacho. Esta guía te da rangos reales para que sepas qué esperar.",
    content: `
<h2>¿Por qué varían tanto los honorarios de los abogados?</h2>
<p>Contratar a un abogado en Chihuahua puede costarte desde $500 pesos por una consulta hasta $200,000 o más por un litigio complejo. Esta diferencia se explica por varios factores: la especialidad del abogado, su experiencia y reputación, la complejidad del asunto, si se cobra por hora o por resultado, y si es un despacho boutique o un abogado independiente.</p>
<p>En México no existe un arancel obligatorio para abogados como en otros países. Los honorarios son libres y se pactan entre las partes. Sin embargo, hay rangos razonables según el tipo de caso que te ayudarán a comparar propuestas y detectar cobros fuera de lo común.</p>

<h2>Honorarios por especialidad en Chihuahua</h2>

<h3>Derecho Laboral</h3>
<p>Es una de las especialidades más activas en Chihuahua dada la actividad industrial y maquiladora de la entidad. Los esquemas de cobro más comunes son:</p>
<ul>
  <li><strong>Consulta inicial:</strong> $500 – $1,500 pesos (muchos abogados laborales la ofrecen gratis)</li>
  <li><strong>Honorarios a éxito:</strong> 20% – 35% de lo recuperado (sin cobro previo). Es el modelo más común para demandas de liquidación.</li>
  <li><strong>Cuota fija por etapa:</strong> $8,000 – $15,000 por la etapa de conciliación; $20,000 – $60,000 por juicio completo ante el Tribunal Laboral.</li>
  <li><strong>Representación en conciliación prejudicial (solo):</strong> $3,000 – $8,000</li>
</ul>
<div class="bg-amber-50 border-l-4 border-amber-400 p-4 my-6 rounded-r-lg"><p class="text-amber-800 text-sm font-medium">Consejo: Si buscas un abogado laboral en Chihuahua para demandar una liquidación, el modelo a éxito es el más conveniente cuando el monto a recuperar es significativo. Así el abogado solo gana si tú ganas.</p></div>

<h3>Derecho Familiar</h3>
<p>Los divorcios, custodias y pensiones alimenticias son los asuntos más frecuentes. Los rangos en Chihuahua son:</p>
<ul>
  <li><strong>Divorcio por mutuo acuerdo sin hijos ni bienes:</strong> $8,000 – $20,000 (honorarios totales del despacho)</li>
  <li><strong>Divorcio con custodia y pensión en disputa:</strong> $25,000 – $80,000 dependiendo de la duración del juicio</li>
  <li><strong>Pensión alimenticia (demanda inicial):</strong> $6,000 – $15,000</li>
  <li><strong>Modificación de convenio de custodia:</strong> $8,000 – $20,000</li>
  <li><strong>Juicio de intestado (sucesión sin testamento):</strong> $15,000 – $50,000 según el patrimonio</li>
</ul>

<h3>Derecho Penal</h3>
<p>Los honorarios en materia penal en Chihuahua son los que mayor variación presentan, ya que dependen del fuero (común o federal), la etapa procesal y la gravedad del delito:</p>
<ul>
  <li><strong>Audiencia inicial (control de detención):</strong> $5,000 – $20,000</li>
  <li><strong>Defensa en etapa de investigación:</strong> $15,000 – $50,000</li>
  <li><strong>Juicio oral completo (fuero común):</strong> $40,000 – $150,000</li>
  <li><strong>Juicio oral completo (fuero federal):</strong> $80,000 – $300,000+</li>
  <li><strong>Amparo contra auto de vinculación:</strong> $10,000 – $30,000</li>
</ul>
<p>Si no puedes pagar un defensor particular, tienes derecho a un <strong>defensor público gratuito</strong> asignado por el Instituto de Defensoría Pública del estado de Chihuahua.</p>

<h3>Derecho Civil</h3>
<ul>
  <li><strong>Cobro de deuda (juicio ejecutivo mercantil):</strong> 15% – 25% de lo recuperado, o cuota fija de $10,000 – $30,000</li>
  <li><strong>Desahucio (lanzamiento de arrendatario):</strong> $10,000 – $25,000</li>
  <li><strong>Controversia de contrato:</strong> $15,000 – $60,000 según complejidad</li>
  <li><strong>Regularización de inmueble (prescripción adquisitiva):</strong> $20,000 – $50,000</li>
</ul>

<h3>Derecho Mercantil</h3>
<ul>
  <li><strong>Constitución de sociedad (SA de CV o SAS):</strong> $5,000 – $15,000 (más gastos notariales de $3,000 – $8,000)</li>
  <li><strong>Contrato comercial (elaboración):</strong> $3,000 – $10,000</li>
  <li><strong>Juicio ejecutivo mercantil:</strong> 15% – 25% del monto demandado</li>
  <li><strong>Concurso mercantil (quiebra):</strong> $50,000 – $200,000+</li>
</ul>

<h3>Derecho Fiscal</h3>
<ul>
  <li><strong>Asesoría en carta invitación del SAT:</strong> $3,000 – $8,000</li>
  <li><strong>Recurso de revocación:</strong> $10,000 – $30,000</li>
  <li><strong>Juicio de nulidad (TFJA):</strong> $20,000 – $80,000</li>
  <li><strong>Amparo fiscal:</strong> $25,000 – $100,000</li>
  <li><strong>Planeación fiscal anual (persona moral):</strong> $8,000 – $30,000</li>
</ul>

<h3>Amparo</h3>
<ul>
  <li><strong>Amparo indirecto (con suspensión):</strong> $15,000 – $50,000</li>
  <li><strong>Amparo directo contra sentencia:</strong> $20,000 – $80,000</li>
  <li><strong>Suspensión provisional urgente:</strong> $5,000 – $15,000 adicionales</li>
</ul>

<h2>¿Cómo se cobra: pago adelantado vs. honorarios a éxito?</h2>
<p>Existen dos grandes modelos de cobro que debes conocer antes de contratar:</p>
<h3>Pago adelantado (retainer o cuota fija)</h3>
<p>El abogado cobra un monto inicial al comenzar y puede cobrar pagos adicionales según avance el caso. Este modelo es común en materia penal, civil y mercantil, donde el resultado del juicio no siempre implica cobro de dinero.</p>
<h3>Honorarios condicionales o a éxito</h3>
<p>El abogado trabaja sin cobrar por adelantado y recibe un porcentaje de lo que se recupere. Es el modelo predominante en derecho laboral y en cobro de deudas. El porcentaje típico en Chihuahua es del 20% al 35% del monto recuperado.</p>
<div class="bg-amber-50 border-l-4 border-amber-400 p-4 my-6 rounded-r-lg"><p class="text-amber-800 text-sm font-medium">Siempre firma un contrato de prestación de servicios jurídicos que especifique: los honorarios exactos, el alcance de los servicios, cómo se manejan los gastos adicionales (como actuaciones, copias, notario) y las condiciones de terminación del contrato.</p></div>

<h2>Gastos adicionales que debes considerar</h2>
<p>Además de los honorarios del abogado, pueden existir gastos adicionales que corren por tu cuenta:</p>
<ul>
  <li><strong>Gastos notariales:</strong> $3,000 – $15,000 según el acto</li>
  <li><strong>Actuaciones y diligencias:</strong> $500 – $2,000 por actuación</li>
  <li><strong>Peritajes:</strong> $5,000 – $30,000 dependiendo de la especialidad</li>
  <li><strong>Inscripciones registrales:</strong> $1,500 – $5,000</li>
  <li><strong>Traducción de documentos:</strong> $500 – $3,000 por documento</li>
</ul>

<div class="cta-block">
  <h3>Encuentra abogados verificados en Chihuahua</h3>
  <p>En Lexia puedes consultar los perfiles de abogados en Chihuahua con sus especialidades y contactarlos directamente para obtener un presupuesto sin compromiso.</p>
</div>
`,
  },

  {
    slug: "como-demandar-empresa-mexico",
    title: "Cómo demandar a una empresa en México: guía paso a paso 2025",
    metaTitle: "Cómo demandar a una empresa en México 2025: guía completa | Lexia",
    metaDescription:
      "Guía práctica para demandar a una empresa en México en 2025. Pasos, plazos, documentos necesarios, costos y qué esperar en cada etapa del proceso laboral, civil o mercantil.",
    category: "Derecho Laboral",
    specialtySlug: "laboral",
    specialtyLabel: "Derecho Laboral",
    publishedAt: "2025-04-20",
    readingTime: 9,
    excerpt:
      "Demandar a una empresa en México parece complicado, pero el proceso tiene etapas claras. Esta guía te explica cómo hacerlo dependiendo del tipo de conflicto: laboral, civil o mercantil.",
    content: `
<h2>¿Qué tipo de demanda necesitas?</h2>
<p>El primer paso para demandar a una empresa en México es identificar qué tipo de conflicto tienes, porque eso determina ante qué autoridad debes acudir, qué ley aplica y cuáles son los plazos:</p>
<ul>
  <li><strong>Conflicto laboral:</strong> Si fuiste trabajador de la empresa (despido, falta de pago de salario, negativa de prestaciones, acoso laboral). Ley Federal del Trabajo → Tribunales Laborales.</li>
  <li><strong>Conflicto civil:</strong> Si tienes un contrato de prestación de servicios, arrendamiento, o sufres daños por negligencia de la empresa. Código Civil → Juzgados Civiles.</li>
  <li><strong>Conflicto mercantil:</strong> Si tienes una relación comercial (facturas impagadas, incumplimiento de contrato entre empresas, pagarés). Código de Comercio → Juzgados Mercantiles o Mixtos.</li>
  <li><strong>Conflicto de consumidor:</strong> Si eres cliente final y la empresa te causó un perjuicio. Ley Federal de Protección al Consumidor → PROFECO.</li>
</ul>

<h2>Guía paso a paso: demanda laboral</h2>
<p>Las demandas laborales contra empresas son las más comunes en México. Aquí el proceso completo después de la reforma de 2019:</p>

<h3>Paso 1: Reúne tu documentación</h3>
<p>Antes de acudir a cualquier instancia, necesitas:</p>
<ul>
  <li>Recibos de nómina de los últimos 6-12 meses</li>
  <li>Contrato individual de trabajo (o prueba de que existió relación laboral)</li>
  <li>Carta de despido, mensaje de WhatsApp, correo electrónico, cualquier comunicación</li>
  <li>Credencial de empleado, uniformes, gafetes como prueba de la relación laboral</li>
  <li>Datos de compañeros que puedan ser testigos</li>
  <li>Identificación oficial (INE)</li>
</ul>
<div class="bg-amber-50 border-l-4 border-amber-400 p-4 my-6 rounded-r-lg"><p class="text-amber-800 text-sm font-medium">Si la empresa operaba informalmente y no tienes recibos de nómina, aún puedes demandar. La carga de la prueba sobre la relación laboral puede acreditarse con testigos, mensajes, transferencias bancarias y otros medios.</p></div>

<h3>Paso 2: Conciliación prejudicial obligatoria</h3>
<p>Desde la reforma laboral de 2019, antes de presentar una demanda formal debes acudir al <strong>Centro de Conciliación Laboral</strong> de tu estado (en Chihuahua, el Centro de Justicia Laboral). Este trámite es:</p>
<ul>
  <li><strong>Gratuito</strong> para el trabajador</li>
  <li><strong>Obligatorio</strong> como requisito previo a la demanda</li>
  <li>Tiene un plazo de <strong>45 días naturales</strong> para resolverse</li>
  <li>Puedes ir acompañado de un abogado (recomendado)</li>
</ul>
<p>Si la empresa no se presenta o no hay acuerdo, el Centro emite una <strong>constancia de no conciliación</strong> que habilita la demanda ante el Tribunal Laboral.</p>

<h3>Paso 3: Presentación de la demanda</h3>
<p>Con la constancia de no conciliación, tu abogado presenta la demanda ante el Tribunal Laboral del Poder Judicial del Estado (para jurisdicción local) o ante el Tribunal Laboral Federal (para empresas de industrias de jurisdicción federal: textil, minería, transporte, energía, etc.).</p>
<p>La demanda debe incluir: datos del trabajador y la empresa, prestaciones reclamadas con montos calculados, hechos y fundamentos legales, ofrecimiento de pruebas (testigos, documentos, inspecciones).</p>

<h3>Paso 4: Audiencia preliminar</h3>
<p>El juez cita a ambas partes a una audiencia preliminar donde se intenta una última conciliación, se depuran los hechos y se admiten las pruebas. Si la empresa no se presenta, puede darse por confesa.</p>

<h3>Paso 5: Audiencia de juicio oral</h3>
<p>En la audiencia de juicio se desahogan las pruebas (testigos, documentos, peritajes), se presentan alegatos y el juez puede dictar sentencia en la misma audiencia o dentro de los días siguientes. En tribunales de Chihuahua, los juicios laborales suelen resolverse en <strong>6 a 18 meses</strong> dependiendo de la carga del juzgado.</p>

<h3>Paso 6: Ejecución de sentencia</h3>
<p>Si ganas, el juez ordena a la empresa pagar la liquidación. Si la empresa no paga voluntariamente, puedes solicitar la ejecución forzada: embargo de cuentas bancarias, bienes muebles o inmuebles de la empresa hasta cubrir el monto de la condena más intereses.</p>

<h2>Guía paso a paso: demanda mercantil (deuda comercial)</h2>
<p>Si una empresa te debe dinero por facturas impagadas o incumplimiento de contrato, el proceso mercantil es diferente:</p>

<h3>Opción A: Juicio ejecutivo mercantil</h3>
<p>Si tienes un <strong>título de crédito</strong> (pagaré, letra de cambio, cheque) o documento que hace líquida la deuda, puedes tramitar un juicio ejecutivo mercantil que es más rápido:</p>
<ul>
  <li><strong>Plazo para resolverse:</strong> 3 – 8 meses si no hay controversia compleja</li>
  <li><strong>Ventaja:</strong> El juez puede ordenar embargo precautorio desde el inicio, antes de que la empresa distraiga sus bienes</li>
  <li><strong>Costo:</strong> Gastos judiciales (copias, actuaciones) más honorarios del abogado</li>
</ul>

<h3>Opción B: Juicio ordinario mercantil</h3>
<p>Para contratos complejos donde hay que probar la obligación y los daños. Es más largo (1 – 3 años) pero permite reclamar daños y perjuicios además del monto principal.</p>

<h2>Demanda ante PROFECO: para conflictos de consumidor</h2>
<p>Si eres consumidor final (no empresa) y una empresa te vendió un producto defectuoso, te cobró de más o incumplió una garantía, puedes:</p>
<ul>
  <li>Presentar una queja ante PROFECO (gratuito, sin abogado)</li>
  <li>PROFECO puede mediar, imponer multas a la empresa y ordenar la devolución del dinero</li>
  <li>El proceso puede resolverse en <strong>30 – 90 días</strong></li>
  <li>Si PROFECO no resuelve, puedes acudir al juzgado civil</li>
</ul>

<h2>¿Cuánto cuesta demandar a una empresa?</h2>
<p>Los costos dependen del tipo de juicio:</p>
<ul>
  <li><strong>Demanda laboral:</strong> La conciliación es gratuita. El juicio puede ser a honorarios a éxito (el abogado cobra 20-35% de lo recuperado) o con honorarios anticipados de $15,000 – $60,000.</li>
  <li><strong>Demanda mercantil:</strong> Honorarios de abogado ($10,000 – $50,000+) más gastos del juicio. Muchos abogados cobran porcentaje (15-25%) sobre lo recuperado.</li>
  <li><strong>PROFECO:</strong> Completamente gratuito.</li>
</ul>

<h2>El plazo más importante: no lo dejes pasar</h2>
<p>Cada tipo de conflicto tiene un plazo de prescripción diferente:</p>
<ul>
  <li><strong>Laboral por despido:</strong> <strong>2 meses</strong> desde el despido (Art. 518 LFT)</li>
  <li><strong>Laboral por falta de pago:</strong> <strong>1 año</strong> desde que fue exigible</li>
  <li><strong>Mercantil:</strong> <strong>10 años</strong> para contratos; <strong>3 años</strong> para pagarés y letras</li>
  <li><strong>Civil:</strong> <strong>10 años</strong> como regla general para acciones personales</li>
  <li><strong>PROFECO:</strong> No hay plazo fijo, pero conviene actuar pronto</li>
</ul>

<div class="cta-block">
  <h3>¿Necesitas asesoría para demandar a una empresa?</h3>
  <p>En Lexia tenemos abogados verificados especializados en derecho laboral, mercantil y civil en todo México. Contáctalos directamente para evaluar tu caso.</p>
</div>
`,
  },

  {
    slug: "diferencia-finiquito-liquidacion-laboral",
    title: "Finiquito vs liquidación: diferencias clave que debes conocer",
    metaTitle: "Diferencia entre finiquito y liquidación laboral en México 2025 | Lexia",
    metaDescription:
      "¿Te ofrecen finiquito o liquidación? No son lo mismo. Conoce exactamente qué incluye cada uno, cuándo te corresponde cada pago y por qué aceptar solo el finiquito puede costarte mucho.",
    category: "Derecho Laboral",
    specialtySlug: "laboral",
    specialtyLabel: "Derecho Laboral",
    publishedAt: "2025-04-20",
    readingTime: 6,
    excerpt:
      "Muchos trabajadores aceptan un finiquito creyendo que es lo mismo que una liquidación. Error costoso: la diferencia puede ser de decenas o cientos de miles de pesos.",
    content: `
<h2>El error más caro que cometen los trabajadores</h2>
<p>Cuando termina una relación laboral, muchas empresas entregan un documento llamado "finiquito" y piden al trabajador que lo firme. El problema es que miles de trabajadores firman sin entender que están renunciando a derechos adicionales — especialmente a la liquidación — que en muchos casos suma decenas o cientos de miles de pesos.</p>
<p>Entender la diferencia entre finiquito y liquidación es uno de los conocimientos más valiosos para cualquier trabajador en México.</p>

<h2>¿Qué es el finiquito?</h2>
<p>El <strong>finiquito</strong> es el pago de las prestaciones devengadas (ganadas pero no pagadas) que todo trabajador tiene derecho a recibir al terminar su relación laboral, <em>sin importar la causa de la terminación</em>. Se paga siempre: ya sea que renunciaste, te jubilaste, terminó tu contrato por tiempo determinado o te despidieron.</p>
<p>El finiquito incluye:</p>
<ul>
  <li><strong>Salarios pendientes:</strong> Los días trabajados del último período que aún no se han pagado</li>
  <li><strong>Aguinaldo proporcional:</strong> La parte del aguinaldo que ganaste en el año (15 días de salario por año completo, proporcional al tiempo trabajado)</li>
  <li><strong>Vacaciones proporcionales no disfrutadas:</strong> Los días de vacaciones que acumulaste y no tomaste</li>
  <li><strong>Prima vacacional proporcional:</strong> El 25% sobre los días de vacaciones que no disfrutaste</li>
  <li><strong>Prima de antigüedad (en algunos casos):</strong> 12 días de salario por año trabajado cuando hay 15 o más años de servicio, o cuando el trabajador se retira voluntariamente</li>
</ul>

<div class="bg-amber-50 border-l-4 border-amber-400 p-4 my-6 rounded-r-lg"><p class="text-amber-800 text-sm font-medium">El finiquito NO es opcional para el patrón. Tiene la obligación de pagarlo en cualquier terminación de la relación laboral. Si se niega, puedes demandar su pago ante el Centro de Conciliación Laboral.</p></div>

<h2>¿Qué es la liquidación?</h2>
<p>La <strong>liquidación</strong> es una indemnización adicional que aplica <em>exclusivamente</em> cuando el patrón termina la relación laboral de forma injustificada, es decir, sin invocar ninguna de las causas legales del artículo 47 LFT. La liquidación es, en pocas palabras, la "pena" que la ley impone al patrón por despedir sin causa.</p>
<p>La liquidación incluye, además del finiquito:</p>
<ul>
  <li><strong>3 meses de salario integrado</strong> (indemnización constitucional — Art. 123, fracción XXII)</li>
  <li><strong>20 días de salario integrado por cada año de servicio</strong> (Art. 50 LFT)</li>
  <li><strong>Salarios caídos</strong> si la empresa no pagó en los 15 días siguientes al despido y hubo juicio (limitados a 12 meses desde la reforma de 2019)</li>
</ul>

<h2>Tabla comparativa: finiquito vs liquidación</h2>
<div class="overflow-x-auto my-4">
<table class="w-full text-sm border-collapse border border-slate-200">
  <thead><tr class="bg-slate-100"><th class="border border-slate-200 px-3 py-2 text-left">Concepto</th><th class="border border-slate-200 px-3 py-2 text-center">Finiquito</th><th class="border border-slate-200 px-3 py-2 text-center">Liquidación</th></tr></thead>
  <tbody>
    <tr><td class="border border-slate-200 px-3 py-2">¿Cuándo aplica?</td><td class="border border-slate-200 px-3 py-2 text-center">Siempre</td><td class="border border-slate-200 px-3 py-2 text-center">Solo en despido injustificado</td></tr>
    <tr class="bg-slate-50"><td class="border border-slate-200 px-3 py-2">Salarios pendientes</td><td class="border border-slate-200 px-3 py-2 text-center">✓</td><td class="border border-slate-200 px-3 py-2 text-center">✓</td></tr>
    <tr><td class="border border-slate-200 px-3 py-2">Aguinaldo proporcional</td><td class="border border-slate-200 px-3 py-2 text-center">✓</td><td class="border border-slate-200 px-3 py-2 text-center">✓</td></tr>
    <tr class="bg-slate-50"><td class="border border-slate-200 px-3 py-2">Vacaciones proporcionales</td><td class="border border-slate-200 px-3 py-2 text-center">✓</td><td class="border border-slate-200 px-3 py-2 text-center">✓</td></tr>
    <tr><td class="border border-slate-200 px-3 py-2">Prima vacacional proporcional</td><td class="border border-slate-200 px-3 py-2 text-center">✓</td><td class="border border-slate-200 px-3 py-2 text-center">✓</td></tr>
    <tr class="bg-slate-50"><td class="border border-slate-200 px-3 py-2">3 meses de salario integrado</td><td class="border border-slate-200 px-3 py-2 text-center">✗</td><td class="border border-slate-200 px-3 py-2 text-center">✓</td></tr>
    <tr><td class="border border-slate-200 px-3 py-2">20 días por año trabajado</td><td class="border border-slate-200 px-3 py-2 text-center">✗</td><td class="border border-slate-200 px-3 py-2 text-center">✓</td></tr>
    <tr class="bg-slate-50"><td class="border border-slate-200 px-3 py-2">Salarios caídos (si hay juicio)</td><td class="border border-slate-200 px-3 py-2 text-center">✗</td><td class="border border-slate-200 px-3 py-2 text-center">✓</td></tr>
  </tbody>
</table>
</div>

<h2>El riesgo de firmar un finiquito sin revisar</h2>
<p>Las empresas frecuentemente presentan al trabajador un documento de "finiquito" que en realidad incluye una cláusula como: <em>"el trabajador manifiesta haber recibido a su entera satisfacción el pago de todas y cada una de las prestaciones a las que tuvo derecho derivadas de la relación laboral, sin que quede pendiente ningún adeudo".</em></p>
<p>Firmar ese documento <strong>sin antes verificar que se pagó la liquidación completa</strong> puede significar que renuncias a reclamar la indemnización constitucional y los 20 días por año, que en casos de varios años de antigüedad pueden sumar fácilmente $100,000 o más.</p>
<div class="bg-amber-50 border-l-4 border-amber-400 p-4 my-6 rounded-r-lg"><p class="text-amber-800 text-sm font-medium">Regla de oro: nunca firmes ningún documento de la empresa el mismo día que te notifican el despido. Pide 24-48 horas para revisar el documento con un abogado. Una empresa seria no puede negarse a esto.</p></div>

<h2>¿Qué hacer si solo te ofrecen el finiquito?</h2>
<ol>
  <li><strong>No firmes nada</strong> hasta consultar con un abogado laboral.</li>
  <li><strong>Calcula tu liquidación completa</strong> usando tu recibo de nómina y tus años de antigüedad.</li>
  <li><strong>Negocia:</strong> Muchas empresas ofrecen un monto inicial bajo esperando que el trabajador no sepa sus derechos. Con la cifra correcta en mano, tienes poder de negociación.</li>
  <li><strong>Si no llegan a un acuerdo:</strong> Acude al Centro de Conciliación Laboral. La etapa prejudicial es gratuita y puede resolver el conflicto en semanas.</li>
  <li><strong>Si tampoco hay acuerdo en conciliación:</strong> Presenta demanda ante el Tribunal Laboral. Tienes <strong>2 meses desde el despido</strong> para hacerlo.</li>
</ol>

<h2>¿Cuándo el finiquito es suficiente?</h2>
<p>El finiquito sin liquidación adicional es suficiente cuando:</p>
<ul>
  <li>Renuncias voluntariamente (a menos que puedas probar despido indirecto)</li>
  <li>Tu contrato era por tiempo determinado y venció naturalmente</li>
  <li>Fuiste despedido por causa justificada que queda debidamente documentada</li>
  <li>Acordaste una separación voluntaria con compensación adicional negociada</li>
</ul>

<div class="cta-block">
  <h3>¿Te ofrecieron solo el finiquito y crees que te corresponde más?</h3>
  <p>Consulta con un abogado laboral en Lexia para calcular cuánto te corresponde realmente y decidir si vale la pena negociar o demandar.</p>
</div>
`,
  },

  {
    slug: "abogado-oficio-chihuahua",
    title: "Abogado de oficio en Chihuahua: cómo conseguirlo gratis en 2025",
    metaTitle: "Abogado de oficio en Chihuahua 2025: cómo solicitarlo y qué esperar | Lexia",
    metaDescription:
      "Cómo obtener un defensor público o abogado de oficio en Chihuahua. Quiénes tienen derecho, dónde solicitarlo, qué casos cubren y cuáles son las diferencias con un abogado particular.",
    category: "Derecho Penal",
    specialtySlug: "penal",
    specialtyLabel: "Derecho Penal",
    publishedAt: "2025-04-20",
    readingTime: 7,
    excerpt:
      "En México tienes derecho constitucional a una defensa jurídica gratuita si no puedes pagar un abogado. En Chihuahua existen varias instituciones que brindan este servicio. Te explicamos cómo acceder.",
    content: `
<h2>El derecho a la defensa gratuita en México</h2>
<p>El artículo 17 de la Constitución Política de los Estados Unidos Mexicanos establece que toda persona tiene derecho a que se le administre justicia de manera gratuita. Más específicamente, el artículo 20, apartado B, fracción VIII, garantiza a toda persona imputada el <strong>derecho a una defensa técnica adecuada desde el momento de su detención</strong>, incluyendo el derecho a que se le asigne un defensor público si no cuenta con uno.</p>
<p>Esto significa que en México nadie puede quedar sin representación jurídica por falta de recursos económicos, al menos en materia penal. Para otras materias (civil, laboral, familiar), existen también servicios de asesoría jurídica gratuita aunque con menor cobertura.</p>

<h2>Instituciones que dan asesoría jurídica gratuita en Chihuahua</h2>

<h3>1. Instituto de Defensoría Pública del Estado de Chihuahua</h3>
<p>Es el organismo principal de defensa pública en el estado. Sus defensores públicos representan a personas imputadas en el sistema acusatorio (fuero común) que no pueden pagar un abogado particular.</p>
<p><strong>Qué cubre:</strong> Defensa en audiencias iniciales, etapa de investigación formalizada, etapa intermedia y juicio oral en materia penal del fuero común.</p>
<p><strong>Cómo solicitarlo:</strong> Al momento de la detención, la policía y el Ministerio Público están obligados a informarte de tu derecho a un defensor. Si no tienes uno, el juez de control asigna uno del Instituto de manera automática antes de cualquier audiencia.</p>
<p><strong>Oficinas en Chihuahua:</strong> Tienen presencia en Chihuahua capital, Ciudad Juárez, Parral, Cuauhtémoc y otras ciudades del estado.</p>

<h3>2. Defensoría Pública Federal (IFDP)</h3>
<p>El <strong>Instituto Federal de Defensoría Pública</strong>, dependiente del Poder Judicial de la Federación, atiende asuntos del fuero federal: delitos federales, amparos, y representación ante el Tribunal Federal de Justicia Administrativa en materia fiscal.</p>
<p><strong>Cómo solicitarlo:</strong> Acudir personalmente a las oficinas del IFDP en el Palacio Federal de Chihuahua o Ciudad Juárez, o solicitarlo ante el Juzgado de Distrito correspondiente al ser presentado ante autoridad federal.</p>
<p><strong>Servicios adicionales:</strong> Asesoría jurídica gratuita a personas de escasos recursos en materia de amparo, incluso si no hay proceso penal.</p>

<h3>3. Procuraduría de la Defensa del Trabajo (PROFEDET)</h3>
<p>Dependencia de la STPS que brinda asesoría y representación jurídica gratuita a trabajadores en conflictos laborales. Muy útil si no puedes pagar un abogado laboral particular.</p>
<p><strong>Qué cubre:</strong> Asesoría sobre derechos laborales, cálculo de liquidaciones, acompañamiento en conciliación prejudicial y representación en juicios ante los Tribunales Laborales.</p>
<p><strong>Cómo solicitarlo:</strong> Acudir a las oficinas de PROFEDET en Chihuahua o Ciudad Juárez. El servicio es completamente gratuito para trabajadores.</p>
<p><strong>Requisito:</strong> Ser trabajador (no empresa). No hay límite de ingresos para acceder al servicio.</p>

<h3>4. Procuraduría Agraria</h3>
<p>Para conflictos relacionados con tierras ejidales, sucesiones de parcelas y derechos agrarios, la Procuraduría Agraria brinda representación jurídica gratuita a ejidatarios y comuneros.</p>

<h3>5. DIF Chihuahua — Orientación Jurídica</h3>
<p>El Sistema DIF del Estado de Chihuahua ofrece asesoría jurídica en materia familiar para personas de escasos recursos: divorcios, pensiones alimenticias, custodia de menores, adopciones.</p>

<h3>6. Clínicas Jurídicas de la UACH</h3>
<p>La Universidad Autónoma de Chihuahua (UACH) opera clínicas jurídicas donde estudiantes de derecho bajo supervisión de profesores brindan asesoría gratuita en diversas materias. Es una buena opción para asuntos no urgentes de mediana complejidad.</p>

<h2>¿Defensor público o abogado particular: cuál es mejor?</h2>
<p>Esta es una pregunta frecuente. La respuesta honesta:</p>

<h3>Fortalezas del defensor público</h3>
<ul>
  <li>Es completamente gratuito</li>
  <li>Conoce bien el sistema judicial local y las prácticas del Ministerio Público y los jueces</li>
  <li>Tiene obligación de representarte aunque el caso sea complejo</li>
  <li>En estados con sistemas bien organizados como Chihuahua, muchos defensores públicos son muy capaces</li>
</ul>

<h3>Limitaciones del defensor público</h3>
<ul>
  <li>Alta carga de trabajo: cada defensor puede tener decenas de casos simultáneos</li>
  <li>Menos tiempo para revisar a fondo tu expediente antes de cada audiencia</li>
  <li>No puedes elegir quién te representa; se asigna por turno</li>
  <li>La comunicación puede ser más difícil (no siempre responden llamadas entre audiencias)</li>
</ul>

<div class="bg-amber-50 border-l-4 border-amber-400 p-4 my-6 rounded-r-lg"><p class="text-amber-800 text-sm font-medium">En casos penales graves (homicidio, secuestro, delitos federales con penas altas), si tienes cualquier posibilidad de pagar un abogado particular especializado en materia penal, vale la pena hacerlo. La diferencia en dedicación y estrategia puede impactar significativamente el resultado.</p></div>

<h2>Cómo aprovechar al máximo tu defensor público</h2>
<p>Si te asignan un defensor público, estos consejos te ayudarán a tener una mejor defensa:</p>
<ul>
  <li><strong>Comunícate desde el principio:</strong> Explícale todo lo que sabes sobre el caso con la mayor cantidad de detalles posible. No ocultes información a tu defensor.</li>
  <li><strong>Pide explicaciones:</strong> Tienes derecho a que te expliquen cada paso del proceso. Si no entiendes algo, pregunta.</li>
  <li><strong>Proporciona contactos de testigos:</strong> Si hay personas que pueden declarar a tu favor, dáselos a tu defensor lo antes posible.</li>
  <li><strong>Asiste a todas las audiencias:</strong> Tu presencia es necesaria y demuestra interés en tu defensa.</li>
  <li><strong>Si no estás satisfecho:</strong> Tienes derecho a solicitar un cambio de defensor al Instituto de Defensoría Pública o al juez.</li>
</ul>

<h2>¿Qué pasa si el defensor público no te defiende bien?</h2>
<p>Si consideras que tu defensor público no está cumpliendo adecuadamente con su función, puedes:</p>
<ul>
  <li>Presentar una queja ante el <strong>Instituto de Defensoría Pública del Estado de Chihuahua</strong></li>
  <li>Solicitar al juez que se te asigne un nuevo defensor</li>
  <li>En casos extremos de violación al derecho de defensa, interponer un amparo por violación al artículo 20 constitucional</li>
</ul>

<div class="cta-block">
  <h3>¿Buscas un abogado penalista en Chihuahua?</h3>
  <p>En Lexia puedes encontrar abogados particulares especializados en materia penal en Chihuahua, con sus especialidades verificadas. Si el caso lo requiere, muchos ofrecen consulta inicial gratuita.</p>
</div>
`,
  },

  {
    slug: "ley-federal-trabajo-2025-cambios",
    title: "Ley Federal del Trabajo 2025: los cambios más importantes que debes conocer",
    metaTitle: "Ley Federal del Trabajo 2025: cambios y reformas importantes | Lexia",
    metaDescription:
      "Resumen de los cambios más importantes a la Ley Federal del Trabajo vigentes en 2025. Reforma de vacaciones, salario mínimo, plataformas digitales, outsourcing y más.",
    category: "Derecho Laboral",
    specialtySlug: "laboral",
    specialtyLabel: "Derecho Laboral",
    publishedAt: "2025-04-20",
    readingTime: 10,
    excerpt:
      "La LFT ha sufrido reformas significativas entre 2019 y 2025. Aquí resumimos los cambios más importantes que afectan tanto a trabajadores como a empresas: vacaciones, outsourcing, sindicatos y plataformas digitales.",
    content: `
<h2>Una ley en constante evolución</h2>
<p>La Ley Federal del Trabajo (LFT), publicada originalmente en 1970, ha sido objeto de reformas profundas en los últimos años que han cambiado fundamentalmente las reglas del trabajo en México. Conocer estas reformas es esencial para trabajadores que quieren defender sus derechos y para empresas que necesitan cumplir con sus obligaciones.</p>
<p>A continuación, un resumen de los cambios más importantes vigentes en 2025, organizados por tema.</p>

<h2>1. Reforma de vacaciones 2023: duplicación de días mínimos</h2>
<p>Esta es quizás la reforma más impactante para los trabajadores en los últimos años. En <strong>enero de 2023</strong>, se publicó la reforma al artículo 76 LFT que duplicó los días mínimos de vacaciones:</p>
<ul>
  <li><strong>Antes:</strong> 6 días el primer año, aumentando 2 días cada 5 años de antigüedad</li>
  <li><strong>Ahora:</strong> 12 días el primer año, aumentando 2 días por cada año adicional hasta los primeros 5 años, y luego cada 5 años</li>
</ul>
<div class="bg-amber-50 border-l-4 border-amber-400 p-4 my-6 rounded-r-lg"><p class="text-amber-800 text-sm font-medium">Si tienes trabajadores y no actualizaste su tabla de vacaciones a partir de 2023, estás incumpliendo la ley. Todos los trabajadores activos tienen derecho a los nuevos días mínimos, incluyendo quienes ya tenían varios años de antigüedad.</p></div>
<p>Esta reforma también impacta los cálculos de finiquito y liquidación: al haber más días de vacaciones, el valor de las vacaciones proporcionales no gozadas y la prima vacacional proporcional son mayores en cada liquidación.</p>

<h2>2. Reforma de outsourcing 2021: prohibición y subcontratación especializada</h2>
<p>La reforma del <strong>23 de abril de 2021</strong> fue una de las más profundas en décadas. Prohibió el esquema de outsourcing tradicional y creó un nuevo marco para la subcontratación:</p>
<h3>Lo que quedó prohibido</h3>
<ul>
  <li>El outsourcing de personal en el que una empresa ponía trabajadores a disposición de otra empresa para desarrollar el objeto social de esta última</li>
  <li>Los esquemas donde la empresa "empleadora" era solo una prestanombres sin actividad real</li>
</ul>
<h3>Lo que sí está permitido ahora</h3>
<ul>
  <li><strong>Subcontratación especializada:</strong> Una empresa puede contratar a otra para que realice servicios especializados o ejecute obras que no forman parte del objeto social o actividad preponderante de la contratante</li>
  <li>La empresa subcontratista debe estar inscrita en el <strong>Registro de Prestadoras de Servicios Especializados u Obras Especializadas (REPSE)</strong> ante la STPS</li>
</ul>
<h3>Implicaciones prácticas</h3>
<p>Muchas empresas tuvieron que migrar a sus trabajadores de "outsourcing" a nómina propia. Esto tuvo impacto directo en el PTU (reparto de utilidades), ya que los trabajadores ahora son contratados directamente por la empresa beneficiaria y tienen derecho al 10% de la utilidad fiscal de esta empresa.</p>

<h2>3. Reforma laboral 2019: nuevo sistema de justicia del trabajo</h2>
<p>La reforma de 2019 (y su implementación gradual concluida en 2023) transformó radicalmente el sistema de justicia laboral:</p>
<h3>Fin de las Juntas de Conciliación y Arbitraje</h3>
<p>Las antiguas Juntas de Conciliación y Arbitraje, que dependían del Poder Ejecutivo, fueron sustituidas por:</p>
<ul>
  <li><strong>Centros de Conciliación Laboral</strong> (federal y estatales): instancias administrativas autónomas donde se realiza la conciliación prejudicial obligatoria antes de cualquier demanda</li>
  <li><strong>Tribunales Laborales:</strong> juzgados dentro del Poder Judicial que resuelven los conflictos cuando la conciliación falla, con juicios orales</li>
</ul>
<h3>Conciliación prejudicial obligatoria</h3>
<p>Antes de demandar, el trabajador debe agotar una etapa de conciliación gratuita ante el Centro de Conciliación Laboral. El plazo es de 45 días naturales. Si no hay acuerdo, el Centro emite la constancia que habilita la demanda.</p>
<h3>Sindicatos y transparencia</h3>
<p>La reforma exigió la democratización de los sindicatos: elecciones de dirigencia por voto libre, secreto y directo de los trabajadores, y la revisión de todos los contratos colectivos existentes mediante consulta directa a los trabajadores.</p>

<h2>4. Trabajo de plataformas digitales 2021</h2>
<p>La reforma de abril de 2021 reconoció expresamente en la LFT a los trabajadores que prestan servicios a través de plataformas digitales (como Rappi, Uber, DiDi, etc.):</p>
<ul>
  <li>Se reconoce que pueden ser trabajadores dependientes si cumplen con los elementos de subordinación</li>
  <li>Tienen derecho a IMSS, AFORE y prestaciones si trabajan más de cierto número de horas semanales</li>
  <li>Las empresas de plataformas deben registrarlos ante el IMSS según su nivel de ingresos y horas trabajadas</li>
  <li>Las plataformas no pueden imponerles los mismos requisitos de exclusividad que a empleados formales</li>
</ul>

<h2>5. Teletrabajo: regulación del home office</h2>
<p>La pandemia de COVID-19 aceleró la regulación del teletrabajo. En <strong>enero de 2021</strong> entró en vigor la reforma al Capítulo XII Bis de la LFT que regula el trabajo a distancia:</p>
<ul>
  <li>Se aplica cuando el trabajo se realiza fuera del establecimiento del patrón usando TIC de forma regular</li>
  <li>El patrón debe proporcionar o cubrir el costo de equipos y conexión a internet</li>
  <li>Debe existir un contrato de teletrabajo que especifique horarios, mecanismos de supervisión y garantías de desconexión</li>
  <li>Los trabajadores tienen <strong>derecho a la desconexión digital</strong> fuera del horario laboral</li>
  <li>El patrón debe cubrir proporcional el costo de servicios de telecomunicaciones y energía eléctrica</li>
</ul>
<div class="bg-amber-50 border-l-4 border-amber-400 p-4 my-6 rounded-r-lg"><p class="text-amber-800 text-sm font-medium">Si trabajas desde casa y tu empresa no te proporciona equipo ni paga una parte de tu internet y luz, está incumpliendo la LFT. Puedes reclamarlo.</p></div>

<h2>6. Salario mínimo: aumentos históricos 2019-2025</h2>
<p>México ha experimentado aumentos históricos del salario mínimo en los últimos años, como parte de la política de recuperación del poder adquisitivo:</p>
<ul>
  <li><strong>2019:</strong> $102.68/día (zona general)</li>
  <li><strong>2020:</strong> $123.22/día (+20%)</li>
  <li><strong>2021:</strong> $141.70/día (+15%)</li>
  <li><strong>2022:</strong> $172.87/día (+22%)</li>
  <li><strong>2023:</strong> $207.44/día (+20%)</li>
  <li><strong>2024:</strong> $248.93/día (+20%)</li>
  <li><strong>2025:</strong> $278.80/día zona libre frontera norte; negociación pendiente para el resto del país</li>
</ul>
<p>Estos aumentos impactan directamente el cálculo de liquidaciones, el tope de la prima de antigüedad y las multas por violaciones laborales.</p>

<h2>7. Violencia y acoso laboral (NOM-035)</h2>
<p>Aunque no es una reforma a la LFT en sentido estricto, la <strong>NOM-035-STPS-2018</strong>, obligatoria desde 2019, exige a todas las empresas:</p>
<ul>
  <li>Identificar, analizar y prevenir factores de riesgo psicosocial</li>
  <li>Establecer políticas contra el acoso y hostigamiento laboral</li>
  <li>Implementar mecanismos de denuncia internos</li>
  <li>Promover el entorno organizacional favorable</li>
</ul>
<p>El incumplimiento puede generar multas de hasta 5,000 UMAs (~$505,000 pesos en 2025).</p>

<h2>Pendientes en la agenda legislativa 2025</h2>
<p>Para 2025, se discuten o están en proceso reformas adicionales:</p>
<ul>
  <li><strong>Semana laboral de 40 horas:</strong> Reducción de la jornada máxima de 48 a 40 horas semanales, con ajustes en el pago de horas extra</li>
  <li><strong>Regulación más amplia del trabajo por plataformas:</strong> Para cubrir a más tipos de trabajadores informales</li>
  <li><strong>Reforma al PTU:</strong> Se discute modificar el tope actual de 3 meses de salario en el reparto de utilidades para algunos sectores</li>
</ul>

<div class="cta-block">
  <h3>¿Tienes dudas sobre cómo aplica la LFT a tu situación?</h3>
  <p>Los abogados laborales verificados en Lexia pueden asesorarte sobre tus derechos según las reformas vigentes en 2025. Consúltalos directamente.</p>
</div>
`,
  },

  {
    slug: "divorcio-express-chihuahua",
    title: "Divorcio express en Chihuahua: requisitos, pasos y costos en 2025",
    metaTitle: "Divorcio express en Chihuahua 2025: requisitos y costos | Lexia",
    metaDescription:
      "Guía completa del divorcio express (incausado) en Chihuahua 2025. Requisitos, documentos, juzgados competentes, cuánto tarda y cuánto cuesta. Con y sin acuerdo de los cónyuges.",
    category: "Derecho Familiar",
    specialtySlug: "familiar",
    specialtyLabel: "Derecho Familiar",
    publishedAt: "2025-04-20",
    readingTime: 8,
    excerpt:
      "El divorcio express o incausado en Chihuahua permite disolver el matrimonio sin dar ninguna razón. Te explicamos exactamente cómo funciona, cuánto cuesta y cuánto tarda en 2025.",
    content: `
<h2>¿Qué es el divorcio express o incausado?</h2>
<p>El <strong>divorcio incausado</strong>, popularmente conocido como "divorcio express", es el procedimiento que permite a cualquiera de los cónyuges solicitar la disolución del matrimonio <em>sin necesidad de expresar causa o motivo</em>. Este tipo de divorcio está reconocido en el <strong>Código Civil del Estado de Chihuahua</strong> y en la jurisprudencia de la Suprema Corte de Justicia de la Nación.</p>
<p>Antes de su adopción, divorciarse en México requería demostrar una "causal" específica (adulterio, maltrato, abandono de hogar, etc.), lo que hacía los procesos más largos y conflictivos. El divorcio incausado elimina esa exigencia: basta con querer divorciarse.</p>
<div class="bg-amber-50 border-l-4 border-amber-400 p-4 my-6 rounded-r-lg"><p class="text-amber-800 text-sm font-medium">Importante: el derecho a pedir el divorcio sin causa es individual. Cualquiera de los dos cónyuges puede iniciarlo, aunque el otro se oponga. El matrimonio no puede mantenerse en contra de la voluntad de uno de los cónyuges.</p></div>

<h2>Modalidades del divorcio en Chihuahua</h2>
<p>En Chihuahua existen principalmente dos modalidades para iniciar el divorcio:</p>
<h3>A) Divorcio por mutuo consentimiento (ambos están de acuerdo)</h3>
<p>Cuando ambos cónyuges están de acuerdo en divorciarse y en todos los términos del convenio (bienes, hijos, pensiones), el proceso es más rápido y menos costoso. Pueden acudir juntos ante un juez familiar o incluso ante notario público si no tienen hijos menores de edad ni bienes en disputa.</p>
<h3>B) Divorcio incausado unilateral (uno lo pide, el otro no quiere o no hay acuerdo)</h3>
<p>Cuando solo uno de los cónyuges desea divorciarse o no hay acuerdo sobre los términos, se tramita ante el Juzgado de lo Familiar. El cónyuge que pide el divorcio no necesita la firma ni el consentimiento del otro.</p>

<h2>¿Qué tan "express" es realmente?</h2>
<p>El término "express" es relativo y depende de las circunstancias del caso:</p>
<ul>
  <li><strong>Sin hijos menores, sin bienes que dividir, mutuo acuerdo:</strong> Puede resolverse en <strong>1 a 3 meses</strong>. Algunos juzgados en Chihuahua lo han resuelto en 30 días.</li>
  <li><strong>Con hijos menores pero acuerdo sobre custodia y pensión:</strong> <strong>2 a 4 meses</strong>.</li>
  <li><strong>Con bienes (casa, autos, cuentas bancarias) y acuerdo:</strong> <strong>3 a 6 meses</strong> (requiere liquidación de sociedad conyugal).</li>
  <li><strong>Sin acuerdo en custodia, pensión o bienes:</strong> <strong>6 meses a 2 años</strong>, dependiendo de la complejidad y la carga del juzgado.</li>
</ul>

<h2>Requisitos y documentos necesarios</h2>
<p>Para iniciar el trámite de divorcio en Chihuahua necesitas:</p>
<ul>
  <li><strong>Acta de matrimonio:</strong> Original y copia certificada por el Registro Civil (vigente, máximo 6 meses de expedición)</li>
  <li><strong>Identificaciones oficiales</strong> de ambos cónyuges (INE o pasaporte)</li>
  <li><strong>CURP</strong> de ambos cónyuges</li>
  <li><strong>Actas de nacimiento de los hijos</strong> si los hay (originales certificados)</li>
  <li><strong>Comprobante de domicilio</strong> en Chihuahua (para acreditar competencia del juzgado)</li>
  <li><strong>Inventario de bienes</strong> si hay sociedad conyugal que liquidar (escrituras, facturas de vehículos, estados de cuenta)</li>
  <li><strong>Convenio regulador</strong> (acuerdo de custodia, visitas, pensión, división de bienes) si hay acuerdo entre cónyuges</li>
</ul>

<h2>¿Ante quién se tramita?</h2>
<h3>Juzgado de lo Familiar de Chihuahua</h3>
<p>La vía judicial es la más común. El expediente se turna a uno de los Juzgados de lo Familiar con sede en la ciudad de Chihuahua, Ciudad Juárez, Parral, Cuauhtémoc o la cabecera distrital más cercana según el domicilio de los cónyuges.</p>
<h3>Divorcio ante Notario Público</h3>
<p>El <strong>Código Civil de Chihuahua</strong> permite el divorcio ante notario público cuando se cumplen todos estos requisitos simultáneamente:</p>
<ul>
  <li>Mutuo consentimiento de ambos cónyuges</li>
  <li>No hay hijos menores de edad o mayores que dependan económicamente</li>
  <li>No existe controversia sobre bienes</li>
  <li>Ambos son mayores de edad</li>
</ul>
<p>El divorcio notarial es más rápido (puede resolverse en 1 a 4 semanas) y evita acudir al juzgado. Sin embargo, los honorarios notariales suelen ser más altos.</p>

<h2>¿Qué pasa con los hijos en un divorcio express?</h2>
<p>El divorcio en sí se puede otorgar incluso sin resolver los temas de hijos, pero el juez <strong>siempre</strong> debe pronunciarse sobre:</p>
<ul>
  <li><strong>Custodia:</strong> ¿Con quién vivirán los hijos? La ley de Chihuahua contempla custodia monoparental (con un padre) o custodia compartida.</li>
  <li><strong>Régimen de convivencia:</strong> Días y horarios en que el padre no custodio tiene derecho a convivir con los hijos.</li>
  <li><strong>Pensión alimenticia:</strong> Monto que el padre no custodio debe pagar mensualmente.</li>
</ul>
<p>Si los padres presentan un convenio de custodia firmado por ambos, el juez generalmente lo aprueba siempre que no contravenga el interés superior del menor. Si no hay acuerdo, el proceso se convierte en un juicio de custodia que alarga significativamente los tiempos.</p>

<h2>Bienes y sociedad conyugal</h2>
<p>El régimen patrimonial del matrimonio define cómo se dividen los bienes al divorciarse:</p>
<h3>Sociedad conyugal</h3>
<p>Si se casaron bajo sociedad conyugal, todos los bienes adquiridos durante el matrimonio (con excepciones) pertenecen a ambos al 50%. Al divorciarse, hay que liquidar la sociedad: tasar los bienes, determinar qué corresponde a cada uno y formalizar la transferencia ante notario.</p>
<h3>Separación de bienes</h3>
<p>Cada cónyuge conserva sus bienes propios. El divorcio no afecta el patrimonio de cada quien, aunque pueden existir reclamaciones por gastos del hogar o por bienes adquiridos conjuntamente sin formalización.</p>

<h2>Costos del divorcio en Chihuahua 2025</h2>
<p>Los costos varían según la vía elegida y la complejidad:</p>
<ul>
  <li><strong>Honorarios del abogado — mutuo acuerdo sin hijos ni bienes:</strong> $8,000 – $18,000</li>
  <li><strong>Honorarios del abogado — mutuo acuerdo con hijos y bienes:</strong> $15,000 – $35,000</li>
  <li><strong>Honorarios del abogado — divorcio contencioso (sin acuerdo):</strong> $25,000 – $80,000+</li>
  <li><strong>Divorcio notarial (sin hijos ni bienes):</strong> $5,000 – $15,000 (honorarios notariales)</li>
  <li><strong>Gastos de notario para liquidar sociedad conyugal:</strong> $5,000 – $20,000 según el valor de los bienes</li>
  <li><strong>Certificación de actas del Registro Civil:</strong> $300 – $600 por acta</li>
</ul>
<div class="bg-amber-50 border-l-4 border-amber-400 p-4 my-6 rounded-r-lg"><p class="text-amber-800 text-sm font-medium">Si no tienen acuerdo sobre la pensión alimenticia y la custodia, los costos y tiempos pueden aumentar significativamente. Muchos abogados recomiendan intentar la mediación familiar antes del juicio contencioso para ahorrar tiempo y dinero.</p></div>

<h2>Pasos del divorcio judicial en Chihuahua</h2>
<ol>
  <li><strong>Contratar un abogado familiar</strong> (o gestionar el caso personalmente si ambos están de acuerdo)</li>
  <li><strong>Redactar el convenio regulador</strong> si hay acuerdo, incluyendo custodia, pensión y bienes</li>
  <li><strong>Presentar la demanda</strong> ante el Juzgado de lo Familiar competente en Chihuahua</li>
  <li><strong>Notificación al cónyuge</strong> (si es unilateral, debe notificarse personalmente o por edictos)</li>
  <li><strong>Audiencia principal:</strong> El juez revisa el convenio o da oportunidad a ambas partes de argumentar</li>
  <li><strong>Sentencia de divorcio:</strong> El juez decreta el divorcio y aprueba o modifica el convenio</li>
  <li><strong>Inscripción en el Registro Civil:</strong> La sentencia debe anotarse en el acta de matrimonio para que tenga efectos legales</li>
  <li><strong>Liquidación notarial de bienes</strong> (si aplica): Una vez dictada la sentencia, se formalizan las transferencias de bienes ante notario</li>
</ol>

<div class="cta-block">
  <h3>¿Necesitas un abogado familiar en Chihuahua?</h3>
  <p>En Lexia tenemos abogados verificados especializados en derecho familiar en Chihuahua, Ciudad Juárez, Cuauhtémoc, Parral y más ciudades del estado. Contáctalos directamente.</p>
</div>
`,
  },

  {
    slug: "registrar-empresa-chihuahua",
    title: "Cómo registrar una empresa en Chihuahua en 2025: guía paso a paso",
    metaTitle: "Cómo registrar una empresa en Chihuahua 2025: guía completa | Lexia",
    metaDescription:
      "Guía actualizada para constituir y registrar una empresa en Chihuahua en 2025. Tipos de sociedad, notarios, Registro Público, trámites fiscales en el SAT y municipio. Costos reales.",
    category: "Derecho Mercantil",
    specialtySlug: "mercantil",
    specialtyLabel: "Derecho Mercantil",
    publishedAt: "2025-04-20",
    readingTime: 9,
    excerpt:
      "Abrir una empresa en Chihuahua requiere cumplir con trámites federales, estatales y municipales. Esta guía te lleva paso a paso, con costos actualizados y consejos para evitar los errores más comunes.",
    content: `
<h2>¿Por qué formalizar tu empresa?</h2>
<p>Operar como empresa formal en Chihuahua te da acceso a créditos bancarios, contratos con el gobierno, facturación electrónica, protección legal ante socios y clientes, y la posibilidad de crecer con una estructura sólida. Aunque la informalidad parece más sencilla al inicio, los riesgos legales y financieros la hacen costosa a largo plazo.</p>
<p>En 2025, los trámites para constituir una empresa en Chihuahua se han simplificado gracias a la digitalización. Algunas sociedades pueden constituirse en días, aunque en la práctica el proceso completo tarda entre 2 y 8 semanas según el tipo de sociedad y los trámites municipales.</p>

<h2>Paso 1: Elige el tipo de sociedad</h2>
<p>El primer paso es decidir qué tipo de persona jurídica es más conveniente para tu negocio. Las opciones más comunes en México son:</p>
<h3>Sociedad Anónima de Capital Variable (SA de CV)</h3>
<ul>
  <li><strong>Para quién:</strong> Empresas medianas o grandes con varios socios que necesitan estructura corporativa formal</li>
  <li><strong>Capital mínimo:</strong> $50,000 pesos (más capital variable)</li>
  <li><strong>Ventajas:</strong> Estructura reconocida internacionalmente, facilita créditos y contratos institucionales</li>
  <li><strong>Desventaja:</strong> Más costosa de constituir y mantener; requiere órgano de administración formal</li>
</ul>
<h3>Sociedad de Responsabilidad Limitada (SRL o S de RL de CV)</h3>
<ul>
  <li><strong>Para quién:</strong> Empresas familiares o de pocos socios que no quieren cotizar en bolsa</li>
  <li><strong>Ventajas:</strong> Responsabilidad limitada al capital aportado; más sencilla que la SA</li>
  <li><strong>Límite de socios:</strong> Máximo 50</li>
</ul>
<h3>Sociedad por Acciones Simplificada (SAS)</h3>
<ul>
  <li><strong>Para quién:</strong> Emprendedores individuales o parejas de socios que buscan constitución rápida</li>
  <li><strong>Capital mínimo:</strong> Sin mínimo</li>
  <li><strong>Constitución:</strong> Completamente en línea a través del sistema Tuempresa.gob.mx, en 1 día hábil</li>
  <li><strong>Límite:</strong> Ingresos anuales no mayores a 5 millones de pesos; máximo 50% de participación extranjera</li>
  <li><strong>Ventaja principal:</strong> Sin gastos notariales para la constitución</li>
</ul>
<h3>Persona Física con Actividad Empresarial</h3>
<ul>
  <li><strong>Para quién:</strong> Negocios unipersonales de tamaño pequeño o mediano</li>
  <li><strong>Ventaja:</strong> No requiere acta constitutiva ni notario; solo alta en SAT</li>
  <li><strong>Desventaja:</strong> Responsabilidad ilimitada: tu patrimonio personal responde por las deudas del negocio</li>
</ul>
<div class="bg-amber-50 border-l-4 border-amber-400 p-4 my-6 rounded-r-lg"><p class="text-amber-800 text-sm font-medium">Si tienes socios, siempre usa una persona moral (SA, SRL o SAS). La persona física con actividad empresarial no permite socios formales, lo que genera conflictos cuando el negocio crece.</p></div>

<h2>Paso 2: Permiso de denominación ante la Secretaría de Economía</h2>
<p>Para SA de CV y SRL, antes de acudir al notario debes obtener el <strong>permiso para uso de denominación social</strong> ante la Secretaría de Economía. Este trámite es en línea (compranet.hacienda.gob.mx) y tiene un costo de <strong>$1,114 pesos (2025)</strong>.</p>
<p>La denominación no puede ser idéntica ni similar a la de otra empresa ya registrada. El sistema te permite buscar disponibilidad antes de solicitar el permiso. En la SAS, el sistema Tuempresa hace esta verificación automáticamente.</p>

<h2>Paso 3: Escritura constitutiva ante Notario Público en Chihuahua</h2>
<p>Para SA de CV y SRL, es obligatorio acudir a un notario público para protocolizar el acta constitutiva. Este documento establece:</p>
<ul>
  <li>Nombre, objeto social y duración de la sociedad</li>
  <li>Domicilio social (puede ser en Chihuahua capital u otra ciudad del estado)</li>
  <li>Capital social y distribución de acciones/partes sociales</li>
  <li>Nombre y datos de los socios fundadores</li>
  <li>Estructura de administración (consejo de administración, gerente, comisario)</li>
  <li>Reglas para distribución de utilidades y salida de socios</li>
</ul>
<p><strong>Costos notariales en Chihuahua (2025):</strong></p>
<ul>
  <li>Constitución de SA de CV o SRL: $5,000 – $12,000 pesos (varía por capital social y extensión del acta)</li>
  <li>Inscripción en el Registro Público de Comercio: incluida generalmente en los honorarios notariales, o $1,500 – $3,000 adicionales</li>
</ul>
<p><strong>Notarios en Chihuahua capital</strong> hay varios en el centro de la ciudad y en la zona empresarial del Periférico. En Ciudad Juárez también existen múltiples notarías. El tiempo para obtener cita y recibir las escrituras varía de 5 a 15 días hábiles.</p>

<h2>Paso 4: Inscripción en el Registro Público de Comercio</h2>
<p>El acta constitutiva debe inscribirse en el <strong>Registro Público de Comercio</strong> del estado de Chihuahua para que la sociedad tenga existencia legal y sea oponible a terceros. Este trámite generalmente lo gestiona el mismo notario como parte del paquete de constitución.</p>
<p>El Registro Público en Chihuahua opera bajo el sistema SIGER (Sistema Integral de Gestión Registral) del gobierno federal. El tiempo de inscripción varía de <strong>3 a 15 días hábiles</strong> dependiendo de la carga del registro.</p>

<h2>Paso 5: Alta en el SAT (RFC de persona moral)</h2>
<p>Una vez inscrita la sociedad en el Registro Público, debes darla de alta ante el <strong>Servicio de Administración Tributaria (SAT)</strong> para obtener el RFC (Registro Federal de Contribuyentes) de la persona moral.</p>
<p><strong>Documentos necesarios para el alta en SAT:</strong></p>
<ul>
  <li>Acta constitutiva original o testimonio notarial</li>
  <li>Comprobante de domicilio fiscal (en Chihuahua)</li>
  <li>Identificación oficial del representante legal</li>
  <li>Correo electrónico para el buzón tributario</li>
  <li>Número de teléfono celular para autenticación de 2 factores</li>
</ul>
<p>El trámite puede hacerse en línea o en las oficinas del SAT en Chihuahua (Av. Universidad o la Administración Desconcentrada de Chihuahua). El RFC se otorga de manera inmediata en línea si los documentos están correctos.</p>

<h2>Paso 6: Selección del régimen fiscal</h2>
<p>Al darte de alta en el SAT, debes elegir el régimen fiscal según la actividad de tu empresa. Las personas morales tributan principalmente bajo:</p>
<ul>
  <li><strong>Régimen General de Ley Personas Morales:</strong> Para la mayoría de las empresas comerciales, industriales y de servicios. ISR del 30% sobre utilidades.</li>
  <li><strong>Régimen de Actividades Agrícolas, Ganaderas, Silvícolas y Pesqueras:</strong> Para empresas del sector primario con beneficios fiscales específicos.</li>
  <li><strong>Régimen de Coordinados:</strong> Para empresas de autotransporte terrestre.</li>
</ul>

<h2>Paso 7: Licencia de funcionamiento municipal en Chihuahua</h2>
<p>Para operar físicamente en la ciudad de Chihuahua, Ciudad Juárez u otros municipios, necesitas obtener la <strong>licencia de funcionamiento</strong> (o licencia de uso de suelo) ante el Ayuntamiento correspondiente.</p>
<p><strong>Trámite en el municipio de Chihuahua:</strong></p>
<ul>
  <li>Solicitud en línea a través del portal de trámites del Ayuntamiento de Chihuahua</li>
  <li>Documentos: acta constitutiva, RFC, comprobante de domicilio del local, plano del local</li>
  <li>En algunos giros (alimentos, espectáculos, servicios médicos) requiere inspección previa</li>
  <li>Costo: variable según el giro comercial ($500 – $5,000 anuales)</li>
  <li>Tiempo de resolución: 5 – 20 días hábiles</li>
</ul>

<h2>Paso 8: Apertura de cuenta bancaria empresarial</h2>
<p>Para operar legalmente y separar finanzas personales y empresariales, debes abrir una cuenta bancaria a nombre de la empresa. Los bancos más utilizados por empresas en Chihuahua son BBVA, Banorte, Santander, HSBC e Inbursa.</p>
<p><strong>Documentos requeridos por los bancos:</strong></p>
<ul>
  <li>Acta constitutiva debidamente inscrita en el RPC</li>
  <li>RFC de la empresa</li>
  <li>Comprobante de domicilio fiscal</li>
  <li>Identificaciones oficiales y RFC personales del representante legal y firmantes autorizados</li>
  <li>Carta de usos y costumbres del SAT o carátula de situación fiscal</li>
</ul>

<h2>Costos totales estimados para constituir una empresa en Chihuahua (2025)</h2>
<div class="overflow-x-auto my-4">
<table class="w-full text-sm border-collapse border border-slate-200">
  <thead><tr class="bg-slate-100"><th class="border border-slate-200 px-3 py-2 text-left">Trámite</th><th class="border border-slate-200 px-3 py-2 text-right">Costo estimado</th></tr></thead>
  <tbody>
    <tr><td class="border border-slate-200 px-3 py-2">Permiso de denominación (SE)</td><td class="border border-slate-200 px-3 py-2 text-right">$1,114</td></tr>
    <tr class="bg-slate-50"><td class="border border-slate-200 px-3 py-2">Honorarios notariales (SA o SRL)</td><td class="border border-slate-200 px-3 py-2 text-right">$5,000 – $12,000</td></tr>
    <tr><td class="border border-slate-200 px-3 py-2">Inscripción Registro Público de Comercio</td><td class="border border-slate-200 px-3 py-2 text-right">$1,500 – $3,000</td></tr>
    <tr class="bg-slate-50"><td class="border border-slate-200 px-3 py-2">Alta SAT</td><td class="border border-slate-200 px-3 py-2 text-right">Gratuito</td></tr>
    <tr><td class="border border-slate-200 px-3 py-2">Licencia de funcionamiento municipal</td><td class="border border-slate-200 px-3 py-2 text-right">$500 – $5,000</td></tr>
    <tr class="bg-slate-50"><td class="border border-slate-200 px-3 py-2">Honorarios de abogado (asesoría)</td><td class="border border-slate-200 px-3 py-2 text-right">$3,000 – $8,000</td></tr>
    <tr><td class="border border-slate-200 px-3 py-2 font-bold">Total estimado SA/SRL</td><td class="border border-slate-200 px-3 py-2 text-right font-bold">$11,000 – $29,000</td></tr>
    <tr class="bg-slate-50"><td class="border border-slate-200 px-3 py-2 font-bold">Total estimado SAS (sin notario)</td><td class="border border-slate-200 px-3 py-2 text-right font-bold">$1,500 – $6,000</td></tr>
  </tbody>
</table>
</div>

<h2>Errores comunes al constituir una empresa en Chihuahua</h2>
<ul>
  <li><strong>No definir bien el objeto social:</strong> El objeto social debe ser lo suficientemente amplio para cubrir todas tus actividades actuales y futuras, pero no tan genérico que cause problemas con el SAT.</li>
  <li><strong>No tener contrato de socios:</strong> El acta constitutiva define la estructura de la empresa, pero un contrato privado entre socios aclara detalles de operación y resolución de conflictos. Es especialmente importante cuando hay más de 2 socios.</li>
  <li><strong>Elegir domicilio fiscal sin pensar:</strong> El domicilio fiscal determina qué administración desconcentrada del SAT te corresponde y puede afectar la facilidad para hacer trámites.</li>
  <li><strong>No registrar la marca:</strong> Muchos emprendedores en Chihuahua invierten en branding antes de registrar su marca ante el IMPI. El registro de marca tiene vigencia de 10 años y es fundamental antes de que el negocio crezca.</li>
</ul>

<div class="cta-block">
  <h3>¿Necesitas un abogado mercantil en Chihuahua?</h3>
  <p>Los abogados mercantiles verificados en Lexia pueden acompañarte en el proceso de constitución de tu empresa en Chihuahua, desde el diseño corporativo hasta la inscripción final. Contáctalos directamente.</p>
</div>
`,
  },
]

export function getPost(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug)
}
