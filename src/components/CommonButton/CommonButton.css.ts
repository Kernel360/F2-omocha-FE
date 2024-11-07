import { style, styleVariants } from '@vanilla-extract/css';

import colors from '@/styles/color';
import shadow from '@/styles/shadow';

export const baseButton = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  borderRadius: '8px',
  border: 'none',
  backgroundColor: colors.primary9,
  color: '#fff',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
  boxShadow: shadow.box3,
  ':hover': {
    backgroundColor: colors.primary11,
  },
  ':disabled': {
    backgroundColor: '#ccc',
    color: '#000',
    cursor: 'not-allowed',
  },
});
export const buttonVariants = styleVariants({
  sm: [
    baseButton,
    {
      padding: '8px 12px',
    },
  ],
  md: [
    baseButton,
    {
      padding: '12px 16px',
    },
  ],
  lg: [
    baseButton,
    {
      padding: '16px 24px',
    },
  ],
});
