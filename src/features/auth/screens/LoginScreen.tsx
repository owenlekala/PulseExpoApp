import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Input } from '@/components/ui';
import { ICONS } from '@/constants/icons';
import { Icon } from '@/components/ui';
import { useTheme } from '@/hooks/useTheme';
import { signIn } from '@/services/firebase/auth';
import { useAuthStore } from '@/store/slices/authSlice';
import { navigate } from '@/navigation/navigationRef';
import { ROUTES } from '@/constants/routes';

/**
 * Login Screen
 */
export default function LoginScreen() {
  const { colors, spacing } = useTheme();
  const { setLoading } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await signIn({ email, password });
      // Navigation will happen automatically via auth state change
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Welcome Back</Text>
      
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

      {error && (
        <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
      )}

      <Button
        variant="primary"
        onPress={handleLogin}
        fullWidth
        style={{ marginTop: spacing.md }}
      >
        Sign In
      </Button>

      <Button
        variant="ghost"
        onPress={() => navigate(ROUTES.SIGNUP)}
        style={{ marginTop: spacing.sm }}
      >
        Don't have an account? Sign Up
      </Button>

      <Button
        variant="ghost"
        onPress={() => navigate(ROUTES.FORGOT_PASSWORD)}
        style={{ marginTop: spacing.xs }}
      >
        Forgot Password?
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

