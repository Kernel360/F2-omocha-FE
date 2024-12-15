import { style, globalStyle, styleVariants } from '@vanilla-extract/css';

import colors from '@/styles/color';

export const alarmContainer = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  borderRadius: '8px',
});

export const clearAllButton = style({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: '5px',
  fontSize: '12px',
  margin: '5px',
  cursor: 'pointer',
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
});

export const alarmItem = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  padding: '20px 10px',
  transition: 'background-color 0.3s, transform 0.2s',
  borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
  ':hover': {
    transform: 'scale(1.02)',
  },
});

globalStyle(`${alarmItem}:nth-last-child(1)`, {
  borderBottom: 'none',
});

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
});

export const alarmDetails = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  width: '60%',
});

export const alarmTitle = style({
  display: 'flex',
  gap: '5px',
  fontSize: '16px',
  fontWeight: '600',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
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
});

export const listValue = style({
  fontSize: '14px',
  fontWeight: '500',
  color: colors.gray10,
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
  right: '10px',
  top: '55px',
  cursor: 'pointer',
});
