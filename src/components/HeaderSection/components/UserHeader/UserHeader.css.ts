import { style } from '@vanilla-extract/css';

import colors from '@/styles/color';

export const topHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 0',
});

export const topHeaderLogo = style({
  display: 'flex',
  alignItems: 'flex-end', // vanilla extract 오류
  justifyContent: 'center',
  gap: '10px',
});

export const logo = style({
  fontSize: '20px',
  alignItems: 'center',
  color: colors.primary9,
});

export const topCategory = style({
  display: 'flex',
  gap: '30px',
  fontSize: '12px',
});

export const logoutButton = style({
  cursor: 'pointer',
  color: colors.gray11,
  fontSize: '12px',
});

export const TopHeaderUnit = style({
  color: colors.gray11,
  fontSize: '12px',
  display: 'flex',
  gap: '5px',
});

export const noticeCount = style({
  backgroundColor: colors.red,
  color: colors.white,
  fontSize: '9px',
  padding: '2px 5px',
  borderRadius: '50%',
});
