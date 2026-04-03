import { useEffect, useState } from 'react'
import { subscribeToNotes } from '../services/notesService'

export function useNotes(uid) {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(!!uid)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!uid) {
      setNotes([])
      setLoading(false)
      return
    }
    setLoading(true)
    const unsub = subscribeToNotes({
      uid,
      onChange: (n) => {
        setNotes(n)
        setLoading(false)
      },
      onError: (e) => {
        setError(e)
        setLoading(false)
      },
    })
    return () => unsub()
  }, [uid])

  return { notes, loading, error }
}

