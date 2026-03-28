"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Calculator, ChevronRight, Info } from "lucide-react"

const displayFont = { fontFamily: "var(--font-cormorant)" }

// LFT vacation days table (reformed 2022, effective 2023)
function diasVacaciones(years: number): number {
  if (years < 1) return 0
  if (years === 1) return 12
  if (years === 2) return 14
  if (years === 3) return 16
  if (years === 4) return 18
  if (years <= 10) return 20 + Math.floor((years - 5) / 1) * 0 + (years >= 5 ? 2 : 0)
  // years 5-10: 22, 11-15: 24, 16-20: 26 ...
  if (years <= 10) return 22
  if (years <= 15) return 24
  if (years <= 20) return 26
  if (years <= 25) return 28
  return 28 + Math.floor((years - 25) / 5) * 2
}

function getDiasVacLFT(years: number): number {
  if (years < 1) return 0
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

export default function HerramientasPage() {
  const [salarioMensual, setSalarioMensual] = useState("")
  const [fechaIngreso, setFechaIngreso] = useState("")
  const [fechaBaja, setFechaBaja] = useState("")
  const [tipo, setTipo] = useState<TipoSeparacion>("renuncia")
  const [diasVacGozados, setDiasVacGozados] = useState("0")
  const [calculado, setCalculado] = useState(false)

  const resultado = useMemo<Resultado | null>(() => {
    if (!salarioMensual || !fechaIngreso || !fechaBaja) return null

    const salDiario = parseFloat(salarioMensual) / 30
    const ingreso = new Date(fechaIngreso)
    const baja = new Date(fechaBaja)
    if (baja <= ingreso) return null

    const msTotal = baja.getTime() - ingreso.getTime()
    const diasTotales = msTotal / (1000 * 60 * 60 * 24)
    const aniosTrabajados = diasTotales / 365
    const aniosCompletos = Math.floor(aniosTrabajados)

    // Days worked in current year period
    const inicioAnioActual = new Date(ingreso)
    inicioAnioActual.setFullYear(ingreso.getFullYear() + aniosCompletos)
    const diasAnioActual = (baja.getTime() - inicioAnioActual.getTime()) / (1000 * 60 * 60 * 24)

    // 1. Salario pendiente (days worked since last payment — approximated as partial month)
    const diasPendientes = baja.getDate()
    const salarioPendiente = diasPendientes * salDiario

    // 2. Vacaciones proporcionales
    const diasVacCorresponden = getDiasVacLFT(aniosCompletos + 1)
    const vacPropDias = (diasVacCorresponden * diasAnioActual) / 365
    const vacGozados = parseFloat(diasVacGozados) || 0
    const vacRestantes = Math.max(0, vacPropDias - vacGozados)
    const vacacionesProporcionales = vacRestantes * salDiario

    // 3. Prima vacacional (25%)
    const primaVacacional = vacacionesProporcionales * 0.25

    // 4. Aguinaldo proporcional (15 days/year)
    const inicioAnioCalendario = new Date(baja.getFullYear(), 0, 1)
    const diasAnioCalendario = (baja.getTime() - inicioAnioCalendario.getTime()) / (1000 * 60 * 60 * 24)
    const aguinaldoDias = (15 * diasAnioCalendario) / 365
    const aguinaldoProporcional = aguinaldoDias * salDiario

    // 5-7. Despido injustificado
    let indemnizacion = 0
    let veinteDiasPorAnio = 0
    let primaAntiguedad = 0

    if (tipo === "despido") {
      indemnizacion = 90 * salDiario
      veinteDiasPorAnio = 20 * aniosTrabajados * salDiario
      // Prima de antigüedad: 12 days per year, capped at 2x UMA (~$113/day in 2024)
      const salDiarioCap = Math.min(salDiario, 226)
      primaAntiguedad = 12 * aniosTrabajados * salDiarioCap
    }

    const total =
      salarioPendiente +
      vacacionesProporcionales +
      primaVacacional +
      aguinaldoProporcional +
      indemnizacion +
      veinteDiasPorAnio +
      primaAntiguedad

    const desglose = [
      {
        concepto: "Salario pendiente",
        dias: diasPendientes,
        importe: salarioPendiente,
        nota: `${diasPendientes} días del mes en curso`,
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
        nota: "25% sobre vacaciones",
      },
      {
        concepto: "Aguinaldo proporcional",
        dias: parseFloat(aguinaldoDias.toFixed(2)),
        importe: aguinaldoProporcional,
        nota: `${parseFloat(aguinaldoDias.toFixed(1))} de 15 días del año`,
      },
      ...(tipo === "despido"
        ? [
            {
              concepto: "Indemnización constitucional",
              dias: 90,
              importe: indemnizacion,
              nota: "3 meses de salario (Art. 50 LFT)",
            },
            {
              concepto: "20 días por año trabajado",
              dias: parseFloat((20 * aniosTrabajados).toFixed(2)),
              importe: veinteDiasPorAnio,
              nota: `${parseFloat(aniosTrabajados.toFixed(2))} años`,
            },
            {
              concepto: "Prima de antigüedad",
              dias: parseFloat((12 * aniosTrabajados).toFixed(2)),
              importe: primaAntiguedad,
              nota: "12 días por año (tope 2x UMA)",
            },
          ]
        : []),
    ]

    return {
      salarioPendiente,
      vacacionesProporcionales,
      primaVacacional,
      aguinaldoProporcional,
      indemnizacion,
      veinteDiasPorAnio,
      primaAntiguedad,
      total,
      desglose,
    }
  }, [salarioMensual, fechaIngreso, fechaBaja, tipo, diasVacGozados])

  function handleCalcuar(e: React.FormEvent) {
    e.preventDefault()
    setCalculado(true)
  }

  return (
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
              <Calculator className="w-4.5 h-4.5 text-[#C49A3C]" />
            </div>
            <h1 className="text-3xl md:text-4xl text-[#FAF7F2]" style={displayFont}>
              Calculadora de Finiquito
            </h1>
          </div>
          <p className="text-[#FAF7F2]/50 text-sm mt-2 max-w-xl">
            Calcula el finiquito que corresponde según la Ley Federal del Trabajo (LFT). Aplica para trabajadores en México.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-10 grid lg:grid-cols-5 gap-8">
        {/* Form */}
        <div className="lg:col-span-3">
          <form onSubmit={handleCalcuar} className="bg-white border border-[#EAE4D9] rounded-2xl p-6 space-y-5">
            <h2 className="text-lg font-semibold text-[#0C0D10]" style={displayFont}>
              Datos del empleado
            </h2>

            <div>
              <label className="text-xs font-semibold text-[#0C0D10]/60 uppercase tracking-widest block mb-1.5">
                Salario mensual bruto
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0C0D10]/40 text-sm">$</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  value={salarioMensual}
                  onChange={(e) => { setSalarioMensual(e.target.value); setCalculado(false) }}
                  placeholder="15,000.00"
                  className="w-full pl-7 pr-4 py-2.5 border border-[#EAE4D9] rounded-lg text-sm text-[#0C0D10] focus:outline-none focus:border-[#C49A3C] focus:ring-1 focus:ring-[rgba(196,154,60,0.2)] transition-colors"
                />
              </div>
              <p className="text-[10px] text-[#0C0D10]/35 mt-1">Salario diario = mensual ÷ 30</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#0C0D10]/60 uppercase tracking-widest block mb-1.5">
                  Fecha de ingreso
                </label>
                <input
                  type="date"
                  required
                  value={fechaIngreso}
                  onChange={(e) => { setFechaIngreso(e.target.value); setCalculado(false) }}
                  className="w-full px-3 py-2.5 border border-[#EAE4D9] rounded-lg text-sm text-[#0C0D10] focus:outline-none focus:border-[#C49A3C] focus:ring-1 focus:ring-[rgba(196,154,60,0.2)] transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#0C0D10]/60 uppercase tracking-widest block mb-1.5">
                  Fecha de baja
                </label>
                <input
                  type="date"
                  required
                  value={fechaBaja}
                  onChange={(e) => { setFechaBaja(e.target.value); setCalculado(false) }}
                  className="w-full px-3 py-2.5 border border-[#EAE4D9] rounded-lg text-sm text-[#0C0D10] focus:outline-none focus:border-[#C49A3C] focus:ring-1 focus:ring-[rgba(196,154,60,0.2)] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#0C0D10]/60 uppercase tracking-widest block mb-1.5">
                Tipo de separación
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => { setTipo("renuncia"); setCalculado(false) }}
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
                  onClick={() => { setTipo("despido"); setCalculado(false) }}
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

            <div>
              <label className="text-xs font-semibold text-[#0C0D10]/60 uppercase tracking-widest block mb-1.5">
                Días de vacaciones ya gozados este año
              </label>
              <input
                type="number"
                min="0"
                value={diasVacGozados}
                onChange={(e) => { setDiasVacGozados(e.target.value); setCalculado(false) }}
                className="w-full px-3 py-2.5 border border-[#EAE4D9] rounded-lg text-sm text-[#0C0D10] focus:outline-none focus:border-[#C49A3C] focus:ring-1 focus:ring-[rgba(196,154,60,0.2)] transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#C49A3C] hover:bg-[#E2B865] text-[#0C0D10] font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Calculator className="w-4 h-4" />
              Calcular finiquito
            </button>
          </form>
        </div>

        {/* Results */}
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
                <h3 className="text-sm font-semibold text-[#0C0D10]">Desglose</h3>
                {resultado.desglose.map((item) => (
                  <div key={item.concepto} className="flex flex-col gap-0.5 pb-3 border-b border-[#EAE4D9] last:border-0 last:pb-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-[#0C0D10]">{item.concepto}</span>
                      <span className="text-xs font-semibold text-[#0C0D10]">{fmt(item.importe)}</span>
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
                  Este cálculo es orientativo. El monto final puede variar según prestaciones superiores a la ley, convenios colectivos o resolución del IMSS. Consulta con un abogado laboral para asesoría específica.
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
                  Encuentra un abogado laboralista verificado
                </p>
              </Link>
            </>
          ) : (
            <div className="bg-white border border-[#EAE4D9] rounded-2xl p-8 text-center">
              <div className="text-5xl text-[#C49A3C]/15 mb-3" style={displayFont}>§</div>
              <p className="text-sm text-[#0C0D10]/40">
                Llena el formulario y presiona calcular para ver el desglose.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
