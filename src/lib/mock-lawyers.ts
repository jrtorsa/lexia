export type Lawyer = {
  id: string
  name: string
  slug: string
  photoUrl: string | null
  city: string
  state: string
  bio: string
  yearsExperience: number
  isVerified: boolean
  cedula: string | null
  university: string | null
  graduationYear: number | null
  phone: string | null
  whatsapp: string | null
  website: string | null
  linkedin: string | null
  specialties: { name: string; slug: string; isPrimary: boolean }[]
  reviews: { rating: number; comment: string | null; autorNombre: string }[]
  membership: "free" | "premium" | "despacho"
}

export const LAWYERS: Lawyer[] = [
  {
    id: "1",
    name: "Lic. María Fernanda Torres",
    slug: "maria-fernanda-torres",
    photoUrl: null,
    city: "Ciudad de México",
    state: "CDMX",
    bio: "Abogada especialista en derecho familiar con más de 12 años de experiencia. Me he dedicado a acompañar a familias en procesos de divorcio, custodia y adopciones, siempre buscando soluciones que prioricen el bienestar de todas las partes involucradas.",
    yearsExperience: 12,
    isVerified: true,
    cedula: "7894521",
    university: "UNAM",
    graduationYear: 2012,
    phone: "+52 55 1234 5678",
    whatsapp: "5215512345678",
    website: null,
    linkedin: "linkedin.com/in/mftorres",
    specialties: [
      { name: "Derecho Familiar", slug: "familiar", isPrimary: true },
      { name: "Derecho Civil", slug: "civil", isPrimary: false },
    ],
    reviews: [
      { rating: 5, comment: "Excelente abogada, muy profesional y empática.", autorNombre: "Carlos R." },
      { rating: 5, comment: "Resolvió mi caso de divorcio en tiempo récord.", autorNombre: "Ana L." },
      { rating: 4, comment: "Muy buena atención, totalmente recomendada.", autorNombre: "Pedro M." },
    ],
    membership: "premium",
  },
  {
    id: "2",
    name: "Lic. Roberto Sánchez Vega",
    slug: "roberto-sanchez-vega",
    photoUrl: null,
    city: "Guadalajara",
    state: "Jalisco",
    bio: "Defensor penal con trayectoria en casos de alto perfil. Especializado en delitos fiscales, fraude empresarial y defensa en juicio oral. Más de 15 años litigando en tribunales federales.",
    yearsExperience: 15,
    isVerified: true,
    cedula: "4521789",
    university: "Universidad de Guadalajara",
    graduationYear: 2009,
    phone: "+52 33 9876 5432",
    whatsapp: "5213398765432",
    website: "sanchez-vega.mx",
    linkedin: null,
    specialties: [
      { name: "Derecho Penal", slug: "penal", isPrimary: true },
      { name: "Amparo", slug: "amparo", isPrimary: false },
    ],
    reviews: [
      { rating: 5, comment: "El mejor penalista que he conocido.", autorNombre: "Empresa XYZ" },
      { rating: 4, comment: "Muy profesional, resolvió nuestro caso.", autorNombre: "Familia Gómez" },
    ],
    membership: "premium",
  },
  {
    id: "3",
    name: "Lic. Claudia Ramírez Ortiz",
    slug: "claudia-ramirez-ortiz",
    photoUrl: null,
    city: "Monterrey",
    state: "Nuevo León",
    bio: "Especialista en derecho laboral y seguridad social. Asesoro tanto a trabajadores como a empresas en controversias laborales, despidos injustificados y cumplimiento de la Reforma Laboral 2019.",
    yearsExperience: 8,
    isVerified: true,
    cedula: "9632587",
    university: "UANL",
    graduationYear: 2016,
    phone: "+52 81 5555 1111",
    whatsapp: "5218155551111",
    website: null,
    linkedin: "linkedin.com/in/claudia-ramirez",
    specialties: [
      { name: "Derecho Laboral", slug: "laboral", isPrimary: true },
    ],
    reviews: [
      { rating: 5, comment: "Gané mi demanda laboral gracias a ella.", autorNombre: "Juan P." },
      { rating: 5, comment: "Muy clara al explicar el proceso.", autorNombre: "Laura S." },
      { rating: 5, comment: "Excelente servicio y precio justo.", autorNombre: "Marco A." },
    ],
    membership: "premium",
  },
  {
    id: "4",
    name: "Lic. Alejandro Morales",
    slug: "alejandro-morales",
    photoUrl: null,
    city: "Puebla",
    state: "Puebla",
    bio: "Contador público y abogado fiscal. Defensa ante el SAT, devoluciones de IVA, recursos de revocación y amparos fiscales. Atiendo a personas físicas y morales.",
    yearsExperience: 10,
    isVerified: false,
    cedula: null,
    university: "BUAP",
    graduationYear: 2014,
    phone: "+52 22 2222 3333",
    whatsapp: null,
    website: "morales-fiscal.mx",
    linkedin: null,
    specialties: [
      { name: "Derecho Fiscal", slug: "fiscal", isPrimary: true },
      { name: "Derecho Mercantil", slug: "mercantil", isPrimary: false },
    ],
    reviews: [
      { rating: 4, comment: "Muy buen manejo de mi situación fiscal.", autorNombre: "Empresa ABC" },
    ],
    membership: "free",
  },
  {
    id: "5",
    name: "Lic. Sofía Delgado Reyes",
    slug: "sofia-delgado-reyes",
    photoUrl: null,
    city: "Ciudad de México",
    state: "CDMX",
    bio: "Abogada inmobiliaria con amplia experiencia en compraventas, arrendamientos comerciales, due diligence y regularización de propiedades. Atiendo a desarrolladores, empresas e inversores.",
    yearsExperience: 7,
    isVerified: true,
    cedula: "1478523",
    university: "Iberoamericana",
    graduationYear: 2017,
    phone: "+52 55 8888 9999",
    whatsapp: "5215588889999",
    website: null,
    linkedin: "linkedin.com/in/sofia-delgado",
    specialties: [
      { name: "Derecho Inmobiliario", slug: "inmobiliario", isPrimary: true },
      { name: "Derecho Civil", slug: "civil", isPrimary: false },
      { name: "Derecho Mercantil", slug: "mercantil", isPrimary: false },
    ],
    reviews: [
      { rating: 5, comment: "Cerró nuestra compraventa sin contratiempos.", autorNombre: "Familia Herrera" },
      { rating: 4, comment: "Muy diligente y conocedora del tema.", autorNombre: "Inversiones Norte" },
    ],
    membership: "premium",
  },
  {
    id: "6",
    name: "Lic. Humberto Jiménez",
    slug: "humberto-jimenez",
    photoUrl: null,
    city: "Tijuana",
    state: "Baja California",
    bio: "Especialista en derecho migratorio y amparo. Trámites de visa, residencia permanente, naturalización y defensa en procesos de deportación ante el INM.",
    yearsExperience: 9,
    isVerified: false,
    cedula: null,
    university: "UABC",
    graduationYear: 2015,
    phone: "+52 66 4444 5555",
    whatsapp: "5216644445555",
    website: null,
    linkedin: null,
    specialties: [
      { name: "Amparo", slug: "amparo", isPrimary: true },
      { name: "Derecho Civil", slug: "civil", isPrimary: false },
    ],
    reviews: [],
    membership: "free",
  },
]

export function getLawyerBySlug(slug: string): Lawyer | undefined {
  return LAWYERS.find((l) => l.slug === slug)
}

export function getAverageRating(lawyer: Lawyer): number {
  if (lawyer.reviews.length === 0) return 0
  return lawyer.reviews.reduce((acc, r) => acc + r.rating, 0) / lawyer.reviews.length
}
