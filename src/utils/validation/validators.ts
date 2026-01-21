import { REGEX } from '@/utils/helpers/constants';

/**
 * Validation utility functions using regex patterns
 */

/**
 * Validates email format using regex
 * @param email - Email string to validate
 * @returns Object with isValid boolean and error message
 */
export function validateEmail(email: string): { isValid: boolean; error?: string } {
  if (!email || email.trim() === '') {
    return { isValid: false, error: 'Email is required' };
  }

  if (!REGEX.EMAIL.test(email)) {
    return { isValid: false, error: 'Invalid email address format' };
  }

  return { isValid: true };
}

/**
 * Validates password strength using regex
 * Requirements:
 * - At least 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * - At least one special character
 * @param password - Password string to validate
 * @returns Object with isValid boolean and error message
 */
export function validatePassword(password: string): { isValid: boolean; error?: string } {
  if (!password || password.trim() === '') {
    return { isValid: false, error: 'Password is required' };
  }

  if (password.length < 8) {
    return { isValid: false, error: 'Password must be at least 8 characters long' };
  }

  if (!/[A-Z]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one uppercase letter' };
  }

  if (!/[a-z]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one lowercase letter' };
  }

  if (!/[0-9]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one number' };
  }

  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one special character' };
  }

  return { isValid: true };
}

/**
 * Validates password with minimum length requirement (for backward compatibility)
 * @param password - Password string to validate
 * @param minLength - Minimum length (default: 6)
 * @returns Object with isValid boolean and error message
 */
export function validatePasswordMinLength(password: string, minLength: number = 6): { isValid: boolean; error?: string } {
  if (!password || password.trim() === '') {
    return { isValid: false, error: 'Password is required' };
  }

  if (password.length < minLength) {
    return { isValid: false, error: `Password must be at least ${minLength} characters long` };
  }

  return { isValid: true };
}

/**
 * Validates that two passwords match
 * @param password - First password
 * @param confirmPassword - Confirmation password
 * @returns Object with isValid boolean and error message
 */
export function validatePasswordMatch(password: string, confirmPassword: string): { isValid: boolean; error?: string } {
  if (!confirmPassword || confirmPassword.trim() === '') {
    return { isValid: false, error: 'Please confirm your password' };
  }

  if (password !== confirmPassword) {
    return { isValid: false, error: 'Passwords do not match' };
  }

  return { isValid: true };
}

