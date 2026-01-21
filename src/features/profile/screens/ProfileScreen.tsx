import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Screen } from '@/components/layout/Screen';
import { colors, spacing } from '@/constants/styles';
import { useAuthStore } from '@/store/slices/authSlice';
import { Icon } from '@/components/ui';
import { ICONS } from '@/constants/icons';
import { ROUTES } from '@/constants/routes';
import { styles } from '../styles/ProfileScreen.styles';

interface MenuItemProps {
  icon: string;
  label: string;
  onPress: () => void;
}

interface SectionProps {
  title: string;
  items: MenuItemProps[];
}

/**
 * Profile Screen
 */
export default function ProfileScreen() {
  const { user } = useAuthStore();
  const navigation = useNavigation();

  const handleEditPicture = () => {
    // TODO: Implement edit picture functionality
    console.log('Edit picture');
  };

  const myAccountItems: MenuItemProps[] = [
    {
      icon: ICONS.PERSONAL_INFO,
      label: 'Personal Information',
      onPress: () => navigation.navigate(ROUTES.PERSONAL_INFORMATION as never),
    },
    {
      icon: ICONS.SUBSCRIPTIONS,
      label: 'Subscriptions',
      onPress: () => console.log('Subscriptions'),
    },
    {
      icon: ICONS.PURCHASE_HISTORY,
      label: 'Purchase History',
      onPress: () => console.log('Purchase History'),
    },
    {
      icon: ICONS.NOTIFICATIONS,
      label: 'Notifications',
      onPress: () => console.log('Notifications'),
    },
  ];

  const securityItems: MenuItemProps[] = [
    {
      icon: ICONS.CHANGE_PASSWORD,
      label: 'Change Password',
      onPress: () => navigation.navigate(ROUTES.CHANGE_PASSWORD as never),
    },
    {
      icon: ICONS.BIOMETRICS,
      label: 'Biometrics',
      onPress: () => console.log('Biometrics'),
    },
    {
      icon: ICONS.SECURITY_QUESTION,
      label: 'Security Question',
      onPress: () => console.log('Security Question'),
    },
  ];

  const rewardsItems: MenuItemProps[] = [
    {
      icon: ICONS.REFERRAL,
      label: 'Referral Program',
      onPress: () => console.log('Referral Program'),
    },
    {
      icon: ICONS.REDEEM,
      label: 'Redeem',
      onPress: () => console.log('Redeem'),
    },
  ];

  return (
    <View style={styles.wrapper}>
      {/* Subtle gradient edges */}
      <View style={[styles.gradientLeft, { backgroundColor: colors.primary }]} />
      <View style={[styles.gradientRight, { backgroundColor: colors.primary }]} />
      
      <Screen safeAreaEdges={['top']} scrollable={true}>
        <View style={styles.container}>
          {/* Profile Picture Section */}
          <View style={styles.profileSection}>
            <View style={styles.profilePictureContainer}>
              <View style={styles.profilePicture}>
                {/* Placeholder for profile picture - replace with Image component when you have the image */}
                <View style={styles.profilePicturePlaceholder}>
                  <Icon name={ICONS.PROFILE} size={60} color={colors.text} />
                </View>
              </View>
            </View>
            <Text style={[styles.userName, { color: colors.text }]}>
              {user?.displayName || 'John Doe'}
            </Text>
            <TouchableOpacity onPress={handleEditPicture} style={styles.editPictureButton}>
              <Text style={[styles.editPictureText, { color: colors.primary }]}>
                Edit Picture
              </Text>
            </TouchableOpacity>
          </View>

          {/* Menu Sections */}
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
            MY ACCOUNT
          </Text>
          <View style={styles.card}>
            {myAccountItems.map((item, index) => (
              <MenuItem
                key={index}
                icon={item.icon}
                label={item.label}
                onPress={item.onPress}
                isLast={index === myAccountItems.length - 1}
                isInCard={true}
              />
            ))}
          </View>

          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
            SECURITY
          </Text>
          <View style={styles.card}>
            {securityItems.map((item, index) => (
              <MenuItem
                key={index}
                icon={item.icon}
                label={item.label}
                onPress={item.onPress}
                isLast={index === securityItems.length - 1}
                isInCard={true}
              />
            ))}
          </View>

          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
            REWARDS AND BENEFITS
          </Text>
          <View style={styles.card}>
            {rewardsItems.map((item, index) => (
              <MenuItem
                key={index}
                icon={item.icon}
                label={item.label}
                onPress={item.onPress}
                isLast={index === rewardsItems.length - 1}
                isInCard={true}
              />
            ))}
          </View>
        </View>
      </Screen>
    </View>
  );
}

/**
 * Section Component
 */
function Section({ title, items, isInCard = false }: SectionProps & { isInCard?: boolean }) {
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.textSecondary, paddingHorizontal: isInCard ? spacing.md : spacing.md }]}>
        {title}
      </Text>
      {items.map((item, index) => (
        <MenuItem
          key={index}
          icon={item.icon}
          label={item.label}
          onPress={item.onPress}
          isLast={index === items.length - 1}
        />
      ))}
    </View>
  );
}

/**
 * Menu Item Component
 */
function MenuItem({ icon, label, onPress, isLast, isInCard = false }: MenuItemProps & { isLast: boolean; isInCard?: boolean }) {
  return (
    <>
      <TouchableOpacity style={styles.menuItem} onPress={onPress}>
        <View style={styles.menuItemLeft}>
          <Icon name={icon} size={20} color={colors.primary} />
          <Text style={[styles.menuItemLabel, { color: colors.text }]}>{label}</Text>
        </View>
        <Icon name={ICONS.RIGHT} size={20} color={colors.textSecondary} style={{ opacity: 0.7 }} />
      </TouchableOpacity>
      {!isLast && (
        <View style={[
          styles.separator, 
          { 
            backgroundColor: colors.border,
            opacity: 0.4,
            marginLeft: isInCard ? spacing.md + 20 + spacing.md : spacing.md + 20 + spacing.md,
            marginRight: isInCard ? spacing.md : spacing.md,
          }
        ]} />
      )}
    </>
  );
}

