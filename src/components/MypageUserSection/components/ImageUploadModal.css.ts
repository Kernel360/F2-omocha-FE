import { style } from '@vanilla-extract/css';

import colors from '@/styles/color';

export const imageProfile = style({
  borderRadius: '50%',
});

export const image = style({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '15px',
});

export const imageWrapper = style({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  color: colors.gray5,
  border: `3px solid ${colors.gray5}`,
});

export const imageUpload = style({
  display: 'none',
});

export const plusIcon = style({
  position: 'absolute',
  bottom: '10px',
  right: '-10px',
  cursor: 'pointer',

  ':active': {
    filter: 'brightness(0.8)',
  },

  '@media': {
    '(hover: hover) and (pointer: fine)': {
      ':hover': {
        filter: 'brightness(0.8)',
      },
    },
  },
});
