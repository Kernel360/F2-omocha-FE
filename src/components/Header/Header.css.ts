import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
});

export const topHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px 0 0',
});

export const logoButton = style({
  fontSize: '32px',
});

export const topCategory = style({
  display: 'flex',
  gap: '30px',
  fontSize: '12px',
});

export const bottomHeader = style({
  display: 'flex',
  padding: '10px 0',
  fontSize: '25px',
  gap: '27px',
});

export const categoryLink = style({
  textDecoration: 'none',
  color: 'rgb(0,0,0)',
});
