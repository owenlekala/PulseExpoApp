import { StyleSheet } from 'react-native';
import { spacing } from '@/constants/styles';

export const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  container: {
    paddingTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'left',
  },
  description: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: 'left',
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  signInText: {
    fontSize: 14,
  },
  errorText: {
    fontSize: 14,
    marginTop: 8,
  },
});

