import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Icon } from '@/components/ui';
import { ICONS } from '@/constants/icons';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
}

/**
 * Error message component with optional retry button
 */
export function ErrorMessage({ message, onRetry, retryLabel = 'Retry' }: ErrorMessageProps) {
  const { colors, spacing } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <Icon name={ICONS.CLOSE} size={24} color={colors.error} />
      <Text style={[styles.message, { color: colors.error }]}>{message}</Text>
      {onRetry && (
        <TouchableOpacity
          onPress={onRetry}
          style={[styles.retryButton, { borderColor: colors.error }]}
        >
          <Text style={[styles.retryText, { color: colors.error }]}>{retryLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  retryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    marginTop: 8,
  },
  retryText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

