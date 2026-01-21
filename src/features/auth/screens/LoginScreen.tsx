import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Input } from '@/components/ui';
import { colors, spacing } from '@/constants/styles';
import { signIn } from '@/services/firebase/auth';
import { useAuthStore } from '@/store/slices/authSlice';
import { navigate } from '@/navigation/navigationRef';
import { ROUTES } from '@/constants/routes';
import { validateEmail, validatePasswordMinLength } from '@/utils/validation/validators';
import { styles } from '../styles/LoginScreen.styles';

/**
 * Login Screen
 */
export default function LoginScreen() {
  const { setLoading } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setEmailError('');
    setError('');
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setPasswordError('');
    setError('');
  };

  const handleLogin = async () => {
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

    try {
      setLoading(true);
      setError('');
      setEmailError('');
      setPasswordError('');
      await signIn({ email, password });
      // Navigation will happen automatically via auth state change
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
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
        <Text style={[styles.title, { color: colors.text }]}>Welcome Back</Text>
        <Text style={[styles.description, { color: colors.textSecondary }]}>
          Sign in to your account to continue
        </Text>
        
        <Input
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={handleEmailChange}
          error={emailError}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <View>
          <Input
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={handlePasswordChange}
            secureTextEntry
            error={passwordError}
          />
          <TouchableOpacity
            onPress={() => navigate(ROUTES.FORGOT_PASSWORD)}
            style={styles.forgotPasswordContainer}
          >
            <Text style={[styles.forgotPasswordText, { color: colors.primary }]}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>

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

        <TouchableOpacity
          onPress={() => navigate(ROUTES.SIGNUP)}
          style={styles.signUpContainer}
        >
          <Text style={[styles.signUpText, { color: colors.textSecondary }]}>
            Don't have an account?{' '}
          </Text>
          <Text style={[styles.signUpText, { color: colors.primary }]}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}


