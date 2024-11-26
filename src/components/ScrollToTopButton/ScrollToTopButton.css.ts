import { style, keyframes } from '@vanilla-extract/css';

export const scrollButton = style({
  position: 'fixed',
  bottom: '115px',
  right: '20px',
  border: '1px solid rgba(229, 229, 229, 1)',
  background: 'white',
  borderRadius: '50%',
  width: '55px',
  height: '55px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',

  ':hover': {
    filter: 'brightness(0.8)',
  },
});
