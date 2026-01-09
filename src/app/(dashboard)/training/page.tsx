import { getSession } from '@/lib/session'

export default async function TrainingPage() {
  const session = await getSession()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Training</h2>
        <p className="text-muted-foreground">Welcome back, {session?.user.name}!</p>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <p className="text-muted-foreground">
          Training sessions and workouts will appear here. This feature is coming soon.
        </p>
      </div>
    </div>
  )
}
