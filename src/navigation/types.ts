/**
 * Navigation param lists
 * Using string literals that match ROUTES constants
 */
export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  OTP: undefined;
};

export type AppStackParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
  PersonalInformation: undefined;
  ChangePassword: undefined;
};

/**
 * Combined param list for all routes
 */
export type AllRoutesParamList = AuthStackParamList & AppStackParamList;

declare global {
  namespace ReactNavigation {
    /**
     * TEMPORARY: Only including app routes to prevent "component auth has not been registered" error
     * TODO: Change back to AllRoutesParamList when auth is re-enabled
     */
    interface RootParamList extends AppStackParamList {}
  }
}

