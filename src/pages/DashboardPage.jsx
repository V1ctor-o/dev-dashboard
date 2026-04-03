import { Card } from '../components/ui/Card'
import { useAuth } from '../hooks/useAuth'
import { useNotes } from '../hooks/useNotes'
import { useTasks } from '../hooks/useTasks'

export function DashboardPage() {
  const { user } = useAuth()
  const { notes } = useNotes(user?.uid)
  const { tasks } = useTasks(user?.uid)

  const remaining = tasks.filter((t) => !t.done).length

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          Welcome back{user?.displayName ? `, ${user.displayName}` : ''}.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <div className="text-sm text-slate-600 dark:text-slate-300">
            Notes
          </div>
          <div className="mt-2 text-3xl font-semibold">{notes.length}</div>
        </Card>
        <Card>
          <div className="text-sm text-slate-600 dark:text-slate-300">
            Tasks
          </div>
          <div className="mt-2 text-3xl font-semibold">{tasks.length}</div>
        </Card>
        <Card>
          <div className="text-sm text-slate-600 dark:text-slate-300">
            Remaining
          </div>
          <div className="mt-2 text-3xl font-semibold">{remaining}</div>
        </Card>
      </div>
    </div>
  )
}

