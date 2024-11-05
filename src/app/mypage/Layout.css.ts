import { style, globalStyle } from '@vanilla-extract/css';

import colors from '@/styles/color';
import shadow from '@/styles/shadow';

export const backContainer = style({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  padding: '60px 0',
  backgroundColor: '#F7F7F8',
});

export const container = style({
  display: 'flex',
  width: '100%',
});

export const categoryList = style({
  display: 'flex',
  flexDirection: 'column',
  listStyle: 'none',
  gap: '30px',
  marginRight: '40px',
  borderRadius: '8px',
  padding: '20px',
  boxShadow: shadow.box3,
  backgroundColor: colors.white,
  height: '480px',
});

export const profile = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  padding: '10px 20px 30px 20px',
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
  width: '100%',
  borderRadius: '8px',
  padding: '20px',
  boxShadow: shadow.box3,
  backgroundColor: colors.white,
});
