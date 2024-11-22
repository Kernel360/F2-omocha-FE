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
  gap: '20px',
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

globalStyle(`${count} span:nth-child(1)`, typography.body);

globalStyle(`${count} span:nth-child(2)`, {
  ...typography.bodyBold,
  display: 'flex',
  justifyContent: 'center',
  color: colors.primary11,
  backgroundColor: colors.gray3,
  minWidth: '30px',
  padding: '5px 10px',
  borderRadius: '20px',
});

export const listLayoutWrapper = style({
  height: '100%',
  minHeight: '656px',

  '@media': {
    'screen and (max-width: 504px)': {
      minHeight: 'auto',
    },
  },
});
