// src/firebase/firebase.config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAw3nfOMl4EYytns7_7CDZ1f3uOMrnGQjM",
  authDomain: "fir-book-haven.firebaseapp.com",
  projectId: "fir-book-haven",
  storageBucket: "fir-book-haven.firebasestorage.app",
  messagingSenderId: "969041410516",
  appId: "1:969041410516:web:90ffefd968c6d25a437e41"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
