import { CheckCircle2, AlertCircle, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const INVOICES = [
  { id: "INV-0023", date: "2026-03-01", amount: "$599.00", status: "Pagado" },
  { id: "INV-0019", date: "2026-02-01", amount: "$599.00", status: "Pagado" },
  { id: "INV-0015", date: "2026-01-01", amount: "$599.00", status: "Pagado" },
]

export default function SuscripcionPage() {
  return (
    <div className="p-8 space-y-8 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Suscripción</h1>
        <p className="text-slate-500 mt-1">Gestiona tu plan y métodos de pago.</p>
      </div>

      {/* Plan actual */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="font-semibold text-slate-900 text-lg">Plan Premium</h2>
              <Badge className="bg-amber-400 text-slate-900 border-0">Activo</Badge>
            </div>
            <p className="text-slate-500 text-sm">$599 MXN / mes · Próximo cobro: 1 de abril de 2026</p>
          </div>
          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-amber-600" />
          </div>
        </div>

        <Separator className="my-4" />

        <div className="grid sm:grid-cols-2 gap-3">
          {[
            "Posición preferente en búsquedas",
            "Botón de WhatsApp directo",
            "Estadísticas de visitas y contactos",
            "Badge de perfil verificado",
            "Hasta 5 especialidades",
          ].map((f) => (
            <div key={f} className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span className="text-slate-600">{f}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-6">
          <Button variant="outline" className="text-sm">
            Cambiar plan
          </Button>
          <Button variant="outline" className="text-sm text-red-500 hover:text-red-600 hover:border-red-300">
            Cancelar suscripción
          </Button>
        </div>
      </div>

      {/* Método de pago */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h2 className="font-semibold text-slate-900 mb-4">Método de pago</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-7 bg-slate-800 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">VISA</span>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-800">•••• •••• •••• 4242</p>
              <p className="text-xs text-slate-400">Vence 12/2028</p>
            </div>
          </div>
          <Button variant="outline" size="sm">Actualizar</Button>
        </div>
      </div>

      {/* Historial */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-900">Historial de pagos</h2>
        </div>
        <div className="divide-y divide-slate-100">
          {INVOICES.map((inv) => (
            <div key={inv.id} className="flex items-center justify-between px-6 py-4">
              <div>
                <p className="text-sm font-medium text-slate-800">{inv.id}</p>
                <p className="text-xs text-slate-400">{inv.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge className="bg-green-100 text-green-700 border-0 text-xs">{inv.status}</Badge>
                <span className="text-sm font-medium text-slate-700">{inv.amount}</span>
                <button className="text-slate-400 hover:text-blue-700 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Aviso */}
      <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm">
        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-amber-800">
          Los pagos son procesados de forma segura por <strong>Stripe</strong>. Lexia no almacena datos de tarjeta.
        </div>
      </div>
    </div>
  )
}
