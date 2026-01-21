import { CONFIG } from '@/constants/config';

/**
 * Storage key constants
 */
export const STORAGE_KEYS = {
  THEME_PREFERENCE: CONFIG.STORAGE_KEYS.THEME_PREFERENCE,
  AUTH_TOKEN: CONFIG.STORAGE_KEYS.AUTH_TOKEN,
  USER_DATA: CONFIG.STORAGE_KEYS.USER_DATA,
} as const;

