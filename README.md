# Dev Dashboard

A simple, responsive productivity dashboard built with React and Firebase.

This project is designed for learning, collaboration, and open-source contributions.

---

## 🚀 Features

* Authentication (Email/Password)
* Notes (Create, Read, Update, Delete)
* Tasks (Create, Read, Update, Delete)
* Dashboard overview
* Dark mode toggle
* Responsive design (mobile + desktop)
* Firebase integration (Auth + Firestore)

---

## 🛠 Tech Stack

* React
* Firebase Authentication
* Firestore Database
* Tailwind CSS
* Vite

---

## ⚙️ Getting Started

### 1. Clone the repository

```
git clone https://github.com/your-username/dev-dashboard.git
cd dev-dashboard
```

### 2. Install dependencies

```
npm install
```

### 3. Setup environment variables

Create a `.env` file and copy values from `.env.example`.

Example:

```
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Run the app

```
npm start
```

---

## 🔥 Firebase Setup

### Authentication

* Go to Firebase Console
* Enable **Email/Password Authentication**

### Firestore

* Create a Firestore database
* Use rules like:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### Data Structure

```
users/{uid}/notes/{noteId}
users/{uid}/tasks/{taskId}
```

---

## 📁 Folder Structure

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

---

## 📜 Available Scripts

* `npm start` — Start development server
* `npm run build` — Build for production
* `npm run preview` — Preview production build

---

## 🤝 Contributing

We welcome contributions!

### Steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-name`)
3. Make your changes
4. Commit your changes
5. Push and open a Pull Request

👉 Check the **Issues tab** for available tasks.

---

## 🗺 Roadmap

* [ ] Add Google Authentication
* [ ] Add Profile Page
* [ ] Add Settings Page
* [ ] Add Notes Search
* [ ] Add Pagination
* [ ] Add Dark Mode Persistence
* [ ] Add Toast Notifications
* [ ] Add Mobile Navigation
* [ ] Add Activity Log
* [ ] Add Tags for Notes

---

## 📄 License

This project is licensed under the MIT License.

---

## ⭐ Support

If you like this project, consider giving it a star ⭐
