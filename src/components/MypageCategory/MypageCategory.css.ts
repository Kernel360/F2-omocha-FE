import { style } from '@vanilla-extract/css';

import colors from '@/styles/color';
import shadow from '@/styles/shadow';

export const categoryLink = style({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  paddingLeft: '10px',
});

export const page = style({
  width: '100%',
  borderRadius: '8px',
  padding: '20px',
  boxShadow: shadow.box3,
  backgroundColor: colors.white,
});

export const likeCount = style({
  display: 'inline-block',
  textAlign: 'center',
  marginLeft: '10px',
  fontWeight: 'bold',
  color: colors.primary11,
  backgroundColor: colors.gray3,
  minWidth: '30px',
  width: 'fit-content',
  padding: '4px 8px',
  borderRadius: '20px',
});

export const loadingStyle = style({
  display: 'inline-block',
  width: '40px',
  height: '27px',
  marginLeft: '10px',
});
