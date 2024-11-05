import { style } from '@vanilla-extract/css';

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
  gap: '40px',
  width: '100%',
});

export const categoryList = style({
  display: 'flex',
  flexDirection: 'column',
  listStyle: 'none',
  gap: '30px',
  borderRadius: '8px',
  padding: '20px',
  boxShadow: shadow.box3,
  backgroundColor: colors.white,
  height: '480px',
  width: '220px',
});

export const page = style({
  width: '100%',
  borderRadius: '8px',
  padding: '20px',
  boxSizing: 'border-box',
  maxWidth: '700px',
  boxShadow: shadow.box3,
  backgroundColor: colors.white,
});
