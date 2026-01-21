import { ApiError } from '@/services/api/types';

/**
 * Error handling utilities
 */

/**
 * Get user-friendly error message from error object
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message);
  }

  return 'An unexpected error occurred';
}

/**
 * Get error message from API error
 */
export function getApiErrorMessage(error: ApiError | unknown): string {
  if (error && typeof error === 'object' && 'message' in error) {
    const apiError = error as ApiError;
    return apiError.message || 'An error occurred';
  }

  return getErrorMessage(error);
}

/**
 * Check if error is a network error
 */
export function isNetworkError(error: unknown): boolean {
  if (error && typeof error === 'object' && 'code' in error) {
    const apiError = error as ApiError;
    return apiError.code === 'NETWORK_ERROR' || apiError.code === 'ECONNABORTED';
  }

  return false;
}

/**
 * Check if error is an authentication error
 */
export function isAuthError(error: unknown): boolean {
  if (error && typeof error === 'object' && 'status' in error) {
    const apiError = error as ApiError;
    return apiError.status === 401 || apiError.status === 403;
  }

  return false;
}

/**
 * Log error for debugging
 */
export function logError(error: unknown, context?: string): void {
  if (__DEV__) {
    console.error(`[${context || 'Error'}]`, error);
  }
  // In production, you might want to send to error tracking service
  // Example: Sentry.captureException(error);
}

