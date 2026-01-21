import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './navigationRef';
import { AuthNavigator } from './AuthNavigator';
import { AppNavigator } from './AppNavigator';
import { useAuthStore } from '@/store/slices/authSlice';
import { ROUTES } from '@/constants/routes';

/**
 * Root Navigator - Switches between Auth and App navigators based on auth state
 */
export function RootNavigator() {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    // Show loading screen
    return null;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      {isAuthenticated ? (
        <AppNavigator />
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
}

