import { style } from '@vanilla-extract/css';

export const needLoginSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  alignItems: 'center',
});

export const noUserMessage = style({
  padding: '16px',
  textAlign: 'center',
  fontSize: '16px',
  color: '#999',
});

export const loginButton = style({
  border: 'none',
  color: 'white',
  borderRadius: '4px',
  maxWidth: '100px',
  width: '100%',
  padding: '10px 5px',
  cursor: 'pointer',
  backgroundColor: 'black',
});
