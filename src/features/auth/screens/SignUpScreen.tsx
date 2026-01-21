import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Input } from '@/components/ui';
import { ICONS } from '@/constants/icons';
import { Icon } from '@/components/ui';
import { useTheme } from '@/hooks/useTheme';
import { signUp } from '@/services/firebase/auth';
import { useAuthStore } from '@/store/slices/authSlice';
import { navigate } from '@/navigation/navigationRef';
import { ROUTES } from '@/constants/routes';

/**
 * Sign Up Screen
 */
export default function SignUpScreen() {
  const { colors, spacing } = useTheme();
  const { setLoading } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await signUp({ email, password, displayName });
      // Navigation will happen automatically via auth state change
    } catch (err: any) {
      setError(err.message || 'Failed to sign up');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Create Account</Text>
      
      <Input
        label="Display Name"
        placeholder="Enter your name"
        value={displayName}
        onChangeText={setDisplayName}
      />

      <Input
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        leftIcon={<Icon name={ICONS.EMAIL} size={20} />}
        error={error && !email ? error : undefined}
      />

      <Input
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        leftIcon={<Icon name={ICONS.PASSWORD} size={20} />}
        error={error && !password ? error : undefined}
      />

      <Input
        label="Confirm Password"
        placeholder="Confirm your password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        leftIcon={<Icon name={ICONS.PASSWORD} size={20} />}
        error={error && password !== confirmPassword ? error : undefined}
      />

      {error && (
        <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
      )}

      <Button
        variant="primary"
        onPress={handleSignUp}
        fullWidth
        style={{ marginTop: spacing.md }}
      >
        Sign Up
      </Button>

      <Button
        variant="ghost"
        onPress={() => navigate(ROUTES.LOGIN)}
        style={{ marginTop: spacing.sm }}
      >
        Already have an account? Sign In
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 32,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 14,
    marginTop: 8,
  },
});

