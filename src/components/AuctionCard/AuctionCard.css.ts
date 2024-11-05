import { style } from '@vanilla-extract/css';

import colors from '@/styles/color';
import shadow from '@/styles/shadow';
import typography from '@/styles/typo';

export const cardWrapper = style({
  position: 'relative',
  color: 'rgba(0, 0, 0, 1)',
  display: 'flex',
  flexDirection: 'column',
  width: '220px',

  borderRadius: '12px',
  border: '1px solid rgba(229, 229, 229, 1)',
  boxShadow: shadow.box3,
  ':hover': {
    boxShadow: shadow.box1,
  },
});

export const heartStyle = style({
  position: 'absolute',
  top: '20px',
  right: '24px',
  backgroundColor: colors.white,
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: shadow.box3,
});

export const cardImage = style({
  borderRadius: '8px',
  fontSize: '18px',
  lineHeight: '24px',
  fontWeight: '24px',
  objectFit: 'contain',
});

export const cardContent = style({
  padding: '12px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const userIcon = style({
  display: 'flex',
  marginLeft: 'auto',
});

export const cardTitle = style([
  typography.bodyLarge,
  {
    marginTop: '8px',
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

export const cardFlexColor = style([
  typography.body,
  {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: colors.primary9,
  },
]);

export const cardFlexText = style([
  typography.body,

  {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'rgba(0, 0, 0, 1)',
  },
]);

export const cardTimeWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const dim = style([
  typography.h4,
  {
    position: 'absolute',
    zIndex: 1,
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

export const floatTimer = style([
  typography.caption,
  {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '8px 16px',
    gap: '8px',
    backgroundColor: colors.white,
    borderRadius: '30px',
    top: '20px',
    left: '20px',
    boxShadow: shadow.box3,
    color: colors.red,
  },
]);
