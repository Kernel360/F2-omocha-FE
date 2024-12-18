import { style } from '@vanilla-extract/css';

import colors from '@/styles/color';
import typography from '@/styles/typo';

export const bottomHeaderWrapper = style({
  display: 'flex',
  alignItems: 'center',
  padding: '10px 0 15px',
});

export const searchBarWrapper = style({
  marginLeft: 'auto',
  '@media': {
    'screen and (max-width: 700px)': {
      display: 'none',
    },
  },
});

export const bottomHeader = style({
  ...typography.bodyLarge,
  display: 'flex',
  gap: '27px',
  width: 'calc(100% - 195px)',
  overflowX: 'auto',

  '@media': {
    'screen and (max-width: 700px)': {
      width: '100%',
    },
  },
});

export const buttonStyles = style({
  ...typography.bodyLarge,
  borderRadius: '4px',
  cursor: 'pointer',
  color: colors.gray11,
  transition: 'background-color 0.3s ease, border-color 0.3s ease',
  maxWidth: 'fit-content',
  minWidth: 'fit-content',
  width: '100%',

  ':active': {
    color: colors.primary10,
    borderColor: colors.primary7,
  },

  '@media': {
    '(hover: hover) and (pointer: fine)': {
      ':hover': {
        color: colors.primary10,
        borderColor: colors.primary7,
      },
    },
  },
});
