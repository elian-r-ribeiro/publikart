import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCuk8WB_dtnOoDb3KMgyXLcKHRhy0JvIDU",
    authDomain: "publik-art.firebaseapp.com",
    projectId: "publik-art",
    storageBucket: "publik-art.firebasestorage.app",
    messagingSenderId: "1099121368950",
    appId: "1:1099121368950:web:d5ab8d91d002633103a457",
    measurementId: "G-3DBBPFLVD5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };