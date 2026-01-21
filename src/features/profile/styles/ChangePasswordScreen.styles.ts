import { StyleSheet } from 'react-native';
import { colors, spacing } from '@/constants/styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    paddingHorizontal: spacing.xs,
  },
  hintText: {
    fontSize: 12,
    marginTop: -spacing.sm,
    marginBottom: spacing.md,
  },
  errorText: {
    fontSize: 14,
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.md,
    gap: spacing.md,
  },
  link: {
    padding: spacing.xs,
  },
  linkText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

