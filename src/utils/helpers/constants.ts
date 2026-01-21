/**
 * Helper constants
 */

export const DEBOUNCE_DELAY = 300; // milliseconds

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
} as const;

export const TIMEOUTS = {
  API_REQUEST: 30000, // 30 seconds
  DEBOUNCE: DEBOUNCE_DELAY,
} as const;

export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
  URL: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
  PASSWORD_MIN_LENGTH: 6,
} as const;

export const STORAGE_TIMEOUTS = {
  TOKEN_REFRESH: 5 * 60 * 1000, // 5 minutes
  CACHE_EXPIRY: 60 * 60 * 1000, // 1 hour
} as const;

