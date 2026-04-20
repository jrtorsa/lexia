export interface CiudadData {
  slug: string
  nombre: string
  nombreCompleto: string
  estado: string
  poblacion: string
  contexto: string
  contextoEconomico: string
}

export interface EspecialidadData {
  slug: string
  nombre: string
  descripcion: string
  contenidoBase: string
}

export interface ComboContent {
  intro: string
  detalle: string
  faqs: Array<{ pregunta: string; respuesta: string }>
}

export const CIUDADES: Record<string, CiudadData> = {
  chihuahua: {
    slug: "chihuahua",
    nombre: "Chihuahua",
    nombreCompleto: "Chihuahua",
    estado: "Chihuahua",
    poblacion: "925,000 habitantes",
    contexto:
      "Chihuahua es la capital del estado más extenso de México, sede del Poder Judicial local y de los principales despachos jurídicos del norte del país. La ciudad alberga el Tribunal Superior de Justicia del Estado, la Fiscalía General y las instalaciones del SAT que atienden a toda la entidad. Su tejido empresarial, dominado por la manufactura de exportación y el sector agroalimentario, genera una demanda constante de servicios jurídicos especializados. La cercanía con Ciudad Juárez y la frontera con Texas le da a Chihuahua una dimensión internacional en materia de comercio y litigios transfronterizos.",
    contextoEconomico:
      "La economía de Chihuahua capital descansa en la industria aeroespacial, la manufactura automotriz y los servicios gubernamentales. Las empresas de manufactura establecidas en los parques industriales de la ciudad generan disputas laborales, contratos mercantiles y trámites fiscales que requieren asesoría legal especializada. El gobierno estatal es también el mayor empleador de la ciudad, lo que hace del derecho administrativo y del amparo instrumentos jurídicos frecuentemente utilizados.",
  },
  "ciudad-juarez": {
    slug: "ciudad-juarez",
    nombre: "Ciudad Juárez",
    nombreCompleto: "Ciudad Juárez",
    estado: "Chihuahua",
    poblacion: "1,500,000 habitantes",
    contexto:
      "Ciudad Juárez es la ciudad más poblada del estado de Chihuahua y una de las zonas metropolitanas fronterizas más activas de América del Norte, ubicada frente a El Paso, Texas. La dinámica binacional define buena parte del quehacer jurídico local: desde contratos de maquila hasta procesos migratorios, pasando por delitos del fuero federal vinculados al comercio exterior. La Zona Libre y los regímenes IMMEX transforman la relación laboral y fiscal de miles de trabajadores y empresas. La ciudad cuenta con juzgados federales, tribunales de lo laboral y una amplia oferta de despachos con experiencia en derecho internacional privado.",
    contextoEconomico:
      "La economía juarense gira en torno a las más de 300 plantas maquiladoras afiliadas al programa IMMEX, que emplean a cientos de miles de trabajadores bajo contratos colectivos e individuales sujetos a la Ley Federal del Trabajo. Los litigios laborales —liquidaciones, reinstalaciones, discriminación— constituyen la mayor carga de trabajo en los Centros de Conciliación y Arbitraje. El comercio de importación y exportación genera además una demanda creciente de asesoría aduanal, fiscal y mercantil.",
  },
  delicias: {
    slug: "delicias",
    nombre: "Delicias",
    nombreCompleto: "Delicias",
    estado: "Chihuahua",
    poblacion: "135,000 habitantes",
    contexto:
      "Delicias es el centro agrícola más importante del estado de Chihuahua, ubicada en el fértil Valle de Delicias irrigado por las presas Boquilla y La Colina. La ciudad es conocida como la capital mundial del algodón, pero también produce nuez pecanera, forrajes y hortalizas a escala industrial. La actividad agropecuaria intensiva crea necesidades jurídicas específicas: contratos de aparcería, disputas por derechos de agua, financiamiento rural y sucesiones de predios ejidales. El Registro Agrario Nacional tiene delegación en la ciudad, lo que facilita los trámites relacionados con la tenencia de la tierra.",
    contextoEconomico:
      "Los agronegocios en Delicias involucran contratos de compraventa de cosechas, arrendamiento de tierras ejidales y financiamiento bancario a través de fideicomisos. Las disputas por derechos de agua del Distrito de Riego 005 son frecuentes y requieren abogados con experiencia en derecho agrario y administrativo. La transformación de productos del campo ha incentivado la creación de empresas agroindustriales que demandan servicios en derecho mercantil y fiscal.",
  },
  cuauhtemoc: {
    slug: "cuauhtemoc",
    nombre: "Cuauhtémoc",
    nombreCompleto: "Cuauhtémoc",
    estado: "Chihuahua",
    poblacion: "170,000 habitantes",
    contexto:
      "Cuauhtémoc es una ciudad singular en el noroeste de Chihuahua, reconocida por la fuerte presencia de la comunidad menonita que llegó al estado en la década de 1920 y que ha construido una economía agroindustrial de gran escala. La producción lechera, la fabricación de quesos artesanales y la agricultura intensiva coexisten con una industria maderera que aprovecha la riqueza forestal de la Sierra Tarahumara cercana. Esta mezcla cultural y económica genera dinámicas jurídicas únicas: convenios en alemán bajo, cooperativas religiosas con personalidad jurídica especial y contratos de compraventa de tierras entre comunidades.",
    contextoEconomico:
      "Las cooperativas menonitas —conocidas como 'campos'— operan como entidades casi autónomas con sistemas internos de crédito, comercialización y resolución de disputas. Sin embargo, cuando los conflictos trascienden la comunidad, los tribunales estatales y federales son competentes. El sector lácteo genera contratos de suministro, disputas por marcas y asuntos de competencia económica. La industria forestal añade temas de concesiones, aprovechamiento sustentable y conflictos con ejidos colindantes.",
  },
  parral: {
    slug: "parral",
    nombre: "Parral",
    nombreCompleto: "Hidalgo del Parral",
    estado: "Chihuahua",
    poblacion: "115,000 habitantes",
    contexto:
      "Hidalgo del Parral es una ciudad histórica del sur de Chihuahua, famosa por su pasado minero y por ser el lugar donde fue asesinado Pancho Villa en 1923. La ciudad fue durante siglos uno de los centros de plata más productivos del mundo, y esa herencia minera sigue presente en concesiones activas, disputas por servidumbres y conflictos entre empresas extractivas y comunidades locales. Parral es también un polo de servicios para municipios rurales del sur del estado, con una actividad forense y notarial activa. El turismo histórico aporta al sector inmobiliario y hotelero.",
    contextoEconomico:
      "La minería en la región de Parral involucra concesiones otorgadas por la Secretaría de Economía, contratos de exploración y explotación, y negociaciones de servidumbre de paso con ejidatarios. Las empresas mineras medianas y las juniors canadienses y australianas operan en la zona requiriendo representación legal local. El sector comercial y de servicios que atiende a municipios vecinos genera litigios mercantiles, recuperación de cartera vencida y trámites notariales.",
  },
  camargo: {
    slug: "camargo",
    nombre: "Camargo",
    nombreCompleto: "Camargo",
    estado: "Chihuahua",
    poblacion: "45,000 habitantes",
    contexto:
      "Camargo es la cabecera municipal del fértil Valle de Camargo, una región agrícola y ganadera irrigada por el río Conchos y sus presas. La ciudad es un centro de servicios para los municipios circundantes del sur de Chihuahua, con una economía diversificada entre el campo, el comercio y la pequeña industria. La ganadería bovina de exportación es una actividad relevante que genera contratos de engorda, compraventa de ganado y conflictos con inspectores de sanidad. Los trámites agrarios son frecuentes dado el alto número de ejidos en la zona.",
    contextoEconomico:
      "La ganadería en Camargo opera bajo el esquema de rastros TIF certificados y exportaciones a Estados Unidos que requieren cumplimiento estricto de normas sanitarias y contratos internacionales. El sector agrícola del Valle de Camargo produce chile, algodón y forrajes, generando contratos de arrendamiento de tierras y disputas por derechos de agua. La pequeña empresa local enfrenta desafíos fiscales y laborales que demandan orientación jurídica accesible.",
  },
  ojinaga: {
    slug: "ojinaga",
    nombre: "Ojinaga",
    nombreCompleto: "Ojinaga",
    estado: "Chihuahua",
    poblacion: "28,000 habitantes",
    contexto:
      "Ojinaga es una ciudad fronteriza del oriente de Chihuahua, ubicada frente a Presidio, Texas, separada por el río Bravo. Su posición estratégica como paso internacional le da un carácter comercial y migratorio particular: el Puente Internacional Manuel Ojinaga–Presidio es un cruce habilitado para mercancías y personas que activa un comercio binacional significativo para su tamaño. La ciudad atiende también a productores agrícolas del desierto y a comunidades indígenas de la región. La migración internacional, tanto de connacionales de regreso como de extranjeros en tránsito, hace que el derecho migratorio sea una necesidad real de la comunidad.",
    contextoEconomico:
      "El comercio transfronterizo en Ojinaga involucra importaciones temporales, programas de maquila a pequeña escala y flujo de turistas y trabajadores fronterizos. Las importaciones de productos agropecuarios hacia Texas y las exportaciones de bienes de consumo generan trámites aduanales y disputas fiscales. La economía local también se sostiene en la producción candelillera y de lechuguilla, actividades que conectan a comunidades ejidales con mercados internacionales de ceras naturales.",
  },
  "casas-grandes": {
    slug: "casas-grandes",
    nombre: "Casas Grandes",
    nombreCompleto: "Casas Grandes",
    estado: "Chihuahua",
    poblacion: "25,000 habitantes",
    contexto:
      "Casas Grandes es el municipio del noroeste de Chihuahua que alberga la zona arqueológica de Paquimé, Patrimonio de la Humanidad por la UNESCO, considerada el mayor centro precolombino del norte de México. La actividad económica de la región mezcla el turismo cultural, la producción artesanal de cerámica (reconocida internacionalmente), la agricultura de manzana en los valles de Mata Ortiz y Nuevo Casas Grandes, y la ganadería extensiva. La cercanía con la frontera de Arizona y Sonora añade una dimensión transfronteriza al comercio regional. Las disputas de propiedad alrededor de zonas con valor arqueológico tienen particularidades que involucran al INAH y a la Secretaría de Cultura.",
    contextoEconomico:
      "El turismo en torno a Paquimé genera contratos de hospedaje, servicios guiados y artesanías, con implicaciones en derecho de autor y propiedad intelectual para los artistas de Mata Ortiz. La producción de manzana genera contratos de compraventa a cadenas comerciales y litigios por calidad de la cosecha. La ganadería extensiva del noroeste de Chihuahua requiere asesoría en contratos de arrendamiento de agostaderos y certificados de sanidad para exportación.",
  },
  "nuevo-casas-grandes": {
    slug: "nuevo-casas-grandes",
    nombre: "Nuevo Casas Grandes",
    nombreCompleto: "Nuevo Casas Grandes",
    estado: "Chihuahua",
    poblacion: "70,000 habitantes",
    contexto:
      "Nuevo Casas Grandes es la ciudad más poblada del noroeste de Chihuahua y el principal centro comercial y de servicios de salud de la región del Valle de Casas Grandes. Ubicada a escasos kilómetros del sitio arqueológico de Paquimé —Patrimonio de la Humanidad de la UNESCO— y próxima a la frontera con Sonora y Arizona, la ciudad articula la economía de los municipios serranos y valles del noroeste del estado. Su crecimiento como polo regional ha generado una demanda creciente de servicios jurídicos en materia mercantil, civil y laboral para empresas y particulares de toda la zona.",
    contextoEconomico:
      "La economía de Nuevo Casas Grandes se sustenta en el comercio regional, la agroindustria —producción de manzana, leche y carne de res— y los servicios que atienden municipios vecinos del noroeste chihuahuense. La actividad frutícola genera contratos de compraventa con empacadoras y litigios por calidad de cosecha. El sector ganadero, con exportaciones certificadas hacia Estados Unidos, involucra trámites sanitarios, contratos de engorda y compraventas internacionales que requieren asesoría legal especializada.",
  },
  jimenez: {
    slug: "jimenez",
    nombre: "Jiménez",
    nombreCompleto: "Jiménez",
    estado: "Chihuahua",
    poblacion: "35,000 habitantes",
    contexto:
      "Jiménez es un municipio del sur de Chihuahua ubicado en la cuenca del río Florido, con una vocación agrícola y ganadera bien establecida desde la época colonial. La ciudad es cabecera de un municipio con fuerte presencia de ejidos y pequeña propiedad dedicada al algodón, la alfalfa y la ganadería bovina de carne. Su posición en el corredor entre Parral y Camargo la convierte en un centro de servicios jurídicos, notariales y administrativos para comunidades rurales del sur del estado, con juzgado de primera instancia propio.",
    contextoEconomico:
      "La economía de Jiménez gira en torno a los cultivos de algodón y alfalfa en tierras de riego, la ganadería extensiva y la pequeña empresa comercial que atiende a la región. Los trámites de regularización agraria, los conflictos por derechos de agua de los distritos de riego y los problemas sucesorios de predios ejidales son las necesidades jurídicas más recurrentes. El comercio local y las pequeñas industrias generan también asuntos mercantiles y fiscales para personas físicas con actividad empresarial.",
  },
  guerrero: {
    slug: "guerrero",
    nombre: "Guerrero",
    nombreCompleto: "Guerrero",
    estado: "Chihuahua",
    poblacion: "12,000 habitantes",
    contexto:
      "Guerrero es la cabecera de uno de los municipios más extensos del occidente de Chihuahua, situado en la transición entre la llanura y la Sierra Madre Occidental. Fue un importante centro político y comercial del estado durante el siglo XIX, sede histórica de operaciones militares y comerciales de la región serrana. Hoy es un polo de servicios para comunidades serranas, ejidos forestales y ranchos ganaderos del occidente chihuahuense. La explotación maderable, la ganadería extensiva y la agricultura de temporal definen el perfil económico del municipio.",
    contextoEconomico:
      "La economía de Guerrero descansa en la ganadería bovina de carne, el aprovechamiento forestal de pino-encino en ejidos de la sierra y la agricultura de temporal. Los conflictos por permisos de aprovechamiento forestal ante la SEMARNAT, las disputas de linderos entre ejidos y la regularización de predios son los asuntos jurídicos más recurrentes. La actividad comercial y de servicios locales genera necesidades en materia mercantil, laboral y fiscal que demandan asesoría jurídica accesible en la región.",
  },
  madera: {
    slug: "madera",
    nombre: "Madera",
    nombreCompleto: "Madera",
    estado: "Chihuahua",
    poblacion: "35,000 habitantes",
    contexto:
      "Madera es un municipio del noroeste de Chihuahua enclavado en la Sierra Madre Occidental, reconocido como una de las regiones madereras más importantes del estado. Los bosques de pino-encino del municipio son aprovechados por ejidos forestales que producen madera en rollo y productos derivados para la industria de la construcción regional y nacional. La ciudad de Madera es también punto de acceso a la Reserva de la Biosfera Janos y a destinos de ecoturismo serrano, lo que diversifica su perfil económico y genera nuevas necesidades jurídicas.",
    contextoEconomico:
      "La industria forestal en Madera involucra permisos de aprovechamiento otorgados por la SEMARNAT, contratos de aserrío, compraventa de madera en rollo y conflictos por uso de terrenos de uso común en ejidos. La ganadería extensiva y algunas concesiones mineras activas complementan la economía local. El ecoturismo creciente genera contratos de prestación de servicios turísticos, permisos de uso de áreas naturales protegidas y regulaciones ambientales que requieren asesoría jurídica especializada en derecho ambiental y administrativo.",
  },
}

