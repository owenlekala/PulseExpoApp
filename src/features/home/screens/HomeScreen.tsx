import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { useAuthStore } from '@/store/slices/authSlice';

/**
 * Home Screen
 */
export default function HomeScreen() {
  const { colors, spacing } = useTheme();
  const { user } = useAuthStore();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <Text style={[styles.title, { color: colors.text }]}>Welcome Home</Text>
      {user && (
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Hello, {user.displayName || user.email}
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
});

