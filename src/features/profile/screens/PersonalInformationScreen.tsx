import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Screen } from '@/components/layout';
import { colors, spacing } from '@/constants/styles';
import { useAuthStore } from '@/store/slices/authSlice';
import { styles } from '../styles/PersonalInformationScreen.styles';

interface InfoFieldProps {
  label: string;
  value: string;
  isLast?: boolean;
}

/**
 * Personal Information Screen
 */
export default function PersonalInformationScreen() {
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);

  // Mock data - replace with actual user data
  const userData = {
    name: user?.displayName || 'John Doe',
    email: user?.email || 'john@example.com',
    phone: '+27 63 485 3412',
    gender: 'Female',
    birthday: '09 June 2024',
  };

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
    // TODO: Implement edit functionality
  };

  return (
    <Screen
      appBar={{
        title: 'Personal Information',
        rightAction: {
          type: 'button',
          label: isEditing ? 'Save' : 'Edit Profile',
          onPress: handleEditProfile,
        },
      }}
      safeAreaEdges={['bottom']}
      scrollable={true}
    >
      <View style={styles.container}>
        {/* Information Card */}
        <View style={styles.card}>
          <InfoField label="Name" value={userData.name} />
          <InfoField label="Email" value={userData.email} />
          <InfoField label="Phone Number" value={userData.phone} />
          <InfoField label="Gender" value={userData.gender} />
          <InfoField label="Birthday" value={userData.birthday} isLast={true} />
        </View>
      </View>
    </Screen>
  );
}

/**
 * Info Field Component
 */
function InfoField({ label, value, isLast = false }: InfoFieldProps) {
  return (
    <>
      <View style={styles.infoField}>
        <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
          {label}
        </Text>
        <Text style={[styles.infoValue, { color: colors.text }]}>
          {value}
        </Text>
      </View>
      {!isLast && <View style={[styles.separator, { backgroundColor: colors.border }]} />}
    </>
  );
}

