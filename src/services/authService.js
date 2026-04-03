import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { auth, firebaseConfigured } from './firebase'

function assertConfigured() {
  if (!firebaseConfigured || !auth) {
    throw new Error(
      'Firebase is not configured. Copy .env.example to .env and set your VITE_FIREBASE_* values, then restart the dev server.',
    )
  }
}

export async function signupWithEmail({ email, password, displayName }) {
  assertConfigured()
  const cred = await createUserWithEmailAndPassword(auth, email, password)
  if (displayName) {
    await updateProfile(cred.user, { displayName })
  }
  return cred.user
}

export async function loginWithEmail({ email, password }) {
  assertConfigured()
  const cred = await signInWithEmailAndPassword(auth, email, password)
  return cred.user
}

export async function logout() {
  assertConfigured()
  await signOut(auth)
}

