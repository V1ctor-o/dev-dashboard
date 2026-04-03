import { useEffect, useMemo, useState } from 'react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { useAuth } from '../hooks/useAuth'
import { useNotes } from '../hooks/useNotes'
import { addNote, deleteNote, updateNote } from '../services/notesService'

export function NotesPage() {
  const { user } = useAuth()
  const { notes, loading } = useNotes(user?.uid)
  const [selectedId, setSelectedId] = useState(null)
  const selected = useMemo(
    () => notes.find((n) => n.id === selectedId) || null,
    [notes, selectedId],
  )

  const [draftTitle, setDraftTitle] = useState('')
  const [draftBody, setDraftBody] = useState('')

  useEffect(() => {
    if (!selected && notes.length && !selectedId) setSelectedId(notes[0].id)
  }, [notes, selected, selectedId])

  useEffect(() => {
    setDraftTitle(selected?.title || '')
    setDraftBody(selected?.body || '')
  }, [selected?.id, selected?.title, selected?.body])

  async function onCreate() {
    const id = await addNote({ uid: user.uid, title: 'New note', body: '' })
    setSelectedId(id)
  }

  async function onSave() {
    if (!selected) return
    await updateNote({
      uid: user.uid,
      id: selected.id,
      patch: { title: draftTitle, body: draftBody },
    })
  }

  async function onDelete() {
    if (!selected) return
    const id = selected.id
    await deleteNote({ uid: user.uid, id })
    setSelectedId((cur) => (cur === id ? null : cur))
  }

  return (
    <div className="grid gap-6">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Notes</h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Quick notes synced to Firestore.
          </p>
        </div>
        <Button onClick={onCreate}>New note</Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[300px_1fr]">
        <Card className="p-0">
          <div className="border-b border-slate-200 px-4 py-3 text-sm font-medium dark:border-slate-800">
            Your notes
          </div>
          <div className="max-h-[60vh] overflow-auto p-2">
            {loading ? (
              <div className="px-2 py-3 text-sm text-slate-600 dark:text-slate-300">
                Loading…
              </div>
            ) : notes.length ? (
              <div className="grid gap-1">
                {notes.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => setSelectedId(n.id)}
                    className={[
                      'rounded-lg px-3 py-2 text-left text-sm transition',
                      n.id === selectedId
                        ? 'bg-violet-600 text-white dark:bg-violet-500'
                        : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800',
                    ].join(' ')}
                  >
                    <div className="truncate font-medium">
                      {n.title || 'Untitled'}
                    </div>
                    <div className="truncate text-xs opacity-80">
                      {n.body || '—'}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="px-2 py-3 text-sm text-slate-600 dark:text-slate-300">
                No notes yet.
              </div>
            )}
          </div>
        </Card>

        <Card className="grid gap-3">
          {selected ? (
            <>
              <div className="grid gap-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  Title
                </label>
                <input
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-violet-500/40 focus:ring-2 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                  value={draftTitle}
                  onChange={(e) => setDraftTitle(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  Body
                </label>
                <textarea
                  className="min-h-[240px] w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-violet-500/40 focus:ring-2 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                  value={draftBody}
                  onChange={(e) => setDraftBody(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button onClick={onSave}>Save</Button>
                <Button variant="danger" onClick={onDelete}>
                  Delete
                </Button>
              </div>
            </>
          ) : (
            <div className="text-sm text-slate-600 dark:text-slate-300">
              Select a note to edit.
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

