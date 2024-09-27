import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  height: 'calc(100vh - 230px)',
  boxSizing: 'border-box',
  alignItems: 'center',
});

export const title = style({
  color: 'black ',
  textAlign: 'center',
  fontSize: '32px',
});

export const welcomeTitle = style({
  marginTop: '20px',
  color: '#666',
  textAlign: 'center',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: '400',
  lineHeight: 'normal',
});

export const hightLightTitle = style({
  color: '#FF0000 ',
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
});

export const division = style({
  width: '1px',
  height: '12px',
  background: '#666',
  margin: '0 16px',
});

export const snsLoginTitle = style({
  marginTop: '30px',
  color: '#666',
  fontSize: '14px',
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

export const snsLoginButton = style({
  width: '57px',
  height: '57px',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#FFF',
  filter: 'drop-shadow(2px 3px 12px rgba(0, 0, 0, 0.10))',
  ':hover': {},
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
