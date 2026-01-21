import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { fonts } from '@/constants/styles';

interface TextProps extends RNTextProps {
  variant?: 'regular' | 'medium' | 'bold';
}

/**
 * Custom Text component with global font family
 * Use this instead of React Native's Text component for consistent font styling
 * 
 * @example
 * <Text>Regular text</Text>
 * <Text variant="bold">Bold text</Text>
 */
export function Text({ style, variant = 'regular', ...props }: TextProps) {
  const fontFamily = variant === 'bold' ? fonts.bold : variant === 'medium' ? fonts.medium : fonts.regular;
  
  return (
    <RNText
      style={[styles.default, { fontFamily }, style]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    // Default text styles can be added here
  },
});

