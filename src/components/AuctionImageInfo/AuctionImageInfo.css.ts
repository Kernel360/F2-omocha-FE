import { style } from '@vanilla-extract/css';

export const imageSection = style({
  display: 'flex',
  gap: '40px',
});

export const subImageWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  height: '462px',
  overflow: 'scroll',
});

export const subImageButton = style({
  cursor: 'pointer',
});

export const mainImageWrapper = style({
  // border: '1px solid black',
  // padding: '12px',
});
