import { globalStyle, style } from '@vanilla-extract/css';

import colors from '@/styles/color';

export const iconButton = style({
  cursor: 'pointer',
  padding: '6px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'transparent',
  color: colors.gray7,
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

export const codeStyle = style({
  backgroundColor: colors.gray3,
});
