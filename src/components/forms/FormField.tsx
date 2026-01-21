import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input } from '@/components/ui';
import { useTheme } from '@/hooks/useTheme';

interface FormFieldProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  secureTextEntry?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  disabled?: boolean;
  required?: boolean;
}

/**
 * Form field component that wraps Input with label and error handling
 */
export function FormField({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  secureTextEntry = false,
  leftIcon,
  rightIcon,
  disabled = false,
  required = false,
}: FormFieldProps) {
  const { spacing } = useTheme();

  const displayLabel = required && label ? `${label} *` : label;

  return (
    <View style={styles.container}>
      <Input
        label={displayLabel}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        error={error}
        secureTextEntry={secureTextEntry}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        disabled={disabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 4,
  },
});

