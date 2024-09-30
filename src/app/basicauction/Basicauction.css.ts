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
