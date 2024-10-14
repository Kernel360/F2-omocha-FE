import { style } from '@vanilla-extract/css';

export const imageSection = style({
  width: '100%',
  display: 'flex',
  maxHeight: '500px',
});

export const subImageWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  overflowY: 'auto',
});

export const subImageWrapperButton = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  border: '1px solid black',

  cursor: 'pointer',
});

export const subImage = style({
  height: '80px',
  width: '80px',
  objectFit: 'contain',
});

export const mainImageWrapper = style({
  height: '100%',
  maxHeight: '480px',
  width: '100%',
  maxWidth: '480px',
  display: 'flex',
  justifyContent: 'center',
});

export const mainImage = style({
  // height: 'auto',
  // maxHeight: '450px',
  height: '450px',
  // width: '100%',
  width: '450px',
  objectFit: 'contain',
  border: '1px solid black',
});
