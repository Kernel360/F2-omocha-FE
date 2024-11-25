import { style } from '@vanilla-extract/css';

import colors from '@/styles/color';
import typography from '@/styles/typo';

export const category = style({
  ...typography.body,
  display: 'grid',
  justifyItems: 'center',
  gridTemplateColumns: 'repeat(auto-fill, minmax(30%, auto))',
  gap: '10px',
  '@media': {
    '(max-width: 512px)': {
      ...typography.caption,
      paddingTop: '10px',
    },
  },
});

export const subCategory = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '5px',
  boxSizing: 'border-box',
  width: '100%',
  height: '35px',
  borderRadius: '12px',
  backgroundColor: colors.primary8,
  cursor: 'pointer',
});

export const subCategoryLink = style({
  color: colors.white,
});
