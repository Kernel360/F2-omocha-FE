import { style } from '@vanilla-extract/css';

import colors from '@/styles/color';

export const topHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '32px 0 16px 0',
});

export const logo = style({
  fontSize: '32px',
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
});
