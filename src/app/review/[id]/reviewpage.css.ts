import { style } from '@vanilla-extract/css';

export const container = style({
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
  gap: '20px',
});

export const title = style({
  fontSize: '22px',
});

export const auctionInfoWrapper = style({
  display: 'flex',
});

export const chatroomInfoWrapper = style({
  display: 'flex',
  gap: '10px',
});

export const auctionInfoTitle = style({
  fontWeight: 'bold',
  fontSize: '14px',
});

export const auctionInfo = style({
  fontSize: '14px',
});

export const infoTotalWrapper = style({
  display: 'flex',
  gap: '10px',
});

export const infosWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
});

export const infoRow = style({
  display: 'flex',
  gap: '4px',
});
