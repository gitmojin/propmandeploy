import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

let firebaseApp: FirebaseApp | undefined;
let firestoreDb: Firestore | undefined;

export function initializeFirebase() {
  if (typeof window === 'undefined') return null;

  try {
    if (!firebaseApp) {
      firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    }

    if (!firestoreDb) {
      firestoreDb = getFirestore(firebaseApp);
    }

    return {
      app: firebaseApp,
      db: firestoreDb
    };
  } catch (error) {
    console.error('Failed to initialize Firebase:', error);
    return null;
  }
}

// Initialize and export instances
const firebase = initializeFirebase();
export const db = firebase?.db;