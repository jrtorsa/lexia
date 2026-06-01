"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Calculator, ChevronRight, Info, HelpCircle, AlertTriangle } from "lucide-react"

const displayFont = { fontFamily: "var(--font-cormorant)" }
const SALARIO_MINIMO_MENSUAL = 8364 // $278.80/día × 30 (2025)

// ─── Helpers ──────────────────────────────────────────────────────────────────

function parseDate(str: string): Date {
  const [y, m, d] = str.split("-").map(Number)
  return new Date(y, m - 1, d)
}

function getDiasVacLFT(years: number): number {
  if (years < 1)  return 0
  if (years === 1) return 12
  if (years === 2) return 14
  if (years === 3) return 16
  if (years === 4) return 18
  if (years <= 10) return 22
  if (years <= 15) return 24
  if (years <= 20) return 26
  if (years <= 25) return 28
  return 28 + Math.floor((years - 25) / 5) * 2
}

function fmt(n: number) {
  return n.toLocaleString("es-MX", { style: "currency", currency: "MXN", minimumFractionDigits: 2 })
}

// ─── Types ────────────────────────────────────────────────────────────────────

type TipoSeparacion = "renuncia" | "despido"

interface Resultado {
  salarioPendiente: number
  vacacionesProporcionales: number
  primaVacacional: number
  aguinaldoProporcional: number
  indemnizacion: number
  veinteDiasPorAnio: number
  primaAntiguedad: number
  total: number
  desglose: { concepto: string; dias: number; importe: number; nota?: string }[]
}

// ─── Schema ───────────────────────────────────────────────────────────────────

const schemaCalculadora = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Calculadora de Finiquito México",
  url: "https://lexiamx.com/herramientas",
  description:
    "Calcula tu finiquito o liquidación en México de forma gratuita. Ingresa tu salario, fecha de entrada y salida para conocer exactamente cuánto te corresponde por ley.",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "MXN" },
  provider: { "@type": "Organization", name: "Lexia MX", url: "https://lexiamx.com" },
}

// ─── Shared styles ────────────────────────────────────────────────────────────

const dateInputStyle: React.CSSProperties = {
  maxWidth: "100%",
  minHeight: "44px",
  boxSizing: "border-box",
  WebkitAppearance: "none",
  appearance: "none",
  fontSize: "16px",
  padding: "12px 16px",
  color: "inherit",
}

const inputCls =
  "w-full px-3 py-2.5 border border-[#EAE4D9] rounded-lg text-sm text-[#0C0D10] focus:outline-none focus:border-[#C49A3C] focus:ring-1 focus:ring-[rgba(196,154,60,0.2)] transition-colors"

// ─── Tooltip ──────────────────────────────────────────────────────────────────

