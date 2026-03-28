import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifyToken } from "@/app/actions/verificarCedula"
import { sendCedulaApprovedEmail, sendCedulaRejectedEmail } from "@/lib/email"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const id     = searchParams.get("id")     ?? ""
  const action = searchParams.get("action") ?? ""
  const token  = searchParams.get("token")  ?? ""

  if (!id || !action || !token) {
    return new NextResponse("Parámetros inválidos", { status: 400 })
  }

  if (!verifyToken(id, action, token)) {
    return new NextResponse("Token inválido", { status: 403 })
  }

  const lawyer = await prisma.lawyer.findUnique({
    where: { id },
    select: { id: true, name: true, email: true, cedulaStatus: true },
  })

  if (!lawyer) {
    return new NextResponse("Abogado no encontrado", { status: 404 })
  }

  if (lawyer.cedulaStatus === "approved") {
    return new NextResponse(html("Ya verificado", `La cédula de ${lawyer.name} ya estaba aprobada.`, "green"), {
      headers: { "Content-Type": "text/html" },
    })
  }

  if (action === "aprobar") {
    await prisma.lawyer.update({
      where: { id },
      data: { isVerified: true, cedulaStatus: "approved" },
    })
    sendCedulaApprovedEmail({ to: lawyer.email, name: lawyer.name }).catch(console.error)
    return new NextResponse(html("✓ Cédula aprobada", `${lawyer.name} ha sido marcado como verificado y recibirá un email.`, "green"), {
      headers: { "Content-Type": "text/html" },
    })
  }

  if (action === "rechazar") {
    await prisma.lawyer.update({
      where: { id },
      data: { isVerified: false, cedulaStatus: "rejected" },
    })
    sendCedulaRejectedEmail({ to: lawyer.email, name: lawyer.name }).catch(console.error)
    return new NextResponse(html("✗ Cédula rechazada", `Se notificó a ${lawyer.name} para que corrija su cédula.`, "red"), {
      headers: { "Content-Type": "text/html" },
    })
  }

  return new NextResponse("Acción no reconocida", { status: 400 })
}

function html(title: string, message: string, color: "green" | "red") {
  const bg = color === "green" ? "#16a34a" : "#dc2626"
  return `<!DOCTYPE html><html><body style="font-family:Georgia,serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;background:#FAF7F2;">
    <div style="text-align:center;max-width:400px;padding:40px;background:white;border-radius:16px;border:1px solid #EAE4D9;">
      <div style="width:64px;height:64px;border-radius:50%;background:${bg};display:flex;align-items:center;justify-content:center;margin:0 auto 20px;font-size:28px;color:white;">${color === "green" ? "✓" : "✗"}</div>
      <h2 style="color:#0C0D10;margin:0 0 12px;">${title}</h2>
      <p style="color:#666;margin:0 0 24px;">${message}</p>
      <a href="https://lexiamx.com" style="color:#C49A3C;font-size:13px;">Ir a Lexia</a>
    </div>
  </body></html>`
}
