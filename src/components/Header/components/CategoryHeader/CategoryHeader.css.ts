import { globalStyle, style } from '@vanilla-extract/css';

import colors from '@/styles/color';
import typography from '@/styles/typo';

export const bottomHeader = style([
  typography.h3,
  {
    display: 'flex',
    gap: '27px',
  },
]);

export const buttonStyles = style([
  typography.h3,
  {
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
  },
]);

globalStyle('[data-radix-popper-content-wrapper]', {
  display: 'flex !important',
  boxSizing: 'border-box',
  left: '50% !important',
  transform: 'translate(-50%, 126px) !important',
  width: '100%',
  height: '250px',
  margin: '0 auto',
  padding: '0 20px',
  backgroundColor: 'white',
});

export const customPopperContent = style({
  width: '100%',
  maxWidth: '960px',
  margin: '0 auto',
  padding: '0 20px',
  zIndex: 1000,
});
