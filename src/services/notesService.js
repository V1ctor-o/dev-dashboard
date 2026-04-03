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

function notesCollection(uid) {
  assertConfigured()
  return collection(db, 'users', uid, 'notes')
}

export function subscribeToNotes({ uid, onChange, onError }) {
  const q = query(notesCollection(uid), orderBy('updatedAt', 'desc'))
  return onSnapshot(
    q,
    (snap) => {
      const notes = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
      onChange(notes)
    },
    onError,
  )
}

export async function addNote({ uid, title, body }) {
  const now = serverTimestamp()
  const docRef = await addDoc(notesCollection(uid), {
    title: title?.trim() || 'Untitled',
    body: body?.trim() || '',
    createdAt: now,
    updatedAt: now,
  })
  return docRef.id
}

export async function updateNote({ uid, id, patch }) {
  const ref = doc(db, 'users', uid, 'notes', id)
  await updateDoc(ref, { ...patch, updatedAt: serverTimestamp() })
}

export async function deleteNote({ uid, id }) {
  const ref = doc(db, 'users', uid, 'notes', id)
  await deleteDoc(ref)
}

