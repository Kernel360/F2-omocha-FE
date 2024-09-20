import { style } from '@vanilla-extract/css';

export const footer = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  height: '130px',
  backgroundColor: 'rgb(0, 0, 0, 0.9)',
  color: 'white',
});

export const container = style({
  maxWidth: '1280px',
  margin: '0 auto',
});

export const topFooter = style({
  display: 'flex',
  gap: '100px',
  paddingBottom: '20px',
});

export const logoButton = style({
  color: 'white',
  fontSize: '32px',
});

export const categoryList = style({
  display: 'flex',
  listStyle: 'none',
  fontSize: '15px',
  fontWeight: 'bold',
  alignItems: 'center',
  gap: '50px',
});

export const category = style({
  width: 'fit-content',
});

export const bottomFooter = style({
  display: 'flex',
  justifyContent: 'center',
  fontSize: '12px',
});

export const categoryLink = style({
  textDecoration: 'none',
  color: 'rgb(256, 256, 256)',
});
