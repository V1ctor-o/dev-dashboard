import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const requiredKeys = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_APP_ID',
]

const missingKeys = requiredKeys.filter((k) => !import.meta.env[k])

export const firebaseConfigured = missingKeys.length === 0

const firebaseConfig = firebaseConfigured
  ? {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
    }
  : null

if (!firebaseConfigured && missingKeys.length) {
  console.warn(
    `[Dev Dashboard] Firebase not configured. Missing: ${missingKeys.join(
      ', ',
    )}. Create a .env file from .env.example and restart the dev server.`,
  )
}

export const app = firebaseConfig
  ? getApps().length
    ? getApp()
    : initializeApp(firebaseConfig)
  : null
export const auth = app ? getAuth(app) : null
export const db = app ? getFirestore(app) : null

