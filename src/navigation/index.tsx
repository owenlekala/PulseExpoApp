import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './navigationRef';
import { RootNavigator as RootNav } from './RootNavigator';

/**
 * Root Navigation Container - Wraps the root navigator
 */
export function RootNavigator() {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootNav />
    </NavigationContainer>
  );
}

