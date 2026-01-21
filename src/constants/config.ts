import Constants from 'expo-constants';

/**
 * App configuration constants
 */
export const CONFIG = {
  API_URL: Constants.expoConfig?.extra?.apiUrl || process.env.EXPO_PUBLIC_API_URL || '',
  FIREBASE: {
    API_KEY: Constants.expoConfig?.extra?.firebaseApiKey || process.env.EXPO_PUBLIC_FIREBASE_API_KEY || '',
    AUTH_DOMAIN: Constants.expoConfig?.extra?.firebaseAuthDomain || process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
    PROJECT_ID: Constants.expoConfig?.extra?.firebaseProjectId || process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || '',
    STORAGE_BUCKET: Constants.expoConfig?.extra?.firebaseStorageBucket || process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
    MESSAGING_SENDER_ID: Constants.expoConfig?.extra?.firebaseMessagingSenderId || process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
    APP_ID: Constants.expoConfig?.extra?.firebaseAppId || process.env.EXPO_PUBLIC_FIREBASE_APP_ID || '',
  },
  STORAGE_KEYS: {
    THEME_PREFERENCE: '@app/theme_preference',
    AUTH_TOKEN: '@app/auth_token',
    USER_DATA: '@app/user_data',
  },
} as const;

