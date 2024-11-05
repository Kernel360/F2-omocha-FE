import { style } from '@vanilla-extract/css';

export const basicAuctionContainer = style({
  display: 'flex',
  gap: '20px',
});

export const rightSection = style({
  display: 'flex',
  flexDirection: 'column',
  width: 'calc(100% - 240px)',
});
