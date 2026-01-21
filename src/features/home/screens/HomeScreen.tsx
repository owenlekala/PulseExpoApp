import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { Screen } from '@/components/layout/Screen';
import { colors, spacing } from '@/constants/styles';
import { useAuthStore } from '@/store/slices/authSlice';
import { SideMenuSheet } from '@/components/common';
import { Icon } from '@/components/ui';
import { ICONS } from '@/constants/icons';
import { ROUTES } from '@/constants/routes';
import { styles } from '../styles/HomeScreen.styles';

/**
 * Home Screen
 */
export default function HomeScreen() {
  const { user } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigation = useNavigation<any>();

  return (
    <Screen safeAreaEdges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => setIsMenuOpen(true)}
          style={[
            styles.menuButton,
            {
              padding: spacing.sm,
            },
          ]}
          activeOpacity={0.7}
        >
          <Icon name={ICONS.MENU} size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <Text style={[styles.title, { color: colors.text, marginBottom: spacing.md }]}>
        Welcome Home
      </Text>
      {user && (
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Hello, {user.displayName || user.email}
        </Text>
      )}

      <SideMenuSheet
        visible={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        showCloseButton={false}
        closeOnBackdrop={true}
      >
        <View style={[styles.menuContent, { padding: spacing.md }]}>
          {/* Profile Section */}
          <View style={[styles.profileSection, { marginBottom: spacing.lg }]}>
            <View style={styles.profileCardContent}>
              <View style={[styles.profilePictureContainer, { backgroundColor: colors.primary + '20' }]}>
                <View style={[styles.profilePicturePlaceholder, { backgroundColor: colors.primary }]}>
                  <Text style={[styles.profilePictureText, { color: '#FFFFFF' }]}>
                    D
                  </Text>
                </View>
              </View>
              <View style={styles.profileInfo}>
                <Text style={[styles.profileName, { color: colors.text }]}>
                  Demo Name
                </Text>
                <Text style={[styles.profileEmail, { color: colors.textSecondary }]}>
                  demo@email.com
                </Text>
              </View>
            </View>
          </View>

          {/* Menu Items */}
          <TouchableOpacity
            style={[styles.menuItem, { paddingVertical: spacing.md }]}
            onPress={() => {
              setIsMenuOpen(false);
              navigation.navigate(ROUTES.HOME);
            }}
          >
            <View style={styles.menuItemLeft}>
              <Icon name={ICONS.HOME} size={20} color={colors.text} />
              <Text style={[styles.menuItemText, { color: colors.text, marginLeft: spacing.sm }]}>Home</Text>
            </View>
            <Icon name={ICONS.RIGHT} size={20} color={colors.textSecondary} />
          </TouchableOpacity>
          <View style={[styles.separator, { backgroundColor: colors.border }]} />
          <TouchableOpacity
            style={[styles.menuItem, { paddingVertical: spacing.md }]}
            onPress={() => {
              setIsMenuOpen(false);
              navigation.navigate(ROUTES.PROFILE);
            }}
          >
            <View style={styles.menuItemLeft}>
              <Icon name={ICONS.PROFILE} size={20} color={colors.text} />
              <Text style={[styles.menuItemText, { color: colors.text, marginLeft: spacing.sm }]}>Profile</Text>
            </View>
            <Icon name={ICONS.RIGHT} size={20} color={colors.textSecondary} />
          </TouchableOpacity>
          <View style={[styles.separator, { backgroundColor: colors.border }]} />
          <TouchableOpacity
            style={[styles.menuItem, { paddingVertical: spacing.md }]}
            onPress={() => {
              setIsMenuOpen(false);
              navigation.navigate(ROUTES.SETTINGS);
            }}
          >
            <View style={styles.menuItemLeft}>
              <Icon name={ICONS.SETTINGS} size={20} color={colors.text} />
              <Text style={[styles.menuItemText, { color: colors.text, marginLeft: spacing.sm }]}>Settings</Text>
            </View>
            <Icon name={ICONS.RIGHT} size={20} color={colors.textSecondary} />
          </TouchableOpacity>
          <View style={[styles.separator, { backgroundColor: colors.border }]} />
          <TouchableOpacity
            style={[styles.menuItem, { paddingVertical: spacing.md }]}
            onPress={() => {
              setIsMenuOpen(false);
              navigation.dispatch(
                CommonActions.navigate({
                  name: 'Auth',
                  params: {
                    screen: ROUTES.LOGIN,
                  },
                })
              );
            }}
          >
            <View style={styles.menuItemLeft}>
              <Icon name={ICONS.EMAIL} size={20} color={colors.text} />
              <Text style={[styles.menuItemText, { color: colors.text, marginLeft: spacing.sm }]}>Login</Text>
            </View>
            <Icon name={ICONS.RIGHT} size={20} color={colors.textSecondary} />
          </TouchableOpacity>
          <View style={[styles.separator, { backgroundColor: colors.border }]} />
          <TouchableOpacity
            style={[styles.menuItem, { paddingVertical: spacing.md }]}
            onPress={() => {
              setIsMenuOpen(false);
              navigation.dispatch(
                CommonActions.navigate({
                  name: 'Auth',
                  params: {
                    screen: ROUTES.SIGNUP,
                  },
                })
              );
            }}
          >
            <View style={styles.menuItemLeft}>
              <Icon name={ICONS.USER_EDIT} size={20} color={colors.text} />
              <Text style={[styles.menuItemText, { color: colors.text, marginLeft: spacing.sm }]}>Sign Up</Text>
            </View>
            <Icon name={ICONS.RIGHT} size={20} color={colors.textSecondary} />
          </TouchableOpacity>
          <View style={[styles.separator, { backgroundColor: colors.border }]} />
          <TouchableOpacity
            style={[styles.menuItem, { paddingVertical: spacing.md }]}
            onPress={() => {
              setIsMenuOpen(false);
              navigation.dispatch(
                CommonActions.navigate({
                  name: 'Auth',
                  params: {
                    screen: ROUTES.FORGOT_PASSWORD,
                  },
                })
              );
            }}
          >
            <View style={styles.menuItemLeft}>
              <Icon name={ICONS.PASSWORD} size={20} color={colors.text} />
              <Text style={[styles.menuItemText, { color: colors.text, marginLeft: spacing.sm }]}>Forgot Password</Text>
            </View>
            <Icon name={ICONS.RIGHT} size={20} color={colors.textSecondary} />
          </TouchableOpacity>
          <View style={[styles.separator, { backgroundColor: colors.border }]} />
          <TouchableOpacity
            style={[styles.menuItem, { paddingVertical: spacing.md }]}
            onPress={() => {
              setIsMenuOpen(false);
              navigation.dispatch(
                CommonActions.navigate({
                  name: 'Auth',
                  params: {
                    screen: ROUTES.OTP,
                  },
                })
              );
            }}
          >
            <View style={styles.menuItemLeft}>
              <Icon name={ICONS.TIME_DURATION} size={20} color={colors.text} />
              <Text style={[styles.menuItemText, { color: colors.text, marginLeft: spacing.sm }]}>OTP Verification</Text>
            </View>
            <Icon name={ICONS.RIGHT} size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </SideMenuSheet>
    </Screen>
  );
}


