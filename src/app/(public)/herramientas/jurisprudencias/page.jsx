import JurisprudenciasSearch from './JurisprudenciasSearch'

export const metadata = {
  title: 'Buscador de Jurisprudencias SCJN | Lexia',
  description:
    'Busca tesis y jurisprudencias de la Suprema Corte de Justicia de la Nación directamente desde Lexia. Filtra por materia, tipo y época.',
}

export default function JurisprudenciasPage() {
  return <JurisprudenciasSearch />
}
