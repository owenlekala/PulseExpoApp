import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { CONFIG } from '@/constants/config';

/**
 * Firebase configuration
 */
const firebaseConfig = {
  apiKey: CONFIG.FIREBASE.API_KEY,
  authDomain: CONFIG.FIREBASE.AUTH_DOMAIN,
  projectId: CONFIG.FIREBASE.PROJECT_ID,
  storageBucket: CONFIG.FIREBASE.STORAGE_BUCKET,
  messagingSenderId: CONFIG.FIREBASE.MESSAGING_SENDER_ID,
  appId: CONFIG.FIREBASE.APP_ID,
};

/**
 * Initialize Firebase app
 */
let app: FirebaseApp;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

/**
 * Initialize Firebase Auth
 */
export const auth: Auth = getAuth(app);

export default app;

