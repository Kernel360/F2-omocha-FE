import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  justifyContent: 'center',
  margin: '30px 0 ',
});

export const categoryList = style({
  display: 'flex',
  flexDirection: 'column',
  listStyle: 'none',
  gap: '50px',
  padding: '50px',
});

export const profile = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '25px',
});

export const profileIcon = style({
  display: 'flex',
  border: '2px solid rgb(95, 99, 104)',
  borderRadius: '50%',
  padding: '5px',
});

export const categoryLink = style({
  textDecoration: 'none',
});

export const page = style({
  padding: '50px',
  width: 'calc(100% - 300px)',
});
