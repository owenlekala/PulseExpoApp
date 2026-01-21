import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { colors, spacing } from '@/constants/styles';

interface FormErrorProps {
  message: string;
  visible?: boolean;
}

/**
 * Form error message component
 */
export function FormError({ message, visible = true }: FormErrorProps) {

  if (!visible || !message) {
    return null;
  }

  return (
    <Text style={[styles.error, { color: colors.error, marginTop: spacing.xs }]}>
      {message}
    </Text>
  );
}

const styles = StyleSheet.create({
  error: {
    fontSize: 12,
    marginLeft: 4,
  },
});

