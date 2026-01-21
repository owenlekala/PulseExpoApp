import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
// Note: Replace with actual Hero UI Native Input/TextField import when installed
// import { TextField } from 'heroui-native';
import { colors, spacing } from '@/constants/styles';
import { Icon } from '../Icon/Icon';
import { ICONS } from '@/constants/icons';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  error?: string;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: any;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'number-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

/**
 * Input component wrapper for Hero UI Native TextField
 * Replace the placeholder implementation with actual Hero UI Native TextField
 */
export function Input({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  error,
  disabled = false,
  leftIcon,
  rightIcon,
  style,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
}: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const showPasswordToggle = secureTextEntry && value.length > 0;

  // Placeholder implementation - Replace with actual Hero UI Native TextField component
  // Example:
  // return (
  //   <TextField
  //     label={label}
  //     placeholder={placeholder}
  //     value={value}
  //     onChangeText={onChangeText}
  //     secureTextEntry={secureTextEntry}
  //     isDisabled={disabled}
  //     errorMessage={error}
  //     startContent={leftIcon}
  //     endContent={rightIcon}
  //     style={style}
  //   />
  // );

  return (
    <View style={[styles.container, { marginBottom: spacing.md }, style]}>
      {label && (
        <Text style={[styles.label, { color: colors.text, marginBottom: spacing.xs }]}>
          {label}
        </Text>
      )}
      <View style={styles.inputContainer}>
        {leftIcon && (
          <View style={styles.leftIcon}>{leftIcon}</View>
        )}
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          editable={!disabled}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          style={[
            styles.input,
            {
              backgroundColor: colors.surface,
              color: colors.text,
              paddingLeft: leftIcon ? 40 : spacing.md,
              paddingRight: (rightIcon || showPasswordToggle) ? 40 : spacing.md,
            },
          ]}
        />
        {showPasswordToggle && (
          <TouchableOpacity
            style={styles.rightIcon}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            activeOpacity={0.7}
          >
            <Icon
              name={isPasswordVisible ? ICONS.EYE_CLOSE : ICONS.EYE}
              size={20}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        )}
        {rightIcon && !showPasswordToggle && (
          <View style={styles.rightIcon}>{rightIcon}</View>
        )}
      </View>
      {error && (
        <Text style={[styles.error, { color: colors.error, marginTop: spacing.xs }]}>
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
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
  inputContainer: {
    position: 'relative',
    width: '100%',
  },
  input: {
    height: 48,
    borderWidth: 0,
    borderRadius: 8,
    fontSize: 16,
    paddingVertical: 0,
  },
  leftIcon: {
    position: 'absolute',
    left: 12,
    top: '50%',
    transform: [{ translateY: -10 }],
    zIndex: 1,
  },
  rightIcon: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{ translateY: -10 }],
    zIndex: 1,
  },
  error: {
    fontSize: 12,
  },
});

