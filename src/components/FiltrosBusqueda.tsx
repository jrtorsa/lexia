"use client"

export default function FiltrosBusqueda() {
  return (
    <div className="flex gap-4 flex-wrap">
      <input
        type="text"
        placeholder="Buscar abogado..."
        className="border rounded px-3 py-2 text-sm"
      />
      <select className="border rounded px-3 py-2 text-sm">
        <option value="">Especialidad</option>
        <option value="civil">Civil</option>
        <option value="penal">Penal</option>
        <option value="laboral">Laboral</option>
        <option value="fiscal">Fiscal</option>
      </select>
      <select className="border rounded px-3 py-2 text-sm">
        <option value="">Ciudad</option>
        <option value="cdmx">Ciudad de México</option>
        <option value="guadalajara">Guadalajara</option>
        <option value="monterrey">Monterrey</option>
      </select>
    </div>
  )
}
