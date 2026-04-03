import { Card } from '../components/ui/Card'
import { Toggle } from '../components/ui/Toggle'
import { useTheme } from '../hooks/useTheme'

export function SettingsPage() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          Preferences for this device.
        </p>
      </div>

      <Card className="grid gap-3">
        <Toggle
          label="Dark mode"
          checked={theme === 'dark'}
          onChange={(v) => setTheme(v ? 'dark' : 'light')}
        />
        <div className="text-xs text-slate-500 dark:text-slate-400">
          Stored locally in your browser.
        </div>
      </Card>
    </div>
  )
}

