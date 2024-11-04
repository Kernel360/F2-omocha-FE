import { style, styleVariants } from '@vanilla-extract/css';

import colors from '@/styles/color';
import typography from '@/styles/typo';

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
