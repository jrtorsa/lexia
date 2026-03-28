"use client"

import { MessageCircle, Phone, Mail } from "lucide-react"
import { registrarContacto, type ContactType } from "@/app/actions/registrarContacto"
import { toast } from "@/lib/toast"

interface Props {
  lawyerId: string
  lawyerName: string
  type: ContactType
  href: string
  label: string
  variant?: "whatsapp" | "phone" | "email"
  className?: string
}

export default function ContactButton({
  lawyerId,
  lawyerName,
  type,
  href,
  label,
  variant = "whatsapp",
  className,
}: Props) {
  async function handleClick() {
    await registrarContacto(lawyerId, type)
    const messages: Record<ContactType, string> = {
      WHATSAPP: `Conectando con ${lawyerName} por WhatsApp…`,
      CALL:     `Llamando a ${lawyerName}…`,
      EMAIL:    `Abriendo correo para ${lawyerName}…`,
      MESSAGE:  `Mensaje enviado a ${lawyerName}.`,
    }
    toast(messages[type], "success")
  }

  const Icon =
    variant === "whatsapp" ? MessageCircle :
    variant === "phone"    ? Phone :
    Mail

  const baseClass =
    variant === "whatsapp"
      ? "bg-[#22C55E]/10 border border-[#22C55E]/25 text-[#16A34A] hover:bg-[#22C55E]/20"
      : variant === "phone"
        ? "border border-[#EAE4D9] text-[#0C0D10]/70 hover:border-[#C49A3C] hover:text-[#C49A3C]"
        : "border border-[#EAE4D9] text-[#0C0D10]/70 hover:border-[#C49A3C] hover:text-[#C49A3C]"

  return (
    <a
      href={href}
      target={type !== "CALL" ? "_blank" : undefined}
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`flex items-center justify-center gap-2 font-medium transition-colors ${baseClass} ${className ?? ""}`}
    >
      <Icon className="w-4 h-4 flex-shrink-0" />
      {label}
    </a>
  )
}
