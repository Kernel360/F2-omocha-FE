import { style } from '@vanilla-extract/css';

export const label = style({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  cursor: 'pointer',
  border: '1px solid rgb(228, 228, 231)',
  padding: '10px',
  fontSize: '16px',
  height: '51px',
  width: 'fit-content',
  boxSizing: 'border-box',
});

export const checkbox = style({
  display: 'none',
});

export const checked = style({
  color: 'black',
  border: '1px solid black',
});

export const nonChecked = style({
  color: 'rgb(228, 228, 231)',
});
