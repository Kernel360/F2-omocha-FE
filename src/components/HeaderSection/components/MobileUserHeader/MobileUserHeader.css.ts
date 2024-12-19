import { style } from '@vanilla-extract/css';

import colors from '@/styles/color';

export const topHeader = style({
  position: 'relative',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 0',
});

export const IconWrapper = style({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
});

export const searchAlarmWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
});

export const alarm = style({
  position: 'relative',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
});

export const alarmDot = style({
  position: 'absolute',
  top: '0',
  right: '-5px',
  width: '5px',
  height: '5px',
  borderRadius: '50%',
  backgroundColor: colors.primary9,
  marginLeft: '5px',
});

export const topHeaderLogo = style({
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',

  display: 'flex',
  alignItems: 'flex-end', // vanilla extract 오류
  justifyContent: 'center',
  gap: '10px',
});

export const logo = style({
  fontSize: '20px',
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
