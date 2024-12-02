import { style, keyframes } from '@vanilla-extract/css';

import colors from '@/styles/color';

export const slideUpAndFade = keyframes({
  from: { opacity: 0, transform: 'translateY(2px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

export const slideRightAndFade = keyframes({
  from: { opacity: 0, transform: 'translateX(-2px)' },
  to: { opacity: 1, transform: 'translateX(0)' },
});

export const slideDownAndFade = keyframes({
  from: { opacity: 0, transform: 'translateY(-2px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

export const slideLeftAndFade = keyframes({
  from: { opacity: 0, transform: 'translateX(2px)' },
  to: { opacity: 1, transform: 'translateX(0)' },
});

export const slideInFromLeft = keyframes({
  from: { opacity: 0, transform: 'translateX(-100%)' },
  to: { opacity: 1, transform: 'translateX(0)' },
});

export const slideOutToRight = keyframes({
  from: { opacity: 1, transform: 'translateX(0)' },
  to: { opacity: 0, transform: 'translateX(100%)' },
});

export const goBackButton = style({
  position: 'fixed',
  top: '16px',
  left: '10px',
  width: 'fit-content',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'black',
  transform: 'rotate(90deg)',
  borderRadius: '100%',
  selectors: {
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    '&:focus': {
      boxShadow: `0 0 0 2px black`,
    },
  },
});

export const chattingListContainer = style({
  height: '482px',
  overflow: 'scroll',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: 10,

  '@media': {
    '(max-width: 504px)': {
      height: '100%',
    },
  },
});

export const title = style({
  position: 'fixed',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: '16px',
  fontWeight: 'bold',
  padding: '20px',
  width: '100%',
  boxSizing: 'border-box',
  backgroundColor: 'white',
  borderRadius: '4px 4px 0 0',
  color: 'black',
  marginBlockStart: '0',
  marginBlockEnd: '0',

  '@media': {
    '(max-width: 504px)': {
      borderRadius: '0',
    },
  },
});

export const closeButton = style({
  cursor: 'pointer',
});

export const chattingListWrapper = style({
  marginTop: '62px',
  overflowY: 'scroll',
});

export const noListWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '20px',
  marginTop: '130px',
});

export const noListTitleWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
});

export const noListTitle = style({ fontSize: '14px', fontWeight: '500', color: colors.gray10 });

export const chattingUnitButton = style({
  width: '100%',
});

export const popoverContent = style({
  margin: '0 10px',
  borderRadius: '4px',
  width: '320px',
  backgroundColor: 'rgb(244, 244, 244)',
  opacity: 1,
  zIndex: 1000,
  boxShadow: `
    hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px
  `,
  animationDuration: '400ms',
  animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  willChange: 'transform, opacity',
  selectors: {
    '&:focus': {
      boxShadow: `
        hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
        hsl(206 22% 7% / 20%) 0px 10px 20px -15px,
        0 0 0 2px #777,
      `,
    },
    '&[data-state="open"][data-side="top"]': {
      animationName: slideDownAndFade,
    },
    '&[data-state="open"][data-side="right"]': {
      animationName: slideLeftAndFade,
    },
    '&[data-state="open"][data-side="bottom"]': {
      animationName: slideUpAndFade,
    },
    '&[data-state="open"][data-side="left"]': {
      animationName: slideRightAndFade,
    },
  },

  '@media': {
    '(max-width: 504px)': {
      top: '0',
      left: '0',
      margin: '0',
      height: '100vh',
      width: '100vw',
      transform: 'translateY(130px) !important',

      selectors: {
        '&[data-state="open"]': {
          animation: `${slideInFromLeft} 300ms ease-out`,
        },
        '&[data-state="closed"]': {
          animation: `${slideOutToRight} 300ms ease-in`,
        },
      },
    },
  },
});

export const popoverArrow = style({
  fill: 'white',
});

export const popoverClose = style({
  fontFamily: 'inherit',
  borderRadius: '100%',
  height: '25px',
  width: '25px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'red',
  position: 'absolute',
  top: '5px',
  right: '5px',
  selectors: {
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    '&:focus': {
      boxShadow: `0 0 0 2px pink`,
    },
  },
});

export const iconButton = style({
  position: 'fixed',
  zIndex: '1',
  bottom: '90px',
  right: '20px',
  borderRadius: '100%',
  height: '55px',
  width: '55px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'black',
  backgroundColor: '#2e2e2e',
  boxShadow: `0 1px 5px black`,
  selectors: {
    '&:hover': {
      boxShadow: '0 2px 10px black',
    },
  },

  '@media': {
    '(max-width: 504px)': {
      bottom: '75px',
      width: '40px',
      height: '40px',
    },
  },
});

export const chatIcon = style({
  fill: 'white',
  stroke: 'white',

  '@media': {
    '(max-width: 504px)': {
      width: '20px',
      height: '20px',
    },
  },
});

export const fieldset = style({
  display: 'flex',
  gap: '20px',
  alignItems: 'center',
});

export const label = style({
  fontSize: '13px',
  color: 'black',
  width: '75px',
});

export const input = style({
  width: '100%',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  borderRadius: '4px',
  padding: '0 10px',
  fontSize: '13px',
  lineHeight: 1,
  color: 'black',
  boxShadow: `0 0 0 1px 'black',`,
  height: '25px',
  selectors: {
    '&:focus': {
      boxShadow: `0 0 0 2px black`,
    },
  },
});

export const text = style({
  margin: 0,
  color: 'black',
  fontSize: '15px',
  lineHeight: '19px',
  fontWeight: 500,
});
