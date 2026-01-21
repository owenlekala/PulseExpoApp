import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Button, Input } from '@/components/ui';
import { colors, spacing } from '@/constants/styles';
import { resetPassword } from '@/services/firebase/auth';
import { navigate } from '@/navigation/navigationRef';
import { ROUTES } from '@/constants/routes';
import { validateEmail } from '@/utils/validation/validators';
import { styles } from '../styles/ForgotPasswordScreen.styles';

/**
 * Forgot Password Screen
 */
export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setEmailError('');
    setError('');
  };

  const handleResetPassword = async () => {
    // Validate email
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      setEmailError(emailValidation.error || '');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setEmailError('');
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
      <ScrollView
        style={[styles.scrollView, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={true}
      >
        <View style={styles.container}>
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
      </ScrollView>
    );
  }

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={true}
    >
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>Reset Password</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Enter your email address and we'll send you a link to reset your password.
        </Text>
        
        <Input
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={handleEmailChange}
          error={emailError || error}
          keyboardType="email-address"
          autoCapitalize="none"
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
    </ScrollView>
  );
}


