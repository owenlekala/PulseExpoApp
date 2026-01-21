import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ROUTES } from '@/constants/routes';
import { AppStackParamList } from './types';
import HomeScreen from '@/features/home/screens/HomeScreen';
import ProfileScreen from '@/features/profile/screens/ProfileScreen';
import SettingsScreen from '@/features/settings/screens/SettingsScreen';
import { Icon } from '@/components/ui';
import { ICONS } from '@/constants/icons';
import { useTheme } from '@/hooks/useTheme';

const Tab = createBottomTabNavigator<AppStackParamList>();

/**
 * Main App Navigator - Handles authenticated app navigation
 */
export function AppNavigator() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName={ROUTES.HOME}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
      }}
    >
      <Tab.Screen
        name={ROUTES.HOME}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name={ICONS.HOME} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.PROFILE}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name={ICONS.PROFILE} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.SETTINGS}
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name={ICONS.SETTINGS} size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

