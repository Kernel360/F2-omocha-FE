import { style } from '@vanilla-extract/css';

export const basicAuctionContainer = style({
  display: 'flex',
  gap: '20px',
<<<<<<< HEAD
  padding: '60px 0',
});

export const leftSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '30px',
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
=======
>>>>>>> develop
});

export const rightSection = style({
  display: 'flex',
  flexDirection: 'column',
  width: 'calc(100% - 240px)',
});
