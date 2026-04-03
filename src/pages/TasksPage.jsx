import { useState } from 'react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { useAuth } from '../hooks/useAuth'
import { useTasks } from '../hooks/useTasks'
import { addTask, deleteTask, toggleTaskDone } from '../services/tasksService'

export function TasksPage() {
  const { user } = useAuth()
  const { tasks, loading } = useTasks(user?.uid)
  const [title, setTitle] = useState('')
  const [busyId, setBusyId] = useState(null)

  async function onAdd(e) {
    e.preventDefault()
    const t = title.trim()
    if (!t) return
    setTitle('')
    await addTask({ uid: user.uid, title: t })
  }

  async function onToggle(task) {
    setBusyId(task.id)
    try {
      await toggleTaskDone({ uid: user.uid, id: task.id, done: !task.done })
    } finally {
      setBusyId(null)
    }
  }

  async function onDelete(task) {
    setBusyId(task.id)
    try {
      await deleteTask({ uid: user.uid, id: task.id })
    } finally {
      setBusyId(null)
    }
  }

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Tasks</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          A simple checklist synced to Firestore.
        </p>
      </div>

      <Card>
        <form className="flex flex-col gap-2 sm:flex-row" onSubmit={onAdd}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a task…"
            className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-violet-500/40 focus:ring-2 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
          />
          <Button type="submit">Add</Button>
        </form>
      </Card>

      <Card className="p-0">
        <div className="border-b border-slate-200 px-4 py-3 text-sm font-medium dark:border-slate-800">
          Your tasks
        </div>
        <div className="p-2">
          {loading ? (
            <div className="px-2 py-3 text-sm text-slate-600 dark:text-slate-300">
              Loading…
            </div>
          ) : tasks.length ? (
            <div className="grid gap-1">
              {tasks.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between gap-3 rounded-lg px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-950/40"
                >
                  <label className="flex flex-1 cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      checked={!!t.done}
                      onChange={() => onToggle(t)}
                      disabled={busyId === t.id}
                      className="h-4 w-4 accent-violet-600"
                    />
                    <span
                      className={[
                        'text-sm',
                        t.done
                          ? 'text-slate-500 line-through dark:text-slate-400'
                          : 'text-slate-900 dark:text-slate-100',
                      ].join(' ')}
                    >
                      {t.title}
                    </span>
                  </label>

                  <Button
                    variant="ghost"
                    className="px-3"
                    onClick={() => onDelete(t)}
                    disabled={busyId === t.id}
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-2 py-3 text-sm text-slate-600 dark:text-slate-300">
              No tasks yet.
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

