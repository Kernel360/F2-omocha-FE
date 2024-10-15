import { globalStyle, style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  gap: '20px',
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

globalStyle(`${count} span:nth-child(1)`, {
  fontSize: '18px',
});

globalStyle(`${count} span:nth-child(2)`, {
  display: 'flex',
  justifyContent: 'center',
  fontSize: '18px',
  fontWeight: 'bold',
  color: 'rgb(196,39,39, 0.7)',
  backgroundColor: 'rgb(196,39,39, 0.2)',
  minWidth: '50px',
  padding: '5px',
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
