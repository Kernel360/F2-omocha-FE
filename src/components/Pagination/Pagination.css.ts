import { style, styleVariants } from '@vanilla-extract/css';

import colors from '@/styles/color';
import typography from '@/styles/typo';

export const pagination = style({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '20px',
  gap: '5px',
});

export const chevronButton = style({
  display: 'flex',
});

const buttonBase = style({
  ...typography.bodyLarge,
  display: 'flex',
  alignItems: 'center',
  color: colors.gray6,
  cursor: 'pointer',
});

export const numberButtons = style({
  display: 'flex',
  gap: '10px',
});

export const base = styleVariants({
  numbers: [buttonBase],
  currentNumbers: [
    buttonBase,
    {
      color: colors.black1,
      fontWeight: 'bold',
    },
  ],
});
