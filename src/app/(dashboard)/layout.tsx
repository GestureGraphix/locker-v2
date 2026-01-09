import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()

  // Redirect unauthenticated users to login
  if (!session) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-bold">Locker</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{session.user.name}</span>
          </div>
        </div>
      </header>
      <main className="container px-4 py-6">{children}</main>
    </div>
  )
}
