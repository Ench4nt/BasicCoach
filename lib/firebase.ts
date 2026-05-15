import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

let app: FirebaseApp | null = null;

if (apiKey) {
  app = getApps().length
    ? getApp()
    : initializeApp({
        apiKey,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      });
}

export const isClientConfigured = !!app;
export const auth = app ? getAuth(app) : (null as unknown as Auth);
export const db = app ? getFirestore(app) : (null as unknown as Firestore);
export const storage = app ? getStorage(app) : (null as unknown as FirebaseStorage);
