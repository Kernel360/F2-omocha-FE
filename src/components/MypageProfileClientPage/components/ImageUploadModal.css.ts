import { style, styleVariants } from '@vanilla-extract/css';

import colors from '@/styles/color';
import typography from '@/styles/typo';

export const image = style({
  display: 'flex',
  position: 'relative',
  justifyContent: 'center',
  marginBottom: '15px',
});

export const imageWrapper = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  color: colors.gray5,
});

export const imageProfile = style({
  borderRadius: '50%',
});

export const imageUpload = style({
  display: 'none',
});

export const plusIcon = style({
  position: 'absolute',
  bottom: '10px',
  right: '-10px',
  cursor: 'pointer',

  ':hover': {
    filter: 'brightness(0.8)',
  },
});

export const error = style({
  display: 'flex',
  justifyContent: 'center',
  gap: '4px',
  alignItems: 'center',
  color: colors.primary10,
  fontSize: '14px',
  fontWeight: 'normal',
  marginBottom: '15px',
});

export const buttonSubmit = style({
  ...typography.body,
  width: '100px',
  padding: '10px',
  boxSizing: 'border-box',
  borderRadius: '4px',
  cursor: 'pointer',
  background: colors.primary9,
  color: colors.white,
});
