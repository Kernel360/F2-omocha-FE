import { style, styleVariants } from '@vanilla-extract/css';

import colors from '@/styles/color';
import layout from '@/styles/layout';
import shadow from '@/styles/shadow';

export const backContainer = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '60px 0 0 0',
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

export const welcomeTitle = style({
  marginTop: '20px',
  color: '#666',
  textAlign: 'center',
  fontSize: '15px',
  fontStyle: 'normal',
  fontWeight: '400',
  lineHeight: 'normal',
});

export const hightLightTitle = style({
  color: colors.primary9,
});

export const buttonWrapper = style({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '30px',
});

export const optionSection = style({
  paddingTop: '30px',
  display: 'flex',
  alignItems: 'center',
  margin: '0',
  listStyle: 'none',
});

export const inputSection = style({
  paddingTop: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  width: '100%',
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

export const loginInput = style({
  display: 'flex',
  width: '368px',
  borderRadius: '4px',
  padding: '12px 16px',
  alignItems: 'flex-start',
  gap: '8px',
  border: '1.5px solid black',
  background: '#FFF',
});

export const option = style({
  padding: '0',
  margin: '0',
  listStyle: 'none',
  fontSize: '12px',
});

export const snsLoginTitle = style({
  marginTop: '30px',
  color: '#666',
  fontSize: '12px',
  fontStyle: 'normal',
  fontWeight: '400',
  lineHeight: 'normal',
  textAlign: 'center',
});

export const snsLoginSection = style({
  display: 'flex',
  gap: '12px',
  marginTop: '20px',
});

export const snsLoginButtonWrapper = style({
  cursor: 'pointer',
});

export const snsLoginBaseButton = style({
  width: '57px',
  height: '57px',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  filter: 'drop-shadow(2px 3px 12px rgba(0, 0, 0, 0.10))',
});

export const snsLoginButton = styleVariants({
  goggle: [
    snsLoginBaseButton,
    {
      background: '#FFF',
    },
  ],
  naver: [
    snsLoginBaseButton,
    {
      background: 'rgba(3, 199, 90, 1)',
    },
  ],
});

export const inputLabel = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
});

export const inputError = style({
  display: 'flex',
  gap: '4px',
  alignItems: 'center',
  color: '#FF0000',
  fontSize: '14px',
  marginLeft: '8px',
});
