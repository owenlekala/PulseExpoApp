/**
 * Navigation route names
 */
export const ROUTES = {
  // Auth routes
  LOGIN: 'Login',
  SIGNUP: 'SignUp',
  FORGOT_PASSWORD: 'ForgotPassword',
  OTP: 'OTP',
  
  // App routes
  HOME: 'Home',
  PROFILE: 'Profile',
  SETTINGS: 'Settings',
  PERSONAL_INFORMATION: 'PersonalInformation',
  CHANGE_PASSWORD: 'ChangePassword',
} as const;

export type RouteName = typeof ROUTES[keyof typeof ROUTES];

