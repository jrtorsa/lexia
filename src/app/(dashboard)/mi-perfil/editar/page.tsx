"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getLawyerBySlug } from "@/lib/mock-lawyers"

const MOCK = getLawyerBySlug("maria-fernanda-torres")!

const ESPECIALIDADES = [
  "Derecho Familiar", "Derecho Penal", "Derecho Laboral", "Derecho Fiscal",
  "Derecho Civil", "Derecho Inmobiliario", "Derecho Mercantil", "Amparo",
  "Derecho Migratorio", "Propiedad Intelectual",
]

const ESTADOS_MX = [
  "Aguascalientes", "Baja California", "Baja California Sur", "Campeche",
  "Chiapas", "Chihuahua", "Ciudad de México", "Coahuila", "Colima",
  "Durango", "Guanajuato", "Guerrero", "Hidalgo", "Jalisco", "México",
  "Michoacán", "Morelos", "Nayarit", "Nuevo León", "Oaxaca", "Puebla",
  "Querétaro", "Quintana Roo", "San Luis Potosí", "Sinaloa", "Sonora",
  "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz", "Yucatán", "Zacatecas",
]

export default function EditarPerfilPage() {
  const [saved, setSaved] = useState(false)
  const [specialties, setSpecialties] = useState<string[]>(
    MOCK.specialties.map((s) => s.name)
  )

  function toggleSpec(name: string) {
    setSpecialties((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    )
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Editar perfil</h1>
        <p className="text-slate-500 mt-1">Los cambios se reflejan en el directorio inmediatamente.</p>
      </div>

      <Tabs defaultValue="info">
        <TabsList className="mb-6">
          <TabsTrigger value="info">Información</TabsTrigger>
          <TabsTrigger value="especialidades">Especialidades</TabsTrigger>
          <TabsTrigger value="contacto">Contacto</TabsTrigger>
        </TabsList>

        <form onSubmit={handleSave}>
          {/* ── Información personal ── */}
          <TabsContent value="info" className="space-y-5">
            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
              <div>
                <Label htmlFor="name">Nombre completo</Label>
                <Input id="name" defaultValue={MOCK.name} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="bio">Descripción profesional</Label>
                <Textarea id="bio" defaultValue={MOCK.bio} rows={5} className="mt-1" />
                <p className="text-xs text-slate-400 mt-1">
                  Esta descripción aparece en tu perfil público. Sé concreto sobre tus servicios.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cedula">Cédula profesional SEP</Label>
                  <Input id="cedula" defaultValue={MOCK.cedula ?? ""} className="mt-1" placeholder="1234567" />
                </div>
                <div>
                  <Label htmlFor="yearsExp">Años de experiencia</Label>
                  <Input id="yearsExp" type="number" min="0" defaultValue={MOCK.yearsExperience} className="mt-1" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="university">Universidad</Label>
                  <Input id="university" defaultValue={MOCK.university ?? ""} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="gradYear">Año de egreso</Label>
                  <Input id="gradYear" type="number" defaultValue={MOCK.graduationYear ?? ""} className="mt-1" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="state">Estado</Label>
                  <select
                    id="state"
                    defaultValue={MOCK.state}
                    className="mt-1 w-full border border-input rounded-md px-3 py-2 text-sm bg-background"
                  >
                    {ESTADOS_MX.map((e) => <option key={e}>{e}</option>)}
                  </select>
                </div>
                <div>
                  <Label htmlFor="city">Ciudad</Label>
                  <Input id="city" defaultValue={MOCK.city} className="mt-1" />
                </div>
              </div>
            </div>

            <SaveButton saved={saved} />
          </TabsContent>

          {/* ── Especialidades ── */}
          <TabsContent value="especialidades" className="space-y-5">
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <p className="text-sm text-slate-500 mb-4">
                La primera especialidad seleccionada aparece como la principal en tu perfil.
              </p>
              <div className="flex flex-wrap gap-2">
                {ESPECIALIDADES.map((esp) => {
                  const selected = specialties.includes(esp)
                  return (
                    <button
                      key={esp}
                      type="button"
                      onClick={() => toggleSpec(esp)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                        selected
                          ? "bg-blue-700 border-blue-700 text-white"
                          : "bg-white border-slate-300 text-slate-600 hover:border-blue-400"
                      }`}
                    >
                      {selected && <Check className="w-3 h-3 inline mr-1" />}
                      {esp}
                    </button>
                  )
                })}
              </div>
              {specialties.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <p className="text-sm text-slate-500">
                    Principal: <span className="font-semibold text-blue-700">{specialties[0]}</span>
                  </p>
                </div>
              )}
            </div>

            <SaveButton saved={saved} />
          </TabsContent>

          {/* ── Contacto ── */}
          <TabsContent value="contacto" className="space-y-5">
            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input id="phone" defaultValue={MOCK.phone ?? ""} placeholder="+52 55 1234 5678" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="whatsapp">WhatsApp</Label>
                  <Input id="whatsapp" defaultValue={MOCK.whatsapp ?? ""} placeholder="5215512345678" className="mt-1" />
                  <p className="text-xs text-slate-400 mt-1">Formato: 52 + LADA + número (sin espacios)</p>
                </div>
              </div>
              <div>
                <Label htmlFor="website">Sitio web</Label>
                <Input id="website" defaultValue={MOCK.website ?? ""} placeholder="mifirma.mx" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input id="linkedin" defaultValue={MOCK.linkedin ?? ""} placeholder="linkedin.com/in/tu-perfil" className="mt-1" />
              </div>
            </div>

            <SaveButton saved={saved} />
          </TabsContent>
        </form>
      </Tabs>
    </div>
  )
}

function SaveButton({ saved }: { saved: boolean }) {
  return (
    <Button
      type="submit"
      className={`transition-colors ${saved ? "bg-green-600 hover:bg-green-600" : "bg-blue-700 hover:bg-blue-800"} text-white`}
    >
      {saved ? (
        <><Check className="w-4 h-4 mr-2" /> Guardado</>
      ) : (
        "Guardar cambios"
      )}
    </Button>
  )
}
