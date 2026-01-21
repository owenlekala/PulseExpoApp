import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from 'firebase/auth';
import { STORAGE_KEYS } from '@/utils/storage/keys';
import { storage } from '@/services/storage/asyncStorage';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setLoading: (isLoading: boolean) => void;
  logout: () => void;
}

/**
 * Auth store slice
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,
      setUser: (user: User | null) =>
        set({ user, isAuthenticated: !!user }),
      setToken: (token: string | null) => set({ token }),
      setLoading: (isLoading: boolean) => set({ isLoading }),
      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: STORAGE_KEYS.AUTH_TOKEN,
      storage: {
        getItem: async (name: string) => {
          const value = await storage.getItem<{ token: string }>(name);
          return value ? JSON.stringify({ state: { token: value.token } }) : null;
        },
        setItem: async (name: string, value: string) => {
          const parsed = JSON.parse(value);
          await storage.setItem(name, { token: parsed.state.token });
        },
        removeItem: async (name: string) => {
          await storage.removeItem(name);
        },
      },
    }
  )
);

