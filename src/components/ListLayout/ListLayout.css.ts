import { style } from '@vanilla-extract/css';

import layout from '@/styles/layout';

export const responsiveLayoutWrapper = style({
  position: 'relative',
  display: 'grid',
  gridRowGap: '2vw',
  gap: '24px',
  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
  width: '100%',
  maxWidth: layout.maxLayoutWidth.maxWidth,
  placeItems: 'center',
  height: 'auto',
});

export const layoutWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: layout.maxLayoutWidth.maxWidth,
  margin: '0 auto',
});
