// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth, GoogleAuthProvider } from "firebase/auth"; // 👈 Add this line

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDURj3q4FQ2a7lpJZExbX7tk1l0jiBm-qw",
//   authDomain: "pawfect-6efe8.firebaseapp.com",
//   projectId: "pawfect-6efe8",
//   storageBucket: "pawfect-6efe8.appspot.com", // 👈 fix .app → .appspot.com
//   messagingSenderId: "24181772581",
//   appId: "1:24181772581:web:3bae2d96ffeab214f5cacc",
//   measurementId: "G-KW3DHRHBZ7",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const googleProvider = new GoogleAuthProvider();

// export { auth, googleProvider };
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore"; // 👈 Added Firestore support

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDURj3q4FQ2a7lpJZExbX7tk1l0jiBm-qw",
  authDomain: "pawfect-6efe8.firebaseapp.com",
  projectId: "pawfect-6efe8",
  storageBucket: "pawfect-6efe8.appspot.com", // ✅ Corrected domain
  messagingSenderId: "24181772581",
  appId: "1:24181772581:web:3bae2d96ffeab214f5cacc",
  measurementId: "G-KW3DHRHBZ7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics (optional but keep for insights)
const analytics = getAnalytics(app);

// Initialize Authentication
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// ✅ Initialize Firestore and Server Timestamp
const db = getFirestore(app);
const ts = serverTimestamp;

// Export everything you may need across your app
export { app, auth, googleProvider, db, ts, analytics };
