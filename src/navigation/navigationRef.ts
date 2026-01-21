import { createNavigationContainerRef } from '@react-navigation/native';
import { ROUTES } from '@/constants/routes';
import { AppStackParamList } from './types';

/**
 * App route names only (auth routes excluded temporarily)
 */
export type AppRouteName = keyof AppStackParamList;

/**
 * Navigation ref for programmatic navigation
 * Temporarily typed to only include app routes (auth routes disabled)
 */
export const navigationRef = createNavigationContainerRef<AppStackParamList>();

export function navigate(name: AppRouteName, params?: any) {
  if (!navigationRef.isReady()) {
    return;
  }

  try {
    navigationRef.navigate(name, params);
  } catch (error) {
    console.error(`Navigation error to "${name}":`, error);
  }
}

export function goBack() {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
}

