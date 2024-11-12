import color from '@/styles/color';
import { style } from '@vanilla-extract/css';

export const unitButton = style({
  cursor: 'pointer',
  display: 'flex',
  height: 'auto',
  fontSize: '16px',
  gap: '4px',
  padding: '4px 0 4px 4px',
  alignItems: 'center',
  ':hover': {
    fontWeight: '700',
    color: color.primary10,
  },
});

export const unitButtonSpan = style({
  display: 'flex',
  fontSize: '14px',
});

export const chevronIcon = style({
  marginLeft: 'auto',
  transition: 'transform 0.3s',
  color: color.gray11,
  selectors: {
    '&[data-state="open"]': {},
    '&[data-state="closed"]': {
      transform: 'rotate(180deg)',
    },
  },
});

export const unitContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  selectors: {
    '&[data-state="open"]': { padding: '10px 0 10px 12px', boxSizing: 'border-box' },
  },
});

export const unitContentForSpan = style({
  cursor: 'pointer',

  ':hover': {
    fontWeight: '700',
    color: color.primary10,
  },
});

//-----

export const categoryContainer = style({});

//-----

export const categorySelectorContainer = style({});
export const categoryItemList = style({});

//----

export const categoryItemWrapper = style({});
export const selected = style({});
export const item = style({});
