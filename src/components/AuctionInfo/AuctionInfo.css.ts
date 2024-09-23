import { style } from '@vanilla-extract/css';

export const infoWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '12px',
  width: '500px',
});

export const infoTitle = style({
  textAlign: 'center',
  fontSize: '24px',
  lineHeight: '24px',
  fontWeight: '24px',
});

export const infoRow = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px 0',
});

export const infoRight = style({
  display: 'flex',
  alignItems: 'center',
});

export const division = style({
  width: '100%',
  height: '1px',
  backgroundColor: 'rgba(229, 229, 229, 1)',
});
