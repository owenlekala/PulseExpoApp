import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { initializeAuth, getAuth, Auth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CONFIG } from '@/constants/config';

// Dynamically import getReactNativePersistence to avoid type errors if not available
let getReactNativePersistence: any;
try {
  const authModule = require('firebase/auth');
  getReactNativePersistence = authModule.getReactNativePersistence;
} catch (e) {
  // Fallback if not available
  getReactNativePersistence = null;
}

/**
 * Check if Firebase is configured
 */
const isFirebaseConfigured = () => {
  return !!(
    CONFIG.FIREBASE.API_KEY &&
    CONFIG.FIREBASE.AUTH_DOMAIN &&
    CONFIG.FIREBASE.PROJECT_ID &&
    CONFIG.FIREBASE.APP_ID
  );
};

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
 * Initialize Firebase app only if configured
 */
let app: FirebaseApp | null = null;
if (isFirebaseConfigured()) {
  try {
    if (getApps().length === 0) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApps()[0];
    }
  } catch (error) {
    console.warn('Firebase initialization failed:', error);
    app = null;
  }
}

/**
 * Initialize Firebase Auth with AsyncStorage persistence for React Native
 * Use initializeAuth for React Native to enable persistence between sessions
 * Only initialize if Firebase app is configured
 */
let auth: Auth | null = null;
if (app && isFirebaseConfigured()) {
  try {
    // Try to initialize auth with AsyncStorage persistence if available
    // Otherwise fall back to getAuth
    if (getReactNativePersistence) {
      auth = initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage),
      });
    } else {
      // Fallback to getAuth if persistence helper is not available
      auth = getAuth(app);
    }
  } catch (e: any) {
    // If auth is already initialized, get the existing instance
    // This happens on hot reload or if auth was initialized elsewhere
    if (e?.code === 'auth/already-initialized' || e?.message?.includes('already initialized')) {
      auth = getAuth(app);
    } else {
      console.warn('Firebase Auth initialization failed:', e);
      auth = null;
    }
  }
}

export { auth };
export default app;

