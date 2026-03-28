import Link from "next/link"
import { MapPin, Star, ShieldCheck, MessageCircle, Phone, ArrowUpRight } from "lucide-react"
import { type Lawyer, getAverageRating } from "@/lib/mock-lawyers"

const displayFont = { fontFamily: "var(--font-cormorant)" }

export default function LawyerCard({ lawyer }: { lawyer: Lawyer }) {
  const avg = getAverageRating(lawyer)
  const primarySpecialty = lawyer.specialties.find((s) => s.isPrimary) ?? lawyer.specialties[0]
  const initials = lawyer.name
    .replace(/^Lic\.\s*/i, "")
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")

  const isPremium = lawyer.membership === "premium" || lawyer.membership === "despacho"

  return (
    <div
      className={`bg-white rounded-2xl flex flex-col transition-all hover:shadow-md hover:-translate-y-0.5 ${
        isPremium
          ? "border border-[rgba(196,154,60,0.4)] border-l-[3px] border-l-[#C49A3C]"
          : "border border-[#EAE4D9]"
      }`}
    >
      {/* Premium badge */}
      {isPremium && (
        <div className="px-5 pt-3.5 pb-0 flex justify-end">
          <span className="text-[10px] font-semibold tracking-widest uppercase text-[#C49A3C] bg-[rgba(196,154,60,0.08)] px-2 py-0.5 rounded-full">
            Destacado
          </span>
        </div>
      )}

      <div className={`p-5 flex flex-col gap-4 flex-1 ${isPremium ? "pt-2.5" : ""}`}>
        {/* Header */}
        <div className="flex gap-3.5 items-start">
          {/* Avatar */}
          <div className="w-13 h-13 rounded-xl bg-[#FAF7F2] border border-[#EAE4D9] flex items-center justify-center flex-shrink-0">
            <span
              className="text-xl font-semibold text-[#C49A3C]"
              style={displayFont}
            >
              {initials}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="font-semibold text-[#0C0D10] text-sm leading-snug">{lawyer.name}</h3>
              {lawyer.isVerified && (
                <ShieldCheck className="w-3.5 h-3.5 text-[#C49A3C] flex-shrink-0" aria-label="Cédula verificada" />
              )}
            </div>

            {primarySpecialty && (
              <p className="text-[#C49A3C] text-xs font-medium mt-0.5">{primarySpecialty.name}</p>
            )}

            <div className="flex items-center gap-1 mt-1 text-[#0C0D10]/45 text-xs">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              <span>{lawyer.city}, {lawyer.state}</span>
            </div>
          </div>

          {/* Rating */}
          {lawyer.reviews.length > 0 && (
            <div className="text-right flex-shrink-0">
              <div className="flex items-center gap-0.5 text-amber-500 justify-end">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span className="font-semibold text-[#0C0D10] text-xs">{avg.toFixed(1)}</span>
              </div>
              <p className="text-[#0C0D10]/35 text-[11px] mt-0.5">
                {lawyer.reviews.length} reseña{lawyer.reviews.length !== 1 ? "s" : ""}
              </p>
            </div>
          )}
        </div>

        {/* Bio */}
        <p className="text-[#0C0D10]/50 text-xs leading-relaxed line-clamp-2">{lawyer.bio}</p>

        {/* Specialties + experience */}
        <div className="flex flex-wrap gap-1.5 items-center">
          {lawyer.specialties.map((s) => (
            <span
              key={s.slug}
              className={`text-[11px] px-2 py-0.5 rounded-full ${
                s.isPrimary
                  ? "bg-[rgba(196,154,60,0.12)] text-[#C49A3C] font-medium"
                  : "bg-[#F5F0E8] text-[#0C0D10]/50"
              }`}
            >
              {s.name}
            </span>
          ))}
          <span className="text-[11px] text-[#0C0D10]/35 ml-auto">
            {lawyer.yearsExperience} años
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-3 border-t border-[#EAE4D9] mt-auto">
          <Link href={`/abogados/${lawyer.slug}`} className="flex-1">
            <button className="w-full border border-[#EAE4D9] text-[#0C0D10] text-xs font-medium py-2 px-3 rounded-lg hover:border-[#C49A3C] hover:text-[#C49A3C] transition-colors flex items-center justify-center gap-1.5">
              Ver perfil
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </Link>

          {lawyer.whatsapp ? (
            <a
              href={`https://wa.me/${lawyer.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <button className="w-full bg-[#22C55E]/10 border border-[#22C55E]/25 text-[#16A34A] hover:bg-[#22C55E]/20 text-xs font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-1.5">
                <MessageCircle className="w-3 h-3" />
                WhatsApp
              </button>
            </a>
          ) : lawyer.phone ? (
            <a href={`tel:${lawyer.phone}`} className="flex-1">
              <button className="w-full bg-[#C49A3C]/8 border border-[#C49A3C]/25 text-[#C49A3C] hover:bg-[#C49A3C]/15 text-xs font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-1.5">
                <Phone className="w-3 h-3" />
                Llamar
              </button>
            </a>
          ) : null}
        </div>
      </div>
    </div>
  )
}
