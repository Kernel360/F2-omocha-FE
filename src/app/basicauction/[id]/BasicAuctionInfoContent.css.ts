import { style } from '@vanilla-extract/css';

import colors from '@/styles/color';
import typography from '@/styles/typo';

export const content = style({
  ...typography.bodyLarge,
  margin: '20px',
});

export const blackquoteStyle = style({
  borderLeft: `2px solid ${colors.gray5}`,
  paddingLeft: '10px',
  color: colors.gray8,
  fontStyle: 'italic',
  marginInline: '0',
  marginBlock: '0',
});

export const olStyle = style({
  marginTop: '1em',
  marginBlockStart: '1em',
  marginBlockEnd: '1em',
  paddingInlineStart: '40px',
});

export const ulStyle = style({
  marginTop: '1em',
  marginBlockStart: '1em',
  marginBlockEnd: '1em',
  paddingInlineStart: '40px',
  listStyleType: 'disc',
});

export const codeStyle = style({
  backgroundColor: colors.gray3,
});
