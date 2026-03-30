"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import Image from "next/image"
import { olvidarContrasena } from "@/app/actions/olvidarContrasena"
import { toast } from "@/lib/toast"
import Toaster from "@/components/Toaster"
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react"

const displayFont = { fontFamily: "var(--font-cormorant)" }

export default function OlvidarContrasenaPage() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)
  const [isPending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    startTransition(async () => {
      const result = await olvidarContrasena(email)
      if (result.ok) {
        setSent(true)
      } else {
        toast(result.error ?? "Ocurrió un error. Intenta de nuevo.", "error")
      }
    })
  }

  return (
    <>
    <Toaster />
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
          {sent ? (
            <div className="text-center py-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-4" />
              <h2 className="text-2xl text-[#0C0D10] mb-2" style={displayFont}>Revisa tu correo</h2>
              <p className="text-sm text-[#0C0D10]/50 leading-relaxed">
                Si el correo está registrado, recibirás un enlace para restablecer tu contraseña. Válido por 1 hora.
              </p>
              <Link
                href="/login"
                className="mt-6 inline-flex items-center gap-1.5 text-sm text-[#C49A3C] hover:text-[#E2B865] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Volver al login
              </Link>
            </div>
          ) : (
            <>
              <h2 className="text-2xl text-[#0C0D10] mb-1 text-center" style={displayFont}>¿Olvidaste tu contraseña?</h2>
              <p className="text-xs text-[#0C0D10]/45 text-center mb-6">
                Ingresa tu correo y te enviamos un enlace para restablecerla.
              </p>

<form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-[#0C0D10]/60 uppercase tracking-widest block mb-1.5">
                    Correo electrónico
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0C0D10]/25" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@correo.com"
                      className="w-full pl-9 pr-4 py-2.5 border border-[#EAE4D9] rounded-lg text-sm text-[#0C0D10] placeholder-[#0C0D10]/30 focus:outline-none focus:border-[#C49A3C] focus:ring-1 focus:ring-[rgba(196,154,60,0.2)] transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-[#C49A3C] hover:bg-[#E2B865] disabled:opacity-60 text-[#0C0D10] font-semibold text-sm py-2.5 rounded-lg transition-colors"
                >
                  {isPending ? "Enviando..." : "Enviar enlace"}
                </button>
              </form>

              <div className="mt-5 text-center">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 text-xs text-[#0C0D10]/40 hover:text-[#0C0D10]/70 transition-colors"
                >
                  <ArrowLeft className="w-3 h-3" /> Volver al login
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
    </>
  )
}
