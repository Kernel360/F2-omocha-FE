import { style, globalStyle, styleVariants } from '@vanilla-extract/css';

export const basicBid = style({
  display: 'flex',
  flexDirection: 'column',
  listStyle: 'none',
  maxHeight: '400px',
  overflow: 'scroll',
});

export const list = style({
  display: 'flex',
  gap: '15px',
  marginBottom: '15px',
  cursor: 'pointer',
});

globalStyle(`${list}:nth-last-child(1)`, {
  marginBottom: '0px',
});

export const listRight = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  listStyle: 'none',
});

export const listName = style({
  display: 'inline-block',
  fontSize: '14px',
  width: '40px',
  textAlign: 'end',
  marginRight: '10px',
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
      color: 'rgb(22, 234, 94)',
    },
  ],
  defeat: [
    listValue,
    {
      color: 'rgb(95, 99, 104)',
    },
  ],
});
