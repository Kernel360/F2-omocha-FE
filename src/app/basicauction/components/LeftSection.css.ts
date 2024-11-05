import { style, styleVariants } from '@vanilla-extract/css';

import colors from '@/styles/color';
import typography from '@/styles/typo';

export const leftSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '30px',
});

// --- Checkbox.css.ts ---

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

// --- SearchBar.css.ts ---

export const searchBar = style({
  position: 'relative',
  display: 'flex',
  gap: '5px',
  borderBottom: `1px solid ${colors.gray7}`,
  padding: '0 10px 5px',
});

const buttonBase = style({
  display: 'flex',
  alignItems: 'center',
});

export const buttonIcon = styleVariants({
  search: [buttonBase],
  delete: [
    buttonBase,
    {
      color: colors.gray8,
    },
  ],
});

export const searchInput = style({
  ...typography.body,
  border: 'none',
  outline: 'none',
});
