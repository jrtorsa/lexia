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
]

export function getPost(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug)
}
