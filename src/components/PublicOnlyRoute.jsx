import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function PublicOnlyRoute() {
  const { user, loading } = useAuth()

  if (loading) return <Outlet />
  if (user) return <Navigate to="/" replace />
  return <Outlet />
}

