/**
 * Simple style constants to replace theme system
 * Use these for consistent spacing and colors throughout the app
 * CRITICAL: These are defined as simple objects to prevent initialization errors
 */

// Use Object.freeze to prevent modification and ensure the object is always valid
export const spacing = Object.freeze({
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
});

export const colors = Object.freeze({
  primary: '#007AFF',
  secondary: '#5856D6',
  background: '#FFFFFF',
  surface: '#F2F2F7',
  text: '#000000',
  textSecondary: '#8E8E93',
  border: '#C6C6C8',
  error: '#FF3B30',
  success: '#34C759',
  warning: '#FF9500',
});

