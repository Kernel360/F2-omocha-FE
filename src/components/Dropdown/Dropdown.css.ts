import { style } from '@vanilla-extract/css';

export const dropdownData = style({
  cursor: 'pointer',
  border: '1px solid rgb(228, 228, 231)',
  padding: '10px',
  width: 'fit-content',
});

export const dropdownTrigger = style({
  display: 'flex',
  alignItems: 'center',
});

export const dropdownContent = style({
  position: 'relative',
  top: '10px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  border: '1px solid rgb(228, 228, 231)',
  boxShadow: '0 0 8px rgba(0, 0, 0, 0.1)',
  padding: '10px',
  width: 'fit-content',
});

export const dropdownItem = style({
  width: '100%',
  ':hover': {
    backgroundColor: 'rgb(244, 244, 245)',
  },
});

export const dropdownText = style({
  fontSize: '16px',
  cursor: 'pointer',
  padding: '10px',
});
