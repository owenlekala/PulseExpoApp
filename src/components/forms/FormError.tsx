import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface FormErrorProps {
  message: string;
  visible?: boolean;
}

/**
 * Form error message component
 */
export function FormError({ message, visible = true }: FormErrorProps) {
  const { colors, spacing } = useTheme();

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

