import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '@/constants/routes';
import { AuthStackParamList } from './types';
import LoginScreen from '@/features/auth/screens/LoginScreen';
import SignUpScreen from '@/features/auth/screens/SignUpScreen';
import ForgotPasswordScreen from '@/features/auth/screens/ForgotPasswordScreen';

const Stack = createStackNavigator<AuthStackParamList>();

/**
 * Authentication Navigator - Handles login, signup, forgot password flows
 */
export function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.LOGIN}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} />
      <Stack.Screen name={ROUTES.SIGNUP} component={SignUpScreen} />
      <Stack.Screen name={ROUTES.FORGOT_PASSWORD} component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}