export const ESPECIALIDADES: Record<string, EspecialidadData> = {
  "derecho-familiar": {
    slug: "derecho-familiar",
    nombre: "Derecho Familiar",
    descripcion: "Divorcios, pensión alimenticia, custodia, adopción y sucesiones",
    contenidoBase:
      "El derecho familiar en México regula las relaciones jurídicas derivadas del matrimonio, el concubinato, la filiación y la patria potestad, bajo el marco del Código Civil aplicable en cada entidad federativa. Los procedimientos de divorcio —ya sea el incausado o el necesario— implican la disolución del vínculo matrimonial y la regulación de consecuencias patrimoniales como la liquidación de la sociedad conyugal. La pensión alimenticia es una obligación irrenunciable derivada del parentesco que puede ejecutarse por vía judicial ante incumplimiento. Los procesos de guarda y custodia de menores se rigen por el principio del interés superior del niño, conforme a la Constitución y los tratados internacionales ratificados por México.",
  },
  "derecho-penal": {
    slug: "derecho-penal",
    nombre: "Derecho Penal",
    descripcion: "Defensa penal, víctimas del delito, amparo penal y procesos acusatorios",
    contenidoBase:
      "El derecho penal en México opera bajo el sistema acusatorio adversarial instaurado a partir de la reforma constitucional de 2008 y plenamente vigente desde 2016. Este sistema garantiza el principio de presunción de inocencia, el derecho a la defensa técnica desde el momento de la detención y la posibilidad de alcanzar salidas alternas al proceso como el acuerdo reparatorio o la suspensión condicional. El defensor penal tiene un rol protagónico en las audiencias de control de detención, formulación de cargos, vinculación a proceso y juicio oral. La víctima también tiene derechos garantizados, incluyendo la asesoría jurídica gratuita por parte del asesor victimal y la reparación integral del daño.",
  },
  "derecho-laboral": {
    slug: "derecho-laboral",
    nombre: "Derecho Laboral",
    descripcion: "Despidos injustificados, liquidaciones, demandas ante el STPS y contratos colectivos",
    contenidoBase:
      "El derecho laboral mexicano se fundamenta en la Ley Federal del Trabajo y en el artículo 123 constitucional, que establece derechos mínimos irrenunciables para los trabajadores. La reforma laboral de 2019 transformó radicalmente el sistema de justicia del trabajo al crear los Centros de Conciliación y los Tribunales Laborales, sustituyendo a las antiguas Juntas de Conciliación y Arbitraje. La conciliación prejudicial obligatoria es ahora requisito previo a la demanda en la mayoría de los conflictos individuales. Los trabajadores tienen derecho a demandar el pago de liquidación, partes proporcionales de aguinaldo, vacaciones y prima vacacional, así como acciones de reinstalación cuando el despido es injustificado.",
  },
  "derecho-civil": {
    slug: "derecho-civil",
    nombre: "Derecho Civil",
    descripcion: "Contratos, responsabilidad civil, cobro de deudas y controversias patrimoniales",
    contenidoBase:
      "El derecho civil es la rama que regula las relaciones jurídicas entre particulares en sus aspectos patrimoniales y personales que no están cubiertos por ramas especiales. El Código Civil Federal y los códigos estatales regulan los contratos nominados (compraventa, arrendamiento, mutuo, comodato), la responsabilidad civil extracontractual y la prescripción de derechos. Los juicios civiles en México pueden ser ordinarios o especiales, y la carga de la prueba recae generalmente en quien afirma un hecho. Los instrumentos notariales —escrituras, poderes, testamentos, convenios— son documentos de fe pública que otorgan certeza jurídica a los actos entre particulares.",
  },
  "derecho-mercantil": {
    slug: "derecho-mercantil",
    nombre: "Derecho Mercantil",
    descripcion: "Contratos comerciales, sociedades, quiebras y litigios entre empresas",
    contenidoBase:
      "El derecho mercantil en México regula los actos de comercio y las relaciones entre comerciantes, con base en el Código de Comercio, la Ley General de Sociedades Mercantiles y la Ley General de Títulos y Operaciones de Crédito, entre otras. La constitución de sociedades —SA, SAPI, SAS, SC, SRL— requiere cumplir con requisitos de escritura pública, inscripción en el Registro Público de Comercio y obtención del RFC. Los juicios ejecutivos mercantiles permiten el cobro ágil de créditos documentados en pagarés, letras de cambio o cheques. La reforma judicial de 2011 incorporó medidas cautelares eficientes y facilitó el arbitraje comercial nacional e internacional como alternativa al litigio.",
  },
  "derecho-inmobiliario": {
    slug: "derecho-inmobiliario",
    nombre: "Derecho Inmobiliario",
    descripcion: "Compraventa de inmuebles, arrendamientos, regularización y litigios de propiedad",
    contenidoBase:
      "El derecho inmobiliario en México abarca la compraventa, el arrendamiento, el usufructo, la hipoteca y los derechos reales sobre bienes inmuebles, regulados principalmente por los códigos civiles de cada estado. La inscripción de los actos traslativos de dominio en el Registro Público de la Propiedad es indispensable para la oponibilidad frente a terceros. Los litigios de propiedad —acción reivindicatoria, interdictos, prescripción adquisitiva— requieren acreditar la posesión pública, pacífica y de buena fe durante los plazos que establece la ley. El fideicomiso inmobiliario es el instrumento más utilizado para el desarrollo de proyectos habitacionales y comerciales, y su administración involucra obligaciones fiscales y civiles específicas.",
  },
  "derecho-fiscal": {
    slug: "derecho-fiscal",
    nombre: "Derecho Fiscal",
    descripcion: "Auditorías del SAT, recursos de revocación, créditos fiscales y planeación tributaria",
    contenidoBase:
      "El derecho fiscal en México regula la relación entre el contribuyente y la autoridad hacendaria, principalmente el SAT (Servicio de Administración Tributaria), bajo el marco del Código Fiscal de la Federación y las leyes especiales de ISR, IVA, IEPS y IMSS. Los contribuyentes tienen derecho a impugnar los actos de autoridad a través del recurso de revocación ante el propio SAT o el juicio de nulidad ante el Tribunal Federal de Justicia Administrativa. El juicio de amparo es procedente contra resoluciones definitivas en materia fiscal que causen perjuicio. La planeación fiscal preventiva —uso de estímulos, deducciones autorizadas, regímenes especiales— es igual de importante que la defensa contenciosa para reducir la carga tributaria de personas físicas y morales.",
  },
  amparo: {
    slug: "amparo",
    nombre: "Amparo",
    descripcion: "Amparo directo, indirecto, suspensión del acto reclamado y recursos constitucionales",
    contenidoBase:
      "El juicio de amparo es el instrumento constitucional por excelencia en el sistema jurídico mexicano para proteger los derechos humanos y las garantías individuales frente a actos de autoridad. El amparo indirecto se interpone ante Juzgados de Distrito y procede contra leyes, actos de autoridades distintas a tribunales judiciales o actos en juicio con ejecución irreparable. El amparo directo se promueve ante Tribunales Colegiados de Circuito y procede contra sentencias definitivas, laudos y resoluciones que pongan fin al juicio. La suspensión del acto reclamado es una medida cautelar que puede paralizar la ejecución de la autoridad mientras se resuelve el fondo del asunto. El abogado de amparo debe dominar tanto el derecho constitucional como la materia especializada del acto reclamado.",
  },
}

