import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { SetupPage } from '../pages/SetupPage'

export function ProtectedRoute() {
  const { user, loading, firebaseConfigured } = useAuth()

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="text-sm text-slate-600 dark:text-slate-300">
          Loading…
        </div>
      </div>
    )
  }

  if (!firebaseConfigured) return <SetupPage />
  if (!user) return <Navigate to="/login" replace />

  return <Outlet />
}

