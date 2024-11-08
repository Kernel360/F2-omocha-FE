import { globalStyle, style } from '@vanilla-extract/css';

import {
  slideDownAndFade,
  slideLeftAndFade,
  slideRightAndFade,
  slideUpAndFade,
} from '@/components/Chatting/ChattingIconButton.css';
import colors from '@/styles/color';

export const iconButton = style({
  cursor: 'pointer',
  padding: '6px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'transparent',
  color: colors.gray7,
  transition: 'background-color 0.2s ease, color 0.2s ease',
  selectors: {
    '&[data-active="true"]': {
      color: 'black',
    },
  },
});

globalStyle(`${iconButton} svg`, {
  width: '15px',
  height: '15px',
});

export const codeStyle = style({
  backgroundColor: colors.gray3,
});

export const tooltipButton = style({
  display: 'flex',
  padding: '6px',
});

export const tooltipContent = style({
  textAlign: 'center',
  lineHeight: '1.5',
  fontSize: '10px',
  borderRadius: '4px',
  padding: '10px 15px',
  color: 'white',
  width: '100px',
  backgroundColor: colors.secondary7,
  boxShadow: `
    hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px
  `,
  userSelect: 'none',
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
    '&[data-state="delayed-open"][data-side="top"]': {
      animationName: slideDownAndFade,
    },
    '&[data-state="delayed-open"][data-side="right"]': {
      animationName: slideLeftAndFade,
    },
    '&[data-state="delayed-open"][data-side="bottom"] ': {
      animationName: slideUpAndFade,
    },
    '&[data-state="delayed-open"][data-side="left"]': {
      animationName: slideRightAndFade,
    },
  },
});

export const tooltipArrow = style({
  fill: colors.secondary7,
});
