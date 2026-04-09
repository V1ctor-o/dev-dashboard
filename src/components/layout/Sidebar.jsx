import { NavLink } from 'react-router-dom'

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

export function Sidebar({ open, onNavigate, nav }) {
  return (
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
            onNavigate={onNavigate}
          >
            {n.label}
          </Item>
        ))}
      </nav>
    </aside>
  )
}
