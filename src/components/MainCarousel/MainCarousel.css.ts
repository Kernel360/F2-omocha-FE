import { style } from '@vanilla-extract/css';

export const container = style({
  position: 'relative',
  margin: '0 auto',
  maxWidth: '1200px',
  width: '100%',
  height: 'auto',
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
  width: '100%',
  margin: '0 auto',
});
