import { NavLink, Outlet } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useTheme } from '../../hooks/useTheme'
import { Button } from '../ui/Button'
import { logout } from '../../services/authService'

function Item({ to, children, end, onNavigate }) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onNavigate}
      className={({ isActive }) =>
        [
          'rounded-lg px-3 py-2 text-sm font-medium transition',
          isActive
            ? 'bg-violet-600 text-white dark:bg-violet-500'
            : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800',
        ].join(' ')
      }
    >
      {children}
    </NavLink>
  )
}

export function AppShell() {
  const [open, setOpen] = useState(false)
  const { user } = useAuth()
  const { theme, toggleTheme } = useTheme()

  const nav = [
    { to: '/', label: 'Dashboard', end: true },
    { to: '/notes', label: 'Notes' },
    { to: '/tasks', label: 'Tasks' },
    { to: '/profile', label: 'Profile' },
    { to: '/settings', label: 'Settings' },
  ]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/70">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle navigation"
            >
              Menu
            </button>
            <div className="font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              Dev Dashboard
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              className="px-3"
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              title="Toggle dark mode"
            >
              {theme === 'dark' ? 'Dark' : 'Light'}
            </Button>
            <div className="hidden text-sm text-slate-600 dark:text-slate-300 sm:block">
              {user?.displayName || user?.email}
            </div>
            <Button variant="ghost" onClick={logout}>
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-6 md:grid-cols-[240px_1fr]">
        <aside
          className={[
            'rounded-xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900',
            'md:sticky md:top-[76px] md:h-[calc(100vh-76px-48px)] md:self-start',
            open ? 'block' : 'hidden md:block',
          ].join(' ')}
        >
          <nav className="grid gap-1">
            {nav.map((n) => (
              <Item
                key={n.to}
                to={n.to}
                end={n.end}
                onNavigate={() => setOpen(false)}
              >
                {n.label}
              </Item>
            ))}
          </nav>
        </aside>

        <main className="min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

