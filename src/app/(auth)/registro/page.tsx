"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Scale,
  ChevronRight,
  ChevronLeft,
  Check,
  ArrowRight,
  User,
  FileText,
  Briefcase,
  CreditCard,
} from "lucide-react"

// ─── Static data ──────────────────────────────────────────────────────────────

const ESPECIALIDADES = [
  "Derecho Familiar",
  "Derecho Penal",
  "Derecho Laboral",
  "Derecho Fiscal",
  "Derecho Civil",
  "Derecho Inmobiliario",
  "Derecho Mercantil",
  "Amparo",
  "Derecho Migratorio",
  "Propiedad Intelectual",
]

const ESTADOS_MX = [
  "Aguascalientes", "Baja California", "Baja California Sur", "Campeche",
  "Chiapas", "Chihuahua", "Ciudad de México", "Coahuila", "Colima",
  "Durango", "Guanajuato", "Guerrero", "Hidalgo", "Jalisco", "México",
  "Michoacán", "Morelos", "Nayarit", "Nuevo León", "Oaxaca", "Puebla",
  "Querétaro", "Quintana Roo", "San Luis Potosí", "Sinaloa", "Sonora",
  "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz", "Yucatán", "Zacatecas",
]

const STEPS = [
  { label: "Cuenta", icon: User },
  { label: "Perfil", icon: FileText },
  { label: "Especialidades", icon: Briefcase },
  { label: "Plan", icon: CreditCard },
]

// ─── Types ────────────────────────────────────────────────────────────────────

type FormData = {
  email: string
  password: string
  confirmPassword: string
  name: string
  phone: string
  whatsapp: string
  city: string
  state: string
  cedula: string
  university: string
  graduationYear: string
  yearsExperience: string
  bio: string
  specialties: string[]
  plan: "free" | "premium" | "despacho"
  acceptTerms: boolean
}

const initial: FormData = {
  email: "", password: "", confirmPassword: "",
  name: "", phone: "", whatsapp: "", city: "", state: "",
  cedula: "", university: "", graduationYear: "", yearsExperience: "", bio: "",
  specialties: [],
  plan: "free",
  acceptTerms: false,
}

// ─── Shared input style ───────────────────────────────────────────────────────

const inputCls =
  "w-full px-3.5 py-2.5 text-sm border border-[#EAE4D9] rounded-lg text-[#0C0D10] placeholder-[#0C0D10]/30 focus:outline-none focus:border-[#C49A3C] focus:ring-1 focus:ring-[rgba(196,154,60,0.2)] transition-colors bg-white"

const labelCls =
  "block text-[11px] font-semibold text-[#0C0D10]/55 mb-1.5 tracking-widest uppercase"

