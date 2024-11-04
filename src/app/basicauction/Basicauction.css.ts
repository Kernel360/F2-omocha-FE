import { globalStyle, style } from '@vanilla-extract/css';

import colors from '@/styles/color';
import typography from '@/styles/typo';

export const basicAuctionContainer = style({
  display: 'flex',
  gap: '20px',
});

export const rightSection = style({
  display: 'flex',
  flexDirection: 'column',
  width: 'calc(100% - 240px)',
});

export const container = style({
  display: 'flex',
  flexDirection: 'column',
});

export const searchContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
});

export const count = style({
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
});

globalStyle(`${count} span:nth-child(1)`, typography.bodyLarge);

globalStyle(`${count} span:nth-child(2)`, {
  ...typography.body,
  display: 'flex',
  justifyContent: 'center',
  color: colors.primary11,
  backgroundColor: colors.gray3,
  minWidth: '30px',
  padding: '5px 10px',
  borderRadius: '20px',
});
