import { style, styleVariants } from '@vanilla-extract/css';

import colors from '@/styles/color';
import shadow from '@/styles/shadow';
import layout from '@/styles/layout';

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

export const commonInputContainer = style({
  position: 'relative',
});

export const blind = style({
  position: 'absolute',
  right: '10px',
  top: '38px',
});

export const inputLabel = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
});

export const joinInput = style({
  display: 'flex',
  borderRadius: '4px',
  padding: '12px 16px',
  alignItems: 'flex-start',
  gap: '8px',
  border: '1.5px solid black',
  background: '#FFF',
});

export const inputValidation = style({
  display: 'flex',
  gap: '4px',
  alignItems: 'center',
  color: '#FF0000',
  fontSize: '14px',
  marginLeft: '8px',
});

export const error = style({
  color: '#FF0000',
});

export const correct = style({
  color: 'green',
});

export const submitButton = style({
  marginTop: '30px',
  width: '402px',
  padding: '15px 62px',
  background: 'black ',
  color: '#FFF',
  fontSize: '16px',
  borderRadius: '4px',
  border: 'none',
  cursor: 'pointer',
});

const buttonBase = style({
  display: 'flex',
  color: '#FFF',
  justifyItems: 'flex-end',
  fontSize: '14px',
  width: '80px',
  height: '44px',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '4px',
  cursor: 'pointer',
});

export const checkButton = styleVariants({
  default: [
    buttonBase,
    {
      background: 'black',
    },
  ],
  disabled: [
    buttonBase,
    {
      background: '#C4C4C4',
      cursor: 'not-allowed',
    },
  ],
  confirm: [
    buttonBase,
    {
      background: '#C4C4C4',
      cursor: 'not-allowed',
    },
  ],
});

export const buttonWrapper = style({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '30px',
});

export const duplicateCheckButtonWrapper = style({
  display: 'flex',
  minWidth: '80px',
});
