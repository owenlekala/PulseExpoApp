import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
// Note: Replace with actual Hero UI Native Provider when installed
// import { HeroUINativeProvider } from 'heroui-native';
import { ThemeProvider } from './providers/ThemeProvider';
import { AuthProvider } from './providers/AuthProvider';
import { RootNavigator } from '@/navigation';
import { useTheme } from '@/hooks/useTheme';
import { useColorScheme } from '@/hooks/useColorScheme';

/**
 * Main App Component
 * Wraps app with all necessary providers
 */
function AppContent() {
  const { mode } = useTheme();
  const systemColorScheme = useColorScheme();
  const actualMode = mode === 'system' ? systemColorScheme : mode;

  return (
    <>
      <StatusBar style={actualMode === 'dark' ? 'light' : 'dark'} />
      <RootNavigator />
    </>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* TODO: Add HeroUINativeProvider when heroui-native is installed */}
      {/* <HeroUINativeProvider config={{}}> */}
        <ThemeProvider>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </ThemeProvider>
      {/* </HeroUINativeProvider> */}
    </GestureHandlerRootView>
  );
}

