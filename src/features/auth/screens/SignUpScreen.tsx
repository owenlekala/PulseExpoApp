import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Input } from '@/components/ui';
import { colors, spacing } from '@/constants/styles';
import { signUp } from '@/services/firebase/auth';
import { useAuthStore } from '@/store/slices/authSlice';
import { navigate } from '@/navigation/navigationRef';
import { ROUTES } from '@/constants/routes';
import { validateEmail, validatePasswordMinLength, validatePasswordMatch } from '@/utils/validation/validators';
import { styles } from '../styles/SignUpScreen.styles';

/**
 * Sign Up Screen
 */
export default function SignUpScreen() {
  const { setLoading } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setEmailError('');
    setError('');
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setPasswordError('');
    setConfirmPasswordError('');
    setError('');
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    setConfirmPasswordError('');
    setError('');
  };

  const handleSignUp = async () => {
    // Validate email
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      setEmailError(emailValidation.error || '');
      return;
    }

    // Validate password
    const passwordValidation = validatePasswordMinLength(password);
    if (!passwordValidation.isValid) {
      setPasswordError(passwordValidation.error || '');
      return;
    }

    // Validate password match
    const passwordMatchValidation = validatePasswordMatch(password, confirmPassword);
    if (!passwordMatchValidation.isValid) {
      setConfirmPasswordError(passwordMatchValidation.error || '');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setEmailError('');
      setPasswordError('');
      setConfirmPasswordError('');
      await signUp({ email, password, displayName });
      // Navigation will happen automatically via auth state change
    } catch (err: any) {
      setError(err.message || 'Failed to sign up');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={true}
    >
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>Create Account</Text>
        <Text style={[styles.description, { color: colors.textSecondary }]}>
          Create a new account to get started
        </Text>
        
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
          onChangeText={handleEmailChange}
          error={emailError}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Input
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={handlePasswordChange}
          secureTextEntry
          error={passwordError}
        />

        <Input
          label="Confirm Password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChangeText={handleConfirmPasswordChange}
          secureTextEntry
          error={confirmPasswordError}
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

        <TouchableOpacity
          onPress={() => navigate(ROUTES.LOGIN)}
          style={styles.signInContainer}
        >
          <Text style={[styles.signInText, { color: colors.textSecondary }]}>
            Already have an account?{' '}
          </Text>
          <Text style={[styles.signInText, { color: colors.primary }]}>
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}


