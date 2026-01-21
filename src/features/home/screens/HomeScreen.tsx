import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Screen } from '@/components/layout/Screen';
import { colors, spacing } from '@/constants/styles';
import { useAuthStore } from '@/store/slices/authSlice';
import { SideMenuSheet, SideMenuContent } from '@/components/common';
import { Icon } from '@/components/ui';
import { ICONS } from '@/constants/icons';
import { styles } from '../styles/HomeScreen.styles';

/**
 * Home Screen
 */
export default function HomeScreen() {
  const { user } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Screen safeAreaEdges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => setIsMenuOpen(true)}
          style={[
            styles.menuButton,
            {
              padding: spacing.sm,
            },
          ]}
          activeOpacity={0.7}
        >
          <Icon name={ICONS.MENU} size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <Text style={[styles.title, { color: colors.text, marginBottom: spacing.md }]}>
        Welcome Home
      </Text>
      {user && (
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Hello, {user.displayName || user.email}
        </Text>
      )}

      <SideMenuSheet
        visible={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        showCloseButton={false}
        closeOnBackdrop={true}
      >
        <SideMenuContent onItemPress={() => setIsMenuOpen(false)} />
      </SideMenuSheet>
    </Screen>
  );
}


