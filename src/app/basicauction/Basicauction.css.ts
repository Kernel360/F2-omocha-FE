import { style } from '@vanilla-extract/css';

export const basicAuctionContainer = style({
  display: 'flex',
  gap: '20px',
  padding: '30px 0',

  '@media': {
    'screen and (max-width: 504px)': {
      flexDirection: 'column',
    },
  },
});

export const rightSection = style({
  display: 'flex',
  flexDirection: 'column',
  width: 'calc(100% - 240px)',
  marginLeft: 'auto',

  '@media': {
    'screen and (max-width: 504px)': {
      width: '100%',
    },
  },
});

export const topInfoSection = style({
  display: 'flex',
  gap: '20px',
  justifyContent: 'flex-end',
  marginBottom: '10px',
});
