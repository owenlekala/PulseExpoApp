import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@/components/ui';
import { colors, spacing } from '@/constants/styles';
import { ICONS } from '@/constants/icons';
import { ROUTES } from '@/constants/routes';

/**
 * Custom Bottom Tab Bar Component
 * Sleek and clean modern design
 */
export function BottomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  const getIconName = (routeName: string): string => {
    switch (routeName) {
      case ROUTES.HOME:
        return ICONS.HOME;
      case ROUTES.PROFILE:
        return ICONS.PROFILE;
      case ROUTES.SETTINGS:
        return ICONS.SETTINGS;
      default:
        return ICONS.HOME;
    }
  };

  const getLabel = (routeName: string): string => {
    switch (routeName) {
      case ROUTES.HOME:
        return 'Home';
      case ROUTES.PROFILE:
        return 'Profile';
      case ROUTES.SETTINGS:
        return 'Settings';
      default:
        return '';
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          paddingTop: spacing.sm,
          paddingHorizontal: spacing.xs,
          paddingBottom: Math.max(insets.bottom, spacing.sm),
          shadowColor: colors.text,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const iconName = getIconName(route.name);
        const label = getLabel(route.name);

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[
              styles.tab,
              {
                paddingVertical: spacing.xs,
              },
            ]}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.tabContent,
                {
                  paddingVertical: spacing.xs,
                  paddingHorizontal: spacing.sm,
                },
              ]}
            >
              <Icon
                name={iconName as any}
                size={24}
                color={isFocused ? colors.primary : colors.textSecondary}
              />
              <Text
                style={[
                  styles.label,
                  {
                    color: isFocused ? colors.primary : colors.textSecondary,
                    fontWeight: isFocused ? '600' : '400',
                  },
                ]}
              >
                {label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    letterSpacing: 0.2,
  },
});

