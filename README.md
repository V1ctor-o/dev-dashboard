# Dev Dashboard

A simple, responsive React dashboard with:

- Firebase Authentication (email/password)
- Firestore-backed Notes + Tasks
- Tailwind CSS (with a dark mode toggle)

## Getting started

1. Install dependencies

```bash
npm install
```

2. Create a `.env` file

Copy `.env.example` to `.env` and fill in your Firebase project values.

3. Run the app

```bash
npm start
```

Then open the URL printed in the terminal.

## Firebase setup

### Authentication

In the Firebase Console:

- Enable **Authentication → Email/Password**

### Firestore

Create a Firestore database, then (optional) use rules like:

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

This app stores data under:

- `users/{uid}/notes/{noteId}`
- `users/{uid}/tasks/{taskId}`

## Folder structure

```
src/
  components/
    layout/
    ui/
  hooks/
  pages/
  services/
  utils/
```

## Scripts

- `npm start`: start dev server
- `npm run build`: production build
- `npm run preview`: preview production build

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
