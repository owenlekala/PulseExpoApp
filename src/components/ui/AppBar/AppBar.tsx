import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing } from '@/constants/styles';
import { Icon } from '../Icon/Icon';
import { ICONS } from '@/constants/icons';
import { Button } from '../Button/Button';

interface AppBarProps {
  title: string;
  showBack?: boolean;
  onBackPress?: () => void;
  rightAction?: {
    type: 'button' | 'icon';
    label?: string;
    icon?: string;
    onPress: () => void;
  };
}

/**
 * AppBar component for consistent headers across screens
 */
export function AppBar({ title, showBack = true, onBackPress, rightAction }: AppBarProps) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing.md }]}>
      <View style={styles.content}>
        {showBack && (
          <TouchableOpacity
            onPress={handleBackPress}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <Icon name={ICONS.ARROW_LEFT} size={24} color={colors.text} />
          </TouchableOpacity>
        )}
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
          {title}
        </Text>
        {rightAction && (
          <View style={styles.rightAction}>
            {rightAction.type === 'button' ? (
              <TouchableOpacity
                onPress={rightAction.onPress}
                style={styles.rightButton}
                activeOpacity={0.7}
              >
                <Text style={[styles.rightButtonText, { color: colors.primary }]}>
                  {rightAction.label}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={rightAction.onPress}
                style={styles.rightIconButton}
                activeOpacity={0.7}
              >
                {rightAction.icon && (
                  <Icon name={rightAction.icon} size={24} color={colors.text} />
                )}
              </TouchableOpacity>
            )}
          </View>
        )}
        {!rightAction && showBack && <View style={styles.placeholder} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    backgroundColor: colors.background,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: spacing.xs,
    marginRight: spacing.sm,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    marginLeft: spacing.sm,
  },
  rightAction: {
    marginLeft: spacing.sm,
  },
  rightButton: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    minHeight: 0,
  },
  rightButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  rightIconButton: {
    padding: spacing.xs,
  },
  placeholder: {
    width: 40, // Same width as back button for alignment
  },
});

