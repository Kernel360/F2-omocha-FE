import { style, globalStyle, styleVariants, keyframes } from '@vanilla-extract/css';

import colors from '@/styles/color';

export const alarmContainer = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  borderRadius: '8px',
});

export const buttonContainer = style({
  display: 'flex',
  justifyContent: 'flex-end',
  padding: '10px',
});

export const clearAllButton = style({
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  fontSize: '12px',
  margin: '5px',
  cursor: 'pointer',
  width: 'fit-content',
});

export const noListWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '20px',
  marginTop: '200px',
});

export const noListTitle = style({
  fontSize: '16px',
  fontWeight: '500',
  color: colors.gray10,

  '@media': {
    'screen and (max-width: 700px)': {
      fontSize: '14px',
    },
  },
});

export const alarmList = style({
  display: 'flex',
  flexDirection: 'column',
  height: 'calc(100vh - 143px)',
  overflowY: 'scroll',
});

export const alarmItem = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  padding: '20px 10px',
  transition: 'background-color 0.3s, transform 0.2s',
  borderBottom: '1px solid rgba(0, 0, 0, 0.1)',

  ':active': {
    transform: 'scale(1.02)',
  },

  '@media': {
    '(hover: hover) and (pointer: fine)': {
      ':hover': {
        transform: 'scale(1.02)',
      },
    },
  },
});

globalStyle(`${alarmItem}:nth-last-child(1)`, {
  borderBottom: 'none',
});

// -- AlarmUnit.tsx

export const alarmLink = style({
  textDecoration: 'none',
  color: 'inherit',
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
});

export const image = style({
  objectFit: 'contain',
  borderRadius: '8px',
  boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
  backgroundColor: 'white',
});

export const alarmDetails = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  width: '60%',

  '@media': {
    'screen and (max-width: 700px)': {
      maxWidth: '190px',
      width: '100%',
    },
  },
});

export const alarmTitle = style({
  display: 'flex',
  gap: '5px',
  fontSize: '16px',
  fontWeight: '600',
  overflow: 'hidden',
  textOverflow: 'ellipsis',

  '@media': {
    'screen and (max-width: 700px)': {
      fontSize: '14px',
    },
  },
});

globalStyle(`${alarmTitle} span:nth-of-type(2)`, {
  width: 'calc(100% - 51px)',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const alarmTypes = styleVariants({
  BID_SELLER: {
    color: 'red',
  },
  CONCLUDE_SELLER: {
    color: 'rgb(35, 167, 80)',
  },
  CONCLUDE_NO_BIDS: {
    color: 'rgb(95, 99, 104)',
  },
  BID_BUYER: {
    color: 'red',
  },
  CONCLUDE_BUYER: {
    color: 'rgb(35, 167, 80)',
  },
  CONCLUDE_OTHER_BUYER: {
    color: 'rgb(95, 99, 104)',
  },
});

export const alarmData = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const listName = style({
  fontSize: '14px',
  fontWeight: '600',

  '@media': {
    'screen and (max-width: 700px)': {
      fontSize: '12px',
    },
  },
});

export const listValue = style({
  fontSize: '14px',
  fontWeight: '500',
  color: colors.gray10,

  '@media': {
    'screen and (max-width: 700px)': {
      fontSize: '12px',
    },
  },
});

export const valueStyle = styleVariants({
  bidding: [
    listValue,
    {
      color: 'red',
    },
  ],
  concluded: [
    listValue,
    {
      color: 'rgb(35, 167, 80)',
    },
  ],
});

export const deleteButton = style({
  position: 'absolute',
  right: '8px',
  top: '18px',
  cursor: 'pointer',
});

// -- AlarmSlide.tsx

const slideIn = keyframes({
  '0%': {
    transform: 'translateX(100%)',
    opacity: '0',
  },
  '100%': {
    transform: 'translateX(0)',
    opacity: '1',
  },
});

const slideOut = keyframes({
  '0%': {
    transform: 'translateX(0)',
    opacity: '1',
  },
  '100%': {
    transform: 'translateX(100%)',
    opacity: '0',
  },
});

export const alarmSlide = style({
  position: 'fixed',
  top: '80px',
  right: '16px',
  display: 'flex',
  gap: '10px',
  backgroundColor: colors.primary2,
  padding: '15px 10px',
  borderRadius: '5px',
  zIndex: 1000,
  maxWidth: '310px',
  width: '100%',
  animation: `${slideIn} 1s ease-out, ${slideOut} 1s 4s forwards`,

  '@media': {
    'screen and (max-width: 700px)': {
      display: 'block',
    },
  },
});

export const slidDetails = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
});

export const deleteSlideButton = style({
  position: 'absolute',
  right: '5px',
  top: '5px',
  cursor: 'pointer',
});
