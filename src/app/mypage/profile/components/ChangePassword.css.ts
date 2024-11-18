import { style } from '@vanilla-extract/css';

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
});

export const sectionTitle = style({
  fontSize: '16px',
  fontWeight: '800',
});

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
});

export const commonInputContainer = style({
  position: 'relative',
});

export const blind = style({
  position: 'absolute',
  right: '10px',
  top: '38px',
});

export const buttonContainer = style({
  display: 'flex',
  marginTop: '30px',
});
