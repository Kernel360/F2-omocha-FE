import { globalStyle, style } from '@vanilla-extract/css';

import layout from '@/styles/layout';

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

globalStyle('ul', {
  listStyle: 'none',
  paddingLeft: '0px ',
});

export const container = style({
  position: 'relative',
  maxWidth: layout.maxLayoutWidth.maxWidth,
  margin: '0 auto',
  minHeight: 'calc(100vh - 230px)',
});
