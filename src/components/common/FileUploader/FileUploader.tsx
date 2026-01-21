import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { colors, spacing } from '@/constants/styles';
import { Icon } from '@/components/ui';
import { ICONS } from '@/constants/icons';
import { Button } from '@/components/ui';

export interface FileUploadResult {
  uri: string;
  type: string;
  name: string;
  size?: number;
}

interface FileUploaderProps {
  onFileSelected: (file: FileUploadResult) => void;
  onError?: (error: string) => void;
  accept?: 'image' | 'document' | 'all';
  multiple?: boolean;
  maxSize?: number; // in MB
  label?: string;
  buttonText?: string;
  showPreview?: boolean;
  disabled?: boolean;
}

/**
 * File uploader component - supports images and documents
 */
export function FileUploader({
  onFileSelected,
  onError,
  accept = 'all',
  multiple = false,
  maxSize,
  label,
  buttonText = 'Choose File',
  showPreview = true,
  disabled = false,
}: FileUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<FileUploadResult | null>(null);
  const [loading, setLoading] = useState(false);

  const requestPermissions = async () => {
    if (accept === 'image' || accept === 'all') {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Required', 'Please grant camera roll permissions to upload images.');
          return false;
        }
      }
    }
    return true;
  };

  const handleImagePicker = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      setLoading(true);
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8,
        allowsMultipleSelection: multiple,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        
        if (maxSize && asset.fileSize && asset.fileSize > maxSize * 1024 * 1024) {
          throw new Error(`File size exceeds ${maxSize}MB limit`);
        }

        const file: FileUploadResult = {
          uri: asset.uri,
          type: asset.type || 'image',
          name: asset.fileName || `image_${Date.now()}.jpg`,
          size: asset.fileSize,
        };

        setSelectedFile(file);
        onFileSelected(file);
      }
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to pick image';
      onError?.(errorMessage);
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDocumentPicker = async () => {
    try {
      setLoading(true);
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
        multiple,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        
        if (maxSize && asset.size && asset.size > maxSize * 1024 * 1024) {
          throw new Error(`File size exceeds ${maxSize}MB limit`);
        }

        const file: FileUploadResult = {
          uri: asset.uri,
          type: asset.mimeType || 'application/octet-stream',
          name: asset.name,
          size: asset.size,
        };

        setSelectedFile(file);
        onFileSelected(file);
      }
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to pick document';
      onError?.(errorMessage);
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handlePress = () => {
    if (accept === 'image') {
      handleImagePicker();
    } else if (accept === 'document') {
      handleDocumentPicker();
    } else {
      // Show action sheet for 'all'
      Alert.alert(
        'Select File Type',
        'Choose the type of file you want to upload',
        [
          { text: 'Image', onPress: handleImagePicker },
          { text: 'Document', onPress: handleDocumentPicker },
          { text: 'Cancel', style: 'cancel' },
        ]
      );
    }
  };

  const handleRemove = () => {
    setSelectedFile(null);
  };

  const formatFileSize = (bytes?: number): string => {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, { color: colors.text, marginBottom: spacing.xs }]}>
          {label}
        </Text>
      )}

      {selectedFile && showPreview ? (
        <View style={[styles.previewContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          {selectedFile.type.startsWith('image/') ? (
            <Image source={{ uri: selectedFile.uri }} style={styles.previewImage} />
          ) : (
            <View style={styles.documentPreview}>
              <Icon name={ICONS.FILE} size={48} color={colors.textSecondary} />
            </View>
          )}
          <View style={styles.fileInfo}>
            <Text style={[styles.fileName, { color: colors.text }]} numberOfLines={1}>
              {selectedFile.name}
            </Text>
            {selectedFile.size && (
              <Text style={[styles.fileSize, { color: colors.textSecondary }]}>
                {formatFileSize(selectedFile.size)}
              </Text>
            )}
          </View>
          <TouchableOpacity
            onPress={handleRemove}
            style={[styles.removeButton, { backgroundColor: colors.error }]}
          >
            <Icon name={ICONS.CLOSE} size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      ) : (
        <Button
          onPress={handlePress}
          disabled={disabled || loading}
          loading={loading}
          variant="outline"
          fullWidth
        >
          <View style={styles.buttonContent}>
            <Icon name={ICONS.PLUS} size={20} />
            <Text style={[styles.buttonText, { marginLeft: spacing.xs }]}>
              {buttonText}
            </Text>
          </View>
        </Button>
      )}
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
  previewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
  },
  previewImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  documentPreview: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  fileSize: {
    fontSize: 12,
  },
  removeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
  },
});

