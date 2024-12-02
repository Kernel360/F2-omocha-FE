import { style } from '@vanilla-extract/css';

import colors from '@/styles/color';
import layout from '@/styles/layout';

export const backContainer = style({
  width: '100%',
  margin: '0 auto',
  backgroundColor: 'rgb(25, 26, 29)',
  height: '120px',
});

export const footer = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: 'calc(100% - 32px)',
  maxWidth: layout.maxLayoutWidth.maxWidth,
  padding: '16px 0',
  color: colors.white,
});

export const topFooter = style({
  display: 'flex',
  justifyContent: 'space-between',
  paddingBottom: '20px',
  '@media': {
    'screen and (max-width: 700px)': {
      flexDirection: 'column-reverse',
      alignItems: 'center',
      gap: '20px',
    },
  },
});

export const logoButton = style({
  color: colors.white,
  fontSize: '20px',
  '@media': {
    'screen and (max-width: 1100px)': {
      fontSize: '20px',
    },
  },
});

export const categoryList = style({
  display: 'flex',
  listStyle: 'none',
  fontSize: '15px',
  fontWeight: 'bold',
  alignItems: 'center',
  gap: '50px',
  '@media': {
    'screen and (max-width: 700px)': {
      gap: '30px',
    },
  },
});

export const category = style({
  width: 'fit-content',
});

export const bottomFooter = style({
  display: 'flex',
  justifyContent: 'flex-start', // vanilla-extract 오류
  fontSize: '12px',

  '@media': {
    'screen and (max-width: 700px)': {
      justifyContent: 'center',
    },
  },
});

export const categoryLink = style({
  color: colors.white,
  fontSize: '14px',
});
