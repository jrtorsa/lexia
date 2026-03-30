"use client"

import { useState, useTransition } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { restablecerContrasena } from "@/app/actions/restablecerContrasena"
import { Eye, EyeOff, CheckCircle2 } from "lucide-react"

const displayFont = { fontFamily: "var(--font-cormorant)" }

export default function RestablecerContrasenaPage() {
  const { token } = useParams<{ token: string }>()
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState("")
  const [isPending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    if (password !== confirm) {
      setError("Las contraseñas no coinciden.")
      return
    }
    startTransition(async () => {
      const result = await restablecerContrasena(token, password)
      if (result.ok) {
        setDone(true)
        setTimeout(() => router.push("/login"), 2500)
      } else {
        setError(result.error ?? "Ocurrió un error.")
      }
    })
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center px-6 py-12"
      style={{ background: "linear-gradient(160deg, #1A1C26 0%, #0C0D10 100%)" }}
    >
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 40% at 50% -10%, rgba(196,154,60,0.12) 0%, transparent 60%)" }}
      />

      <div className="relative w-full max-w-sm">
        <div className="flex items-center justify-center mb-10">
          <Image src="/logo.png" alt="Lexia MX" width={600} height={400} className="h-14 w-auto rounded-sm" style={{ width: "auto" }} priority />
        </div>

        <div className="bg-white rounded-2xl border border-[#EAE4D9] p-8" style={{ colorScheme: "light" }}>
          {done ? (
            <div className="text-center py-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-4" />
              <h2 className="text-2xl text-[#0C0D10] mb-2" style={displayFont}>¡Contraseña actualizada!</h2>
              <p className="text-sm text-[#0C0D10]/50">Redirigiendo al login...</p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl text-[#0C0D10] mb-1 text-center" style={displayFont}>Nueva contraseña</h2>
              <p className="text-xs text-[#0C0D10]/45 text-center mb-6">
                Elige una contraseña segura de al menos 8 caracteres.
              </p>

              {error && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg px-3 py-2.5">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-[#0C0D10]/60 uppercase tracking-widest block mb-1.5">
                    Nueva contraseña
                  </label>
                  <div className="relative">
                    <input
                      type={showPass ? "text" : "password"}
                      required
                      minLength={8}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Mínimo 8 caracteres"
                      className="w-full pl-4 pr-10 py-2.5 border border-[#EAE4D9] rounded-lg text-sm text-[#0C0D10] placeholder-[#0C0D10]/30 focus:outline-none focus:border-[#C49A3C] focus:ring-1 focus:ring-[rgba(196,154,60,0.2)] transition-colors"
                    />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0C0D10]/30">
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#0C0D10]/60 uppercase tracking-widest block mb-1.5">
                    Confirmar contraseña
                  </label>
                  <input
                    type={showPass ? "text" : "password"}
                    required
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="Repite la contraseña"
                    className="w-full px-4 py-2.5 border border-[#EAE4D9] rounded-lg text-sm text-[#0C0D10] placeholder-[#0C0D10]/30 focus:outline-none focus:border-[#C49A3C] focus:ring-1 focus:ring-[rgba(196,154,60,0.2)] transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-[#C49A3C] hover:bg-[#E2B865] disabled:opacity-60 text-[#0C0D10] font-semibold text-sm py-2.5 rounded-lg transition-colors"
                >
                  {isPending ? "Guardando..." : "Guardar contraseña"}
                </button>
              </form>
            </>
          )}
        </div>

        {!done && (
          <p className="text-center mt-5 text-xs text-[#FAF7F2]/30">
            ¿El enlace expiró?{" "}
            <Link href="/olvidar-contrasena" className="text-[#C49A3C] hover:text-[#E2B865] transition-colors">
              Solicita uno nuevo
            </Link>
          </p>
        )}
      </div>
    </main>
  )
}
