// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);