import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

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