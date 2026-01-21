import React from 'react';
import { ScrollView, View, StyleSheet, ViewStyle } from 'react-native';
import { SafeArea } from './SafeArea';
import { AppBar } from '@/components/ui';
import { colors, spacing } from '@/constants/styles';

interface AppBarConfig {
  title: string;
  showBack?: boolean;
  onBackPress?: () => void;
  rightAction?: {
    type: 'button' | 'icon';
    label?: string;
    icon?: string;
    onPress: () => void;
  };
}

interface ScreenProps {
  children: React.ReactNode;
  style?: ViewStyle;
  scrollable?: boolean;
  safeArea?: boolean;
  safeAreaEdges?: ('top' | 'bottom' | 'left' | 'right')[];
  appBar?: AppBarConfig;
}

/**
 * Screen component that combines SafeArea and ScrollView
 * Optionally includes AppBar at the top when appBar prop is provided
 */
export function Screen({
  children,
  style,
  scrollable = true,
  safeArea = true,
  safeAreaEdges = ['top', 'bottom'],
  appBar,
}: ScreenProps) {
  // If AppBar is provided, adjust safeAreaEdges to exclude top (AppBar handles it)
  const adjustedSafeAreaEdges = appBar
    ? safeAreaEdges.filter((edge) => edge !== 'top')
    : safeAreaEdges;

  const content = scrollable ? (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: colors.background }, style]}
      contentContainerStyle={[styles.contentContainer, { padding: spacing.md }]}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.contentContainer, { padding: spacing.md }]}>{children}</View>
  );

  // If AppBar is provided, wrap in container with AppBar at top
  if (appBar) {
    return (
      <View style={styles.screenWithAppBar}>
        <AppBar
          title={appBar.title}
          showBack={appBar.showBack}
          onBackPress={appBar.onBackPress}
          rightAction={appBar.rightAction}
        />
        {safeArea ? (
          <SafeArea edges={adjustedSafeAreaEdges}>{content}</SafeArea>
        ) : (
          content
        )}
      </View>
    );
  }

  // No AppBar - use original behavior
  if (safeArea) {
    return <SafeArea edges={safeAreaEdges}>{content}</SafeArea>;
  }

  return content;
}

const styles = StyleSheet.create({
  screenWithAppBar: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
});

