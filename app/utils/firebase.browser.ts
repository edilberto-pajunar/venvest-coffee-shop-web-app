import { initializeApp, getApps, FirebaseApp } from "firebase/app"
import { Auth, getAuth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

const clientCredentials = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

if (!clientCredentials.apiKey || !clientCredentials.projectId) {
    console.error('Firebase configuration missing! Create .env.local with Firebase credentials.');
    console.error('See FIREBASE_SETUP.md for instructions');
}

let app: FirebaseApp;
let db: Firestore;
let storage: FirebaseStorage;
let auth: Auth;

try {
    app = getApps().length === 0 ? initializeApp(clientCredentials) : getApps()[0];
    db = getFirestore(app);
    storage = getStorage(app);
    auth = getAuth(app);
} catch (error) {
    console.error('❌ Failed to initialize Firebase:', error);
    throw new Error('Firebase initialization failed. Check FIREBASE_SETUP.md');
}

export {
    app, db, storage, auth
}