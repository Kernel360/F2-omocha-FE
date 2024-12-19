import { style, styleVariants } from '@vanilla-extract/css';

import colors from '@/styles/color';
import typography from '@/styles/typo';

export const searchBar = style({
  maxWidth: '220px',
  height: '30px',
  width: '100%',
  position: 'relative',
  display: 'flex',
  gap: '5px',
  borderBottom: `1px solid ${colors.gray7}`,
  padding: '0 10px 5px',
  boxSizing: 'border-box',

  '@media': {
    'screen and (max-width: 700px)': {
      display: 'flex',
      margin: '0 auto',
      padding: '0 ',
    },
  },
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
      marginLeft: 'auto',
    },
  ],
});

export const searchInput = style({
  ...typography.caption,
  border: 'none',
  outline: 'none',
  background: 'none',
});
