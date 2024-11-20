import { style } from '@vanilla-extract/css';

import colors from '@/styles/color';

export const stickyHeader = style({
  position: 'sticky',
  top: 0,
  zIndex: 1000,
  backgroundColor: colors.white,
  '@media': {
    'screen and (min-width: 700px)': {
      display: 'none',
    },
  },
});

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  margin: '0 auto',
});

export const SideNavButton = style({
  cursor: 'pointer',
});
