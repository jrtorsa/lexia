import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import JurisprudenciasSearch from './JurisprudenciasSearch'

export const metadata = {
  title: 'Buscador de Jurisprudencias SCJN | Lexia',
  description:
    'Busca tesis y jurisprudencias de la Suprema Corte de Justicia de la Nación directamente desde Lexia. Filtra por materia, tipo y época.',
}

export default async function JurisprudenciasPage() {
  // Los abogados registrados no tienen el contador de búsquedas gratis de
  // localStorage (solo aplica a anónimos) — la protección real contra abuso
  // sigue siendo el rate limit por IP del lado del servidor, para todos.
  const session = await getServerSession(authOptions)
  return <JurisprudenciasSearch isLoggedIn={!!session} />
}
