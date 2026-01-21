import React from 'react';
import { SafeAreaView, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface SafeAreaProps {
  children: React.ReactNode;
  style?: ViewStyle;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
}

/**
 * Safe area wrapper component
 */
export function SafeArea({ children, style, edges = ['top', 'bottom'] }: SafeAreaProps) {
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }, style]}
      edges={edges}
    >
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

