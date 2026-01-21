import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useThemeStore } from '@/store/slices/themeSlice';
import { getTheme } from '@/theme';
import { Theme, ThemeMode } from '@/types/theme';

interface ThemeContextValue extends Theme {
  setMode: (mode: ThemeMode) => void;
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * Theme Provider - Manages dark/light mode theme
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const systemColorScheme = useColorScheme();
  const { mode, setMode } = useThemeStore();
  const [currentTheme, setCurrentTheme] = useState<Theme>(
    getTheme(mode, systemColorScheme)
  );

  useEffect(() => {
    const theme = getTheme(mode, systemColorScheme);
    setCurrentTheme(theme);
  }, [mode, systemColorScheme]);

  const value: ThemeContextValue = {
    ...currentTheme,
    mode, // Include mode in context value
    setMode,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

