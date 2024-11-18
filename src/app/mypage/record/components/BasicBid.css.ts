import colors from '@/styles/color';
import { style } from '@vanilla-extract/css';

export const basicBid = style({
  display: 'flex',
  flexDirection: 'column',
  listStyle: 'none',
  maxHeight: '400px',
  overflow: 'scroll',
  borderRadius: '8px',
});

export const noListWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '20px',
  marginTop: '70px',
});

export const noListTitle = style({ fontSize: '16px', fontWeight: '500', color: colors.gray10 });

export const noListButton = style({
  padding: '10px 20px',
  backgroundColor: colors.primary9,
  color: colors.white,
  borderRadius: '8px',
  fontSize: '14px',
  cursor: 'pointer',
});

export const collapsibleTrigger = style({
  width: '100%',
  cursor: 'pointer',
});
