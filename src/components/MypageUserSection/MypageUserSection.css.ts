import { style } from '@vanilla-extract/css';

import colors from '@/styles/color';

export const profile = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '30px',
  width: '180px',
  borderBottom: '1px solid #eaeaea',
  padding: '10px 0 30px 10px',
  boxSizing: 'border-box',
});

export const image = style({
  display: 'flex',
});

export const imageButton = style({
  display: 'flex',
  border: `3px solid ${colors.gray7}`,
  borderRadius: '50%',
  cursor: 'pointer',
});

export const profileImage = style({
  borderRadius: '50%',
  cursor: 'pointer',
});

export const profileTitle = style({
  fontSize: '20px',
  fontWeight: '700',
  color: '#000',
  minHeight: '24px',
  overflowWrap: 'break-word',
  wordBreak: 'break-all',
});
