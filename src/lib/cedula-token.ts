import { createHmac } from "crypto"

export function makeToken(lawyerId: string, action: "aprobar" | "rechazar") {
  return createHmac("sha256", process.env.NEXTAUTH_SECRET ?? "secret")
    .update(`${lawyerId}:${action}`)
    .digest("hex")
}

export function verifyToken(lawyerId: string, action: string, token: string) {
  if (action !== "aprobar" && action !== "rechazar") return false
  const expected = makeToken(lawyerId, action)
  return expected === token
}
