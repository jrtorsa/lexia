import type { Metadata } from "next"
import Link from "next/link"
import { POSTS } from "@/lib/blog-posts"
import { Clock, Calendar, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Blog Legal — Guías sobre tus derechos | Lexia",
  description:
    "Artículos y guías prácticas sobre derecho laboral, familiar, penal y civil en México. Escrito por expertos legales.",
}

const CATEGORIES = [
  "Todos",
  "Derecho Laboral",
  "Derecho Familiar",
  "Derecho Penal",
  "Derecho Civil",
  "Amparo",
  "Derecho de Tránsito",
  "Derecho Mercantil",
]

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#FAF7F2]">
      {/* Hero header */}
      <section
        className="relative py-20 px-6 lg:px-8 overflow-hidden"
        style={{ background: "linear-gradient(160deg, #0C0D10 0%, #1A1C26 100%)" }}
      >
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,1) 40px, rgba(255,255,255,1) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,1) 40px, rgba(255,255,255,1) 41px)",
          }}
        />

        <div className="relative max-w-7xl mx-auto text-center">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-10 bg-[#C49A3C]/50" />
            <span className="text-[#C49A3C] text-xs font-semibold tracking-widest uppercase">
              Guías Legales
            </span>
            <span className="h-px w-10 bg-[#C49A3C]/50" />
          </div>

          <h1
            className="text-5xl md:text-6xl font-light text-[#FAF7F2] mb-5 leading-none"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Blog Legal
          </h1>
          <p className="text-lg text-[#FAF7F2]/55 max-w-xl mx-auto leading-relaxed">
            Guías prácticas sobre tus derechos en México, escritas por abogados verificados.
          </p>

          {/* Stats row */}
          <div className="flex items-center justify-center gap-8 mt-10 text-sm text-[#FAF7F2]/40">
            <span>
              <strong className="text-[#C49A3C] text-lg font-semibold">{POSTS.length}</strong>{" "}
              artículos
            </span>
            <span className="h-4 w-px bg-white/10" />
            <span>
              <strong className="text-[#C49A3C] text-lg font-semibold">7</strong> áreas del derecho
            </span>
            <span className="h-4 w-px bg-white/10" />
            <span>En español</span>
          </div>
        </div>
      </section>

      {/* Category filter pills */}
      <section className="bg-white border-b border-[#EAE4D9] sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat}
                className={`flex-none text-xs font-medium px-4 py-2 rounded-full transition-colors whitespace-nowrap ${
                  i === 0
                    ? "bg-[#0C0D10] text-[#FAF7F2]"
                    : "bg-[#FAF7F2] text-[#0C0D10]/60 border border-[#EAE4D9] hover:border-[#C49A3C]/40 hover:text-[#0C0D10]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Article grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white border border-[#EAE4D9] rounded-xl overflow-hidden hover:border-[#C49A3C]/40 hover:shadow-lg hover:shadow-black/5 transition-all duration-300 flex flex-col"
            >
              {/* Card header band */}
              <div
                className="h-1.5 w-full"
                style={{ background: "linear-gradient(90deg, #C49A3C 0%, #E2B865 100%)" }}
              />

              <div className="p-6 flex flex-col flex-1">
                {/* Category badge */}
                <div className="mb-4">
                  <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-[#C49A3C] bg-[#C49A3C]/8 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>

                {/* Title */}
                <h2
                  className="text-xl font-light text-[#0C0D10] leading-snug mb-3 group-hover:text-[#1A1C26] transition-colors"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-sm text-slate-500 leading-relaxed flex-1 mb-5">
                  {post.excerpt}
                </p>

                {/* Meta row */}
                <div className="flex items-center justify-between pt-4 border-t border-[#EAE4D9]">
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readingTime} min
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(post.publishedAt)}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-[#C49A3C] flex items-center gap-1 group-hover:gap-2 transition-all">
                    Leer
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom CTA banner */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-16">
        <div
          className="rounded-2xl p-10 text-center border border-[rgba(196,154,60,0.3)]"
          style={{ background: "linear-gradient(160deg, #0C0D10 0%, #1A1C26 100%)" }}
        >
          <h2
            className="text-3xl font-light text-[#FAF7F2] mb-3"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            ¿Tienes una situación legal?
          </h2>
          <p className="text-[#FAF7F2]/55 text-sm mb-8 max-w-lg mx-auto">
            Leer es el primer paso. El siguiente es hablar con un abogado verificado que conozca tu
            caso específico.
          </p>
          <Link
            href="/abogados"
            className="inline-flex items-center gap-2 bg-[#C49A3C] hover:bg-[#E2B865] text-[#0C0D10] font-semibold px-8 py-3 rounded-lg transition-colors text-sm"
          >
            Encontrar un abogado
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}
