import { style } from '@vanilla-extract/css';

export const profile = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '40px',
  boxSizing: 'border-box',
  width: '100%',
});

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
});
