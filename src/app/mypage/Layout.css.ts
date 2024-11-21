import { style } from '@vanilla-extract/css';

import colors from '@/styles/color';
import layout from '@/styles/layout';
import shadow from '@/styles/shadow';

export const backContainer = style({
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: colors.backgroundGray1,
  padding: '60px 0px',
  minHeight: layout.minHeight,
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

  '@media': {
    'screen and (max-width: 700px)': {
      display: 'none',
    },
  },
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