const displayFont = { fontFamily: "var(--font-cormorant)" }

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RegistroPage() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormData>(initial)
  const [submitted, setSubmitted] = useState(false)

  function set<K extends keyof FormData>(field: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function toggleSpecialty(name: string) {
    set(
      "specialties",
      form.specialties.includes(name)
        ? form.specialties.filter((s) => s !== name)
        : [...form.specialties, name],
    )
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (step < STEPS.length - 1) {
      setStep(step + 1)
    } else {
      setSubmitted(true)
    }
  }

  // ── Success state ────────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <main
        className="min-h-screen flex items-center justify-center px-6 py-12"
        style={{ background: "linear-gradient(160deg, #1A1C26 0%, #0C0D10 100%)" }}
      >
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% -10%, rgba(196,154,60,0.12) 0%, transparent 60%)",
          }}
        />

        <div className="relative w-full max-w-sm text-center">
          <div className="bg-white rounded-2xl border border-[#EAE4D9] p-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-[#EAE4D9]" />
              <div className="w-16 h-16 rounded-full border-2 border-[#C49A3C] flex items-center justify-center">
                <Check className="w-7 h-7 text-[#C49A3C]" strokeWidth={2.5} />
              </div>
              <div className="flex-1 h-px bg-[#EAE4D9]" />
            </div>

            <h2
              className="text-3xl text-[#0C0D10] mb-3 leading-tight"
              style={displayFont}
            >
              ¡Registro completado!
            </h2>
            <p className="text-[#0C0D10]/50 text-sm leading-relaxed mb-8">
              Hemos recibido tu solicitud. Revisaremos tu cédula y activaremos tu perfil en las próximas 24 horas.
            </p>

            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#C49A3C] hover:bg-[#E2B865] text-[#0C0D10] font-semibold text-sm px-7 py-2.5 rounded-lg transition-colors"
            >
              Ir al inicio
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <p className="text-[#FAF7F2]/25 text-xs mt-5">
            Recibirás un correo de confirmación en breve.
          </p>
        </div>
      </main>
    )
  }

  // ── Main form ────────────────────────────────────────────────────────────────
  return (
    <main
      className="min-h-screen flex items-start justify-center px-6 py-12"
      style={{ background: "linear-gradient(160deg, #1A1C26 0%, #0C0D10 100%)" }}
    >
      {/* Gold glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% -10%, rgba(196,154,60,0.1) 0%, transparent 60%)",
        }}
      />

      <div className="relative w-full max-w-lg">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-10">
          <div className="w-8 h-8 rounded-sm bg-[rgba(196,154,60,0.1)] border border-[rgba(196,154,60,0.35)] flex items-center justify-center">
            <Scale className="w-4 h-4 text-[#C49A3C]" />
          </div>
          <span className="text-2xl font-medium text-[#FAF7F2] tracking-wide" style={displayFont}>
            Lexia
          </span>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-between mb-8 px-1">
          {STEPS.map((s, i) => {
            const StepIcon = s.icon
            const isDone = i < step
            const isCurrent = i === step
            return (
              <div key={s.label} className="flex items-center">
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                      isDone
                        ? "bg-[#C49A3C] border-2 border-[#C49A3C]"
                        : isCurrent
                        ? "bg-transparent border-2 border-[#C49A3C]"
                        : "bg-transparent border-2 border-white/15"
                    }`}
                  >
                    {isDone ? (
                      <Check className="w-4 h-4 text-[#0C0D10]" strokeWidth={2.5} />
                    ) : (
                      <StepIcon
                        className={`w-3.5 h-3.5 ${isCurrent ? "text-[#C49A3C]" : "text-white/25"}`}
                      />
                    )}
                  </div>
                  <span
                    className={`text-[10px] tracking-widest uppercase hidden sm:block ${
                      isCurrent ? "text-[#C49A3C]" : isDone ? "text-[#FAF7F2]/60" : "text-white/25"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>

                {i < STEPS.length - 1 && (
                  <div
                    className={`h-px w-10 sm:w-16 mx-2 mt-[-18px] transition-colors ${
                      i < step ? "bg-[rgba(196,154,60,0.5)]" : "bg-white/10"
                    }`}
                  />
                )}
              </div>
            )
          })}
        </div>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-[#EAE4D9] p-7"
        >
          {/* Step title */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-1">
              <div className="h-px flex-1 bg-[#EAE4D9]" />
              <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#C49A3C]">
                Paso {step + 1} de {STEPS.length}
              </span>
              <div className="h-px flex-1 bg-[#EAE4D9]" />
            </div>
            <h2 className="text-2xl text-[#0C0D10] text-center mt-3" style={displayFont}>
              {step === 0 && "Crear cuenta"}
              {step === 1 && "Tu perfil profesional"}
              {step === 2 && "Especialidades"}
              {step === 3 && "Elige tu plan"}
            </h2>
            <p className="text-[#0C0D10]/40 text-xs text-center mt-1">
              {step === 0 && "Ingresa tus datos de acceso"}
              {step === 1 && "La información que verán tus clientes"}
              {step === 2 && "Selecciona las áreas en las que practicas"}
              {step === 3 && "Puedes cambiar de plan en cualquier momento"}
            </p>
          </div>

          {/* ── Step 0: Account ── */}
          {step === 0 && (
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className={labelCls}>
                  Correo electrónico
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder="tu@email.com"
                  className={inputCls}
                />
              </div>
              <div>
                <label htmlFor="password" className={labelCls}>
                  Contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  minLength={8}
                  value={form.password}
                  onChange={(e) => set("password", e.target.value)}
                  placeholder="Mínimo 8 caracteres"
                  className={inputCls}
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className={labelCls}>
                  Confirmar contraseña
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  required
                  value={form.confirmPassword}
                  onChange={(e) => set("confirmPassword", e.target.value)}
                  placeholder="Repite tu contraseña"
                  className={inputCls}
                />
              </div>

              <p className="text-[#0C0D10]/45 text-xs pt-1">
                ¿Ya tienes cuenta?{" "}
                <Link
                  href="/login"
                  className="text-[#C49A3C] hover:text-[#E2B865] transition-colors font-medium"
                >
                  Inicia sesión
                </Link>
              </p>
            </div>
          )}

          {/* ── Step 1: Profile ── */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className={labelCls}>
                  Nombre completo
                </label>
                <input
                  id="name"
                  required
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="Lic. Juan Pérez García"
                  className={inputCls}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="phone" className={labelCls}>
                    Teléfono
                  </label>
                  <input
                    id="phone"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    placeholder="+52 55 1234 5678"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="whatsapp" className={labelCls}>
                    WhatsApp
                  </label>
                  <input
                    id="whatsapp"
                    value={form.whatsapp}
                    onChange={(e) => set("whatsapp", e.target.value)}
                    placeholder="5215512345678"
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="state" className={labelCls}>
                    Estado
                  </label>
                  <select
                    id="state"
                    required
                    value={form.state}
                    onChange={(e) => set("state", e.target.value)}
                    className={inputCls}
                  >
                    <option value="">Seleccionar</option>
                    {ESTADOS_MX.map((e) => (
                      <option key={e}>{e}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="city" className={labelCls}>
                    Ciudad
                  </label>
                  <input
                    id="city"
                    required
                    value={form.city}
                    onChange={(e) => set("city", e.target.value)}
                    placeholder="Ciudad de México"
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="cedula" className={labelCls}>
                    Cédula SEP
                  </label>
                  <input
                    id="cedula"
                    value={form.cedula}
                    onChange={(e) => set("cedula", e.target.value)}
                    placeholder="1234567"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="yearsExperience" className={labelCls}>
                    Años de exp.
                  </label>
                  <input
                    id="yearsExperience"
                    type="number"
                    min="0"
                    value={form.yearsExperience}
                    onChange={(e) => set("yearsExperience", e.target.value)}
                    placeholder="10"
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="university" className={labelCls}>
                    Universidad
                  </label>
                  <input
                    id="university"
                    value={form.university}
                    onChange={(e) => set("university", e.target.value)}
                    placeholder="UNAM"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="graduationYear" className={labelCls}>
                    Año de egreso
                  </label>
                  <input
                    id="graduationYear"
                    type="number"
                    value={form.graduationYear}
                    onChange={(e) => set("graduationYear", e.target.value)}
                    placeholder="2015"
                    className={inputCls}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="bio" className={labelCls}>
                  Descripción profesional
                </label>
                <textarea
                  id="bio"
                  value={form.bio}
                  onChange={(e) => set("bio", e.target.value)}
                  placeholder="Cuéntale a los clientes sobre tu trayectoria, enfoque y servicios..."
                  rows={4}
                  className={`${inputCls} resize-none`}
                />
              </div>
            </div>
          )}

          {/* ── Step 2: Specialties ── */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="flex flex-wrap gap-2">
                {ESPECIALIDADES.map((esp) => {
                  const selected = form.specialties.includes(esp)
                  const isFirst = form.specialties[0] === esp
                  return (
                    <button
                      key={esp}
                      type="button"
                      onClick={() => toggleSpecialty(esp)}
                      className={`px-3.5 py-1.5 rounded-full text-sm font-medium border transition-colors flex items-center gap-1.5 ${
                        selected
                          ? "bg-[rgba(196,154,60,0.12)] border-[rgba(196,154,60,0.5)] text-[#C49A3C]"
                          : "bg-white border-[#EAE4D9] text-[#0C0D10]/60 hover:border-[#C49A3C]/40 hover:text-[#0C0D10]"
                      }`}
                    >
                      {selected && <Check className="w-3 h-3" strokeWidth={2.5} />}
                      {esp}
                      {isFirst && selected && (
                        <span className="text-[10px] bg-[#C49A3C] text-white px-1.5 py-0.5 rounded-full font-semibold ml-0.5">
                          Principal
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>

              {form.specialties.length === 0 && (
                <p className="text-[#0C0D10]/35 text-xs text-center pt-2">
                  Selecciona al menos una especialidad para continuar.
                </p>
              )}

              {form.specialties.length > 0 && (
                <div className="border border-[#EAE4D9] rounded-xl p-4 bg-[#FAF7F2]">
                  <p className="text-[11px] font-semibold tracking-widest uppercase text-[#0C0D10]/40 mb-2">
                    Seleccionadas ({form.specialties.length})
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {form.specialties.map((s, i) => (
                      <span
                        key={s}
                        className={`text-xs px-2.5 py-1 rounded-full ${
                          i === 0
                            ? "bg-[#C49A3C] text-white font-medium"
                            : "bg-white border border-[#EAE4D9] text-[#0C0D10]/60"
                        }`}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <p className="text-[11px] text-[#0C0D10]/30 mt-2">
                    La primera seleccionada aparece como especialidad principal.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ── Step 3: Plan ── */}
          {step === 3 && (
            <div className="space-y-4">
              {(["free", "premium"] as const).map((p) => {
                const active = form.plan === p
                return (
                  <label
                    key={p}
                    className={`block rounded-xl p-4 cursor-pointer transition-all border-2 ${
                      active
                        ? p === "premium"
                          ? "border-[#C49A3C] bg-[rgba(196,154,60,0.04)]"
                          : "border-[#C49A3C] bg-[rgba(196,154,60,0.04)]"
                        : "border-[#EAE4D9] hover:border-[#C49A3C]/40"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                          active ? "border-[#C49A3C] bg-[#C49A3C]" : "border-[#EAE4D9]"
                        }`}
                      >
                        {active && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <input
                        type="radio"
                        name="plan"
                        value={p}
                        checked={active}
                        onChange={() => set("plan", p)}
                        className="sr-only"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-[#0C0D10] text-sm">
                            {p === "free" ? "Básico" : "Premium"}
                          </span>
                          <span
                            className="font-semibold text-sm"
                            style={displayFont}
                          >
                            {p === "free" ? (
                              <span className="text-[#0C0D10]/50">Gratis</span>
                            ) : (
                              <span className="text-[#C49A3C]">$599<span className="text-xs text-[#0C0D10]/40 font-normal">/mes MXN</span></span>
                            )}
                          </span>
                          {p === "premium" && (
                            <span className="text-[10px] bg-[#C49A3C] text-white font-bold px-2 py-0.5 rounded-full tracking-widest uppercase">
                              Recomendado
                            </span>
                          )}
                        </div>
                        <p className="text-[#0C0D10]/45 text-xs mt-1 leading-relaxed">
                          {p === "free"
                            ? "Perfil básico en el directorio. Hasta 2 especialidades, contacto por formulario."
                            : "Posición preferente, WhatsApp directo, estadísticas de visitas y badge verificado."}
                        </p>
                      </div>
                    </div>
                  </label>
                )
              })}

              {/* Terms */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={form.acceptTerms}
                    onClick={() => set("acceptTerms", !form.acceptTerms)}
                    className={`mt-0.5 w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      form.acceptTerms
                        ? "bg-[#C49A3C] border-[#C49A3C]"
                        : "border-[#EAE4D9] group-hover:border-[#C49A3C]/50"
                    }`}
                  >
                    {form.acceptTerms && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
                  </button>
                  <span className="text-xs text-[#0C0D10]/55 leading-relaxed">
                    Acepto los{" "}
                    <Link href="/terminos" className="text-[#C49A3C] hover:text-[#E2B865] transition-colors">
                      términos de uso
                    </Link>{" "}
                    y la{" "}
                    <Link href="/privacidad" className="text-[#C49A3C] hover:text-[#E2B865] transition-colors">
                      política de privacidad
                    </Link>{" "}
                    de Lexia.
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3 pt-6 mt-2 border-t border-[#EAE4D9]">
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-1.5 px-5 py-2.5 text-sm text-[#0C0D10]/60 hover:text-[#0C0D10] border border-[#EAE4D9] hover:border-[#0C0D10]/30 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Anterior
              </button>
            )}
            <button
              type="submit"
              disabled={
                (step === 2 && form.specialties.length === 0) ||
                (step === 3 && (!form.acceptTerms || form.specialties.length === 0))
              }
              className="flex-1 flex items-center justify-center gap-2 bg-[#C49A3C] hover:bg-[#E2B865] disabled:opacity-40 disabled:cursor-not-allowed text-[#0C0D10] font-semibold text-sm py-2.5 px-5 rounded-lg transition-colors"
            >
              {step === STEPS.length - 1 ? (
                <>Crear mi cuenta <Check className="w-4 h-4" strokeWidth={2.5} /></>
              ) : (
                <>Siguiente <ChevronRight className="w-4 h-4" /></>
              )}
            </button>
          </div>
        </form>

        {/* Footer hint */}
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
