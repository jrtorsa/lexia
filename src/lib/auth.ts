import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const lawyer = await prisma.lawyer.findUnique({
          where: { email: credentials.email },
          include: {
            memberships: {
              include: { plan: true },
              orderBy: { createdAt: "desc" },
              take: 1,
            },
          },
        })

        if (!lawyer) return null

        const valid = await bcrypt.compare(credentials.password, lawyer.password)
        if (!valid) return null

        const plan = lawyer.memberships[0]?.plan.name ?? "Básico"

        return {
          id: lawyer.id,
          email: lawyer.email,
          name: lawyer.name,
          slug: lawyer.slug,
          plan,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id   = user.id
        token.slug = (user as { slug?: string }).slug
        token.plan = (user as { plan?: string }).plan
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id   = token.id as string
        session.user.slug = token.slug as string
        session.user.plan = token.plan as string
      }
      return session
    },
  },
}
