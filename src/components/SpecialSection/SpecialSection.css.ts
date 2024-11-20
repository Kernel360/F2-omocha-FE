import { style } from '@vanilla-extract/css';

import colors from '@/styles/color';

export const specialSection = style({
  marginTop: '65px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '80px',
  height: '400px',
  width: '100%',
  background: 'url(http://fiximage.10x10.co.kr/web2018/main/bg_pattern_slash.png) 0 0 repeat',
});

export const specialSectionTitle = style({
  display: 'flex',
  flexDirection: 'column',
});

export const flex = style({
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
});

export const only = style({
  fontSize: '36px',
  fontWeight: 'light',
});

export const bellIcon = style({});

export const oneDay = style({
  marginTop: '4px',
  fontSize: '40px',
  fontWeight: 'bold',
});

export const popularItem = style({
  marginTop: '24px',
  fontSize: '36px',
  fontWeight: 'bold',
  color: colors.primary9,
});

export const specialAuction = style({
  display: 'flex',
  gap: '20px',
});

export const specialAuctionItem = style({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '8px',
});

export const specialAuctionImage = style({
  borderRadius: '100%',
  content: 'cover',
  border: '5px solid #fff',
  backgroundColor: '#fff',
});

export const specialAuctionTitle = style({
  fontSize: '14px',
  padding: '0 6px',
});

export const specialAuctionPriceTitle = style({
  fontSize: '14px',
  fontWeight: 'bold',
  color: colors.primary9,
});

export const specialAuctionPrice = style({
  fontSize: '14px',
  fontWeight: 'bold',
});
