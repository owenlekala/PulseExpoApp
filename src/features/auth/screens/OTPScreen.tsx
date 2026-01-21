import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '@/components/ui';
import { OTPInput } from '@/components/forms';
import { colors, spacing } from '@/constants/styles';
import { navigate } from '@/navigation/navigationRef';
import { ROUTES } from '@/constants/routes';

/**
 * OTP Screen
 * Verifies OTP code sent to user's email/phone
 */
export default function OTPScreen() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      setError('Please enter the complete OTP code');
      return;
    }

    try {
      setLoading(true);
      setError('');
      // TODO: Implement OTP verification logic
      // await verifyOTP(otp);
      
      // For now, just navigate to home
      navigate(ROUTES.HOME);
    } catch (err: any) {
      setError(err.message || 'Invalid OTP code');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      setError('');
      setCanResend(false);
      setTimer(60);
      // TODO: Implement resend OTP logic
      // await resendOTP();
    } catch (err: any) {
      setError(err.message || 'Failed to resend OTP');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Verify OTP</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Enter the 6-digit code sent to your email
      </Text>

      <OTPInput
        length={6}
        onComplete={(code) => {
          setOtp(code);
          setError('');
        }}
        error={error}
      />

      {error && (
        <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
      )}

      <Button
        variant="primary"
        onPress={handleVerifyOTP}
        loading={loading}
        fullWidth
        style={{ marginTop: spacing.lg }}
      >
        Verify OTP
      </Button>

      <View style={styles.resendContainer}>
        <Text style={[styles.resendText, { color: colors.textSecondary }]}>
          Didn't receive the code?
        </Text>
        {canResend ? (
          <Button variant="ghost" onPress={handleResendOTP} style={{ paddingVertical: 4 }}>
            <Text style={[styles.resendButton, { color: colors.primary }]}>Resend OTP</Text>
          </Button>
        ) : (
          <Text style={[styles.timerText, { color: colors.textSecondary }]}>
            Resend in {timer}s
          </Text>
        )}
      </View>

      <Button
        variant="ghost"
        onPress={() => navigate(ROUTES.LOGIN)}
        style={{ marginTop: spacing.md }}
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
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: 'left',
  },
  errorText: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
    gap: 8,
  },
  resendText: {
    fontSize: 14,
  },
  resendButton: {
    fontSize: 14,
    fontWeight: '600',
  },
  timerText: {
    fontSize: 14,
  },
});

