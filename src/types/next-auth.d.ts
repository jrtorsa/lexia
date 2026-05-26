import "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      slug: string
      plan: string
      googleAccessToken?: string
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string
    slug?: string
    plan?: string
    googleAccessToken?: string
    googleRefreshToken?: string
  }
}
