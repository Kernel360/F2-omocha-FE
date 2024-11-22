import { style, styleVariants } from '@vanilla-extract/css';

import colors from '@/styles/color';

export const imageSection = style({
  width: '100%',
  display: 'flex',
  maxHeight: '500px',
  justifyContent: 'center',
});

export const subImageWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  marginRight: '5px',
  overflowY: 'auto',
  minWidth: '62px',
});

export const subImageWrapperButton = styleVariants({
  active: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: `1px solid ${colors.primary11}`,
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
  display: 'flex',
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
  maxHeight: '440px',
  maxWidth: '440px',
  width: '100%',
  objectFit: 'contain',
  border: 'none',
});
