import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { initializeFirebase } from '../firebase';
import { Task } from '../types';

export async function getTasks(): Promise<Task[]> {
  const firebase = initializeFirebase();
  if (!firebase?.db) {
    console.error('Database not initialized');
    return [];
  }

  try {
    const tasksCol = collection(firebase.db, 'tasks');
    const snapshot = await getDocs(tasksCol);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt || new Date().toISOString()
    })) as Task[];
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
}

export async function addTask(task: Omit<Task, "id">): Promise<Task | null> {
  const firebase = initializeFirebase();
  if (!firebase?.db) {
    console.error('Database not initialized');
    return null;
  }

  try {
    const tasksCol = collection(firebase.db, 'tasks');
    const docRef = await addDoc(tasksCol, task);
    return { ...task, id: docRef.id };
  } catch (error) {
    console.error('Error adding task:', error);
    return null;
  }
}

export async function updateTask(taskId: string, updates: Partial<Task>): Promise<boolean> {
  const firebase = initializeFirebase();
  if (!firebase?.db) {
    console.error('Database not initialized');
    return false;
  }

  try {
    const taskRef = doc(firebase.db, 'tasks', taskId);
    await updateDoc(taskRef, updates);
    return true;
  } catch (error) {
    console.error('Error updating task:', error);
    return false;
  }
}