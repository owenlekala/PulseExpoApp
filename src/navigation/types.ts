import { RouteName } from '@/constants/routes';

/**
 * Navigation param lists
 */
export type AuthStackParamList = {
  [RouteName.LOGIN]: undefined;
  [RouteName.SIGNUP]: undefined;
  [RouteName.FORGOT_PASSWORD]: undefined;
};

export type AppStackParamList = {
  [RouteName.HOME]: undefined;
  [RouteName.PROFILE]: undefined;
  [RouteName.SETTINGS]: undefined;
};

/**
 * Combined param list for all routes
 */
export type AllRoutesParamList = AuthStackParamList & AppStackParamList;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AllRoutesParamList {}
  }
}

