import { style, globalStyle } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  justifyContent: 'center',
  padding: '20px',
});

export const categoryList = style({
  display: 'flex',
  flexDirection: 'column',
  listStyle: 'none',
  gap: '30px',
  marginRight: '80px',
});

export const profile = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  padding: '10px 10px 30px 10px',
  borderBottom: '1px solid #eaeaea',
});

export const heart = style({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
});

globalStyle(`${heart} span:nth-child(1)`, {
  fontSize: '18px',
});

globalStyle(`${heart} span:nth-child(2)`, {
  display: 'flex',
  justifyContent: 'center',
  fontSize: '18px',
  fontWeight: 'bold',
  color: 'rgb(196,39,39, 0.7)',
  backgroundColor: 'rgb(196,39,39, 0.2)',
  minWidth: '50px',
  padding: '5px',
  borderRadius: '20px',
});

export const categoryLink = style({
  textDecoration: 'none',
  padding: '10px',
});

export const page = style({
  width: 'calc(100% - 300px)',
});
