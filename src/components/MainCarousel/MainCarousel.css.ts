import { style } from '@vanilla-extract/css';

export const container = style({
  position: 'relative',
  margin: '0 auto',
  maxWidth: '972px',
  width: '100%',
  height: 'auto',
});

export const imageContainer = style({
  // display: 'flex',
  // justifyContent: 'center',
  // '@media': {
  //   'screen and (max-width: 972px)': {
  //     width: '100%',
  //     height: 'auto',
  //   },
  // },
});

export const dots = style({
  position: 'absolute',
  bottom: '30px',
  display: 'flex !important',
  width: '100%',
  padding: '0',
  margin: '0',
  listStyle: 'none',
  textAlign: 'center',
});

export const carouselImage = style({
  width: 'auto',
  height: '360px',
  margin: '0 auto',

  '@media': {
    'screen and (max-width: 972px)': {
      width: '100%',
      height: 'auto',
    },
  },
});
