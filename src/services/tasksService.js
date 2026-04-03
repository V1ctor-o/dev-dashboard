import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { db, firebaseConfigured } from './firebase'

function assertConfigured() {
  if (!firebaseConfigured || !db) {
    throw new Error(
      'Firebase is not configured. Copy .env.example to .env and set your VITE_FIREBASE_* values, then restart the dev server.',
    )
  }
}

function tasksCollection(uid) {
  assertConfigured()
  return collection(db, 'users', uid, 'tasks')
}

export function subscribeToTasks({ uid, onChange, onError }) {
  const q = query(tasksCollection(uid), orderBy('updatedAt', 'desc'))
  return onSnapshot(
    q,
    (snap) => {
      const tasks = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
      onChange(tasks)
    },
    onError,
  )
}

export async function addTask({ uid, title }) {
  const now = serverTimestamp()
  const docRef = await addDoc(tasksCollection(uid), {
    title: title?.trim() || 'New task',
    done: false,
    createdAt: now,
    updatedAt: now,
  })
  return docRef.id
}

export async function toggleTaskDone({ uid, id, done }) {
  const ref = doc(db, 'users', uid, 'tasks', id)
  await updateDoc(ref, { done: !!done, updatedAt: serverTimestamp() })
}

export async function deleteTask({ uid, id }) {
  const ref = doc(db, 'users', uid, 'tasks', id)
  await deleteDoc(ref)
}

