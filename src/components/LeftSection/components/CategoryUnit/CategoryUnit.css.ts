import { globalStyle, style } from '@vanilla-extract/css';

import color from '@/styles/color';

export const unitButton = style({
  cursor: 'pointer',
  display: 'flex',
  height: 'auto',
  fontSize: '16px',
  justifyContent: 'space-between',
  padding: '4px 0 4px 4px',
  alignItems: 'center',
  width: '100%',
  ':hover': {
    fontWeight: '700',
    color: color.primary10,
  },
});

export const unitButtonLink = style({
  width: '100%',
});

export const unitButtonSpan = style({
  display: 'flex',
  fontSize: '14px',
});

export const pickUnitButtonSpan = style({
  display: 'flex',
  fontSize: '14px',
  color: color.primary10,
});

export const chevronIcon = style({
  transition: 'transform 0.3s',
  color: color.gray11,
});

globalStyle(`${unitButton}[data-state="open"] .${chevronIcon}`, {
  transform: 'rotate(180deg)',
});

globalStyle(`${unitButton}[data-state="closed"] .${chevronIcon}`, {
  transform: 'rotate(0deg)',
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
  padding: '4px 0 4px 4px',
  ':hover': {
    fontWeight: '700',
  },
});