export const CITY_SLUGS: Set<string> = new Set(Object.keys(CIUDADES))

// Nearby cities map for cross-linking
const CIUDADES_CERCANAS: Record<string, string[]> = {
  chihuahua: ["cuauhtemoc", "delicias", "camargo"],
  "ciudad-juarez": ["chihuahua", "casas-grandes", "nuevo-casas-grandes"],
  delicias: ["chihuahua", "camargo", "jimenez"],
  cuauhtemoc: ["chihuahua", "casas-grandes", "guerrero"],
  parral: ["chihuahua", "jimenez", "camargo"],
  camargo: ["delicias", "jimenez", "parral"],
  ojinaga: ["chihuahua", "parral", "delicias"],
  "casas-grandes": ["nuevo-casas-grandes", "cuauhtemoc", "ciudad-juarez"],
  "nuevo-casas-grandes": ["casas-grandes", "cuauhtemoc", "ciudad-juarez"],
  jimenez: ["parral", "camargo", "delicias"],
  guerrero: ["cuauhtemoc", "madera", "chihuahua"],
  madera: ["guerrero", "casas-grandes", "cuauhtemoc"],
}

export function getCiudadesCercanas(ciudadSlug: string): CiudadData[] {
  return (CIUDADES_CERCANAS[ciudadSlug] ?? [])
    .map((s) => CIUDADES[s])
    .filter(Boolean)
}

