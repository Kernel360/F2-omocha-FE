import { style } from '@vanilla-extract/css';

import colors from '@/styles/color';
import layout from '@/styles/layout';
import typography from '@/styles/typo';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: layout.maxLayoutWidth.maxWidth,
  width: '100%',
  margin: '0 auto',
});

export const topHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px 0',
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

export const SideNavButton = style({
  cursor: 'pointer',
});

export const bottomHeader = style([
  typography.h3,
  {
    display: 'flex',
    gap: '27px',
  },
]);

export const buttonStyles = style([
  typography.h3,
  {
    padding: '12px 0px',
    borderRadius: '4px',
    cursor: 'pointer',
    color: colors.gray11,
    transition: 'background-color 0.3s ease, border-color 0.3s ease',

    ':hover': {
      color: colors.primary10,
      borderColor: colors.primary7,
    },

    ':active': {
      borderColor: colors.primary8,
      color: colors.primary12,
    },
  },
]);

export const logoutButton = style({
  cursor: 'pointer',
  color: colors.gray11,
});

export const TopHeaderUnit = style({
  color: colors.gray11,
});
