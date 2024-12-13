import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const overlay = style({
  position: 'fixed',
  zIndex: 1080,
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
});

export const MobileLeftSlideContainer = style({
  zIndex: 100,
  backgroundColor: 'rgba(255, 255, 255, 1)',
  position: 'fixed',
  top: '0',
  left: '0',
  height: '100%',
  width: '220px',
  boxSizing: 'border-box',
});

export const container = recipe({
  base: {
    zIndex: 100,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    position: 'fixed',
    top: '0',
    height: '100%',
    transition: 'transform 0.3s ease',
  },
  variants: {
    type: {
      right: {
        width: '400px',
        right: '0',
      },
      normal: {
        width: '400px',
        left: '0',
      },
      mobile: {
        left: '0',
        width: '270px',
      },
    },
  },
  defaultVariants: {
    type: 'normal',
  },
});

export const titleSection = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
  },
  variants: {
    type: {
      right: {
        gap: '12px',
        padding: '30px 30px',
      },
      normal: {
        gap: '12px',
        padding: '30px 30px',
      },
      mobile: {
        gap: '12px',
        padding: '16px 16px 16px 16px',
      },
    },
  },
  defaultVariants: {
    type: 'normal',
  },
});

export const title = style({
  fontSize: '20px',
  letterSpacing: '-.3px',
  textAlign: 'left',
});

export const xButton = style({
  cursor: 'pointer',
});
