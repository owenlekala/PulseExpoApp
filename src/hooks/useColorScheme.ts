import { useColorScheme as useRNColorScheme } from 'react-native';

/**
 * Hook to get system color scheme
 */
export function useColorScheme(): 'light' | 'dark' {
  const colorScheme = useRNColorScheme();
  return colorScheme === 'dark' ? 'dark' : 'light';
}

