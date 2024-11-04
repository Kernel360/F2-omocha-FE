import { style } from '@vanilla-extract/css';

import colors from '@/styles/color';
import layout from '@/styles/layout';

export const footer = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  height: '130px',
  backgroundColor: 'rgb(25, 26, 29)',
  color: colors.white,
  padding: '0 16px',
});

export const container = style({
  maxWidth: layout.maxLayoutWidth.maxWidth,
  width: '100%',
  margin: '0 auto',
});

export const topFooter = style({
  display: 'flex',
  justifyContent: 'space-between',
  paddingBottom: '20px',
});

export const logoButton = style({
  color: colors.white,

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
  color: colors.white,
});
