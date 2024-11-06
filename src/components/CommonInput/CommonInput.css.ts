import { style } from '@vanilla-extract/css';

import colors from '@/styles/color';
import typography from '@/styles/typo';

export const label = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const title = style([
  typography.body,
  {
    color: colors.black1,
    fontWeight: 'bold',
  },
]);

export const disabledTitle = style([
  typography.body,
  {
    color: colors.gray10,
    fontWeight: 'bold',
  },
]);

export const input = style({
  display: 'flex',
  alignItems: 'center',
  height: '42px',
  padding: '0 16px',
  borderRadius: '8px',
  border: `1.5px solid ${colors.gray7}`,
});

export const error = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  fontSize: '14px',
  color: colors.primary10,
});
