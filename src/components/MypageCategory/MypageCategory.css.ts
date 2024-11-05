import { style } from '@vanilla-extract/css';

import colors from '@/styles/color';
import shadow from '@/styles/shadow';

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
