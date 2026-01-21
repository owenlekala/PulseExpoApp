import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Input } from '@/components/ui';
import { ICONS } from '@/constants/icons';
import { Icon } from '@/components/ui';
import { useTheme } from '@/hooks/useTheme';
import { resetPassword } from '@/services/firebase/auth';
import { navigate } from '@/navigation/navigationRef';
import { ROUTES } from '@/constants/routes';

/**
 * Forgot Password Screen
 */
export default function ForgotPasswordScreen() {
  const { colors, spacing } = useTheme();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      setError('Please enter your email');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await resetPassword(email);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.title, { color: colors.text }]}>Check Your Email</Text>
        <Text style={[styles.message, { color: colors.textSecondary }]}>
          We've sent a password reset link to {email}
        </Text>
        <Button
          variant="primary"
          onPress={() => navigate(ROUTES.LOGIN)}
          fullWidth
          style={{ marginTop: spacing.md }}
        >
          Back to Login
        </Button>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Reset Password</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Enter your email address and we'll send you a link to reset your password.
      </Text>
      
      <Input
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        leftIcon={<Icon name={ICONS.EMAIL} size={20} />}
        error={error}
      />

      {error && (
        <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
      )}

      <Button
        variant="primary"
        onPress={handleResetPassword}
        loading={loading}
        fullWidth
        style={{ marginTop: spacing.md }}
      >
        Send Reset Link
      </Button>

      <Button
        variant="ghost"
        onPress={() => navigate(ROUTES.LOGIN)}
        style={{ marginTop: spacing.sm }}
      >
        Back to Login
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
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 14,
    marginTop: 8,
  },
});

