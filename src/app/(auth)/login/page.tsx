"use client"

import { useState } from "react"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Scale, Eye, EyeOff, ArrowRight } from "lucide-react"

const displayFont = { fontFamily: "var(--font-cormorant)" }

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    const result = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    })
    setLoading(false)
    if (result?.error) {
      setError("Correo o contraseña incorrectos.")
    } else {
      router.push("/mi-perfil")
    }
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center px-6 py-12"
      style={{ background: "linear-gradient(160deg, #1A1C26 0%, #0C0D10 100%)" }}
    >
      {/* Gold glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% -10%, rgba(196,154,60,0.12) 0%, transparent 60%)",
        }}
      />

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center mb-10">
          <Image
            src="/logo.png"
            alt="Lexia MX"
            width={600}
            height={400}
            className="h-16 w-auto rounded-sm"
            style={{ width: "auto" }}
            priority
          />
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-[#EAE4D9] p-8" style={{ colorScheme: "light" }}>
          {/* Decorative top rule */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-[#EAE4D9]" />
            <Scale className="w-3.5 h-3.5 text-[#C49A3C]/40" />
            <div className="flex-1 h-px bg-[#EAE4D9]" />
          </div>

          <h1 className="text-2xl text-[#0C0D10] mb-1 text-center" style={displayFont}>
            Bienvenido de vuelta
          </h1>
          <p className="text-[#0C0D10]/45 text-xs text-center mb-7 tracking-wide">
            Ingresa a tu cuenta de abogado
          </p>

          {error && (
            <p className="text-red-600 text-sm text-center bg-red-50 border border-red-200 rounded-lg px-4 py-2 mb-4">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-[#0C0D10]/60 mb-1.5 tracking-wide uppercase">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="tu@email.com"
                className="w-full px-3.5 py-2.5 text-sm border border-[#EAE4D9] rounded-lg text-[#0C0D10] bg-white placeholder-[#0C0D10]/30 focus:outline-none focus:border-[#C49A3C] focus:ring-1 focus:ring-[rgba(196,154,60,0.2)] transition-colors"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="text-xs font-semibold text-[#0C0D10]/60 tracking-wide uppercase">
                  Contraseña
                </label>
                <Link href="/olvidar-contrasena" className="text-xs text-[#C49A3C] hover:text-[#E2B865] transition-colors">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 pr-10 text-sm border border-[#EAE4D9] rounded-lg text-[#0C0D10] bg-white placeholder-[#0C0D10]/30 focus:outline-none focus:border-[#C49A3C] focus:ring-1 focus:ring-[rgba(196,154,60,0.2)] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0C0D10]/30 hover:text-[#0C0D10]/60 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#C49A3C] hover:bg-[#E2B865] disabled:opacity-60 text-[#0C0D10] font-semibold text-sm py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 mt-2"
            >
              {loading ? "Ingresando..." : (
                <>Iniciar sesión <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-[#EAE4D9]" />
            <span className="text-xs text-[#0C0D10]/30">o</span>
            <div className="flex-1 h-px bg-[#EAE4D9]" />
          </div>

          <p className="text-center text-sm text-[#0C0D10]/50">
            ¿No tienes cuenta?{" "}
            <Link href="/registro" className="text-[#C49A3C] font-medium hover:text-[#E2B865] transition-colors">
              Regístrate gratis
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-[#FAF7F2]/25 mt-5">
          ¿Eres cliente buscando abogado?{" "}
          <Link href="/abogados" className="text-[#C49A3C]/80 hover:text-[#C49A3C] transition-colors">
            Buscar abogado
          </Link>
        </p>
      </div>
    </main>
  )
}
