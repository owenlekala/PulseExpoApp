import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/services/firebase/auth';
import { useAuthStore } from '@/store/slices/authSlice';

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Auth Provider - Manages Firebase Auth state
 * Works without Firebase - returns empty state if Firebase is not configured
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { setUser: setStoreUser, setToken, setLoading } = useAuthStore();

  useEffect(() => {
    // If Firebase auth is not available, just set loading to false
    if (!auth) {
      setIsLoading(false);
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      setStoreUser(firebaseUser);
      setLoading(true);

      if (firebaseUser) {
        try {
          const token = await firebaseUser.getIdToken();
          setToken(token);
        } catch (error) {
          console.error('Error getting auth token:', error);
          setToken(null);
        }
      } else {
        setToken(null);
      }

      setIsLoading(false);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setStoreUser, setToken, setLoading]);

  const value: AuthContextValue = {
    user,
    isLoading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

