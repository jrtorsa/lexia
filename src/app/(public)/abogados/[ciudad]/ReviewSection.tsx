"use client"
import { useState } from "react"
import { crearResena } from "@/app/actions/crearResena"
import { Star } from "lucide-react"

interface Review {
  id: string
  userId: string | null
  rating: number
  comment: string
  createdAt: Date
}

interface ReviewSectionProps {
  lawyerId: string
  reviews: Review[]
}

const df = { fontFamily: "var(--font-cormorant)" }

export default function ReviewSection({ lawyerId, reviews: initialReviews }: ReviewSectionProps) {
  const [reviews, setReviews] = useState(initialReviews)
  const [nombre, setNombre] = useState("")
  const [rating, setRating] = useState(0)
  const [hovered, setHovered] = useState(0)
  const [comment, setComment] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)
    const result = await crearResena({ lawyerId, nombre, rating, comment })
    setLoading(false)
    if (result.error) {
      setError(result.error)
    } else {
      setReviews((prev) => [
        { id: crypto.randomUUID(), userId: nombre, rating, comment, createdAt: new Date() },
        ...prev,
      ])
      setNombre("")
      setRating(0)
      setComment("")
      setSuccess(true)
      setTimeout(() => setSuccess(false), 4000)
    }
  }

  return (
    <div className="bg-white border border-[#EAE4D9] rounded-2xl p-6 space-y-6">
      {/* Lista de reseñas */}
      {reviews.length > 0 && (
        <div>
          <h2 className="text-lg text-[#0C0D10] mb-5" style={df}>
            Reseñas ({reviews.length})
          </h2>
          <div className="space-y-5">
            {reviews.map((r, i) => (
              <div key={r.id}>
                {i > 0 && <div className="h-px bg-[#EAE4D9] mb-5" />}
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-medium text-[#0C0D10] text-sm">{r.userId ?? "Anónimo"}</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star
                        key={n}
                        className={`w-3.5 h-3.5 ${
                          n <= r.rating ? "fill-amber-400 text-amber-400" : "text-[#EAE4D9] fill-[#EAE4D9]"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-[#0C0D10]/55 text-sm leading-relaxed">{r.comment}</p>
                <p className="text-[#0C0D10]/30 text-xs mt-1.5">
                  {new Date(r.createdAt).toLocaleDateString("es-MX", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            ))}
          </div>
          <div className="h-px bg-[#EAE4D9] mt-6" />
        </div>
      )}

      {/* Formulario */}
      <div>
        <h2 className="text-lg text-[#0C0D10] mb-5" style={df}>
          {reviews.length === 0 ? "Sé el primero en opinar" : "Dejar una reseña"}
        </h2>

        {success ? (
          <div className="bg-[#FAF7F2] border border-[#EAE4D9] rounded-xl p-5 text-center">
            <p className="text-sm font-medium text-[#0C0D10]">¡Gracias por tu reseña!</p>
            <p className="text-xs text-[#0C0D10]/50 mt-1">Tu opinión ha sido publicada.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
                {error}
              </p>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5">Nombre *</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                placeholder="Tu nombre"
                className="w-full border border-[#EAE4D9] rounded-xl px-3.5 py-2.5 text-sm text-[#0C0D10] placeholder-slate-300 focus:outline-none focus:border-[#C49A3C] transition-colors bg-[#FAF7F2]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5">Calificación *</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setRating(n)}
                    onMouseEnter={() => setHovered(n)}
                    onMouseLeave={() => setHovered(0)}
                    className="p-0.5"
                  >
                    <Star
                      className={`w-6 h-6 transition-colors ${
                        n <= (hovered || rating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-[#EAE4D9] fill-[#EAE4D9]"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5">Comentario *</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                minLength={10}
                rows={4}
                placeholder="Describe tu experiencia con este abogado..."
                className="w-full border border-[#EAE4D9] rounded-xl px-3.5 py-2.5 text-sm text-[#0C0D10] placeholder-slate-300 focus:outline-none focus:border-[#C49A3C] transition-colors bg-[#FAF7F2] resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading || rating === 0}
              className="w-full bg-[#C49A3C] hover:bg-[#E2B865] disabled:opacity-50 text-[#0C0D10] font-semibold text-sm py-2.5 rounded-xl transition-colors"
            >
              {loading ? "Publicando..." : "Publicar reseña"}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
