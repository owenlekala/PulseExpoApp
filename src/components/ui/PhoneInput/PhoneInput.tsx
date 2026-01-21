import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import { colors, spacing } from '@/constants/styles';

/**
 * Country code data with common countries
 */
export interface CountryCode {
  code: string;
  dialCode: string;
  name: string;
  flag?: string;
}

export const COUNTRY_CODES: CountryCode[] = [
  { code: 'US', dialCode: '+1', name: 'United States' },
  { code: 'GB', dialCode: '+44', name: 'United Kingdom' },
  { code: 'CA', dialCode: '+1', name: 'Canada' },
  { code: 'AU', dialCode: '+61', name: 'Australia' },
  { code: 'DE', dialCode: '+49', name: 'Germany' },
  { code: 'FR', dialCode: '+33', name: 'France' },
  { code: 'IT', dialCode: '+39', name: 'Italy' },
  { code: 'ES', dialCode: '+34', name: 'Spain' },
  { code: 'NL', dialCode: '+31', name: 'Netherlands' },
  { code: 'BE', dialCode: '+32', name: 'Belgium' },
  { code: 'CH', dialCode: '+41', name: 'Switzerland' },
  { code: 'AT', dialCode: '+43', name: 'Austria' },
  { code: 'SE', dialCode: '+46', name: 'Sweden' },
  { code: 'NO', dialCode: '+47', name: 'Norway' },
  { code: 'DK', dialCode: '+45', name: 'Denmark' },
  { code: 'FI', dialCode: '+358', name: 'Finland' },
  { code: 'PL', dialCode: '+48', name: 'Poland' },
  { code: 'IE', dialCode: '+353', name: 'Ireland' },
  { code: 'PT', dialCode: '+351', name: 'Portugal' },
  { code: 'GR', dialCode: '+30', name: 'Greece' },
  { code: 'CZ', dialCode: '+420', name: 'Czech Republic' },
  { code: 'HU', dialCode: '+36', name: 'Hungary' },
  { code: 'RO', dialCode: '+40', name: 'Romania' },
  { code: 'BG', dialCode: '+359', name: 'Bulgaria' },
  { code: 'HR', dialCode: '+385', name: 'Croatia' },
  { code: 'SK', dialCode: '+421', name: 'Slovakia' },
  { code: 'SI', dialCode: '+386', name: 'Slovenia' },
  { code: 'EE', dialCode: '+372', name: 'Estonia' },
  { code: 'LV', dialCode: '+371', name: 'Latvia' },
  { code: 'LT', dialCode: '+370', name: 'Lithuania' },
  { code: 'JP', dialCode: '+81', name: 'Japan' },
  { code: 'CN', dialCode: '+86', name: 'China' },
  { code: 'IN', dialCode: '+91', name: 'India' },
  { code: 'KR', dialCode: '+82', name: 'South Korea' },
  { code: 'SG', dialCode: '+65', name: 'Singapore' },
  { code: 'MY', dialCode: '+60', name: 'Malaysia' },
  { code: 'TH', dialCode: '+66', name: 'Thailand' },
  { code: 'ID', dialCode: '+62', name: 'Indonesia' },
  { code: 'PH', dialCode: '+63', name: 'Philippines' },
  { code: 'VN', dialCode: '+84', name: 'Vietnam' },
  { code: 'BR', dialCode: '+55', name: 'Brazil' },
  { code: 'MX', dialCode: '+52', name: 'Mexico' },
  { code: 'AR', dialCode: '+54', name: 'Argentina' },
  { code: 'CL', dialCode: '+56', name: 'Chile' },
  { code: 'CO', dialCode: '+57', name: 'Colombia' },
  { code: 'PE', dialCode: '+51', name: 'Peru' },
  { code: 'ZA', dialCode: '+27', name: 'South Africa' },
  { code: 'EG', dialCode: '+20', name: 'Egypt' },
  { code: 'NG', dialCode: '+234', name: 'Nigeria' },
  { code: 'KE', dialCode: '+254', name: 'Kenya' },
  { code: 'AE', dialCode: '+971', name: 'United Arab Emirates' },
  { code: 'SA', dialCode: '+966', name: 'Saudi Arabia' },
  { code: 'IL', dialCode: '+972', name: 'Israel' },
  { code: 'TR', dialCode: '+90', name: 'Turkey' },
  { code: 'RU', dialCode: '+7', name: 'Russia' },
  { code: 'NZ', dialCode: '+64', name: 'New Zealand' },
];

