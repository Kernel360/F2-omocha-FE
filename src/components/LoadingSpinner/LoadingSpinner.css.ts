import { style, keyframes } from '@vanilla-extract/css';

import colors from '@/styles/color';

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

export const spinnerContainer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width: '100%',
});

export const spinner = style({
  width: '48px',
  height: '48px',
  border: '6px solid #f3f3f3',
  borderTop: `6px solid ${colors.primary9}`,
  borderRadius: '50%',
  animation: `${spin} 1s linear infinite`,
});
