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

/**
 * Sign in with email and password
 */
export async function signIn(credentials: SignInCredentials): Promise<User> {
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
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw mapAuthError(error as FirebaseAuthError);
  }
}

/**
 * Get current user
 */
export function getCurrentUser(): User | null {
  return auth.currentUser;
}

/**
 * Get auth token
 */
export async function getAuthToken(): Promise<string | null> {
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

