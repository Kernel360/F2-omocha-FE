import { globalStyle, style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  margin: '10px',
});

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
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

export const searchBar = style({
  position: 'relative',
  display: 'flex',
  gap: '5px',
  borderBottom: '1px solid black',
  padding: '0 10px 5px',
});

export const searchInput = style({
  border: 'none',
  outline: 'none',
  fontSize: '16px',
});

export const searchDelete = style({
  position: 'absolute',
  right: '10px',
  cursor: 'pointer',
  color: 'rgb(0,0,0,0.5)',
});
