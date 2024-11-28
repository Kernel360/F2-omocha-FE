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

export const noListWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '20px',
  marginTop: '70px',
});

export const noListTitle = style({ fontSize: '16px', fontWeight: '500', color: colors.gray10 });

export const noListButton = style({
  padding: '10px 20px',
  backgroundColor: colors.primary9,
  color: colors.white,
  borderRadius: '8px',
  fontSize: '14px',
  cursor: 'pointer',
});
