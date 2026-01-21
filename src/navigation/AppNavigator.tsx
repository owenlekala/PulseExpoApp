import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { ROUTES } from '@/constants/routes';
import { AppStackParamList } from './types';
import HomeScreen from '@/features/home/screens/HomeScreen';
import { ProfileNavigator } from './ProfileNavigator';
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
      <Tab.Screen
        name={ROUTES.PROFILE}
        component={ProfileNavigator}
        listeners={({ navigation, route }) => ({
          state: (e) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? ROUTES.PROFILE;
            const hideTabBarRoutes = [ROUTES.PERSONAL_INFORMATION, ROUTES.CHANGE_PASSWORD];
            if (hideTabBarRoutes.includes(routeName as any)) {
              navigation.setOptions({
                tabBarStyle: { display: 'none' },
              });
            } else {
              navigation.setOptions({
                tabBarStyle: undefined,
              });
            }
          },
        })}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? ROUTES.PROFILE;
          const hideTabBarRoutes = [ROUTES.PERSONAL_INFORMATION, ROUTES.CHANGE_PASSWORD];
          return {
            tabBarStyle: hideTabBarRoutes.includes(routeName as any)
              ? { display: 'none' }
              : undefined,
          };
        }}
      />
      <Tab.Screen name={ROUTES.SETTINGS} component={SettingsScreen} />
    </Tab.Navigator>
  );
}

