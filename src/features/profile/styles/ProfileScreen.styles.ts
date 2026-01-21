import { StyleSheet } from 'react-native';
import { colors, spacing } from '@/constants/styles';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'relative',
  },
  gradientLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 20,
    opacity: 0.1,
    zIndex: 0,
  },
  gradientRight: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 20,
    opacity: 0.1,
    zIndex: 0,
  },
  container: {
    flex: 1,
    paddingTop: spacing.lg,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  profilePictureContainer: {
    marginBottom: spacing.md,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  profilePicturePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginHorizontal: spacing.xs,
    marginBottom: spacing.xl,
    paddingTop: spacing.xs,
    paddingBottom: spacing.xs,
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  editPictureButton: {
    marginTop: spacing.xs,
  },
  editPictureText: {
    fontSize: 14,
    fontWeight: '500',
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
    marginTop: spacing.xs,
    paddingHorizontal: spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemLabel: {
    fontSize: 16,
    marginLeft: spacing.md,
  },
  separator: {
    height: 1,
  },
});

