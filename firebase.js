import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAtMsCjwbPBFZLG9I9D_I53UoEkiD87Deo",
  authDomain: "acadvault-3cfae.firebaseapp.com",
  projectId: "acadvault-3cfae",
  storageBucket: "acadvault-3cfae.firebasestorage.app",
  messagingSenderId: "942235321776",
  appId: "1:942235321776:web:040751d03d223d9257c275"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);