interface PhoneInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onChangeCountryCode?: (code: string, dialCode: string) => void;
  error?: string;
  disabled?: boolean;
  defaultCountryCode?: string;
  style?: any;
}

/**
 * Phone Input Component with Country Code Selector
 */
export function PhoneInput({
  label,
  placeholder = 'Enter phone number',
  value,
  onChangeText,
  onChangeCountryCode,
  error,
  disabled = false,
  defaultCountryCode = 'US',
  style,
}: PhoneInputProps) {
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(
    COUNTRY_CODES.find((c) => c.code === defaultCountryCode) || COUNTRY_CODES[0]
  );
  const [isCountryPickerOpen, setIsCountryPickerOpen] = useState(false);

  const handleCountrySelect = (country: CountryCode) => {
    setSelectedCountry(country);
    setIsCountryPickerOpen(false);
    onChangeCountryCode?.(country.code, country.dialCode);
  };

  const handlePhoneChange = (text: string) => {
    // Only allow numbers, spaces, hyphens, and parentheses
    const cleanedText = text.replace(/[^\d\s\-()]/g, '');
    onChangeText(cleanedText);
  };

  const countryOptions = COUNTRY_CODES.map((country) => ({
    label: `${country.dialCode} ${country.name}`,
    value: country.code,
  }));

  return (
    <View style={[styles.container, { marginBottom: spacing.md }, style]}>
      {label && (
        <Text style={[styles.label, { color: colors.text, marginBottom: spacing.xs }]}>
          {label}
        </Text>
      )}
      <View style={styles.inputContainer}>
        {/* Country Code Selector */}
        <TouchableOpacity
          onPress={() => !disabled && setIsCountryPickerOpen(true)}
          disabled={disabled}
          style={[
            styles.countryCodeButton,
            {
              backgroundColor: colors.surface,
              borderColor: error ? colors.error : colors.border,
              opacity: disabled ? 0.5 : 1,
            },
          ]}
        >
          <Text style={[styles.countryCodeText, { color: colors.text }]}>
            {selectedCountry.dialCode}
          </Text>
        </TouchableOpacity>

        {/* Phone Number Input */}
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          value={value}
          onChangeText={handlePhoneChange}
          editable={!disabled}
          keyboardType="phone-pad"
          style={[
            styles.phoneInput,
            {
              backgroundColor: colors.surface,
              color: colors.text,
              borderColor: error ? colors.error : colors.border,
            },
          ]}
        />
      </View>
      {error && (
        <Text style={[styles.error, { color: colors.error, marginTop: spacing.xs }]}>
          {error}
        </Text>
      )}

      {/* Country Code Picker Modal */}
      <Modal
        visible={isCountryPickerOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setIsCountryPickerOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsCountryPickerOpen(false)}
        >
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Select Country</Text>
              <TouchableOpacity onPress={() => setIsCountryPickerOpen(false)}>
                <Text style={[styles.modalClose, { color: colors.primary }]}>Done</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={COUNTRY_CODES}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleCountrySelect(item)}
                  style={[
                    styles.countryOption,
                    {
                      backgroundColor: selectedCountry.code === item.code ? colors.primary : 'transparent',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.countryOptionText,
                      {
                        color: selectedCountry.code === item.code ? '#FFFFFF' : colors.text,
                      },
                    ]}
                  >
                    {item.dialCode} {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
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
    flexDirection: 'row',
    width: '100%',
    gap: spacing.xs,
  },
  countryCodeButton: {
    height: 48,
    minWidth: 80,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countryCodeText: {
    fontSize: 16,
    fontWeight: '500',
  },
  phoneInput: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
    paddingHorizontal: spacing.md,
    paddingVertical: 0,
  },
  error: {
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  modalClose: {
    fontSize: 16,
    fontWeight: '600',
  },
  countryOption: {
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  countryOptionText: {
    fontSize: 16,
  },
});

