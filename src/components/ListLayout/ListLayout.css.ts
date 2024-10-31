import { style } from '@vanilla-extract/css';

import layout from '@/styles/layout';

export const responsiveLayoutWrapper = style({
  padding: '32px 0',
  position: 'relative',
  display: 'grid',
  gridRowGap: '2vw',
  gap: '24px',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  width: '100%',
  maxWidth: layout.maxLayoutWidth.maxWidth,
  height: 'auto',
});

export const layoutWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: '1400px',
  margin: '0 auto',
});
