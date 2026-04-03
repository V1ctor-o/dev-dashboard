import { useEffect, useState } from 'react'
import { subscribeToTasks } from '../services/tasksService'

export function useTasks(uid) {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(!!uid)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!uid) {
      setTasks([])
      setLoading(false)
      return
    }
    setLoading(true)
    const unsub = subscribeToTasks({
      uid,
      onChange: (t) => {
        setTasks(t)
        setLoading(false)
      },
      onError: (e) => {
        setError(e)
        setLoading(false)
      },
    })
    return () => unsub()
  }, [uid])

  return { tasks, loading, error }
}

