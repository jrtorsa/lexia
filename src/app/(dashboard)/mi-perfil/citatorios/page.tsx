import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import CitatoriosClient from './CitatoriosClient'

export const metadata = {
  title: 'Mis Citatorios | Lexia',
}

export default async function CitatoriosPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  return <CitatoriosClient hasGoogle={!!session.user.googleAccessToken} />
}
