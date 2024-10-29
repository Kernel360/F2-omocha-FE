import { globalStyle, style } from '@vanilla-extract/css';

export const iconButton = style({
  cursor: 'pointer',
  padding: '6px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'transparent',
  color: 'rgb(204, 204, 204)',
  transition: 'background-color 0.2s ease, color 0.2s ease',
  selectors: {
    '&[data-active="true"]': {
      color: 'black',
    },
  },
});

globalStyle(`${iconButton} svg`, {
  width: '15px',
  height: '15px',
});
