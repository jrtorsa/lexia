import { NextRequest, NextResponse } from "next/server"
import { timingSafeEqual } from "crypto"

// Protege EXCLUSIVAMENTE la ruta privada — ver `config.matcher` abajo.
// El resto del sitio no pasa por aquí en absoluto. El matcher debe ser un
// string literal estático (Next.js lo analiza en build time) — no una
// referencia a variable, o deja de reconocerse y el proxy corre sobre
// todas las rutas por accidente.

function safeEqual(a: string, b: string) {
  const bufA = Buffer.from(a)
  const bufB = Buffer.from(b)
  if (bufA.length !== bufB.length) return false
  return timingSafeEqual(bufA, bufB)
}

export function proxy(request: NextRequest) {
  const secret = process.env.PRIVATE_ROUTE_SECRET
  if (!secret) {
    return new NextResponse("PRIVATE_ROUTE_SECRET no configurado", { status: 500 })
  }

  const authHeader = request.headers.get("authorization")
  if (authHeader?.startsWith("Basic ")) {
    const decoded = Buffer.from(authHeader.slice(6), "base64").toString("utf-8")
    const password = decoded.split(":")[1] ?? ""
    if (safeEqual(password, secret)) {
      return NextResponse.next()
    }
  }

  return new NextResponse("Autenticación requerida", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Privado"' },
  })
}

export const config = {
  matcher: ["/private/saldo-hipotecario-ZUgWUk5saFSY"],
}
