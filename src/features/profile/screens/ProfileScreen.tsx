import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Screen } from '@/components/layout/Screen';
import { colors, spacing } from '@/constants/styles';
import { useAuthStore } from '@/store/slices/authSlice';
import { Button } from '@/components/ui';
import { signOutUser } from '@/services/firebase/auth';

/**
 * Profile Screen
 */
export default function ProfileScreen() {
  const { user } = useAuthStore();

  const handleSignOut = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <Screen safeAreaEdges={['top']}>
      <Text style={[styles.title, { color: colors.text, marginBottom: spacing.lg }]}>
        Profile
      </Text>
      
      {user && (
        <View style={styles.profileInfo}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Email:</Text>
          <Text style={[styles.value, { color: colors.text }]}>{user.email}</Text>
          
          {user.displayName && (
            <>
              <Text style={[styles.label, { color: colors.textSecondary }]}>Name:</Text>
              <Text style={[styles.value, { color: colors.text }]}>{user.displayName}</Text>
            </>
          )}
        </View>
      )}

      <Button
        variant="outline"
        onPress={handleSignOut}
        fullWidth
        style={{ marginTop: spacing.lg }}
      >
        <Text style={{ color: colors.text }}>Sign Out</Text>
      </Button>
    </Screen>
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
    marginBottom: 24,
  },
  profileInfo: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    marginTop: 16,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
  },
});

