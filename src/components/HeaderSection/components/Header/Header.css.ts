import { style } from '@vanilla-extract/css';

import colors from '@/styles/color';

export const stickyHeader = style({
  position: 'sticky',
  top: 0,
  zIndex: 1,
  backdropFilter: 'blur(2px)',
  backgroundColor: 'rgba(255,255,255, 0.95)',
  borderBottom: `1px solid ${colors.gray3}`,

  '@media': {
    'screen and (max-width: 700px)': {
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
