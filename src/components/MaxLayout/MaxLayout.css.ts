import { style } from '@vanilla-extract/css';

import layout from '@/styles/layout';

export const container = style({
  position: 'relative',
  boxSizing: 'border-box',
  maxWidth: layout.maxLayoutWidth.maxWidth,
  padding: layout.maxLayoutWidth.padding,
  width: '100%',
  margin: '0 auto',
});