// ─── Combo content ────────────────────────────────────────────────────────────

type ComboKey = `${string}|${string}`

const COMBO_OVERRIDES: Partial<Record<ComboKey, ComboContent>> = {
  "delicias|derecho-laboral": {
    intro:
      "Delicias es el centro agroindustrial más activo del Valle de Chihuahua, donde trabajadores del campo, la industria empacadora y el comercio regional tienen acceso a asesoría laboral en Delicias de calidad. Los despidos en empresas agroindustriales, empacadoras y agronegocios locales generan una demanda constante de abogados laborales en Delicias, Chihuahua con experiencia en el mercado de trabajo agrícola y agroindustrial.",
    detalle:
      "Los abogados de despido en Delicias Chihuahua atienden casos ante el Centro de Conciliación Laboral del estado —conocido localmente como Integra Delicias Laboral— y, cuando se trata de trabajadores agrícolas con contratos estacionales de jurisdicción federal, ante los Tribunales Laborales Federales. La etapa de conciliación prejudicial es obligatoria antes de demandar; un abogado laboral en Delicias puede acompañarte en esa audiencia para negociar desde una posición informada y sin renunciar a derechos. La asesoría laboral en Delicias es especialmente relevante para jornaleros, trabajadores de empaque y operadores de maquinaria agrícola que frecuentemente ignoran sus derechos de liquidación y prestaciones proporcionales.",
    faqs: [
      {
        pregunta: "¿Cómo encuentro un abogado laboral en Delicias, Chihuahua?",
        respuesta:
          "Puedes buscar abogados laborales en Delicias en el directorio de Lexia, donde encontrarás perfiles verificados con especialidad en derecho laboral. También puedes acudir directamente al Centro de Conciliación Laboral en Delicias para recibir orientación gratuita antes de iniciar cualquier trámite. Es recomendable contratar un abogado laboral en Delicias con experiencia en el sector agroindustrial, ya que los contratos de temporada y los esquemas de pago en el campo tienen particularidades que no todos los abogados dominan.",
      },
      {
        pregunta: "Me despidieron de una empresa agroindustrial en Delicias. ¿Qué hago?",
        respuesta:
          "Si sufriste un despido en Delicias Chihuahua sin recibir tu liquidación completa, tienes derecho a 3 meses de salario integrado más 20 días por año trabajado, además de partes proporcionales de aguinaldo, vacaciones y prima vacacional. El primer paso es acudir al Centro de Conciliación Laboral (Integra Delicias Laboral) para la etapa prejudicial obligatoria. Un abogado de despido en Delicias puede ayudarte a calcular el monto correcto de tu liquidación y a negociar o demandar para obtenerla.",
      },
      {
        pregunta: "¿Cuánto cuesta la asesoría laboral en Delicias y cómo funciona?",
        respuesta:
          "La asesoría laboral en Delicias varía según el despacho: algunos cobran una consulta inicial de entre $500 y $1,500 pesos, mientras que otros trabajan a éxito —sin cobrar honorarios por anticipado— llevándose un porcentaje de la liquidación obtenida (generalmente entre el 20% y el 30%). La etapa de conciliación en el Centro de Conciliación Laboral de Delicias es gratuita. Lo más importante es actuar dentro del plazo de 2 años desde el despido para no perder tu derecho a demandar.",
      },
    ],
  },
  "ciudad-juarez|derecho-laboral": {
    intro:
      "Ciudad Juárez concentra la mayor actividad maquiladora del país bajo el programa IMMEX, lo que convierte al derecho laboral en la especialidad jurídica de mayor demanda en la ciudad. Cientos de miles de trabajadores de la manufactura de exportación enfrentan despidos, recortes de personal y conflictos por prestaciones derivados de la operación de empresas multinacionales.",
    detalle:
      "Los abogados laborales en Ciudad Juárez atienden con frecuencia demandas de liquidación por tiempo laborado, diferencias en el reparto de utilidades (PTU), acción de reinstalación y conflictos colectivos ante el Centro Federal de Conciliación y Registro Laboral. La reforma laboral de 2019 impone la conciliación obligatoria previa, lo que exige que el trabajador sea asesorado oportunamente para no perder sus derechos durante esa etapa.",
    faqs: [
      {
        pregunta: "¿Cuánto me corresponde de liquidación si me despidieron de una maquiladora en Ciudad Juárez?",
        respuesta:
          "Si tu despido fue injustificado, tienes derecho a 3 meses de salario integrado más 20 días por año trabajado, además de partes proporcionales de aguinaldo, vacaciones y prima vacacional. En Ciudad Juárez muchas maquiladoras tienen convenios colectivos que pueden mejorar esos montos, así que te conviene revisar tu contrato o pedir asesoría a un abogado laboral local.",
      },
      {
        pregunta: "¿Puedo demandar a mi empresa IMMEX en Ciudad Juárez si me negaron el PTU?",
        respuesta:
          "Sí. Las empresas con régimen IMMEX en Ciudad Juárez están obligadas a repartir el 10% de la renta gravable entre sus trabajadores. Si la empresa argumenta que no hubo utilidades, tienes derecho a revisar la declaración fiscal ante la STPS. El plazo para reclamar el PTU prescribe en un año, por lo que debes actuar pronto.",
      },
      {
        pregunta: "¿Qué es la conciliación prejudicial y cómo funciona en Ciudad Juárez?",
        respuesta:
          "Desde la reforma laboral, antes de presentar una demanda debes acudir al Centro de Conciliación Laboral en Ciudad Juárez para intentar llegar a un acuerdo con tu empleador. Tienes derecho a ir acompañado de un abogado y no estás obligado a aceptar ninguna oferta. Si no hay acuerdo en 45 días, el centro emite la constancia que te permite demandar ante el Tribunal Laboral.",
      },
    ],
  },
  "chihuahua|derecho-fiscal": {
    intro:
      "Chihuahua capital es sede de la administración local del SAT y de las principales unidades de auditoría que revisan a contribuyentes de todo el estado. Los empresarios y personas físicas con actividad empresarial en la ciudad se enfrentan con frecuencia a revisiones de gabinete, auditorías electrónicas y cartas de invitación que requieren respuesta técnica inmediata.",
    detalle:
      "Los despachos contables y jurídicos de Chihuahua capital tienen experiencia en atender contribuyentes de la industria aeroespacial, automotriz y gubernamental, sectores con obligaciones fiscales complejas en materia de IVA acreditable, deducción de inversiones y precios de transferencia. El recurso de revocación y el juicio ante el TFJA son herramientas frecuentemente utilizadas para impugnar créditos fiscales determinados por las autoridades chihuahuenses.",
    faqs: [
      {
        pregunta: "Recibí una auditoría electrónica del SAT en Chihuahua. ¿Qué debo hacer?",
        respuesta:
          "La auditoría electrónica (o revisión electrónica) se notifica a través del buzón tributario y tienes 15 días hábiles para presentar tu informe y documentación. Es fundamental contar con un abogado fiscal en Chihuahua desde el primer día para revisar los comprobantes cuestionados y preparar una respuesta técnica sólida que evite que se convierta en un crédito fiscal.",
      },
      {
        pregunta: "¿Puedo impugnar un crédito fiscal del SAT Chihuahua?",
        respuesta:
          "Sí. Tienes dos opciones: el recurso de revocación ante el propio SAT (plazo de 30 días hábiles) o el juicio de nulidad ante el Tribunal Federal de Justicia Administrativa. También puedes combinar ambas vías de manera alternativa. En Chihuahua hay magistrados especializados en materia fiscal que conocen bien la problemática empresarial de la región.",
      },
      {
        pregunta: "¿Qué estímulos fiscales aplican para empresas en el estado de Chihuahua?",
        respuesta:
          "Las empresas en Chihuahua pueden acceder a estímulos del Decreto de Región Fronteriza (vigente para Ciudad Juárez), deducciones por inversión en activos fijos bajo el artículo 220 de la LISR, y beneficios del programa de Empresa Certificada (IVA e IEPS). Un abogado fiscal en Chihuahua puede revisar qué estímulos aplican a tu empresa y cómo estructurar la planeación tributaria para aprovecharlos correctamente.",
      },
    ],
  },
  "cuauhtemoc|derecho-mercantil": {
    intro:
      "Cuauhtémoc es un polo agroindustrial donde las cooperativas menonitas y las empresas del sector lácteo y agrícola generan una demanda particular de servicios en derecho mercantil. La constitución de sociedades, los contratos de distribución de productos y las disputas entre socios son asuntos recurrentes en esta ciudad.",
    detalle:
      "Las cooperativas menonitas en Cuauhtémoc operan bajo esquemas de propiedad colectiva que a veces chocan con el derecho societario mexicano. Cuando los conflictos trascienden la comunidad, los abogados mercantiles deben navegar entre las costumbres internas y las disposiciones de la Ley General de Cooperativas. El sector lácteo —con marcas posicionadas como Chihuahua, Menonita y Asadero— enfrenta disputas de distribución, incumplimiento de contratos y registro de marcas ante el IMPI.",
    faqs: [
      {
        pregunta: "¿Qué tipo de sociedad me conviene para mi empresa agroindustrial en Cuauhtémoc?",
        respuesta:
          "Para una empresa agroindustrial en Cuauhtémoc con varios socios, la Sociedad Anónima de Capital Variable (SA de CV) sigue siendo la más utilizada por su flexibilidad. Si son pocos socios y buscan mayor agilidad, la Sociedad por Acciones Simplificada (SAS) permite constitución digital en un día. Un abogado mercantil en Cuauhtémoc puede asesorarte sobre responsabilidad de socios, régimen fiscal y gobierno corporativo.",
      },
      {
        pregunta: "Tengo un contrato de distribución de queso incumplido en Cuauhtémoc. ¿Puedo demandar?",
        respuesta:
          "Sí, a través del juicio ejecutivo mercantil si tienes documentos que acrediten la deuda (facturas, pagarés, contratos firmados) o del juicio ordinario mercantil para disputas más complejas. En Cuauhtémoc, los juicios mercantiles se ventilan ante el Juzgado Mixto de Primera Instancia local. El proceso puede tomar entre 6 meses y 2 años dependiendo de si el demandado contesta y ofrece pruebas.",
      },
      {
        pregunta: "¿Cómo registro la marca de mi producto lácteo elaborado en Cuauhtémoc?",
        respuesta:
          "El registro de marca se tramita ante el Instituto Mexicano de la Propiedad Industrial (IMPI) con vigencia de 10 años renovables. Debes realizar una búsqueda fonética y figurativa previa para detectar marcas similares que puedan oponerse a tu solicitud. Un abogado de propiedad industrial en Chihuahua o Cuauhtémoc puede gestionar el trámite, responder oficios del IMPI y defender tu solicitud en caso de oposición.",
      },
    ],
  },
}

