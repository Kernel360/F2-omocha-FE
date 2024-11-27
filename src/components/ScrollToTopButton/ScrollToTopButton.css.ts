import { style } from '@vanilla-extract/css';

export const scrollButton = style({
  position: 'fixed',
  bottom: '20px',
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

  ':active': {
    filter: 'brightness(0.8)',
  },

  '@media': {
    '(hover: hover) and (pointer: fine)': {
      ':hover': {
        filter: 'brightness(0.8)',
      },
    },
    '(max-width: 504px)': {
      width: '40px',
      height: '40px',
    },
  },
});

export const scrollButtonIcon = style({
  '@media': {
    '(max-width: 504px)': {
      width: '20px',
      height: '20px',
    },
  },
});
