import { useContext } from 'react';
import { ThemeContext } from '@/app/providers/ThemeProvider';
import { Theme } from '@/types/theme';

/**
 * Hook to access theme context
 */
export function useTheme(): Theme {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

