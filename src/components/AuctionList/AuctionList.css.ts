import { globalStyle, style } from '@vanilla-extract/css';

import colors from '@/styles/color';

export const section = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  padding: '15px 0',
  margin: '15px 0',
  selectors: {
    '&:before': {
      content: '',
      position: 'absolute',
      bottom: '0',
      height: '1px',
      width: '100%',
      backgroundColor: 'rgb(235,235,235)',
    },
    '&:last-of-type::before': {
      content: 'none',
    },
  },
});

export const listWrapper = style({
  padding: '16px 0px 32px',
  boxSizing: 'border-box',
});

export const noListWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '20px',
  minHeight: '196px',
  height: '100%',
});

export const noListTitle = style({
  fontSize: '16px',
  fontWeight: '500',
  color: colors.gray10,
});

export const noListButton = style({
  padding: '10px 20px',
  backgroundColor: colors.primary9,
  color: colors.white,
  borderRadius: '8px',
  fontSize: '14px',
  cursor: 'pointer',
});

export const title = style({
  display: 'flex',
  justifyContent: 'space-between',
  color: colors.gray11,
  alignItems: 'flex-end',
});

export const link = style({
  display: 'flex',
  alignItems: 'center',
  fontSize: '14px',
});

globalStyle(`${link} svg`, {
  width: '16px',
});
