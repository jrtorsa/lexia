interface AbogadoCardProps {
  nombre: string
  especialidad: string
  ciudad: string
  slug: string
}

export default function AbogadoCard({ nombre, especialidad, ciudad, slug }: AbogadoCardProps) {
  return (
    <div className="border rounded-lg p-4">
      <h2 className="font-bold text-lg">{nombre}</h2>
      <p className="text-sm text-gray-600">{especialidad}</p>
      <p className="text-sm text-gray-500">{ciudad}</p>
      <a href={`/abogados/${slug}`} className="text-blue-600 hover:underline text-sm mt-2 block">
        Ver perfil
      </a>
    </div>
  )
}
