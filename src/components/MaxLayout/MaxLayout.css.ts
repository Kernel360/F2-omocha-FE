import { style } from '@vanilla-extract/css';

import layout from '@/styles/layout';

export const container = style({
  position: 'relative',
  maxWidth: layout.maxLayoutWidth.maxWidth,
  margin: '0 auto',
  minHeight: 'calc(100vh - 230px)',
});
