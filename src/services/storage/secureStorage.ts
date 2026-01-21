import * as SecureStore from 'expo-secure-store';

/**
 * Secure storage wrapper for sensitive data (tokens, etc.)
 */
export const secureStorage = {
  /**
   * Get item from secure storage
   */
  async getItem(key: string): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.error(`Error getting secure item ${key}:`, error);
      return null;
    }
  },

  /**
   * Set item in secure storage
   */
  async setItem(key: string, value: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.error(`Error setting secure item ${key}:`, error);
    }
  },

  /**
   * Remove item from secure storage
   */
  async removeItem(key: string): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.error(`Error removing secure item ${key}:`, error);
    }
  },
};

