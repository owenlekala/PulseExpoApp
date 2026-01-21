import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { colors, spacing } from '@/constants/styles';
import { Icon } from '@/components/ui';
import { ICONS } from '@/constants/icons';
import { ROUTES } from '@/constants/routes';
import { useAuthStore } from '@/store/slices/authSlice';

interface SideMenuContentProps {
  onItemPress?: () => void;
}

/**
 * Side Menu Content Component
 * Contains profile section and menu items
 */
export function SideMenuContent({ onItemPress }: SideMenuContentProps) {
  const navigation = useNavigation<any>();
  const { user } = useAuthStore();

  const handleItemPress = (callback: () => void) => {
    if (onItemPress) {
      onItemPress();
    }
    callback();
  };

  const getInitials = (name?: string) => {
    if (!name) return 'D';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <View style={styles.menuContent}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.profileCardContent}>
          <View style={[styles.profilePictureContainer, { backgroundColor: colors.primary + '20' }]}>
            <View style={[styles.profilePicturePlaceholder, { backgroundColor: colors.primary }]}>
              <Text style={styles.profilePictureText}>
                {getInitials(user?.displayName || 'Demo Name')}
              </Text>
            </View>
          </View>
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: colors.text }]}>
              {user?.displayName || 'Demo Name'}
            </Text>
            <Text style={[styles.profileEmail, { color: colors.textSecondary }]}>
              {user?.email || 'demo@email.com'}
            </Text>
          </View>
        </View>
      </View>

    
      {/* Menu Items */}
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => handleItemPress(() => navigation.navigate(ROUTES.HOME))}
      >
        <View style={styles.menuItemLeft}>
          <Icon name={ICONS.HOME} size={20} color={colors.text} style={{ opacity: 0.6 }} />
          <Text style={[styles.menuItemText, { color: colors.text, marginLeft: spacing.md }]}>
            Home
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => handleItemPress(() => navigation.navigate(ROUTES.PROFILE))}
      >
        <View style={styles.menuItemLeft}>
          <Icon name={ICONS.PROFILE} size={20} color={colors.text} style={{ opacity: 0.6 }} />
          <Text style={[styles.menuItemText, { color: colors.text, marginLeft: spacing.md }]}>
            Profile
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => handleItemPress(() => navigation.navigate(ROUTES.SETTINGS))}
      >
        <View style={styles.menuItemLeft}>
          <Icon name={ICONS.SETTINGS} size={20} color={colors.text} style={{ opacity: 0.6 }} />
          <Text style={[styles.menuItemText, { color: colors.text, marginLeft: spacing.md }]}>
            Settings
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() =>
          handleItemPress(() =>
            navigation.dispatch(
              CommonActions.navigate({
                name: 'Auth',
                params: {
                  screen: ROUTES.LOGIN,
                },
              })
            )
          )
        }
      >
        <View style={styles.menuItemLeft}>
          <Icon name={ICONS.EMAIL} size={20} color={colors.text} style={{ opacity: 0.6 }} />
          <Text style={[styles.menuItemText, { color: colors.text, marginLeft: spacing.md }]}>
            Login
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() =>
          handleItemPress(() =>
            navigation.dispatch(
              CommonActions.navigate({
                name: 'Auth',
                params: {
                  screen: ROUTES.SIGNUP,
                },
              })
            )
          )
        }
      >
        <View style={styles.menuItemLeft}>
          <Icon name={ICONS.USER_EDIT} size={20} color={colors.text} style={{ opacity: 0.6 }} />
          <Text style={[styles.menuItemText, { color: colors.text, marginLeft: spacing.md }]}>
            Sign Up
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() =>
          handleItemPress(() =>
            navigation.dispatch(
              CommonActions.navigate({
                name: 'Auth',
                params: {
                  screen: ROUTES.FORGOT_PASSWORD,
                },
              })
            )
          )
        }
      >
        <View style={styles.menuItemLeft}>
          <Icon name={ICONS.PASSWORD} size={20} color={colors.text} style={{ opacity: 0.6 }} />
          <Text style={[styles.menuItemText, { color: colors.text, marginLeft: spacing.md }]}>
            Forgot Password
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() =>
          handleItemPress(() =>
            navigation.dispatch(
              CommonActions.navigate({
                name: 'Auth',
                params: {
                  screen: ROUTES.OTP,
                },
              })
            )
          )
        }
      >
        <View style={styles.menuItemLeft}>
          <Icon name={ICONS.TIME_DURATION} size={20} color={colors.text} style={{ opacity: 0.6 }} />
          <Text style={[styles.menuItemText, { color: colors.text, marginLeft: spacing.md }]}>
            OTP Verification
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  menuContent: {
    padding: spacing.md,
  },
  profileSection: {
    marginBottom: spacing.lg,
  },
  profileCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePictureContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  profilePicturePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePictureText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  profileEmail: {
    fontSize: 14,
  },
  separator: {
    height: 1,
    marginVertical: spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemText: {
    fontSize: 16,
  },
});

