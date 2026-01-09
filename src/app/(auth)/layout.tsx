import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()

  // Redirect authenticated users to dashboard
  if (session) {
    redirect('/training')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50 px-4">
      <div className="w-full max-w-md">{children}</div>
    </div>
  )
}
