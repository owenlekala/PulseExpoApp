import React from 'react';
import { ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { SafeArea } from './SafeArea';
import { useTheme } from '@/hooks/useTheme';

interface ScreenProps {
  children: React.ReactNode;
  style?: ViewStyle;
  scrollable?: boolean;
  safeArea?: boolean;
  safeAreaEdges?: ('top' | 'bottom' | 'left' | 'right')[];
}

/**
 * Screen component that combines SafeArea and ScrollView
 */
export function Screen({
  children,
  style,
  scrollable = true,
  safeArea = true,
  safeAreaEdges = ['top', 'bottom'],
}: ScreenProps) {
  const { colors } = useTheme();

  const content = scrollable ? (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: colors.background }, style]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <>{children}</>
  );

  if (safeArea) {
    return <SafeArea edges={safeAreaEdges}>{content}</SafeArea>;
  }

  return content;
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
});

