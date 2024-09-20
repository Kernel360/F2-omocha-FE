import { style } from '@vanilla-extract/css';

export const cardWrapper = style({
  position: 'relative',
  textDecoration: 'none',
  color: 'rgba(0, 0, 0, 1)',
  display: 'flex',
  flexDirection: 'column',
  width: '280px',
  borderRadius: '12px',
  border: '1px solid rgba(229, 229, 229, 1)',
  ':hover': {
    boxShadow: '0 0 8px rgba(0, 0, 0, 0.1)',
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
});

export const cardContent = style({
  padding: '12px',
});

export const cardTitle = style({
  display: 'inline-block',
  width: '100%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  fontSize: '18px',
  lineHeight: '24px',
  fontWeight: '24px',
});

export const division = style({
  color: 'rgba(229, 229, 229, 1)',
});

export const cardFlex = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const cardFlexColor = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  color: 'rgba(200, 0, 0, 1)',
});

export const cardTimeWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const dim = style({
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '24px',
  color: 'rgba(255, 255, 255, 1)',
  fontWeight: 'bold',
  borderRadius: '12px',
  zIndex: 1,
});
