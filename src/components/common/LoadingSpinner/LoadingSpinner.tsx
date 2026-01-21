import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
  fullScreen?: boolean;
}

/**
 * Loading spinner component
 */
export function LoadingSpinner({ size = 'large', color, fullScreen = false }: LoadingSpinnerProps) {
  const { colors } = useTheme();
  const spinnerColor = color || colors.primary;

  if (fullScreen) {
    return (
      <View style={[styles.fullScreen, { backgroundColor: colors.background }]}>
        <ActivityIndicator size={size} color={spinnerColor} />
      </View>
    );
  }

  return <ActivityIndicator size={size} color={spinnerColor} />;
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

