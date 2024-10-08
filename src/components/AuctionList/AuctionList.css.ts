import { globalStyle, style } from '@vanilla-extract/css';

export const section = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  padding: '20px 0',
  margin: '20px 0',
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

export const title = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
});

export const link = style({
  display: 'flex',
  alignItems: 'stretch',
  fontSize: '14px',
});

globalStyle(`${link} svg`, {
  width: '16px',
});
