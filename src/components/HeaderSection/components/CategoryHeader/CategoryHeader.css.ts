import { style } from '@vanilla-extract/css';

import colors from '@/styles/color';
import typography from '@/styles/typo';

export const bottomHeaderWrapper = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  marginBottom: '20px',
  '@media': {
    'screen and (max-width: 700px)': {
      marginBottom: '13px',
      minWidth: '360px',
    },
  },
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
  ...typography.h3,
  display: 'flex',
  gap: '27px',
});

export const buttonStyles = style({
  ...typography.h4,
  padding: '12px 0px',
  borderRadius: '4px',
  cursor: 'pointer',
  color: colors.gray11,
  transition: 'background-color 0.3s ease, border-color 0.3s ease',

  ':hover': {
    color: colors.primary10,
    borderColor: colors.primary7,
  },

  ':active': {
    borderColor: colors.primary8,
    color: colors.primary12,
  },
  '@media': {
    'screen and (max-width: 700px)': {
      padding: '10px 0px',
      fontSize: '16px',
    },
  },
});
