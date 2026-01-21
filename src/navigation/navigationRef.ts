import { createNavigationContainerRef } from '@react-navigation/native';
import { RouteName } from '@/constants/routes';

/**
 * Navigation ref for programmatic navigation
 */
export const navigationRef = createNavigationContainerRef<Record<RouteName, any>>();

export function navigate(name: RouteName, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as never, params as never);
  }
}

export function goBack() {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
}

