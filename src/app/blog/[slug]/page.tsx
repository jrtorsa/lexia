import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { getAllPosts, getPostBySlug, getAllSlugs } from "@/lib/blog"
import { Clock, Calendar, ChevronRight, ArrowRight, BookOpen } from "lucide-react"

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: "Artículo no encontrado | Lexia" }

  return {
    title: post.meta_title,
    description: post.meta_description,
    openGraph: {
      title: post.meta_title,
      description: post.meta_description,
      type: "article",
      publishedTime: post.published_at,
      url: `https://lexiamx.com/blog/${post.slug}`,
      siteName: "Lexia",
      images: [`https://lexiamx.com/api/og?title=${encodeURIComponent(post.meta_title)}`],
    },
    twitter: {
      card: "summary_large_image",
      title: post.meta_title,
      description: post.meta_description,
    },
  }
}

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) notFound()

  // Artículos relacionados desde Supabase
  const allPosts = await getAllPosts()
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 3)

  const otherPosts =
    relatedPosts.length < 3
      ? [
          ...relatedPosts,
          ...allPosts
            .filter((p) => p.slug !== slug && !relatedPosts.some((r) => r.slug === p.slug))
            .slice(0, 3 - relatedPosts.length),
        ]
      : relatedPosts

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.meta_description,
    datePublished: post.published_at,
    dateModified: post.published_at,
    author: { "@type": "Organization", name: "Lexia" },
    publisher: {
      "@type": "Organization",
      name: "Lexia",
      url: "https://lexiamx.com",
    },
    url: `https://lexiamx.com/blog/${post.slug}`,
  }

  const POST_FAQS: Record<string, { question: string; answer: string }[]> = {
    "divorcio-incausado-mexico": [
      {
        question: "¿Qué es el divorcio incausado en México?",
        answer:
          "El divorcio incausado es una figura legal que permite disolver el matrimonio sin necesidad de dar explicaciones ni probar ninguna causa. Solo se requiere manifestar la voluntad de no continuar en el matrimonio ante un juez.",
      },
      {
        question: "¿Necesito el acuerdo de mi pareja para divorciarme en México?",
        answer:
          "No. Con el divorcio incausado puedes divorciarte aunque tu pareja se oponga. Un juez puede decretar el divorcio con la solicitud de una sola de las partes.",
      },
      {
        question: "¿Cuánto tiempo tarda un divorcio incausado en México?",
        answer:
          "Si hay acuerdo entre ambas partes puede resolverse en pocas semanas. Si no hay acuerdo, el proceso toma más tiempo pero igualmente procede.",
      },
      {
        question: "¿En qué estados de México aplica el divorcio incausado?",
        answer:
          "El divorcio incausado aplica en todos los estados de México, incluyendo Chihuahua. Es una figura reconocida a nivel federal.",
      },
    ],
  }

  const postFaqs = POST_FAQS[post.slug]
  const schemaFAQ = postFaqs
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: postFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }
    : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {schemaFAQ && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }}
        />
      )}

      <main className="min-h-screen bg-[#FAF7F2]">
        {/* Hero header */}
        <header
          className="relative py-16 px-6 lg:px-8 overflow-hidden"
          style={{ background: "linear-gradient(160deg, #0C0D10 0%, #1A1C26 100%)" }}
        >
          <div
            className="absolute inset-0 opacity-[0.025] pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,1) 40px, rgba(255,255,255,1) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,1) 40px, rgba(255,255,255,1) 41px)",
            }}
          />
          <div className="relative max-w-4xl mx-auto">
            <nav className="flex items-center gap-1.5 text-xs text-[#FAF7F2]/35 mb-8">
              <Link href="/" className="hover:text-[#FAF7F2]/60 transition-colors">Inicio</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/blog" className="hover:text-[#FAF7F2]/60 transition-colors">Blog</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#FAF7F2]/50 truncate max-w-[200px]">{post.title}</span>
            </nav>
            <div className="mb-5">
              <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-[#C49A3C] bg-[#C49A3C]/10 border border-[#C49A3C]/20 px-3 py-1.5 rounded-full">
                {post.category}
              </span>
            </div>
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-light text-[#FAF7F2] leading-tight mb-6"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {post.title}
            </h1>
            <div className="flex items-center gap-6 text-sm text-[#FAF7F2]/45">
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.reading_time} minutos de lectura
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(post.published_at)}
              </span>
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Lexia
              </span>
            </div>
          </div>
        </header>

        {/* Main content */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="flex gap-10 lg:gap-14">
            <article className="flex-1 min-w-0">
              <p className="text-lg text-slate-600 leading-relaxed border-l-4 border-[#C49A3C] pl-5 mb-10 italic">
                {post.excerpt}
              </p>
              <div
                className="prose prose-slate max-w-none
                  prose-h2:font-light prose-h2:text-[#0C0D10] prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-2xl prose-h2:border-b prose-h2:border-[#EAE4D9] prose-h2:pb-2
                  prose-h3:text-lg prose-h3:font-semibold prose-h3:text-[#0C0D10] prose-h3:mt-7 prose-h3:mb-3
                  prose-p:text-slate-600 prose-p:leading-relaxed prose-p:my-4
                  prose-li:text-slate-600 prose-li:leading-relaxed
                  prose-ul:my-4 prose-ul:space-y-1
                  prose-strong:text-[#0C0D10] prose-strong:font-semibold
                  prose-a:text-[#C49A3C] prose-a:no-underline hover:prose-a:text-[#E2B865]"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Bottom CTA */}
              <div
                className="mt-14 rounded-2xl p-8 border border-[rgba(196,154,60,0.25)] text-center"
                style={{ background: "linear-gradient(160deg, #0C0D10 0%, #1A1C26 100%)" }}
              >
                <p className="text-xs font-bold tracking-widest uppercase text-[#C49A3C] mb-3">
                  ¿Necesitas ayuda?
                </p>
                <h2
                  className="text-2xl md:text-3xl font-light text-[#FAF7F2] mb-3 leading-snug"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  ¿Tienes una situación legal?
                  <br />
                  Habla con un abogado verificado en Lexia
                </h2>
                <p className="text-[#FAF7F2]/50 text-sm mb-7 max-w-md mx-auto">
                  Conecta directamente con un abogado especializado en{" "}
                  {post.specialty_label} sin intermediarios ni comisiones.
                </p>
                <Link
                  href={`/abogados/chihuahua/${post.specialty_slug}`}
                  className="inline-flex items-center gap-2 bg-[#C49A3C] hover:bg-[#E2B865] text-[#0C0D10] font-semibold px-8 py-3 rounded-lg transition-colors text-sm"
                >
                  Ver abogados de {post.specialty_label}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <nav className="flex items-center gap-1.5 text-xs text-slate-400 mt-10 pt-6 border-t border-[#EAE4D9]">
                <Link href="/" className="hover:text-slate-600 transition-colors">Inicio</Link>
                <ChevronRight className="w-3 h-3" />
                <Link href="/blog" className="hover:text-slate-600 transition-colors">Blog</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-slate-500 truncate max-w-[240px]">{post.title}</span>
              </nav>
            </article>

            {/* Sidebar */}
            <aside className="hidden lg:block w-72 flex-none space-y-6">
              <div className="sticky top-24 space-y-6">
                <div className="bg-white border border-[#EAE4D9] rounded-xl p-6">
                  <div className="h-1 w-8 bg-gradient-to-r from-[#C49A3C] to-[#E2B865] rounded mb-4" />
                  <h3
                    className="text-lg font-light text-[#0C0D10] mb-2 leading-snug"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    ¿Necesitas un abogado de {post.specialty_label}?
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-5">
                    Encuentra abogados verificados y especializados. Sin intermediarios, sin comisiones.
                  </p>
                  <Link
                    href={`/abogados/chihuahua/${post.specialty_slug}`}
                    className="flex items-center justify-center gap-2 w-full bg-[#0C0D10] hover:bg-[#1A1C26] text-[#FAF7F2] font-semibold text-xs px-4 py-3 rounded-lg transition-colors"
                  >
                    Ver abogados
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/abogados"
                    className="flex items-center justify-center gap-2 w-full mt-2 border border-[#EAE4D9] hover:border-[#C49A3C]/40 text-[#0C0D10]/60 hover:text-[#0C0D10] font-medium text-xs px-4 py-2.5 rounded-lg transition-colors"
                  >
                    Buscar en todo México
                  </Link>
                </div>

                {otherPosts.length > 0 && (
                  <div className="bg-white border border-[#EAE4D9] rounded-xl p-6">
                    <h3 className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-4">
                      Artículos relacionados
                    </h3>
                    <ul className="space-y-4">
                      {otherPosts.map((related) => (
                        <li key={related.slug}>
                          <Link href={`/blog/${related.slug}`} className="group block">
                            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#C49A3C] block mb-1">
                              {related.category}
                            </span>
                            <span className="text-sm text-[#0C0D10] leading-snug group-hover:text-[#C49A3C] transition-colors line-clamp-2">
                              {related.title}
                            </span>
                            <span className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {related.reading_time} min
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/blog"
                      className="flex items-center gap-1.5 text-xs text-[#C49A3C] font-semibold mt-5 hover:gap-2 transition-all"
                    >
                      Ver todos los artículos
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}

                <div className="bg-[#FAF7F2] border border-[#EAE4D9] rounded-xl p-5 text-center">
                  <p className="text-xs text-slate-500 leading-relaxed">
                    La información en este artículo es de carácter general. Cada caso es único —
                    consulta con un abogado para asesoría personalizada.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  )
}