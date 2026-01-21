import { StyleSheet } from 'react-native';
import { colors, spacing } from '@/constants/styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginHorizontal: spacing.xs,
    marginBottom: spacing.xl,
    paddingTop: spacing.xs,
    paddingBottom: spacing.xs,
  },
  infoField: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: spacing.xs,
    opacity: 0.7,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '400',
  },
  separator: {
    height: 1,
    marginLeft: spacing.md,
    marginRight: spacing.md,
    opacity: 0.4,
  },
});

