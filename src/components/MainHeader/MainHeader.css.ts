import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
});

export const topHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '16px 40px 0',
});

export const topCategory = style({
  display: 'flex',
  gap: '30px',
  fontSize: '12px',
});

export const bottomHeader = style({
  display: 'flex',
  padding: '0 40px',
  fontSize: '25px',
  gap: '27px',
});
