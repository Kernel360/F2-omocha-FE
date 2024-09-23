import { style } from '@vanilla-extract/css';

export const tabsRoot = style({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  gap: '10px',
});
export const tabsList = style({
  display: 'flex',
});

export const tabsTrigger = style({
  padding: '10px 20px',
  width: '100%',
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  borderBottom: '2px solid black',

  selectors: {
    '&[data-state="active"]': {
      color: 'red',
      borderBottom: '2px solid red',
    },
  },
});

export const tabsContent = style({});
