import { Theme, ThemeMode } from '@/types/theme';
import { lightTheme } from './light';
import { darkTheme } from './dark';

/**
 * Get theme based on mode
 */
export function getTheme(mode: ThemeMode, systemMode: 'light' | 'dark'): Theme {
  if (mode === 'system') {
    return systemMode === 'dark' ? darkTheme : lightTheme;
  }
  return mode === 'dark' ? darkTheme : lightTheme;
}

export { lightTheme, darkTheme };
export type { Theme, ThemeMode };

