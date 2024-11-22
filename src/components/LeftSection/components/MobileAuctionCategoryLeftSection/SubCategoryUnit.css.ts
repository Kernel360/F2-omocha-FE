import { style } from '@vanilla-extract/css';

import typography from '@/styles/typo';

export const category = style({
  ...typography.body,
  display: 'grid',
  justifyItems: 'center',
  gridTemplateColumns: 'repeat(auto-fill, minmax(30%, auto))',
  gap: '10px',
});

export const subCategory = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '5px',
  boxSizing: 'border-box',
  width: '100%',
  height: '35px',

  ':hover': {
    borderRadius: '4px',
    backgroundColor: 'rgb(245, 245, 245)',
  },
});
