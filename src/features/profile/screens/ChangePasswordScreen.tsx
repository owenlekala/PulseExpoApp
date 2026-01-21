import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Screen } from '@/components/layout';
import { Button, Input } from '@/components/ui';
import { colors, spacing } from '@/constants/styles';
import { ROUTES } from '@/constants/routes';
import { validatePasswordMinLength } from '@/utils/validation/validators';
import { styles } from '../styles/ChangePasswordScreen.styles';

/**
 * Change Password Screen
 */
export default function ChangePasswordScreen() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [currentPasswordError, setCurrentPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCurrentPasswordChange = (text: string) => {
    setCurrentPassword(text);
    setCurrentPasswordError('');
    setError('');
  };

  const handleNewPasswordChange = (text: string) => {
    setNewPassword(text);
    setNewPasswordError('');
    setError('');
  };

  const handleChangePassword = async () => {
    // Validate current password
    if (!currentPassword) {
      setCurrentPasswordError('Current password is required');
      return;
    }

    // Validate new password
    const passwordValidation = validatePasswordMinLength(newPassword);
    if (!passwordValidation.isValid) {
      setNewPasswordError(passwordValidation.error || '');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setCurrentPasswordError('');
      setNewPasswordError('');
      // TODO: Implement change password logic
      // await changePassword(currentPassword, newPassword);
      console.log('Password changed successfully');
      // Navigate back or show success message
    } catch (err: any) {
      setError(err.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen
      appBar={{
        title: 'Change Password',
      }}
      safeAreaEdges={['bottom']}
      scrollable={true}
    >
      <View style={styles.container}>
        {/* Form */}
        <View style={styles.form}>
          <Input
            label="Current Password"
            placeholder="Enter your current password"
            value={currentPassword}
            onChangeText={handleCurrentPasswordChange}
            secureTextEntry
            error={currentPasswordError}
          />

          <Input
            label="New Password"
            placeholder="Enter your new password"
            value={newPassword}
            onChangeText={handleNewPasswordChange}
            secureTextEntry
            error={newPasswordError}
          />

          <Text style={[styles.hintText, { color: colors.textSecondary }]}>
            Password should be a minimum of 6 characters
          </Text>

          {error && (
            <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
          )}

          <Button
            variant="primary"
            onPress={handleChangePassword}
            loading={loading}
            fullWidth
            style={{ marginTop: spacing.md }}
          >
            Change Password
          </Button>

          
        </View>
      </View>
    </Screen>
  );
}

