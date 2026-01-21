import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Icon } from '@/components/ui';

interface EmptyStateProps {
  icon?: string;
  title: string;
  message?: string;
  action?: React.ReactNode;
}

/**
 * Empty state component for displaying when there's no content
 */
export function EmptyState({ icon, title, message, action }: EmptyStateProps) {
  const { colors, spacing } = useTheme();

  return (
    <View style={[styles.container, { padding: spacing.xl }]}>
      {icon && (
        <View style={styles.iconContainer}>
          <Icon name={icon} size={64} color={colors.textSecondary} />
        </View>
      )}
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      {message && (
        <Text style={[styles.message, { color: colors.textSecondary }]}>{message}</Text>
      )}
      {action && <View style={styles.action}>{action}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },
  action: {
    marginTop: 8,
  },
});

