import { style } from '@vanilla-extract/css';

export const basicAuctionContainer = style({
  display: 'flex',
  gap: '20px',
  padding: '30px 0',
});

export const rightSection = style({
  display: 'flex',
  flexDirection: 'column',
  width: 'calc(100% - 240px)',
  marginLeft: 'auto',
});

export const topInfoSection = style({
  display: 'flex',
  gap: '20px',
  justifyContent: 'flex-end',
});
