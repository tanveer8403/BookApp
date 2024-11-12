// firebaseConfig.js

// Import Firebase and Firestore
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration from your Firebase project settings
const firebaseConfig = {
  apiKey: "AIzaSyBi6Hgzj4S1tZcbLsYdvsPwIak786c7o9E",
  authDomain: "bookapp-bff0f.firebaseapp.com",
  projectId: "bookapp-bff0f",
  storageBucket: "bookapp-bff0f.firebasestorage.app",
  messagingSenderId: "744966935881",
  appId: "1:744966935881:web:3fc4f7a30579d150b9f698"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };