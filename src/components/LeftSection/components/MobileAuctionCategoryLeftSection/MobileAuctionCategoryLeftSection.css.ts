import { style } from '@vanilla-extract/css';

export const mobileLeftSection = style({
  '@media': {
    'screen and (min-width: 504px)': {
      display: 'none',
    },
  },
});
