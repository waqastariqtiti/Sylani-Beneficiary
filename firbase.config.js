import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDBsgwKMSfjqmcSNCYWIX8d2D11B8nRWg",
  authDomain: "sylani-beneficiary.firebaseapp.com",
  projectId: "sylani-beneficiary",
  storageBucket: "sylani-beneficiary.firebasestorage.app",
  messagingSenderId: "569474684022",
  appId: "1:569474684022:web:fbdbea378be0225a787b57",
  measurementId: "G-HCYCG98Q09"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const database = getDatabase(app);
const auth = getAuth(app)

export { storage, database, ref, set,auth };