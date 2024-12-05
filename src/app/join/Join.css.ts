import { style } from '@vanilla-extract/css';

import colors from '@/styles/color';
import layout from '@/styles/layout';
import shadow from '@/styles/shadow';
import typography from '@/styles/typo';

export const backContainer = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '60px 0',
  minHeight: layout.minHeight,
  boxSizing: 'border-box',
  alignItems: 'center',
  backgroundColor: colors.backgroundGray1,
});

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  borderRadius: '8px',
  margin: '0 auto',
  padding: '20px',
  alignItems: 'center',
  boxShadow: shadow.box3,
  backgroundColor: colors.white,
  maxWidth: '400px',
});

export const title = style({
  color: 'black ',
  textAlign: 'center',
  fontSize: '22px',
});

export const inputSection = style({
  paddingTop: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  width: '100%',
});

export const emailSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
});

export const commonInputContainer = style({
  position: 'relative',
});

export const blind = style({
  position: 'absolute',
  right: '10px',
  top: '38px',
});

export const error = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  fontSize: '14px',
  color: colors.primary10,
});

export const buttonWrapper = style({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '30px',
});

export const checkEmailAuthCodeButton = style({
  display: 'flex',
  minWidth: '100px',
});

export const emailDescription = style({
  ...typography.caption,
  position: 'relative',
  display: 'flex',
  gap: '5px',
  alignItems: 'center',
  color: colors.gray9,
  fontStyle: 'italic',
});

export const emailSendButton = style({
  ...typography.caption,
  color: colors.gray9,
  textDecoration: 'underline',
  fontStyle: 'italic',
  cursor: 'pointer',
});

export const timer = style({
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  right: '5px',
  color: colors.red,
  fontStyle: 'normal',
});
