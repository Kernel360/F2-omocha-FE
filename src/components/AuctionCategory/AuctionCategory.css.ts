import { style } from '@vanilla-extract/css';

import colors from '@/styles/color';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  boxSizing: 'border-box',
  padding: '20px',
  borderTop: `4px solid ${colors.gray10}`,
  gap: '10px',
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
    color: colors.primary10,
  },
});

export const unitButtonSpan = style({
  display: 'flex',
  fontSize: '14px',
  padding: '4px 0 4px 4px',
});
