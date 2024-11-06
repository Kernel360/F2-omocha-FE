import { style } from '@vanilla-extract/css';

import shadow from '@/styles/shadow';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
});

export const cardContainer = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px',
  width: '220px',
  height: '288px',
  border: '1px solid rgba(229, 229, 229, 1)',
  borderRadius: '12px',
  boxShadow: shadow.box3,
  boxSizing: 'border-box',
  padding: '16px',
});

export const textContainer = style({
  width: '100%',
  marginTop: '8px',
});
