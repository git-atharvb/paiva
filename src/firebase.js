// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCANAyt372p_ypXCvpQKpeVjz1QhaA50uA",
  authDomain: "paiva-2113b.firebaseapp.com",
  projectId: "paiva-2113b",
  storageBucket: "paiva-2113b.firebasestorage.app",
  messagingSenderId: "952612155642",
  appId: "1:952612155642:web:3632df384d37701fa0d943",
  measurementId: "G-DHMJK4MKT1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();