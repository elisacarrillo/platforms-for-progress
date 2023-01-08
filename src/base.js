// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCP_dzafEk6y0dHK1ZtNUBwqlI2-Xfl-SY",
  authDomain: "platforms-for-progress.firebaseapp.com",
  projectId: "platforms-for-progress",
  storageBucket: "platforms-for-progress.appspot.com",
  messagingSenderId: "108726206780",
  appId: "1:108726206780:web:13261fa1a58624801a5e39",
  measurementId: "G-Q341QLSYR4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);