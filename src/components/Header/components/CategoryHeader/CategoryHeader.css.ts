import { globalStyle, keyframes, style } from '@vanilla-extract/css';

import colors from '@/styles/color';
import typography from '@/styles/typo';

export const bottomHeaderWrapper = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px',
});

export const bottomHeader = style([
  typography.h3,
  {
    display: 'flex',
    gap: '27px',
  },
]);

export const buttonStyles = style([
  typography.h4,
  {
    padding: '12px 0px',
    borderRadius: '4px',
    cursor: 'pointer',
    color: colors.gray11,
    transition: 'background-color 0.3s ease, border-color 0.3s ease',

    ':hover': {
      color: colors.primary10,
      borderColor: colors.primary7,
    },

    ':active': {
      borderColor: colors.primary8,
      color: colors.primary12,
    },
  },
]);

globalStyle('[data-radix-popper-content-wrapper]', {
  display: 'flex !important',
  boxSizing: 'border-box',
  left: '50% !important',
  transform: 'translate(-50%, 158px) !important',
  width: '100%',
  height: '250px',
  margin: '0 auto',
  padding: '0 20px',
  backgroundColor: colors.white,
});

const slideDown = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translateY(-10px)',
  },
  '100%': {
    opacity: 1,
    transform: 'translateY(0)',
  },
});

const slideUp = keyframes({
  '0%': {
    opacity: 1,
    transform: 'translateY(0)',
  },
  '100%': {
    opacity: 0,
    transform: 'translateY(-10px)',
  },
});

export const customPopperContainer = style({
  animation: `${slideDown} 0.3s ease-out`,
  opacity: 0,
  transform: 'translateY(-10px)',

  selectors: {
    '&[data-state="open"]': {
      opacity: 1,
      transform: 'translateY(0)',
    },
    '&[data-state="closed"]': {
      opacity: 0,
      transform: 'translateY(-10px)',
      animation: `${slideUp} 0.3s ease-in`,
    },
  },
});

export const customPopperContent = style({
  display: 'flex !important',
  gap: '20px',
  width: '100%',
  maxWidth: '960px',
  margin: '0 auto',
  padding: '0 20px',
  zIndex: 1000,
});

export const subCategoryContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  minWidth: '100px',
});

export const subCategoryTitle = style({
  display: 'flex',
  alignItems: 'center',
  fontSize: '16px',
  gap: '4px',
});

export const subCategory = style({
  fontSize: '13px',
  padding: '4px ',

  ':hover': {
    fontWeight: '700',
  },
});
