import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { useThemeStore } from '@/store/slices/themeSlice';
import { Icon } from '@/components/ui';
import { ICONS } from '@/constants/icons';
import { ThemeMode } from '@/types/theme';

/**
 * Theme Toggle Component
 */
export function ThemeToggle() {
  const { colors, spacing } = useTheme();
  const { mode, setMode } = useThemeStore();

  const themes: { label: string; value: ThemeMode; icon: string }[] = [
    { label: 'Light', value: 'light', icon: ICONS.SUN },
    { label: 'Dark', value: 'dark', icon: ICONS.MOON },
    { label: 'System', value: 'system', icon: ICONS.SYSTEM },
  ];

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text }]}>Theme</Text>
      <View style={styles.options}>
        {themes.map((theme) => (
          <TouchableOpacity
            key={theme.value}
            onPress={() => setMode(theme.value)}
            style={[
              styles.option,
              {
                backgroundColor: mode === theme.value ? colors.primary : colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <Icon
              name={theme.icon}
              size={20}
              color={mode === theme.value ? '#FFFFFF' : colors.text}
            />
            <Text
              style={[
                styles.optionText,
                {
                  color: mode === theme.value ? '#FFFFFF' : colors.text,
                },
              ]}
            >
              {theme.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  options: {
    flexDirection: 'row',
    gap: 12,
  },
  option: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

