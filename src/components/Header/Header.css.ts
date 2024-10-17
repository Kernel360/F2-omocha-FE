import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '1280px',
  width: '100%',
  margin: '0 auto',
});

export const topHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px',
});

export const logo = style({
  fontSize: '32px',
});

export const topCategory = style({
  display: 'flex',
  gap: '30px',
  fontSize: '12px',
});

export const SideNavButton = style({
  cursor: 'pointer',
});

export const bottomHeader = style({
  display: 'flex',
  fontSize: '25px',
  gap: '27px',
  padding: '0 16px',
});

export const logoutButton = style({
  cursor: 'pointer',
});
