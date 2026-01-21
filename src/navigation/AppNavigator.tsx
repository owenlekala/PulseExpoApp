import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ROUTES } from '@/constants/routes';
import { AppStackParamList } from './types';
import HomeScreen from '@/features/home/screens/HomeScreen';
import ProfileScreen from '@/features/profile/screens/ProfileScreen';
import SettingsScreen from '@/features/settings/screens/SettingsScreen';
import { BottomTabBar } from '@/components/navigation';

const Tab = createBottomTabNavigator<AppStackParamList>();

/**
 * Main App Navigator - Handles authenticated app navigation
 */
export function AppNavigator() {
  return (
    <Tab.Navigator
      initialRouteName={ROUTES.HOME}
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <BottomTabBar {...props} />}
    >
      <Tab.Screen name={ROUTES.HOME} component={HomeScreen} />
      <Tab.Screen name={ROUTES.PROFILE} component={ProfileScreen} />
      <Tab.Screen name={ROUTES.SETTINGS} component={SettingsScreen} />
    </Tab.Navigator>
  );
}

