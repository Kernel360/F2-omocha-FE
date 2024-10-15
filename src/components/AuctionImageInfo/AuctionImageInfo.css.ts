import { style, styleVariants } from '@vanilla-extract/css';

export const imageSection = style({
  width: '100%',
  display: 'flex',
  maxHeight: '500px',
  minWidth: '540px',
});

export const subImageWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  overflowY: 'auto',
});

export const subImageWrapperButton = styleVariants({
  active: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid black',
    cursor: 'pointer',
    borderSizing: 'border-box',
  },
  nonActive: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: 'none',
    cursor: 'pointer',
    borderSizing: 'border-box',
  },
});

export const subImage = style({
  height: '70px',
  width: '70px',
  objectFit: 'contain',
});

export const mainImageWrapper = style({
  height: '100%',
  maxHeight: '460px',
  width: '100%',
  maxWidth: '460px',
  display: 'flex',
  justifyContent: 'center',
});

export const mainImage = style({
  height: '440px',
  width: '440px',
  objectFit: 'contain',
  border: 'none',
});
