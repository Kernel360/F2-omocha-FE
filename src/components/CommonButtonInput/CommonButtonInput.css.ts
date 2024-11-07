import { style } from '@vanilla-extract/css';

import colors from '@/styles/color';
import typography from '@/styles/typo';

export const label = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  width: '100%',
});

export const title = style([
  typography.body,
  {
    color: colors.black1,
    fontWeight: 'bold',
  },
]);

export const disabledTitle = style([
  typography.body,
  {
    color: colors.gray10,
    fontWeight: 'bold',
  },
]);

export const input = style({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: '36px',
  padding: '0 16px',
  borderRadius: '8px',
  border: `1.5px solid ${colors.gray7}`,
});

export const inputWrapper = style({
  display: 'flex',
  gap: '8px',
  width: '100%',
});

export const button = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  borderRadius: '16px',
  border: 'none',
  backgroundColor: colors.primary9,
  color: '#fff',
  cursor: 'pointer',
  transition: 'background-color 0.3s',

  ':hover': {
    backgroundColor: colors.primary11,
  },
  ':disabled': {
    backgroundColor: '#ccc',
    color: '#000',
    cursor: 'not-allowed',
  },
});

export const error = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  fontSize: '14px',
  color: colors.primary10,
});
