// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_aWr9-W4_b_FqF-SrSJK0hWSS6EA_LyM",
  authDomain: "reactmovieapp-44fa7.firebaseapp.com",
  projectId: "reactmovieapp-44fa7",
  storageBucket: "reactmovieapp-44fa7.firebasestorage.app",
  messagingSenderId: "313538712258",
  appId: "1:313538712258:web:fb074f4c88cd9d7768e15b",
  measurementId: "G-CGP3X78LGX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();