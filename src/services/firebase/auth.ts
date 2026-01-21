import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  User,
  AuthError as FirebaseAuthError,
} from 'firebase/auth';
import { auth } from './config';
import { SignInCredentials, SignUpCredentials, AuthError } from './types';

// Re-export auth for convenience
export { auth };

/**
 * Sign in with email and password
 */
export async function signIn(credentials: SignInCredentials): Promise<User> {
  if (!auth) {
    throw new Error('Firebase Auth is not configured');
  }
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    );
    return userCredential.user;
  } catch (error) {
    throw mapAuthError(error as FirebaseAuthError);
  }
}

/**
 * Sign up with email and password
 */
export async function signUp(credentials: SignUpCredentials): Promise<User> {
  if (!auth) {
    throw new Error('Firebase Auth is not configured');
  }
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    );
    
    // Update display name if provided
    if (credentials.displayName) {
      await updateProfile(userCredential.user, {
        displayName: credentials.displayName,
      });
    }
    
    return userCredential.user;
  } catch (error) {
    throw mapAuthError(error as FirebaseAuthError);
  }
}

/**
 * Sign out current user
 */
export async function signOutUser(): Promise<void> {
  if (!auth) {
    return; // No-op if Firebase auth is not configured
  }
  try {
    await signOut(auth);
  } catch (error) {
    throw mapAuthError(error as FirebaseAuthError);
  }
}

/**
 * Send password reset email
 */
export async function resetPassword(email: string): Promise<void> {
  if (!auth) {
    throw new Error('Firebase Auth is not configured');
  }
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw mapAuthError(error as FirebaseAuthError);
  }
}

/**
 * Get current user
 * Returns null if Firebase auth is not configured
 */
export function getCurrentUser(): User | null {
  if (!auth) return null;
  return auth.currentUser;
}

/**
 * Get auth token
 * Returns null if Firebase auth is not configured
 */
export async function getAuthToken(): Promise<string | null> {
  if (!auth) return null;
  
  const user = auth.currentUser;
  if (!user) return null;
  
  try {
    return await user.getIdToken();
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
}

/**
 * Map Firebase Auth errors to app error format
 */
function mapAuthError(error: FirebaseAuthError): AuthError {
  return {
    code: error.code,
    message: error.message,
  };
}

