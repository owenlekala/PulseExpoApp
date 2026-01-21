import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
// Note: Replace with actual Hero UI Native Button import when installed
// import { Button as HUIButton } from 'heroui-native';
import { useTheme } from '@/hooks/useTheme';

interface ButtonProps {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: any;
}

/**
 * Button component wrapper for Hero UI Native Button
 * Replace the placeholder implementation with actual Hero UI Native Button
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  onPress,
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
}: ButtonProps) {
  const { colors, spacing } = useTheme();

  // Placeholder implementation - Replace with actual Hero UI Native Button component
  // Example:
  // return (
  //   <HUIButton
  //     variant={variant}
  //     size={size}
  //     onPress={onPress}
  //     disabled={disabled || loading}
  //     isLoading={loading}
  //     className={fullWidth ? 'w-full' : ''}
  //     style={style}
  //   >
  //     {children}
  //   </HUIButton>
  // );

  const getBackgroundColor = () => {
    if (variant === 'primary') return colors.primary;
    if (variant === 'secondary') return colors.secondary;
    return 'transparent';
  };

  const getPadding = () => {
    if (size === 'sm') return spacing.sm;
    if (size === 'lg') return spacing.lg;
    return spacing.md;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          paddingVertical: getPadding(),
          paddingHorizontal: getPadding() * 1.5,
          borderWidth: variant === 'outline' ? 1 : 0,
          borderColor: colors.border,
          borderRadius: 8,
          opacity: disabled || loading ? 0.5 : 1,
          width: fullWidth ? '100%' : 'auto',
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' || variant === 'secondary' ? '#FFFFFF' : colors.text} />
      ) : children ? (
        <Text
          style={[
            styles.text,
            {
              color: variant === 'primary' || variant === 'secondary' ? '#FFFFFF' : colors.text,
              fontSize: size === 'sm' ? 14 : size === 'lg' ? 18 : 16,
            },
          ]}
        >
          {children}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
  },
});

