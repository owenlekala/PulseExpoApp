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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing } from '@/constants/styles';
import { Icon } from '@/components/ui';
import { ICONS } from '@/constants/icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface SideMenuSheetProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  showCloseButton?: boolean;
  closeOnBackdrop?: boolean;
}

/**
 * Side Menu Sheet Component
 * Slides in from the left, fills 75% of the screen, and respects safe area
 */
export function SideMenuSheet({
  visible,
  onClose,
  children,
  showCloseButton = true,
  closeOnBackdrop = true,
}: SideMenuSheetProps) {
  const insets = useSafeAreaInsets();
  const drawerWidth = SCREEN_WIDTH * 0.75; // 75% of screen width
  const slideAnim = React.useRef(new Animated.Value(-drawerWidth)).current;
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
          toValue: -drawerWidth,
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
  }, [visible, slideAnim, backdropOpacity, drawerWidth]);

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
              paddingTop: insets.top,
              paddingBottom: insets.bottom,
              paddingLeft: insets.left,
              transform: [{ translateX: slideAnim }],
              shadowColor: colors.text,
            },
          ]}
        >
          {showCloseButton && (
            <TouchableOpacity
              onPress={onClose}
              style={[
                styles.closeButton,
                {
                  padding: spacing.md,
                  paddingTop: spacing.sm,
                },
              ]}
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
    left: 0,
    height: '100%',
    shadowOffset: {
      width: 2,
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

