import { Link } from 'react-router-dom'
import { Card } from '../components/ui/Card'

export function NotFoundPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <Card className="grid gap-2">
        <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
          404
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Page not found</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          The page you’re looking for doesn’t exist.
        </p>
        <div className="pt-2">
          <Link className="text-sm font-medium text-violet-700 hover:underline dark:text-violet-300" to="/">
            Go to dashboard
          </Link>
        </div>
      </Card>
    </div>
  )
}

