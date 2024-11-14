import { style, globalStyle, styleVariants, keyframes } from '@vanilla-extract/css';

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
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '10px',
  listStyle: 'none',
  margin: '15px 0',
});

export const listName = style({
  display: 'inline-block',
  fontSize: '14px',
  width: '60px',
  textAlign: 'end',
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
