import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  height: '130px',
  padding: '0 30px',
  backgroundColor: 'rgb(0, 0, 0, 0.9)',
  color: 'white',
});

export const topFooter = style({
  display: 'flex',
  justifyContent: 'space-around',
});

export const categoryList = style({
  display: 'flex',
  listStyle: 'none',
  fontSize: '15px',
  fontWeight: 'bold',
  alignItems: 'center',
});

export const category = style({
  width: '100px',
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
