import { CONFIG } from '@/constants/config';

/**
 * API endpoint constants
 */
const BASE_URL = CONFIG.API_URL;

export const ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: `${BASE_URL}/auth/login`,
    SIGNUP: `${BASE_URL}/auth/signup`,
    REFRESH: `${BASE_URL}/auth/refresh`,
    LOGOUT: `${BASE_URL}/auth/logout`,
  },
  
  // User endpoints
  USER: {
    PROFILE: `${BASE_URL}/user/profile`,
    UPDATE_PROFILE: `${BASE_URL}/user/profile`,
  },
  
  // Add more endpoints as needed
} as const;

