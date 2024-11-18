import { style, keyframes } from '@vanilla-extract/css';

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

export const goBackButton = style({
  position: 'fixed',
  top: '18px',
  left: '5px',
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

export const title = style({
  position: 'fixed',
  fontSize: '18px',
  fontWeight: 'bold',
  padding: '20px',
  width: '100%',
  boxSizing: 'border-box',
  backgroundColor: 'white',
  borderRadius: '4px 4px 0 0',
  color: 'black',
});

export const chattingListWrapper = style({
  marginTop: '61px',
  height: '100%',
  overflowY: 'scroll',
});

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
  bottom: '50px',
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
});

export const chatIcon = style({
  fill: 'white',
  stroke: 'white',
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
