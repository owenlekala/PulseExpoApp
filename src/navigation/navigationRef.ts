import { createNavigationContainerRef } from '@react-navigation/native';
import { ROUTES } from '@/constants/routes';
import { AppStackParamList } from './types';

/**
 * Root navigation param list
 */
export type RootStackParamList = {
  App: undefined;
  Auth: undefined;
};

/**
 * App route names only (auth routes excluded temporarily)
 */
export type AppRouteName = keyof AppStackParamList;

/**
 * Navigation ref for programmatic navigation
 * Updated to support root navigator with Auth and App screens
 */
export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate(name: AppRouteName, params?: any) {
  if (!navigationRef.isReady()) {
    return;
  }

  try {
    navigationRef.navigate('App', { screen: name, params });
  } catch (error) {
    console.error(`Navigation error to "${name}":`, error);
  }
}

export function goBack() {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
}

