import { style } from '@vanilla-extract/css';

export const overlay = style({
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
});

export const container = style({
  zIndex: 100,
  backgroundColor: 'rgba(255, 255, 255, 1)',
  position: 'absolute',
  top: '0',
  right: '0',
  height: '100%',
  width: '420px',
  boxSizing: 'border-box',
});

export const titleSection = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '30px 30px',
});

export const title = style({
  fontSize: '20px',
  letterSpacing: '-.3px',
  textAlign: 'left',
});
