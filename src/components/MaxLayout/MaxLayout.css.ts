import { style } from '@vanilla-extract/css';

import layout from '@/styles/layout';

export const container = style({
  position: 'relative',
  maxWidth: layout.maxLayoutWidth.maxWidth,
  width: '100%',
  margin: '0 auto',
  minHeight: 'calc(100vh - 255px)',
});
