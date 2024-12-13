import { style } from '@vanilla-extract/css';

export const imageWrapper = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const imageLoading = style({
  position: 'absolute',
  backgroundColor: 'white',
});
