import { style } from '@vanilla-extract/css';

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
