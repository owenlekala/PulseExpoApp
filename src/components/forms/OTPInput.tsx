import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { colors, spacing } from '@/constants/styles';

interface OTPInputProps {
  length?: number;
  onComplete?: (otp: string) => void;
  error?: string;
}

/**
 * OTP Input Component
 * Accepts OTP code with individual input fields
 */
export function OTPInput({ length = 6, onComplete, error }: OTPInputProps) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    // Only allow numbers
    const numericText = text.replace(/[^0-9]/g, '');
    
    if (numericText.length > 1) {
      // Handle paste
      const pastedOtp = numericText.slice(0, length).split('');
      const newOtp = [...otp];
      
      pastedOtp.forEach((char, i) => {
        if (index + i < length) {
          newOtp[index + i] = char;
        }
      });
      
      setOtp(newOtp);
      
      // Focus next empty input or last input
      const nextIndex = Math.min(index + pastedOtp.length, length - 1);
      inputRefs.current[nextIndex]?.focus();
      
      // Check if complete
      if (newOtp.every((char) => char !== '') && newOtp.join('').length === length) {
        onComplete?.(newOtp.join(''));
      }
    } else {
      // Single character input
      const newOtp = [...otp];
      newOtp[index] = numericText;
      setOtp(newOtp);

      // Move to next input if character entered
      if (numericText && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }

      // Check if complete
      const completeOtp = newOtp.join('');
      if (completeOtp.length === length) {
        onComplete?.(completeOtp);
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => { inputRefs.current[index] = ref; }}
            style={[
              styles.input,
              {
                borderColor: error ? colors.error : colors.border,
                backgroundColor: colors.surface,
                color: colors.text,
              },
            ]}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            keyboardType="number-pad"
            maxLength={1}
            selectTextOnFocus
          />
        ))}
      </View>
      {error && (
        <Text style={[styles.errorText, { color: colors.error, marginTop: spacing.xs }]}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  input: {
    flex: 1,
    height: 56,
    borderWidth: 1,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 14,
  },
});

