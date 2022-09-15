import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDh2m6UiIM0PHBUhWeqaJbad0domLI8GCM",
  authDomain: "nextjs-whatsapp-clone-c228b.firebaseapp.com",
  projectId: "nextjs-whatsapp-clone-c228b",
  storageBucket: "nextjs-whatsapp-clone-c228b.appspot.com",
  messagingSenderId: "219459386018",
  appId: "1:219459386018:web:3d0863c126184f92ebf5fb",
  measurementId: "G-HB760VBWEQ",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };
