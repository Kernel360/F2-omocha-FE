import { style, styleVariants } from '@vanilla-extract/css';

import colors from '@/styles/color';

export const container = style({ padding: '0 16px', display: 'flex', flexDirection: 'column' });

export const logo = style({ fontSize: '24px', color: colors.primary9, marginBottom: '24px' });

export const division = style({
  padding: '0px',
  height: '1px',
  border: 'none',
  backgroundColor: 'rgb(234, 237, 239)',
  margin: '20px 0px',
});

export const hrTitle = style({ fontSize: '14px', color: colors.gray12 });

export const userSection = style({ display: 'flex', flexDirection: 'column', gap: '8px' });

export const userWrapper = style({
  display: 'flex',
  gap: '4px',
});

export const profileImage = style({
  borderRadius: '50%',
});

export const authWrapper = style({
  display: 'flex',
  gap: '8px',
  marginTop: '16px',
});

export const userName = style({
  fontSize: '14px',
  lineHeight: '20px',
  color: colors.gray11,
});

export const buttonBase = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  width: '100%',
  height: '40px',
  borderRadius: '4px',
});

export const normalNavButtonBase = style({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  width: '100%',
  textAlign: 'left',
  height: '40px',
  borderRadius: '4px',
  fontSize: '14px',
  color: colors.gray11,
  padding: '0 8px',
  boxSizing: 'border-box',
  ':hover': {
    backgroundColor: colors.gray3,
  },
});

export const bottomNavButtonBase = style({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  width: '100%',
  textAlign: 'left',
  borderRadius: '4px',
  fontSize: '12px',
  color: colors.gray11,
  padding: '4px 8px',
  boxSizing: 'border-box',
});

export const button = styleVariants({
  login: [
    buttonBase,
    {
      fontSize: '12px',
      color: colors.primary9,
      backgroundColor: colors.white,
      border: `1px solid ${colors.primary9}`,
    },
  ],
  join: [
    buttonBase,
    {
      fontSize: '12px',
      backgroundColor: colors.primary9,
      color: colors.white,
      border: `1px solid ${colors.primary9}`,
    },
  ],
  uploadAuction: [
    buttonBase,
    {
      fontSize: '14px',
      color: colors.primary9,
      backgroundColor: colors.primary3,
      border: `1px solid ${colors.primary9}`,
    },
  ],
});
