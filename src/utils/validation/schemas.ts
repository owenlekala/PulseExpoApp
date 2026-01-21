import * as yup from 'yup';

/**
 * Common validation schemas using Yup
 */

export const emailSchema = yup.string().email('Invalid email address').required('Email is required');

export const passwordSchema = yup
  .string()
  .min(6, 'Password must be at least 6 characters')
  .required('Password is required');

export const confirmPasswordSchema = (passwordField: string = 'password') =>
  yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref(passwordField)], 'Passwords do not match');

export const nameSchema = yup
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name must be less than 50 characters')
  .required('Name is required');

export const phoneSchema = yup
  .string()
  .matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/, 'Invalid phone number')
  .required('Phone number is required');

export const urlSchema = yup.string().url('Invalid URL format');

export const requiredStringSchema = yup.string().required('This field is required');

export const optionalStringSchema = yup.string();

// Auth schemas
export const loginSchema = yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
});

export const signUpSchema = yup.object().shape({
  displayName: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: confirmPasswordSchema('password'),
});

export const forgotPasswordSchema = yup.object().shape({
  email: emailSchema,
});

