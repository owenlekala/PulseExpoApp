import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing } from '@/constants/styles';

interface ContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: boolean;
}

/**
 * Container component for consistent padding and layout
 */
export function Container({ children, style, padding = true }: ContainerProps) {

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          padding: padding ? spacing.md : 0,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

