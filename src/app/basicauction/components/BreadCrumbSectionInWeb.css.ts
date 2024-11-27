import { style } from '@vanilla-extract/css';

export const isWeb = style({
  '@media': {
    '(max-width: 504px)': {
      display: 'none',
    },
  },
});
