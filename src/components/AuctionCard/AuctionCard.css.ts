import { style } from '@vanilla-extract/css';

import shadow from '@/styles/shadow';
import typography from '@/styles/typo';

export const cardWrapper = style({
  position: 'relative',
  color: 'rgba(0, 0, 0, 1)',
  display: 'flex',
  flexDirection: 'column',
  width: '240px',
  borderRadius: '12px',
  border: '1px solid rgba(229, 229, 229, 1)',
  ':hover': {
    boxShadow: shadow.box3,
  },
});

export const heartStyle = style({
  position: 'absolute',
  top: '12px',
  right: '12px',
  width: '30px',
  height: '30px',
});

export const cardImage = style({
  borderRadius: '12px 12px 0 0',
  fontSize: '18px',
  lineHeight: '24px',
  fontWeight: '24px',
  content: 'cover',
});

export const cardContent = style({
  padding: '12px',
});

export const cardTitle = style([
  typography.h4, // h3 스타일 적용
  {
    display: 'inline-block',
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
]);

export const division = style({
  color: 'rgba(229, 229, 229, 1)',
  margin: '4px 0',
});

export const cardFlex = style([
  typography.body,
  {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
]);

export const cardFlexColor = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  color: 'rgba(200, 0, 0, 1)',
});

export const cardFlexText = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  color: 'rgba(0, 0, 0, 1)',
});

export const cardTimeWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const dim = style([
  typography.h4,
  {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'rgba(255, 255, 255, 1)',
    borderRadius: '12px',
  },
]);
