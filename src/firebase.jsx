// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // 👈 Add this line

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDURj3q4FQ2a7lpJZExbX7tk1l0jiBm-qw",
  authDomain: "pawfect-6efe8.firebaseapp.com",
  projectId: "pawfect-6efe8",
  storageBucket: "pawfect-6efe8.appspot.com", // 👈 fix .app → .appspot.com
  messagingSenderId: "24181772581",
  appId: "1:24181772581:web:3bae2d96ffeab214f5cacc",
  measurementId: "G-KW3DHRHBZ7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
