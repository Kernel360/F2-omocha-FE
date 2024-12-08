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
      padding: '10px 0',
    },
  },
});

export const subCategoryLink = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '5px',
  boxSizing: 'border-box',
  width: '100%',
  height: '35px',
  borderRadius: '12px',
  backgroundColor: colors.primary8,
  color: colors.black1,
});

export const subCategoryName = style({
  display: 'block',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});
