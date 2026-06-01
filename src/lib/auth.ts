import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid email profile https://www.googleapis.com/auth/calendar",
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),
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
    async signIn({ user, account }) {
      if (account?.provider !== "google") return true

      const lawyer = await prisma.lawyer.findUnique({
        where: { email: user.email! },
      })

      // Only allow sign-in for lawyers with an existing Lexia account
      if (!lawyer) return "/login?error=GoogleAccountNotFound"

      await prisma.lawyer.update({
        where: { email: user.email! },
        data: {
          googleId: account.providerAccountId,
          googleAccessToken: account.access_token,
          ...(account.refresh_token ? { googleRefreshToken: account.refresh_token } : {}),
          // Only set photoUrl from Google if the lawyer hasn't uploaded a custom photo
          ...(user.image && !lawyer.photoUrl ? { photoUrl: user.image } : {}),
        },
      })

      return true
    },
    async jwt({ token, user, account }) {
      // Credentials sign-in
      if (user && !account?.provider) {
        token.id   = user.id
        token.slug = (user as { slug?: string }).slug
        token.plan = (user as { plan?: string }).plan
      }
      // Google sign-in — look up lawyer to get Lexia id, slug, plan
      if (account?.provider === "google") {
        const lawyer = await prisma.lawyer.findUnique({
          where: { email: token.email! },
          include: {
            memberships: {
              include: { plan: true },
              orderBy: { createdAt: "desc" },
              take: 1,
            },
          },
        })
        if (lawyer) {
          token.id   = lawyer.id
          token.slug = lawyer.slug
          token.plan = lawyer.memberships[0]?.plan.name ?? "Básico"
        }
        token.googleAccessToken  = account.access_token
        token.googleRefreshToken = account.refresh_token
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id                = token.id as string
        session.user.slug              = token.slug as string
        session.user.plan              = token.plan as string
        session.user.googleAccessToken = token.googleAccessToken
      }
      return session
    },
  },
}
