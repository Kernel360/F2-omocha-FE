import { globalStyle, style } from '@vanilla-extract/css';

globalStyle('html, body, h1, h2, h3, h4, button, p, ul, ol, li', {
  margin: 0,
  padding: 0,
});

globalStyle('html, body', {
  msOverflowStyle: 'none' /* Internet Explorer and Edge */,
  scrollbarWidth: 'none' /* Firefox */,
  minHeight: '100vh',
});

/* Chrome, Safari, and Opera */
globalStyle('::-webkit-scrollbar', {
  display: 'none',
});

globalStyle('button', {
  border: 'none',
  backgroundColor: 'transparent',
  fontFamily: 'inherit',
});

globalStyle('a', {
  textDecoration: 'none',
  color: 'black',
});

globalStyle('ul', {
  listStyle: 'none',
  paddingLeft: '0px ',
});

export const container = style({
  position: 'relative',
  minHeight: 'calc(100vh - 256px)',
});

export const errorContainer = style({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '50px',
});

export const errorButtons = style({
  display: 'flex',
  gap: '15px',
});

export const errorButton = style({
  width: '110px',
  padding: '12px',
  boxSizing: 'content-box',
  background: '#d50c0c',
  color: '#FFF',
  fontWeight: 'bold',
  fontSize: '14px',
  borderRadius: '4px',
  cursor: 'pointer',
});
