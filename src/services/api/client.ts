import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getAuthToken } from '../firebase/auth';
import { CONFIG } from '@/constants/config';
import { ApiResponse, ApiError } from './types';

/**
 * Create axios instance with base configuration
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: CONFIG.API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor - Add auth token to requests
 */
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await getAuthToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor - Handle errors and transform responses
 */
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const apiError: ApiError = {
      code: error.code || 'UNKNOWN_ERROR',
      message: error.message || 'An unexpected error occurred',
      status: error.response?.status,
    };

    // Handle 401 Unauthorized - token expired
    if (error.response?.status === 401) {
      // Could trigger token refresh or logout here
      console.warn('Unauthorized request - token may be expired');
    }

    // Handle network errors
    if (!error.response) {
      apiError.message = 'Network error. Please check your connection.';
    }

    return Promise.reject(apiError);
  }
);

/**
 * API client methods
 */
export const api = {
  /**
   * GET request
   */
  async get<T>(url: string, config?: any): Promise<ApiResponse<T>> {
    const response = await apiClient.get<ApiResponse<T>>(url, config);
    return response.data;
  },

  /**
   * POST request
   */
  async post<T>(url: string, data?: any, config?: any): Promise<ApiResponse<T>> {
    const response = await apiClient.post<ApiResponse<T>>(url, data, config);
    return response.data;
  },

  /**
   * PUT request
   */
  async put<T>(url: string, data?: any, config?: any): Promise<ApiResponse<T>> {
    const response = await apiClient.put<ApiResponse<T>>(url, data, config);
    return response.data;
  },

  /**
   * PATCH request
   */
  async patch<T>(url: string, data?: any, config?: any): Promise<ApiResponse<T>> {
    const response = await apiClient.patch<ApiResponse<T>>(url, data, config);
    return response.data;
  },

  /**
   * DELETE request
   */
  async delete<T>(url: string, config?: any): Promise<ApiResponse<T>> {
    const response = await apiClient.delete<ApiResponse<T>>(url, config);
    return response.data;
  },
};

export default apiClient;

