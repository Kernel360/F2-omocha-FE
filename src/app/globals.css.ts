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
});

globalStyle('a', {
  textDecoration: 'none',
  color: 'black',
});

export const container = style({
  maxWidth: '1280px',
  margin: '0 auto',
  padding: '0 16px',
  minHeight: 'calc(100vh - 260px)',
});
