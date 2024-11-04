import { style } from '@vanilla-extract/css';

import colors from '@/styles/color';
import typography from '@/styles/typo';

export const leftSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '30px',
});

export const label = style({
  ...typography.caption,
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
  border: `1px solid ${colors.gray7}`,
  width: 'fit-content',
  padding: '8px',
  borderRadius: '24px',
  cursor: 'pointer',
});

export const checkbox = style({
  display: 'none',
});

export const checked = style({
  color: 'white',
  background: colors.secondary7,
  border: `1px solid ${colors.secondary7}`,
});

export const nonChecked = style({
  color: 'rgb(228, 228, 231)',
});
