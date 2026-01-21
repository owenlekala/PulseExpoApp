import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
// Note: Replace with actual Hero UI Native Provider when installed
// import { HeroUINativeProvider } from 'heroui-native';
import { AuthProvider } from './providers/AuthProvider';
import { RootNavigator } from '@/navigation';

/**
 * Main App Component
 * Wraps app with all necessary providers
 */
export default function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        {/* TODO: Add HeroUINativeProvider when heroui-native is installed */}
        {/* <HeroUINativeProvider config={{}}> */}
          <AuthProvider>
            <StatusBar style="dark" />
            <RootNavigator />
          </AuthProvider>
        {/* </HeroUINativeProvider> */}
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

