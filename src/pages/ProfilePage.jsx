import { useState } from 'react'
import { updateProfile } from 'firebase/auth'
import { useAuth } from '../hooks/useAuth'
import { auth } from '../services/firebase'
import { Card } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'

export function ProfilePage() {
  const { user } = useAuth()
  const [name, setName] = useState(user?.displayName || '')
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState(null)

  async function onSave(e) {
    e.preventDefault()
    setMsg(null)
    setSaving(true)
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: name.trim() })
        setMsg('Saved.')
      }
    } catch (err) {
      setMsg(err?.message || 'Could not save.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          Basic account details from Firebase Authentication.
        </p>
      </div>

      <Card className="grid gap-4">
        <div className="grid gap-1">
          <div className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Email
          </div>
          <div className="text-sm">{user?.email}</div>
        </div>

        <form className="grid gap-3" onSubmit={onSave}>
          <Input label="Display name" value={name} onChange={(e) => setName(e.target.value)} />
          <div className="flex items-center gap-3">
            <Button type="submit" disabled={saving}>
              {saving ? 'Saving…' : 'Save'}
            </Button>
            {msg ? (
              <div className="text-sm text-slate-600 dark:text-slate-300">
                {msg}
              </div>
            ) : null}
          </div>
        </form>
      </Card>
    </div>
  )
}

