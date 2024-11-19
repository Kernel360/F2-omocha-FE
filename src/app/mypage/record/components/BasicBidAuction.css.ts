import { style, globalStyle, styleVariants, keyframes } from '@vanilla-extract/css';

import colors from '@/styles/color';

export const list = style({
  position: 'relative',
  display: 'flex',
  gap: '15px',
  cursor: 'pointer',
  padding: '20px 10px',
  transition: 'background-color 0.3s, transform 0.2s',
  borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
  ':hover': {
    transform: 'scale(1.02)',
  },
});

const blinkAnimation = keyframes({
  '0%': { opacity: 1 },
  '50%': { opacity: 0.3 },
  '100%': { opacity: 1 },
});

export const bidding = style({
  fontSize: '12px',
  position: 'absolute',
  padding: '5px 10px',
  borderRadius: '20px',
  border: '1.5px solid red',
  right: '30px',
  top: '20px',
  animation: `${blinkAnimation} 1.5s ease-in-out infinite`,
});

globalStyle(`${list}:nth-last-child(1)`, {
  borderBottom: 'none',
});

export const image = style({
  maxWidth: '120px',
  width: '100%',
  maxHeight: '120px',
  height: '100%',
  objectFit: 'contain',
  borderRadius: '4px',
  boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
});

export const listRight = style({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  alignItems: 'baseline',
  gap: '10px',
  listStyle: 'none',
});

export const bidTitle = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '140px',
  fontSize: '15px',
  padding: '5px 10px',
  borderRadius: '4px',
  border: `1px solid ${colors.gray7} `,
  cursor: 'pointer',
});

export const listName = style({
  fontSize: '14px',
  width: '70px',
  marginRight: '10px',
  fontWeight: '600',
});

export const listValue = style({
  fontWeight: '500',
});

export const bidStatus = styleVariants({
  default: [
    listValue,
    {
      color: 'black',
    },
  ],
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
  defeat: [
    listValue,
    {
      color: 'rgb(95, 99, 104)',
    },
  ],
});

export const myBidStatus = styleVariants({
  default: [
    listValue,
    {
      color: 'black',
    },
  ],
  concluded: [
    listValue,
    {
      color: 'rgb(35, 167, 80)',
    },
  ],
  defeat: [
    listValue,
    {
      color: 'rgb(95, 99, 104)',
    },
  ],
});
