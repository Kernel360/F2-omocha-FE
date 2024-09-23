import { style } from '@vanilla-extract/css';

export const infoWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '12px',
  width: '500px',
});

export const infoTitle = style({
  textAlign: 'center',
  fontSize: '24px',
  lineHeight: '24px',
  fontWeight: '24px',
  wordBreak: 'break-all',
});

export const infoRow = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px 0',
});

export const nowPrice = style({
  color: 'red',
});

export const infoRowTitle = style({
  fontSize: '18px',
  fontWeight: '40px',
});

export const infoRight = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const division = style({
  width: '100%',
  height: '1px',
  backgroundColor: 'rgba(229, 229, 229, 1)',
});

export const infoButton = style({
  backgroundColor: 'rgba(0, 0, 0, 1)',
  color: 'white',
  padding: '8px 12px',
  borderRadius: '4px',
  border: 'none',
  cursor: 'pointer',
});

export const bidButton = style({
  fontSize: '14px',
  padding: '24px 24px',
  marginTop: '12px',
});
