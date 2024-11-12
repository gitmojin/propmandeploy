import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { initializeFirebase } from '../firebase';
import { Property } from '../types';

export async function getProperties(): Promise<Property[]> {
  const firebase = initializeFirebase();
  if (!firebase?.db) {
    console.error('Database not initialized');
    return [];
  }
  
  try {
    const propertiesCol = collection(firebase.db, 'properties');
    const snapshot = await getDocs(propertiesCol);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Property[];
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
}

export async function addProperty(property: Omit<Property, "id">): Promise<string | null> {
  const firebase = initializeFirebase();
  if (!firebase?.db) {
    console.error('Database not initialized');
    return null;
  }

  try {
    const propertiesCol = collection(firebase.db, 'properties');
    const docRef = await addDoc(propertiesCol, property);
    return docRef.id;
  } catch (error) {
    console.error('Error adding property:', error);
    return null;
  }
}

export async function updateProperty(id: string, property: Partial<Property>): Promise<boolean> {
  const firebase = initializeFirebase();
  if (!firebase?.db) {
    console.error('Database not initialized');
    return false;
  }

  try {
    const propertyRef = doc(firebase.db, 'properties', id);
    await updateDoc(propertyRef, property);
    return true;
  } catch (error) {
    console.error('Error updating property:', error);
    return false;
  }
}

export async function deleteProperty(id: string): Promise<boolean> {
  const firebase = initializeFirebase();
  if (!firebase?.db) {
    console.error('Database not initialized');
    return false;
  }

  try {
    const propertyRef = doc(firebase.db, 'properties', id);
    await deleteDoc(propertyRef);
    return true;
  } catch (error) {
    console.error('Error deleting property:', error);
    return false;
  }
}