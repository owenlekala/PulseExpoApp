import { fonts } from '@/constants/styles';

/**
 * Typography scale for consistent text styling
 * Includes font family from global styles
 */
export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: '700' as const,
    fontFamily: fonts.bold,
  },
  h2: {
    fontSize: 24,
    fontWeight: '600' as const,
    fontFamily: fonts.medium,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
    fontFamily: fonts.medium,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    fontFamily: fonts.regular,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    fontFamily: fonts.regular,
  },
};

