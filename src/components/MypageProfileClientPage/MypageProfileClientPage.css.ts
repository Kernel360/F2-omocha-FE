import { style } from '@vanilla-extract/css';

import colors from '@/styles/color';

export const image = style({
  display: 'flex',
  justifyContent: 'center',
});

export const imageButton = style({
  display: 'flex',
  border: `3px solid ${colors.gray7}`,
  borderRadius: '50%',
  cursor: 'pointer',
});

export const profileImage = style({
  borderRadius: '50%',
  cursor: 'pointer',
});
