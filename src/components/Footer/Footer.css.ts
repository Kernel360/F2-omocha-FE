import { style } from '@vanilla-extract/css';

import colors from '@/styles/color';
import layout from '@/styles/layout';

export const backContainer = style({
  width: '100%',
  margin: '0 auto',
  backgroundColor: 'rgb(25, 26, 29)',
});

export const container = style({
  width: '100%',
});

export const footer = style({
  display: 'flex',
  margin: '0 auto',
  flexDirection: 'column',
  justifyContent: 'center',
  height: '130px',
  maxWidth: layout.maxLayoutWidth.maxWidth,
  padding: layout.maxLayoutWidth.padding,
  color: colors.white,
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
