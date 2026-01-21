import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: boolean;
  shadow?: boolean;
}

/**
 * Card component for displaying content in a card container
 */
export function Card({ children, style, padding = true, shadow = false }: CardProps) {
  const { colors, spacing } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          padding: padding ? spacing.md : 0,
          ...(shadow && {
            shadowColor: colors.text,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }),
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
  },
});