function Tooltip({ text }: { text: string }) {
  return (
    <span className="group relative inline-block ml-1.5 cursor-help align-middle">
      <HelpCircle className="w-3.5 h-3.5 text-[#0C0D10]/25 inline-block" />
      <span className="absolute bottom-full left-0 mb-2 w-64 bg-[#0C0D10] text-[#FAF7F2] text-[11px] leading-relaxed rounded-xl px-3 py-2.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 shadow-xl whitespace-normal">
        {text}
      </span>
    </span>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function HerramientasPage() {
  const [salarioMensual,      setSalarioMensual]      = useState("")
  const [fechaIngreso,        setFechaIngreso]        = useState("")
  const [fechaBaja,           setFechaBaja]           = useState("")
  const [tipo,                setTipo]                = useState<TipoSeparacion>("renuncia")
  const [diasVacGozados,      setDiasVacGozados]      = useState("0")
  const [diasAguinaldo,       setDiasAguinaldo]       = useState("15")
  const [primaVacacionalPct,  setPrimaVacacionalPct]  = useState("25")
  const [diasSalarioPendiente,setDiasSalarioPendiente]= useState("")
  const [calculado,           setCalculado]           = useState(false)

  const reset = () => setCalculado(false)

  // ── Derived display values ──────────────────────────────────────────────────

  const salDiarioDisplay = useMemo(() => {
    const s = parseFloat(salarioMensual)
    return s > 0 ? s / 30 : null
  }, [salarioMensual])

  const tiempoTrabajado = useMemo(() => {
    if (!fechaIngreso || !fechaBaja) return null
    const ingreso = parseDate(fechaIngreso)
    const baja    = parseDate(fechaBaja)
    if (baja <= ingreso) return null

    let years  = baja.getFullYear() - ingreso.getFullYear()
    let months = baja.getMonth()    - ingreso.getMonth()
    if (baja.getDate() < ingreso.getDate()) months--
    if (months < 0) { years--; months += 12 }

    const parts: string[] = []
    if (years  > 0) parts.push(`${years} año${years  !== 1 ? "s" : ""}`)
    if (months > 0) parts.push(`${months} mes${months !== 1 ? "es" : ""}`)
    return parts.length ? parts.join(" y ") : "Menos de 1 mes"
  }, [fechaIngreso, fechaBaja])

  // Auto-suggest días de salario pendiente from baja date
  const diasBajaPlaceholder = useMemo(() => {
    if (!fechaBaja) return "0"
    return String(parseDate(fechaBaja).getDate())
  }, [fechaBaja])

  // ── Validation warnings (non-blocking) ─────────────────────────────────────

  const advertencias = useMemo(() => {
    const warns: string[] = []
    const s = parseFloat(salarioMensual)
    if (s > 0 && s < SALARIO_MINIMO_MENSUAL) {
      warns.push(
        `El salario es menor al mínimo legal (≈ ${fmt(SALARIO_MINIMO_MENSUAL)}/mes en 2025)`
      )
    }
    if (fechaIngreso && fechaBaja && parseDate(fechaBaja) <= parseDate(fechaIngreso)) {
      warns.push("La fecha de baja debe ser posterior a la fecha de ingreso")
    }
    return warns
  }, [salarioMensual, fechaIngreso, fechaBaja])

  // ── Core calculation ────────────────────────────────────────────────────────

  const resultado = useMemo<Resultado | null>(() => {
    if (!salarioMensual || !fechaIngreso || !fechaBaja) return null

    const ingreso = parseDate(fechaIngreso)
    const baja    = parseDate(fechaBaja)
    if (baja <= ingreso) return null

    const salMensual   = parseFloat(salarioMensual)
    const salDiario    = salMensual / 30
    const diasAg       = Math.max(15, parseInt(diasAguinaldo)    || 15)
    const primaPct     = (Math.max(25, parseFloat(primaVacacionalPct) || 25)) / 100
    const diasPend     = diasSalarioPendiente !== ""
      ? Math.max(0, parseInt(diasSalarioPendiente))
      : baja.getDate()

    const msTotal         = baja.getTime() - ingreso.getTime()
    const diasTotales     = msTotal / (1000 * 60 * 60 * 24)
    const aniosTrabajados = diasTotales / 365
    const aniosCompletos  = Math.floor(aniosTrabajados)

    // Days elapsed in the current anniversary year
    const inicioAnioActual = new Date(ingreso)
    inicioAnioActual.setFullYear(ingreso.getFullYear() + aniosCompletos)
    const diasAnioActual = (baja.getTime() - inicioAnioActual.getTime()) / (1000 * 60 * 60 * 24)

    // 1. Salario pendiente
    const salarioPendiente = diasPend * salDiario

    // 2. Vacaciones proporcionales
    const diasVacCorresponden    = getDiasVacLFT(aniosCompletos + 1)
    const vacPropDias            = (diasVacCorresponden * diasAnioActual) / 365
    const vacGozados             = parseFloat(diasVacGozados) || 0
    const vacRestantes           = Math.max(0, vacPropDias - vacGozados)
    const vacacionesProporcionales = vacRestantes * salDiario

    // 3. Prima vacacional (configurable %)
    const primaVacacional = vacacionesProporcionales * primaPct

    // 4. Aguinaldo proporcional (configurable días)
    const inicioAnioCalendario = new Date(baja.getFullYear(), 0, 1)
    const diasAnioCalendario   = (baja.getTime() - inicioAnioCalendario.getTime()) / (1000 * 60 * 60 * 24)
    const aguinaldoDias        = (diasAg * diasAnioCalendario) / 365
    const aguinaldoProporcional = aguinaldoDias * salDiario

    // 5-7. Despido injustificado
    let indemnizacion    = 0
    let veinteDiasPorAnio = 0
    let primaAntiguedad  = 0

    if (tipo === "despido") {
      indemnizacion      = 90 * salDiario
      veinteDiasPorAnio  = 20 * aniosTrabajados * salDiario
      const salDiarioCap = Math.min(salDiario, 226) // tope 2x UMA 2025
      primaAntiguedad    = 12 * aniosTrabajados * salDiarioCap
    }

    const total =
      salarioPendiente + vacacionesProporcionales + primaVacacional +
      aguinaldoProporcional + indemnizacion + veinteDiasPorAnio + primaAntiguedad

    const desglose = [
      {
        concepto: "Salario pendiente",
        dias: diasPend,
        importe: salarioPendiente,
        nota: `${diasPend} días del mes en curso`,
      },
      {
        concepto: "Vacaciones proporcionales",
        dias: parseFloat(vacRestantes.toFixed(2)),
        importe: vacacionesProporcionales,
        nota: `${diasVacCorresponden} días corresponden, ${vacGozados} ya gozados`,
      },
      {
        concepto: "Prima vacacional",
        dias: parseFloat(vacRestantes.toFixed(2)),
        importe: primaVacacional,
        nota: `${Math.round(primaPct * 100)}% sobre vacaciones`,
      },
      {
        concepto: "Aguinaldo proporcional",
        dias: parseFloat(aguinaldoDias.toFixed(2)),
        importe: aguinaldoProporcional,
        nota: `${parseFloat(aguinaldoDias.toFixed(1))} de ${diasAg} días del año`,
      },
      ...(tipo === "despido"
        ? [
            { concepto: "Indemnización constitucional", dias: 90,          importe: indemnizacion,     nota: "3 meses de salario (Art. 50 LFT)" },
            { concepto: "20 días por año trabajado",    dias: parseFloat((20 * aniosTrabajados).toFixed(2)), importe: veinteDiasPorAnio, nota: `${parseFloat(aniosTrabajados.toFixed(2))} años` },
            { concepto: "Prima de antigüedad",          dias: parseFloat((12 * aniosTrabajados).toFixed(2)), importe: primaAntiguedad,   nota: "12 días por año (tope 2x UMA)" },
          ]
        : []),
    ]

    return {
      salarioPendiente, vacacionesProporcionales, primaVacacional,
      aguinaldoProporcional, indemnizacion, veinteDiasPorAnio, primaAntiguedad,
      total, desglose,
    }
  }, [salarioMensual, fechaIngreso, fechaBaja, tipo, diasVacGozados, diasAguinaldo, primaVacacionalPct, diasSalarioPendiente])

  function handleCalcular(e: React.FormEvent) {
    e.preventDefault()
    setCalculado(true)
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaCalculadora) }}
      />
      <main className="min-h-screen bg-[#FAF7F2]">

        {/* Header */}
        <div className="bg-[#1A1C26] border-b border-white/8">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 py-10">
            <div className="flex items-center gap-2 text-[#C49A3C]/60 text-xs mb-3">
              <Link href="/" className="hover:text-[#C49A3C] transition-colors">Inicio</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#C49A3C]">Herramientas</span>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-lg bg-[rgba(196,154,60,0.12)] border border-[rgba(196,154,60,0.3)] flex items-center justify-center">
                <Calculator className="w-5 h-5 text-[#C49A3C]" />
              </div>
              <h1 className="text-3xl md:text-4xl text-[#FAF7F2]" style={displayFont}>
                Calculadora de Finiquito
              </h1>
            </div>
            <p className="text-[#FAF7F2]/50 text-sm mt-2 max-w-xl">
              Calcula tu finiquito o liquidación según la Ley Federal del Trabajo. Gratis, sin registro, actualizado 2025.
            </p>
          </div>
        </div>

        {/* Form + Results */}
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-10 grid lg:grid-cols-5 gap-8">

          {/* ── Form ── */}
          <div className="lg:col-span-3">
            <form onSubmit={handleCalcular} className="bg-white border border-[#EAE4D9] rounded-2xl p-6 space-y-5">
              <h2 className="text-lg font-semibold text-[#0C0D10]" style={displayFont}>
                Datos del empleado
              </h2>

              {/* Salario */}
              <div>
                <label className="text-xs font-semibold text-[#0C0D10]/60 uppercase tracking-widest flex items-center mb-1.5">
                  Salario mensual bruto
                  <Tooltip text="Salario antes de descuentos del IMSS e ISR. El salario diario se calcula dividiendo entre 30 (Art. 27 LFT)." />
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0C0D10]/40 text-sm">$</span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    required
                    value={salarioMensual}
                    onChange={(e) => { setSalarioMensual(e.target.value); reset() }}
                    placeholder="15,000.00"
                    className="w-full pl-7 pr-4 py-2.5 border border-[#EAE4D9] rounded-lg text-sm text-[#0C0D10] focus:outline-none focus:border-[#C49A3C] focus:ring-1 focus:ring-[rgba(196,154,60,0.2)] transition-colors"
                  />
                </div>
                {salDiarioDisplay !== null ? (
                  <p className="text-[11px] text-[#C49A3C] font-semibold mt-1">
                    Salario diario: {fmt(salDiarioDisplay)}
                  </p>
                ) : (
                  <p className="text-[10px] text-[#0C0D10]/35 mt-1">Salario diario = mensual ÷ 30</p>
                )}
              </div>

              {/* Fechas */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", width: "100%", overflow: "hidden" }}>
                <div>
                  <label className="text-xs font-semibold text-[#0C0D10]/60 uppercase tracking-widest flex items-center mb-1.5">
                    Fecha de ingreso
                    <Tooltip text="Día en que iniciaste a trabajar (fecha de contratación o primer día laborado)." />
                  </label>
                  <input
                    type="date"
                    required
                    value={fechaIngreso}
                    onChange={(e) => { setFechaIngreso(e.target.value); reset() }}
                    className="w-full border border-[#EAE4D9] rounded-lg text-[#0C0D10] focus:outline-none focus:border-[#C49A3C] focus:ring-1 focus:ring-[rgba(196,154,60,0.2)] transition-colors"
                    style={dateInputStyle}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#0C0D10]/60 uppercase tracking-widest flex items-center mb-1.5">
                    Fecha de baja
                    <Tooltip text="Último día de trabajo. Para renuncias, es la fecha del último día laborado." />
                  </label>
                  <input
                    type="date"
                    required
                    value={fechaBaja}
                    onChange={(e) => { setFechaBaja(e.target.value); reset() }}
                    className="w-full border border-[#EAE4D9] rounded-lg text-[#0C0D10] focus:outline-none focus:border-[#C49A3C] focus:ring-1 focus:ring-[rgba(196,154,60,0.2)] transition-colors"
                    style={dateInputStyle}
                  />
                </div>
              </div>
              {tiempoTrabajado && (
                <p className="text-[11px] text-[#C49A3C] font-semibold -mt-2">
                  ↳ Tiempo trabajado: {tiempoTrabajado}
                </p>
              )}

              {/* Tipo de separación */}
              <div>
                <label className="text-xs font-semibold text-[#0C0D10]/60 uppercase tracking-widest flex items-center mb-1.5">
                  Tipo de separación
                  <Tooltip text="Renuncia: solo finiquito (salario + vacaciones + aguinaldo). Despido injustificado: finiquito + 3 meses de indemnización + 20 días/año + prima de antigüedad." />
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => { setTipo("renuncia"); reset() }}
                    className={`py-2.5 px-4 rounded-lg border text-sm font-medium transition-colors ${
                      tipo === "renuncia"
                        ? "bg-[rgba(196,154,60,0.1)] border-[#C49A3C] text-[#C49A3C]"
                        : "border-[#EAE4D9] text-[#0C0D10]/60 hover:border-[#C49A3C]/50"
                    }`}
                  >
                    Renuncia voluntaria
                  </button>
                  <button
                    type="button"
                    onClick={() => { setTipo("despido"); reset() }}
                    className={`py-2.5 px-4 rounded-lg border text-sm font-medium transition-colors ${
                      tipo === "despido"
                        ? "bg-[rgba(196,154,60,0.1)] border-[#C49A3C] text-[#C49A3C]"
                        : "border-[#EAE4D9] text-[#0C0D10]/60 hover:border-[#C49A3C]/50"
                    }`}
                  >
                    Despido injustificado
                  </button>
                </div>
              </div>

              {/* Parámetros legales */}
              <div className="border-t border-[#EAE4D9] pt-5 space-y-4">
                <p className="text-[10px] font-bold tracking-widest uppercase text-[#0C0D10]/30">
                  Parámetros legales
                </p>

                {/* Días de salario pendiente */}
                <div>
                  <label className="text-xs font-semibold text-[#0C0D10]/60 uppercase tracking-widest flex items-center mb-1.5">
                    Días de salario pendiente
                    <Tooltip text="Días trabajados del mes actual que aún no te pagaron. Se calcula automáticamente del día de tu fecha de baja, pero puedes ajustarlo." />
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="31"
                    value={diasSalarioPendiente}
                    placeholder={diasBajaPlaceholder}
                    onChange={(e) => { setDiasSalarioPendiente(e.target.value); reset() }}
                    className={inputCls}
                  />
                  {fechaBaja && diasSalarioPendiente === "" && (
                    <p className="text-[10px] text-[#0C0D10]/35 mt-1">
                      Auto-calculado: día {diasBajaPlaceholder} del mes de baja
                    </p>
                  )}
                </div>

                {/* Aguinaldo + Prima vacacional */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label className="text-xs font-semibold text-[#0C0D10]/60 uppercase tracking-widest flex items-center mb-1.5">
                      Días de aguinaldo
                      <Tooltip text="La LFT establece mínimo 15 días. Algunas empresas otorgan más por política interna o convenio colectivo." />
                    </label>
                    <input
                      type="number"
                      min="15"
                      value={diasAguinaldo}
                      onChange={(e) => { setDiasAguinaldo(e.target.value); reset() }}
                      className={inputCls}
                    />
                    <p className="text-[10px] text-[#0C0D10]/35 mt-1">Mínimo LFT: 15 días</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#0C0D10]/60 uppercase tracking-widest flex items-center mb-1.5">
                      Prima vacacional %
                      <Tooltip text="La LFT establece mínimo 25%. Algunas empresas pagan 50%, 100% u otro porcentaje superior." />
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="25"
                        max="200"
                        value={primaVacacionalPct}
                        onChange={(e) => { setPrimaVacacionalPct(e.target.value); reset() }}
                        className="w-full pl-3 pr-7 py-2.5 border border-[#EAE4D9] rounded-lg text-sm text-[#0C0D10] focus:outline-none focus:border-[#C49A3C] focus:ring-1 focus:ring-[rgba(196,154,60,0.2)] transition-colors"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0C0D10]/40 text-sm pointer-events-none">%</span>
                    </div>
                    <p className="text-[10px] text-[#0C0D10]/35 mt-1">Mínimo LFT: 25%</p>
                  </div>
                </div>

                {/* Vacaciones gozadas */}
                <div>
                  <label className="text-xs font-semibold text-[#0C0D10]/60 uppercase tracking-widest flex items-center mb-1.5">
                    Días de vacaciones ya gozados
                    <Tooltip text="Días que ya tomaste en el período anual en curso. Se descuentan de las vacaciones proporcionales que te corresponden." />
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={diasVacGozados}
                    onChange={(e) => { setDiasVacGozados(e.target.value); reset() }}
                    className={inputCls}
                  />
                </div>
              </div>

              {/* Advertencias */}
              {advertencias.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 space-y-1.5">
                  {advertencias.map((w) => (
                    <div key={w} className="flex items-start gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-amber-800">{w}</p>
                    </div>
                  ))}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#C49A3C] hover:bg-[#E2B865] text-[#0C0D10] font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Calculator className="w-4 h-4" />
                Calcular finiquito
              </button>
            </form>
          </div>

          {/* ── Results ── */}
          <div className="lg:col-span-2 space-y-4">
            {calculado && resultado ? (
              <>
                {/* Total */}
                <div
                  className="rounded-2xl p-6 border border-[rgba(196,154,60,0.4)]"
                  style={{ background: "linear-gradient(135deg, #1A1300 0%, #2A1F00 100%)" }}
                >
                  <p className="text-[#C49A3C]/70 text-xs font-semibold tracking-widest uppercase mb-1">
                    Total estimado
                  </p>
                  <p className="text-4xl font-light text-white" style={displayFont}>
                    {fmt(resultado.total)}
                  </p>
                  <p className="text-[#FAF7F2]/40 text-xs mt-2">
                    {tipo === "despido" ? "Despido injustificado" : "Renuncia voluntaria"} · Antes de impuestos
                  </p>
                </div>

                {/* Desglose */}
                <div className="bg-white border border-[#EAE4D9] rounded-2xl p-5 space-y-3">
                  <h3 className="text-sm font-semibold text-[#0C0D10]" style={displayFont}>
                    Desglose por concepto
                  </h3>
                  {resultado.desglose.map((item) => (
                    <div key={item.concepto} className="flex flex-col gap-0.5 pb-3 border-b border-[#EAE4D9] last:border-0 last:pb-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-medium text-[#0C0D10]">{item.concepto}</span>
                        <span className="text-xs font-semibold text-[#0C0D10] whitespace-nowrap">{fmt(item.importe)}</span>
                      </div>
                      {item.nota && (
                        <p className="text-[10px] text-[#0C0D10]/40">{item.nota}</p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Disclaimer */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-2.5">
                  <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-800 leading-relaxed">
                    Cálculo orientativo. El monto final puede variar según prestaciones superiores a la ley, convenios colectivos o resolución del IMSS. Consulta con un abogado laboral para asesoría específica.
                  </p>
                </div>

                {/* CTA */}
                <Link
                  href="/abogados?especialidad=Derecho+Laboral"
                  className="block bg-white border border-[#EAE4D9] hover:border-[#C49A3C] rounded-xl p-4 transition-colors group"
                >
                  <p className="text-xs font-semibold text-[#0C0D10] group-hover:text-[#C49A3C] transition-colors">
                    ¿Necesitas asesoría laboral? →
                  </p>
                  <p className="text-[11px] text-[#0C0D10]/45 mt-0.5">
                    Encuentra un abogado laboralista verificado en Lexia
                  </p>
                </Link>
              </>
            ) : (
              <div className="bg-white border border-[#EAE4D9] rounded-2xl p-8 text-center">
                <div className="text-5xl text-[#C49A3C]/15 mb-3" style={displayFont}>§</div>
                <p className="text-sm font-medium text-[#0C0D10]/50 mb-1" style={displayFont}>
                  Tu resultado aparecerá aquí
                </p>
                <p className="text-xs text-[#0C0D10]/35">
                  Llena el formulario y presiona calcular.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ── Sección educativa ── */}
        <div className="max-w-4xl mx-auto px-6 lg:px-8 pb-16">
          <div className="bg-white border border-[#EAE4D9] rounded-2xl p-8">
            <div className="flex items-center gap-2 mb-1">
              <span className="h-px flex-1 bg-[#EAE4D9]" />
              <p className="text-[10px] font-bold tracking-widest uppercase text-[#0C0D10]/30">
                Guía rápida
              </p>
              <span className="h-px flex-1 bg-[#EAE4D9]" />
            </div>
            <h2 className="text-2xl font-light text-[#0C0D10] mt-4 mb-6" style={displayFont}>
              ¿Cuál es la diferencia entre finiquito y liquidación?
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Finiquito */}
              <div className="border border-[#EAE4D9] rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 rounded-full bg-[#F5F0E8] flex items-center justify-center text-xs font-bold text-[#0C0D10]/40">R</span>
                  <h3 className="text-sm font-semibold text-[#0C0D10]">Finiquito (renuncia voluntaria)</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed mb-3">
                  Cuando el trabajador decide terminar la relación laboral. Tienes derecho a cobrar lo que ya ganaste:
                </p>
                <ul className="space-y-1.5">
                  {[
                    "Salario de los días pendientes por pagar",
                    "Vacaciones proporcionales no gozadas",
                    "Prima vacacional (mínimo 25% sobre vacaciones)",
                    "Aguinaldo proporcional al tiempo trabajado",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-[#0C0D10]/70">
                      <span className="text-[#C49A3C] mt-0.5 flex-shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Liquidación */}
              <div className="border border-[rgba(196,154,60,0.3)] rounded-xl p-5 bg-[rgba(196,154,60,0.03)]">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 rounded-full bg-[rgba(196,154,60,0.12)] flex items-center justify-center text-xs font-bold text-[#C49A3C]">D</span>
                  <h3 className="text-sm font-semibold text-[#0C0D10]">Liquidación (despido injustificado)</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed mb-3">
                  Cuando el patrón termina la relación sin causa justificada (Art. 48 LFT). Recibes el finiquito más:
                </p>
                <ul className="space-y-1.5">
                  {[
                    "3 meses de salario como indemnización constitucional",
                    "20 días de salario por cada año trabajado",
                    "Prima de antigüedad: 12 días por año (tope 2x UMA)",
                    "Partes proporcionales de salario, vacaciones y aguinaldo",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-[#0C0D10]/70">
                      <span className="text-[#C49A3C] mt-0.5 flex-shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-[#EAE4D9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-xs text-slate-500 max-w-md leading-relaxed">
                Si tienes dudas sobre si tu caso aplica como despido injustificado, un abogado laboral puede orientarte sin costo inicial.
              </p>
              <Link
                href="/abogados?especialidad=Derecho+Laboral"
                className="flex-none text-xs font-semibold text-[#C49A3C] hover:text-[#0C0D10] transition-colors whitespace-nowrap flex items-center gap-1"
              >
                Consultar con un abogado <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

      </main>
    </>
  )
}
