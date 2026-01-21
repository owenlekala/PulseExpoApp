import { User } from 'firebase/auth';

/**
 * Firebase Auth types
 */
export interface AuthUser extends User {}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  email: string;
  password: string;
  displayName?: string;
}

export interface AuthError {
  code: string;
  message: string;
}

