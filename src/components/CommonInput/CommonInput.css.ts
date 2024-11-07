import { style } from '@vanilla-extract/css';

import colors from '@/styles/color';
import typography from '@/styles/typo';

export const label = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  width: '100%',
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
  height: '36px',
  width: '100%',
  padding: '0 16px',
  borderRadius: '8px',
  border: `1.5px solid ${colors.gray7}`,
});

export const inputWrapper = style({
  display: 'flex',
  gap: '8px',
  width: '100%',
});

export const error = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  fontSize: '14px',
  color: colors.primary10,
});
