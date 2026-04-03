import { Card } from '../components/ui/Card'

export function SetupPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 dark:bg-slate-950">
      <div className="mx-auto w-full max-w-xl">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            Firebase setup required
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            This app needs Firebase Authentication + Firestore to run.
          </p>
        </div>

        <Card className="grid gap-3">
          <ol className="list-decimal pl-5 text-sm text-slate-700 dark:text-slate-200">
            <li>
              Create a Firebase project and enable <b>Email/Password</b>{' '}
              authentication.
            </li>
            <li>Create a Firestore database.</li>
            <li>
              Copy <code>.env.example</code> to <code>.env</code> and fill in
              your <code>VITE_FIREBASE_*</code> values.
            </li>
            <li>Restart the dev server.</li>
          </ol>

          <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-200">
            Tip: your Firebase config values are in Firebase Console → Project
            settings → General → “Your apps”.
          </div>
        </Card>
      </div>
    </div>
  )
}

