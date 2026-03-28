export const maxDuration = 30

import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import EditarForm from "./EditarForm"
import VerificarCedulaCard from "@/components/VerificarCedulaCard"
import FotoPerfilUpload from "@/components/FotoPerfilUpload"

export default async function EditarPerfilPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/login")

  const lawyer = await prisma.lawyer.findUnique({
    where: { id: session.user.id },
    include: {
      specialties: { include: { specialty: true } },
    },
  })

  if (!lawyer) redirect("/login")

  const data = {
    name: lawyer.name,
    bio: lawyer.bio,
    cedula: lawyer.cedula,
    yearsExperience: lawyer.yearsExperience,
    university: lawyer.university,
    graduationYear: lawyer.graduationYear,
    state: lawyer.state,
    city: lawyer.city,
    phone: lawyer.phone,
    whatsapp: lawyer.whatsapp,
    website: lawyer.website,
    linkedin: lawyer.linkedin,
    specialtyNames: lawyer.specialties.map((ls) => ls.specialty.name),
  }

  return (
    <div className="p-8 max-w-3xl space-y-6">
      <FotoPerfilUpload
        nombre={lawyer.name}
        photoUrl={lawyer.photoUrl}
      />
      <VerificarCedulaCard
        cedulaActual={lawyer.cedula}
        isVerified={lawyer.isVerified}
        cedulaStatus={lawyer.cedulaStatus}
      />
      <EditarForm lawyer={data} />
    </div>
  )
}
