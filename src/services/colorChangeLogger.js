import { getApp, getApps, initializeApp } from 'firebase/app';
import { addDoc, collection, getFirestore, serverTimestamp } from 'firebase/firestore';
import { getAnalyticsIdentity } from './analytics';

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAVWHwSXCC2gUynwOd4N6Tk321FidV5oRI",
  authDomain: "thesis-b7c2c.firebaseapp.com",
  projectId: "thesis-b7c2c",
  storageBucket: "thesis-b7c2c.firebasestorage.app",
  messagingSenderId: "173044972944",
  appId: "1:173044972944:web:fe4591e940748e32b84715",
  measurementId: "G-YMEQS26SD3"
};

const COLOR_CHANGES_COLLECTION = import.meta.env.VITE_FIREBASE_COLOR_CHANGES_COLLECTION || 'color_changes';

let firestoreDb = null;

function hasFirebaseConfig() {
  return Boolean(
    FIREBASE_CONFIG.apiKey
      && FIREBASE_CONFIG.authDomain
      && FIREBASE_CONFIG.projectId
      && FIREBASE_CONFIG.appId,
  );
}

function getDb() {
  if (!hasFirebaseConfig()) return null;
  if (firestoreDb) return firestoreDb;

  const app = getApps().length ? getApp() : initializeApp(FIREBASE_CONFIG);
  firestoreDb = getFirestore(app);
  return firestoreDb;
}

export async function logColorChangeSuccess(payload = {}) {
  if (typeof window === 'undefined') return;

  const db = getDb();
  if (!db) return;

  const { userId, sessionId } = getAnalyticsIdentity();
  const documentData = {
    userId,
    sessionId,
    path: window.location.pathname || '',
    createdAt: serverTimestamp(),
    ...payload,
  };

  try {
    await addDoc(collection(db, COLOR_CHANGES_COLLECTION), documentData);
  } catch (_) {
    // no-op
  }
}