function buildComboContent(ciudadSlug: string, especSlug: string): ComboContent {
  const c = CIUDADES[ciudadSlug]
  const e = ESPECIALIDADES[especSlug]
  if (!c || !e) {
    return {
      intro: `Encuentra abogados de ${e?.nombre ?? "derecho"} en ${c?.nombre ?? "la ciudad"}.`,
      detalle: "Contamos con abogados verificados listos para atender tu caso.",
      faqs: [],
    }
  }

  const introMap: Record<string, string> = {
    "derecho-familiar": `El derecho familiar en ${c.nombre} atiende situaciones que impactan directamente la vida cotidiana de las familias: divorcios, pensiones alimenticias, custodia de hijos y herencias. ${c.contexto.split(".")[0]}, lo que significa que los asuntos familiares con frecuencia tienen implicaciones patrimoniales relevantes.`,
    "derecho-penal": `El derecho penal en ${c.nombre} opera bajo el sistema acusatorio adversarial que exige la presencia de un defensor técnico calificado desde el primer contacto con la autoridad. ${c.contexto.split(".")[0]}, contexto que influye en el tipo de delitos del fuero común y federal que se presentan en la región.`,
    "derecho-laboral": `El derecho laboral en ${c.nombre} responde a la dinámica económica de la ciudad y sus empleadores. ${c.contextoEconomico.split(".")[0]}, lo que genera un flujo constante de conflictos individuales y colectivos que requieren asesoría especializada.`,
    "derecho-civil": `El derecho civil en ${c.nombre} cubre una amplia gama de controversias entre particulares: desde contratos incumplidos hasta disputas por bienes inmuebles y cobros de deuda. ${c.contexto.split(".")[0]}, entorno que determina el tipo de contratos y relaciones jurídicas más frecuentes en la zona.`,
    "derecho-mercantil": `Las empresas en ${c.nombre} requieren asesoría mercantil para constituirse, operar y resolver conflictos con clientes, proveedores y socios. ${c.contextoEconomico.split(".")[0]}, sectores que generan una demanda creciente de servicios jurídicos especializados en derecho de los negocios.`,
    "derecho-inmobiliario": `El mercado inmobiliario en ${c.nombre} presenta oportunidades y riesgos que solo un abogado especializado puede ayudar a gestionar adecuadamente. ${c.contexto.split(".")[0]}, factores que impactan directamente el valor y la regularización de los inmuebles en la ciudad.`,
    "derecho-fiscal": `Los contribuyentes en ${c.nombre} enfrentan obligaciones tributarias que varían según su actividad económica y el sector en que operan. ${c.contextoEconomico.split(".")[0]}, lo que implica un perfil fiscal específico que requiere planeación y defensa ante el SAT.`,
    amparo: `El juicio de amparo en ${c.nombre} es el recurso constitucional más poderoso para proteger los derechos de los ciudadanos frente a actos de autoridades locales y federales. ${c.contexto.split(".")[0]}, ciudad que cuenta con juzgados y tribunales competentes para conocer de los amparos promovidos en la región.`,
  }

  const detalleMap: Record<string, string> = {
    "derecho-familiar": `En ${c.nombre}, los procedimientos de divorcio incausado permiten disolver el matrimonio sin necesidad de expresar causa, lo que ha simplificado los procesos aunque no elimina la necesidad de asesoría para proteger el patrimonio y los intereses de los hijos. Los abogados familiares en ${c.nombre} conocen las particularidades del Código Civil de Chihuahua y la práctica de los juzgados locales, lo que representa una ventaja importante para sus clientes.`,
    "derecho-penal": `Los defensores penales en ${c.nombre} tienen experiencia en audiencias ante los Juzgados de Control y los Tribunales de Juicio Oral del estado. Conocen los criterios de los fiscales locales y los protocolos de la Fiscalía General del Estado de Chihuahua, lo que permite construir estrategias de defensa más efectivas. La representación oportuna en la audiencia inicial puede marcar la diferencia entre la prisión preventiva y la libertad durante el proceso.`,
    "derecho-laboral": `Los abogados laborales en ${c.nombre} tramitan demandas ante los Tribunales Laborales del Poder Judicial del Estado y ante la Junta Federal de Conciliación y Arbitraje para trabajadores de industrias de jurisdicción federal. La experiencia local permite identificar los acuerdos conciliatorios razonables y los casos que vale la pena llevar a juicio completo.`,
    "derecho-civil": `Los juzgados civiles en ${c.nombre} conocen de juicios ordinarios, especiales hipotecarios, desahucios y controversias sucesorias. Los abogados civiles locales conocen los tiempos procesales y la práctica judicial específica de los tribunales de Chihuahua, lo que permite estimar con mayor precisión los tiempos y costos de los procedimientos.`,
    "derecho-mercantil": `En ${c.nombre} los juicios mercantiles se tramitan ante juzgados de primera instancia con competencia mixta o especializada en materia mercantil. Los abogados del ramo conocen la práctica local de ejecución de sentencias y el registro de medidas precautorias, herramientas clave para recuperar créditos y proteger los activos de las empresas.`,
    "derecho-inmobiliario": `Los abogados inmobiliarios en ${c.nombre} coordinan los aspectos notariales, registrales y litigiosos de las operaciones con bienes raíces. Conocen el Registro Público de la Propiedad del estado, los requisitos municipales para regularización y los mecanismos de resolución de disputas de linderos y servidumbres que son propios de la región.`,
    "derecho-fiscal": `Un abogado fiscal en ${c.nombre} puede acompañarte desde la planeación preventiva hasta la defensa contenciosa ante el TFJA o los Tribunales Colegiados de Circuito en Chihuahua. La experiencia con los criterios de las autoridades fiscales locales —SAT, IMSS, INFONAVIT— es fundamental para construir argumentos sólidos y anticipar los riesgos en cada caso.`,
    amparo: `Los abogados especialistas en amparo en ${c.nombre} presentan sus demandas ante el Juzgado de Distrito en Materia Mixta o especializada con sede en la ciudad o en la zona judicial correspondiente. Conocer los criterios de los jueces y magistrados del Poder Judicial Federal en Chihuahua es indispensable para aprovechar al máximo esta herramienta constitucional.`,
  }

  const faqsMap: Record<string, Array<{ pregunta: string; respuesta: string }>> = {
    "derecho-familiar": [
      {
        pregunta: `¿Cuánto tiempo tarda un divorcio en ${c.nombre}?`,
        respuesta: `Un divorcio incausado sin hijos menores y sin bienes que dividir puede resolverse en ${c.nombre} en aproximadamente 2 a 3 meses si ambas partes están de acuerdo. Si hay controversia sobre custodia, pensión o bienes, el proceso puede extenderse entre 6 meses y más de un año. El Juzgado de lo Familiar en ${c.nombre} tiene buenos tiempos de resolución para casos no controvertidos.`,
      },
      {
        pregunta: `¿Cómo se calcula la pensión alimenticia en ${c.nombre}?`,
        respuesta: `La pensión alimenticia en ${c.nombre} se determina considerando las necesidades del acreedor alimentario y las posibilidades reales del deudor. Los jueces familiares en Chihuahua suelen establecer pensiones entre el 20% y el 40% del ingreso del deudor para un hijo, incrementándose proporcionalmente con más beneficiarios. Si el deudor trabaja de manera informal, el abogado puede solicitar pruebas de ingresos o estimaciones basadas en su nivel de vida.`,
      },
      {
        pregunta: `¿Qué pasa con la casa si me divorcio en ${c.nombre}?`,
        respuesta: `Si adquirieron la vivienda durante el matrimonio bajo sociedad conyugal, ambos tienen derecho al 50% del valor. Hay varias opciones: que uno de los cónyuges compre la parte del otro, que se venda y se dividan las ganancias, o que se acuerde el uso temporal para el cónyuge que tenga la custodia de los hijos. Un abogado familiar en ${c.nombre} puede ayudarte a negociar el convenio más conveniente para tu situación.`,
      },
    ],
    "derecho-penal": [
      {
        pregunta: `¿Qué debo hacer si me detienen en ${c.nombre}?`,
        respuesta: `Lo primero es guardar silencio y exigir la presencia de un abogado defensor antes de rendir cualquier declaración. Tienes derecho a que se informe a un familiar de tu detención. En ${c.nombre}, la audiencia de control de detención debe realizarse dentro de las 48 horas siguientes a la aprehensión. Contactar a un abogado penalista en ${c.nombre} de inmediato es crucial para proteger tus derechos desde el inicio.`,
      },
      {
        pregunta: `¿Cuánto cuesta un abogado penalista en ${c.nombre}?`,
        respuesta: `Los honorarios de un abogado penalista en ${c.nombre} varían según la complejidad del caso, el fuero (común o federal) y la etapa procesal en que se encuentre. Como referencia, la defensa en una carpeta de investigación puede iniciar desde $15,000 a $30,000 pesos, mientras que un juicio oral completo puede costar entre $50,000 y $200,000 o más. Si no puedes pagar, el Estado te asigna un defensor público gratuito.`,
      },
      {
        pregunta: `¿Qué delitos son más frecuentes en ${c.nombre}?`,
        respuesta: `Los delitos de mayor incidencia en ${c.nombre} incluyen robo en sus diversas modalidades, lesiones, violencia familiar y delitos relacionados con la propiedad. En el fuero federal destacan los delitos contra la salud y el portación de armas. Un abogado penalista con experiencia en ${c.nombre} conoce los criterios de la Fiscalía local y puede orientarte sobre las salidas alternas disponibles para cada tipo de caso.`,
      },
    ],
    "derecho-laboral": [
      {
        pregunta: `¿Puedo demandar a mi empresa en ${c.nombre} si me despidieron sin liquidación?`,
        respuesta: `Sí. Si fuiste despedido injustificadamente en ${c.nombre} y no recibiste tu liquidación completa, tienes derecho a demandar ante el Tribunal Laboral del Estado. Debes acudir primero al Centro de Conciliación Laboral para agotar la etapa prejudicial. El plazo para presentar tu demanda es de 2 años a partir del despido, aunque es recomendable actuar lo antes posible para preservar las pruebas.`,
      },
      {
        pregunta: `¿Qué prestaciones me corresponden al terminar mi relación laboral en ${c.nombre}?`,
        respuesta: `Al concluir tu relación laboral en ${c.nombre}, tienes derecho a partes proporcionales de aguinaldo (15 días de salario por año), vacaciones (mínimo 12 días el primer año, incrementando por ley), prima vacacional (25% de las vacaciones) y, si el despido fue injustificado, 3 meses de salario integrado más 20 días por año. Tu AFORE también debe actualizarse con los fondos acumulados durante tu empleo.`,
      },
      {
        pregunta: `¿Cómo funciona el Centro de Conciliación Laboral en ${c.nombre}?`,
        respuesta: `El Centro de Conciliación Laboral en Chihuahua es el organismo donde debes presentarte antes de demandar a tu empleador. El proceso es gratuito y confidencial: un conciliador facilita el diálogo entre trabajador y empresa para intentar un acuerdo. Si no se logra en el plazo establecido, el Centro emite la constancia de no conciliación que te permite presentar tu demanda ante el Tribunal Laboral. Un abogado laboral en ${c.nombre} puede acompañarte en esta etapa.`,
      },
    ],
    "derecho-civil": [
      {
        pregunta: `¿Cómo cobro una deuda que me deben en ${c.nombre}?`,
        respuesta: `Para cobrar una deuda en ${c.nombre} necesitas identificar el tipo de documento que acredita la obligación: si tienes un pagaré o letra de cambio, puedes tramitar un juicio ejecutivo mercantil rápido; si es un contrato civil sin título ejecutivo, el camino es el juicio ordinario civil. En ambos casos, un abogado civil en ${c.nombre} puede presentar la demanda ante el juzgado competente y solicitar embargo preventivo de bienes para asegurar el cobro.`,
      },
      {
        pregunta: `¿Qué es la prescripción y cómo me afecta en ${c.nombre}?`,
        respuesta: `La prescripción es el plazo máximo para exigir un derecho ante los tribunales. En materia civil en Chihuahua, la prescripción general es de 10 años para acciones personales y de 5 años para acciones derivadas de contratos. Si dejas pasar ese tiempo sin demandar, el deudor puede oponer la excepción de prescripción y quedar liberado de la obligación. Consulta a un abogado civil en ${c.nombre} lo antes posible si tienes un derecho pendiente.`,
      },
      {
        pregunta: `¿Puedo demandar a alguien por daños en ${c.nombre}?`,
        respuesta: `Sí. La responsabilidad civil extracontractual en Chihuahua permite demandar a quien te cause daños materiales o morales por su culpa o negligencia. Debes acreditar: el daño sufrido, la conducta del responsable y el nexo causal entre ambos. Los daños morales —afectación al honor, reputación o vida afectiva— también son indemnizables. Un abogado civil en ${c.nombre} puede evaluar la viabilidad de tu caso y estimar el monto de la indemnización reclamable.`,
      },
    ],
    "derecho-mercantil": [
      {
        pregunta: `¿Cómo constituyo una empresa en ${c.nombre}?`,
        respuesta: `Para constituir una empresa en ${c.nombre} debes acudir a un notario público para formalizar el acta constitutiva, inscribirla en el Registro Público de Comercio y obtener el RFC ante el SAT. Dependiendo del tipo de sociedad, el proceso puede tomar entre 1 y 4 semanas. La Sociedad por Acciones Simplificada (SAS) puede constituirse en línea en 1 día si cumples los requisitos. Un abogado mercantil en ${c.nombre} puede asesorarte sobre la mejor estructura corporativa para tu negocio.`,
      },
      {
        pregunta: `Tengo un socio que no cumple su parte en ${c.nombre}. ¿Puedo expulsarlo?`,
        respuesta: `La exclusión de un socio en México requiere que los estatutos de tu sociedad lo prevean expresamente o que exista una causa grave reconocida por la ley. En ${c.nombre} puedes iniciar un juicio mercantil para exigir el cumplimiento del convenio de socios o para disolver la sociedad si la situación lo amerita. Es recomendable contar con un buen contrato de socios desde el inicio para evitar estas disputas.`,
      },
      {
        pregunta: `¿Cómo recupero una deuda comercial en ${c.nombre}?`,
        respuesta: `Si tienes facturas impagas o contratos incumplidos en ${c.nombre}, puedes iniciar un juicio ejecutivo mercantil si el adeudo está documentado en título de crédito (pagaré, cheque, letra) o un juicio ordinario mercantil para deudas contractuales más complejas. El Juzgado Mixto de Primera Instancia en ${c.nombre} conoce de estos asuntos. Un abogado mercantil puede solicitar embargo precautorio sobre bienes del deudor desde el inicio del juicio.`,
      },
    ],
    "derecho-inmobiliario": [
      {
        pregunta: `¿Qué debo revisar antes de comprar un inmueble en ${c.nombre}?`,
        respuesta: `Antes de comprar un inmueble en ${c.nombre} debes verificar: que el vendedor sea el propietario registrado (consulta el Registro Público de la Propiedad), que no existan gravámenes (hipotecas, embargos), que el predio tenga uso de suelo compatible con tu proyecto y que los impuestos prediales estén al corriente. Un abogado inmobiliario en ${c.nombre} puede realizar toda esta revisión (due diligence) y redactar o revisar el contrato de compraventa.`,
      },
      {
        pregunta: `Mi arrendatario no paga la renta en ${c.nombre}. ¿Qué puedo hacer?`,
        respuesta: `Si tu inquilino en ${c.nombre} debe dos o más mensualidades, puedes iniciar un juicio de arrendamiento por falta de pago ante el Juzgado Civil. El proceso incluye notificar al inquilino, fijar fecha de audiencia y, si no paga ni desahoga las rentas, obtener sentencia de desocupación. El proceso completo puede tomar entre 6 y 18 meses. Asegúrate de tener contrato escrito y recibos de renta para facilitar la prueba.`,
      },
      {
        pregunta: `¿Cómo regularizo un predio sin escrituras en ${c.nombre}?`,
        respuesta: `Si posees un inmueble en ${c.nombre} sin escrituras, existen dos vías principales: la prescripción adquisitiva (usucapión) si tienes posesión pública, pacífica y de buena fe por más de 5 o 10 años según el Código Civil de Chihuahua; o el procedimiento administrativo de regularización a través de organismos como la SEDATU o el municipio si el predio está en zona urbana irregular. Un abogado inmobiliario en ${c.nombre} puede determinar cuál es la vía más viable en tu caso.`,
      },
    ],
    "derecho-fiscal": [
      {
        pregunta: `¿Qué hago si el SAT me envía una carta invitación en ${c.nombre}?`,
        respuesta: `Una carta invitación del SAT en ${c.nombre} no es una auditoría formal pero sí una señal de que la autoridad detectó inconsistencias en tus declaraciones. Debes revisarla cuidadosamente y, si corresponde, presentar declaraciones complementarias dentro del plazo indicado para evitar una revisión más profunda. Un abogado fiscal en ${c.nombre} puede ayudarte a identificar el origen de la discrepancia y preparar la respuesta o corrección adecuada.`,
      },
      {
        pregunta: `¿Cómo impugno una multa fiscal en ${c.nombre}?`,
        respuesta: `Las multas del SAT, IMSS o municipio en ${c.nombre} pueden impugnarse mediante el recurso de revocación (30 días hábiles) o el juicio de nulidad ante el TFJA (45 días hábiles desde la notificación). Si la multa tiene errores formales o fue emitida sin fundamentación suficiente, tiene posibilidades reales de anularse. No ignores las notificaciones: el tiempo para impugnar es breve y dejarlas firmes puede resultar en embargo de cuentas.`,
      },
      {
        pregunta: `¿Necesito un abogado fiscal o un contador en ${c.nombre}?`,
        respuesta: `Ambos perfiles son complementarios. El contador en ${c.nombre} lleva tu contabilidad, presenta declaraciones y te asesora en planeación tributaria. El abogado fiscal actúa cuando hay un conflicto con la autoridad: auditorías, créditos fiscales, multas o recursos legales. En controversias complejas, lo ideal es contar con ambos trabajando coordinadamente. Muchos despachos en ${c.nombre} ofrecen servicios integrales contable-jurídicos.`,
      },
    ],
    amparo: [
      {
        pregunta: `¿Cuándo procede el amparo en ${c.nombre}?`,
        respuesta: `El amparo procede en ${c.nombre} cuando un acto de autoridad —ya sea del gobierno municipal, estatal o federal— viola tus derechos fundamentales o garantías constitucionales. Los casos más comunes incluyen: amparo contra autos de vinculación a proceso, amparo contra actos de la SHCP o SAT, contra resoluciones judiciales y contra reglamentos o leyes inconstitucionales. Un abogado especialista en amparo en ${c.nombre} puede evaluar si tu caso tiene viabilidad constitucional.`,
      },
      {
        pregunta: `¿Cuánto tiempo tengo para presentar un amparo en ${c.nombre}?`,
        respuesta: `El plazo general para presentar un amparo en ${c.nombre} es de 15 días hábiles desde que fue notificado el acto reclamado. Existen plazos especiales: 7 días para actos en materia agraria, 8 años para amparo contra actos que afectan núcleos ejidales, y en materia penal el amparo contra actos que impliquen privación de libertad no tiene plazo fijo. Es crucial actuar pronto: un día de retraso puede hacer improcedente el juicio de amparo.`,
      },
      {
        pregunta: `¿El amparo puede detener un embargo del SAT en ${c.nombre}?`,
        respuesta: `Sí. El amparo indirecto con solicitud de suspensión del acto reclamado puede detener la ejecución de un embargo del SAT en ${c.nombre} mientras se resuelve el fondo del asunto. La suspensión se otorga si acreditas que el acto te causa daños de difícil reparación y que no se afecta el interés social. El juzgado de distrito en ${c.nombre} puede otorgar la suspensión provisional dentro de las 24 horas siguientes a la presentación de la demanda de amparo.`,
      },
    ],
  }

  return {
    intro: introMap[especSlug] ?? `Encuentra abogados de ${e.nombre} en ${c.nombre}.`,
    detalle: detalleMap[especSlug] ?? `Los abogados de ${e.nombre} en ${c.nombre} están listos para atender tu caso.`,
    faqs: faqsMap[especSlug] ?? [],
  }
}

export function getComboContent(ciudadSlug: string, especSlug: string): ComboContent {
  const key: ComboKey = `${ciudadSlug}|${especSlug}`
  if (COMBO_OVERRIDES[key]) {
    return COMBO_OVERRIDES[key]!
  }
  return buildComboContent(ciudadSlug, especSlug)
}
