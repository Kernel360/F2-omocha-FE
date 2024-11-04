import { style } from '@vanilla-extract/css';

import colors from '@/styles/color';
import shadow from '@/styles/shadow';

export const button = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '12px',
  width: '100%',
  borderRadius: '16px',
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
