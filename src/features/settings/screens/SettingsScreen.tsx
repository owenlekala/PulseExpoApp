import React from 'react';
import { View, Text } from 'react-native';
import { Screen } from '@/components/layout/Screen';
import { colors, spacing } from '@/constants/styles';
import { styles } from '../styles/SettingsScreen.styles';

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


