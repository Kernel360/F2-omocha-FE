import { style } from '@vanilla-extract/css';

export const mobileLeftSection = style({
  color: 'red',

  '@media': {
    'screen and (min-width: 504px)': {
      display: 'none',

      // flexDirection: 'column-reverse',
      // gap: '10px',
    },
  },
});
