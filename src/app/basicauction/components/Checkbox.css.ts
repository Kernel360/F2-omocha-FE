import { style } from '@vanilla-extract/css';

import colors from '@/styles/color';
import typography from '@/styles/typo';

export const label = style({
  ...typography.caption,
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
  border: `1px solid ${colors.gray6}`,

  width: 'fit-content',
  padding: '8px',
  borderRadius: '4px',
  cursor: 'pointer',
});

export const checkbox = style({
  display: 'none',
});

export const checked = style({
  color: 'white',
  background: colors.primary7,
  border: `1px solid ${colors.primary7}`,
});

export const nonChecked = style({
  color: 'rgb(228, 228, 231)',
});
