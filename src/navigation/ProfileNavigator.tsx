import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '@/constants/routes';
import { AppStackParamList } from './types';
import ProfileScreen from '@/features/profile/screens/ProfileScreen';
import PersonalInformationScreen from '@/features/profile/screens/PersonalInformationScreen';
import ChangePasswordScreen from '@/features/profile/screens/ChangePasswordScreen';

const Stack = createStackNavigator<AppStackParamList>();

/**
 * Profile Navigator - Handles profile-related screens
 */
export function ProfileNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.PROFILE}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={ROUTES.PROFILE} component={ProfileScreen} />
      <Stack.Screen name={ROUTES.PERSONAL_INFORMATION} component={PersonalInformationScreen} />
      <Stack.Screen name={ROUTES.CHANGE_PASSWORD} component={ChangePasswordScreen} />
    </Stack.Navigator>
  );
}

