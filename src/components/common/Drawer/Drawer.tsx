import React, { useEffect } from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Icon } from '@/components/ui';
import { ICONS } from '@/constants/icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface DrawerProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  position?: 'left' | 'right';
  width?: number | string;
  showCloseButton?: boolean;
  closeOnBackdrop?: boolean;
}

/**
 * Drawer component - slides in from left or right
 */
export function Drawer({
  visible,
  onClose,
  children,
  position = 'right',
  width = SCREEN_WIDTH * 0.8,
  showCloseButton = true,
  closeOnBackdrop = true,
}: DrawerProps) {
  const { colors, spacing } = useTheme();
  const slideAnim = React.useRef(new Animated.Value(position === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH)).current;
  const backdropOpacity = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: position === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, position, slideAnim, backdropOpacity]);

  const drawerWidth = typeof width === 'number' ? width : (typeof width === 'string' ? parseFloat(width) : SCREEN_WIDTH * 0.8);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={closeOnBackdrop ? onClose : undefined}>
          <Animated.View
            style={[
              styles.backdrop,
              {
                opacity: backdropOpacity,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              },
            ]}
          />
        </TouchableWithoutFeedback>

        <Animated.View
          style={[
            styles.drawer,
            {
              backgroundColor: colors.surface,
              width: drawerWidth,
              [position]: 0,
              transform: [{ translateX: slideAnim }],
            },
          ]}
        >
          {showCloseButton && (
            <TouchableOpacity
              onPress={onClose}
              style={[styles.closeButton, { padding: spacing.md }]}
            >
              <Icon name={ICONS.CLOSE} size={24} color={colors.text} />
            </TouchableOpacity>
          )}
          <View style={styles.content}>{children}</View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    height: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: -2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  closeButton: {
    alignSelf: 'flex-end',
    zIndex: 1,
  },
  content: {
    flex: 1,
  },
});

