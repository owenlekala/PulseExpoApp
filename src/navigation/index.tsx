import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './navigationRef';
import { AppNavigator } from './AppNavigator';
import { useAuthStore } from '@/store/slices/authSlice';
import { ROUTES } from '@/constants/routes';

/**
 * Root Navigator - Switches between Auth and App navigators based on auth state
 * 
 * TEMPORARY: Bypassing auth check to allow free navigation through app routes only
 * TODO: Re-enable auth check when ready to connect authentication
 */
export function RootNavigator() {
  // Temporarily bypassing auth check for free navigation
  // const { isAuthenticated, isLoading } = useAuthStore();

  // if (isLoading) {
  //   // Show loading screen
  //   return null;
  // }

  return (
    <NavigationContainer ref={navigationRef}>
      {/* Temporarily always show AppNavigator for free navigation */}
      <AppNavigator />
      {/* Original auth-based navigation (commented out):
      {isAuthenticated ? (
        <AppNavigator />
      ) : (
        <AuthNavigator />
      )}
      */}
    </NavigationContainer>
  );
}

