/**
 * Navigation route names
 */
export const ROUTES = {
  // Auth routes
  LOGIN: 'Login',
  SIGNUP: 'SignUp',
  FORGOT_PASSWORD: 'ForgotPassword',
  
  // App routes
  HOME: 'Home',
  PROFILE: 'Profile',
  SETTINGS: 'Settings',
} as const;

export type RouteName = typeof ROUTES[keyof typeof ROUTES];

