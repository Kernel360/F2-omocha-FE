import { style, globalStyle, styleVariants } from '@vanilla-extract/css';

export const basicBid = style({
  display: 'flex',
  flexDirection: 'column',
  listStyle: 'none',
  maxHeight: '400px',
  overflow: 'scroll',
  borderRadius: '8px',
});

export const list = style({
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

globalStyle(`${list}:nth-last-child(1)`, {
  borderBottom: 'none',
});

export const image = style({
  width: '200px',
  height: 'auto',
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
