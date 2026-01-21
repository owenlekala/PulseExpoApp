import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ThemeMode } from '@/types/theme';
import { STORAGE_KEYS } from '@/utils/storage/keys';
import { storage } from '@/services/storage/asyncStorage';

interface ThemeState {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

/**
 * Theme store slice
 */
export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: 'system',
      setMode: (mode: ThemeMode) => set({ mode }),
    }),
    {
      name: STORAGE_KEYS.THEME_PREFERENCE,
      storage: {
        getItem: async (name: string) => {
          const value = await storage.getItem<ThemeMode>(name);
          return value ? JSON.stringify({ state: { mode: value } }) : null;
        },
        setItem: async (name: string, value: string) => {
          const parsed = JSON.parse(value);
          await storage.setItem(name, parsed.state.mode);
        },
        removeItem: async (name: string) => {
          await storage.removeItem(name);
        },
      },
    }
  )
);

