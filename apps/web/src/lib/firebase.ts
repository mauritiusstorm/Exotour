import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getFunctions, httpsCallable, type Functions } from 'firebase/functions';
import { getAuth, type Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

let app: FirebaseApp | undefined;
let firestore: Firestore | undefined;
let functions: Functions | undefined;
let auth: Auth | undefined;

/**
 * Firebase is initialized lazily so the app still builds and renders
 * in environments (CI, local dev without secrets) where env vars aren't set.
 */
function getFirebaseApp(): FirebaseApp {
  if (!app) {
    app = initializeApp(firebaseConfig);
  }
  return app;
}

export function getFirestoreDb(): Firestore {
  if (!firestore) {
    firestore = getFirestore(getFirebaseApp());
  }
  return firestore;
}

export function getFirebaseFunctions(): Functions {
  if (!functions) {
    functions = getFunctions(getFirebaseApp(), 'europe-west1');
  }
  return functions;
}

export function getFirebaseAuth(): Auth {
  if (!auth) {
    auth = getAuth(getFirebaseApp());
  }
  return auth;
}

export interface LeadPayload {
  agencyName: string;
  contactName: string;
  email: string;
  phone: string;
  message: string;
  locale: string;
}

export interface LeadResult {
  success: boolean;
  leadId?: string;
}

/**
 * Submits a partner lead via the submitLead Cloud Function, which writes to
 * Firestore (collection `leads`) and notifies the Exotour team.
 */
export async function submitLead(payload: LeadPayload): Promise<LeadResult> {
  const callable = httpsCallable<LeadPayload, LeadResult>(getFirebaseFunctions(), 'submitLead');
  const response = await callable(payload);
  return response.data;
}
