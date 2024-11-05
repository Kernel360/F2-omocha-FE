import { globalStyle, style } from '@vanilla-extract/css';

export const profile = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  maxWidth: '180px',
  width: '100%',
  padding: '10px 0 30px 0',
  borderBottom: '1px solid #eaeaea',
});

export const profileTitle = style({
  fontSize: '20px',
  fontWeight: '700',
  color: '#000',
  minHeight: '24px',
});

export const heart = style({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
});

globalStyle(`${heart} span:nth-child(1)`, {
  fontSize: '18px',
});

globalStyle(`${heart} span:nth-child(2)`, {
  display: 'flex',
  justifyContent: 'center',
  fontSize: '18px',
  fontWeight: 'bold',
  color: 'rgb(196,39,39, 0.7)',
  backgroundColor: 'rgb(196,39,39, 0.2)',
  minWidth: '50px',
  padding: '5px',
  borderRadius: '20px',
  minHeight: '21px',
});
