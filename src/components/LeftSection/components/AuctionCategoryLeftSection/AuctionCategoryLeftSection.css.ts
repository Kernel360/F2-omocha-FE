import { style } from '@vanilla-extract/css';

import colors from '@/styles/color';
import typography from '@/styles/typo';

export const leftSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  maxWidth: '160px',
  width: '100%',

  '@media': {
    'screen and (max-width: 504px)': {
      display: 'none',
    },
  },
});

export const pickCategory = style({
  ...typography.h3,
  color: colors.black1,
  fontWeight: 'bold',
  textAlign: 'center',
});
