import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDtgqP1FVxmQDV0LvzCwl0lFuXk9QRaS9U",
  authDomain: "lms-b36e9.firebaseapp.com",
  projectId: "lms-b36e9",
  storageBucket: "lms-b36e9.firebasestorage.app",
  messagingSenderId: "838217665420",
  appId: "1:838217665420:web:768bf3c9519a5fb27864a9",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
