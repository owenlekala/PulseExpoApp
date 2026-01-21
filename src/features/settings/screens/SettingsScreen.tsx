import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Screen } from '@/components/layout/Screen';
import { colors, spacing } from '@/constants/styles';

/**
 * Settings Screen
 */
export default function SettingsScreen() {
  return (
    <Screen safeAreaEdges={['top']}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text, marginBottom: spacing.lg }]}>
          Settings
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
  },
});

