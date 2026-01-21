import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AppNavigator } from './AppNavigator';
import { AuthNavigator } from './AuthNavigator';

const RootStack = createStackNavigator();

/**
 * Root Navigator - Contains both Auth and App navigators
 * Allows navigation between auth and app screens
 */
export function RootNavigator() {
  return (
    <RootStack.Navigator
      initialRouteName="App"
      screenOptions={{
        headerShown: false,
      }}
    >
      <RootStack.Screen name="App" component={AppNavigator} />
      <RootStack.Screen name="Auth" component={AuthNavigator} />
    </RootStack.Navigator>
  );
}

