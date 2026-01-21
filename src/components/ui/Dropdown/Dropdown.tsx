import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
// Note: Replace with actual Hero UI Native Select import when installed
// import { Select } from 'heroui-native';
import { useTheme } from '@/hooks/useTheme';

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  label?: string;
  placeholder?: string;
  options: DropdownOption[];
  selectedValue?: string;
  onValueChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  style?: any;
}

/**
 * Dropdown component wrapper for Hero UI Native Select
 * Replace the placeholder implementation with actual Hero UI Native Select
 */
export function Dropdown({
  label,
  placeholder,
  options,
  selectedValue,
  onValueChange,
  error,
  disabled = false,
  style,
}: DropdownProps) {
  const { colors, spacing } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  // Placeholder implementation - Replace with actual Hero UI Native Select component
  // Example:
  // return (
  //   <Select
  //     label={label}
  //     placeholder={placeholder}
  //     selectedKeys={selectedValue ? [selectedValue] : []}
  //     onSelectionChange={(keys) => {
  //       const selected = Array.from(keys)[0] as string;
  //       onValueChange(selected);
  //     }}
  //     isDisabled={disabled}
  //     errorMessage={error}
  //     style={style}
  //   >
  //     {options.map((option) => (
  //       <Select.Item key={option.value} value={option.value}>
  //         {option.label}
  //       </Select.Item>
  //     ))}
  //   </Select>
  // );

  return (
    <View style={[styles.container, { marginBottom: spacing.md }, style]}>
      {label && (
        <Text style={[styles.label, { color: colors.text, marginBottom: spacing.xs }]}>
          {label}
        </Text>
      )}
      <TouchableOpacity
        onPress={() => !disabled && setIsOpen(true)}
        disabled={disabled}
        style={[
          styles.dropdown,
          {
            backgroundColor: colors.surface,
            borderColor: error ? colors.error : colors.border,
            opacity: disabled ? 0.5 : 1,
          },
        ]}
      >
        <Text style={[styles.selectedText, { color: selectedOption ? colors.text : colors.textSecondary }]}>
          {selectedOption ? selectedOption.label : placeholder || 'Select an option'}
        </Text>
      </TouchableOpacity>
      {error && (
        <Text style={[styles.error, { color: colors.error, marginTop: spacing.xs }]}>
          {error}
        </Text>
      )}
      <Modal
        visible={isOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsOpen(false)}
        >
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    onValueChange(item.value);
                    setIsOpen(false);
                  }}
                  style={[
                    styles.option,
                    {
                      backgroundColor: selectedValue === item.value ? colors.primary : 'transparent',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.optionText,
                      {
                        color: selectedValue === item.value ? '#FFFFFF' : colors.text,
                      },
                    ]}
                  >
                    {item.label}
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
  dropdown: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  selectedText: {
    fontSize: 16,
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
    maxHeight: '50%',
    paddingBottom: 20,
  },
  option: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  optionText: {
    fontSize: 16,
  },
});

