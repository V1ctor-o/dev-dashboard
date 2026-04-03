import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { loginWithEmail } from '../services/authService'
import { useAuth } from '../hooks/useAuth'

export function LoginPage() {
  const { firebaseConfigured } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await loginWithEmail({ email, password })
      navigate('/', { replace: true })
    } catch (err) {
      setError(err?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 dark:bg-slate-950">
      <div className="mx-auto w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Dev Dashboard</h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Sign in to continue
          </p>
        </div>

        <Card>
          <form className="grid gap-3" onSubmit={onSubmit}>
            {!firebaseConfigured ? (
              <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-200">
                Firebase isn’t configured yet. Fill in your <code>.env</code>{' '}
                values (see <code>.env.example</code>) and restart the dev
                server.
              </div>
            ) : null}
            <Input
              label="Email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error ? (
              <div className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-200">
                {error}
              </div>
            ) : null}

            <Button type="submit" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>
        </Card>

        <p className="mt-4 text-center text-sm text-slate-600 dark:text-slate-300">
          No account?{' '}
          <Link className="font-medium text-violet-700 hover:underline dark:text-violet-300" to="/signup">
            Create one
          </Link>
        </p>
      </div>
    </div>
  )
}

