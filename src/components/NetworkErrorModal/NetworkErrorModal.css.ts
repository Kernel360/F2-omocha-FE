import { keyframes, style } from '@vanilla-extract/css';

const spin = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
});

export const overlay = style({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: '2000',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  alignItems: 'center',
  justifyContent: 'center',
});

export const loadingIcon = style({
  animation: `${spin} 2s linear infinite`,
});
