import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

// Initialize Firebase only on the client side
export function initFirebase() {
  if (typeof window === 'undefined') return null;
  
  try {
    const app = getApps().length === 0 
      ? initializeApp(firebaseConfig) 
      : getApps()[0];
    
    const db = getFirestore(app);
    return { app, db };
  } catch (error) {
    console.error('Failed to initialize Firebase:', error);
    return null;
  }
}

// Get Firebase instance with error handling
export function getFirebaseInstance() {
  try {
    const firebase = initFirebase();
    if (!firebase?.db) {
      throw new Error('Firebase database not initialized');
    }
    return firebase;
  } catch (error) {
    console.error('Error getting Firebase instance:', error);
    return { db: undefined };
  }
}