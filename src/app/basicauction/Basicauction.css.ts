import colors from '@/styles/color';
import typography from '@/styles/typo';
import { globalStyle, style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  gap: '20px',
  marginTop: '40px',
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
});

export const rightSection = style({
  width: 'calc(100% - 219px)',
});

// ------

export const label = style({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  cursor: 'pointer',
  border: '1px solid rgb(228, 228, 231)',
  padding: '10px',
  fontSize: '16px',
  height: '51px',
  width: 'fit-content',
  boxSizing: 'border-box',
});

export const checkbox = style({
  display: 'none',
});

export const checked = style({
  color: 'black',
  border: '1px solid black',
});

export const nonChecked = style({
  color: 'rgb(228, 228, 231)',
});
