import { style } from '@vanilla-extract/css';

import colors from '@/styles/color';

export const specialSection = style({
  marginTop: '65px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '80px',
  padding: '20px',
  boxSizing: 'border-box',
  width: '100%',
  background: 'url(https://fiximage.10x10.co.kr/web2018/main/bg_pattern_slash.png) 0 0 repeat',
  '@media': {
    'screen and (max-width: 1100px)': {
      flexDirection: 'column',
      gap: '40px',
      marginTop: '30px',
    },
  },
});

export const specialSectionTitle = style({
  display: 'flex',
  flexDirection: 'column',
  '@media': {
    'screen and (max-width: 1100px)': {
      marginRight: 'auto',
      flexDirection: 'row',
      gap: '10px',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
  },
});

export const flex = style({
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
});

export const only = style({
  fontSize: '28px',
  fontWeight: 'light',
  '@media': {
    'screen and (max-width: 1100px)': {
      fontSize: '24px',
    },
  },
});

export const popularItem = style({
  marginTop: '20px',
  fontSize: '28px',
  fontWeight: 'bold',
  color: colors.primary9,
  '@media': {
    'screen and (max-width: 1100px)': {
      marginTop: '0px',
      fontSize: '24px',
    },
  },
});

export const specialAuction = style({
  minHeight: '264px',
  maxWidth: '800px',
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 180px))',
  gap: '16px',
  alignItems: 'center',
  justifyContent: 'center',
});

export const noListWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '20px',
  minHeight: '264px',
  height: '100%',
});

export const noListTitle = style({
  fontSize: '16px',
  fontWeight: '500',
  color: colors.gray10,
});

export const noListButton = style({
  padding: '10px 20px',
  backgroundColor: colors.primary9,
  color: colors.white,
  borderRadius: '8px',
  fontSize: '14px',
  cursor: 'pointer',
});

export const specialAuctionItem = style({
  display: 'flex',
  minHeight: '264px',
  position: 'relative',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '8px',
});

export const specialAuctionImage = style({
  borderRadius: '100%',
  objectFit: 'cover',
  border: '5px solid #fff',
});

export const specialAuctionTitle = style({
  fontSize: '14px',
  padding: '0 6px',
});

export const specialAuctionTitleSuspenseBlock = style({
  width: '100px',
  margin: '0 auto',
});

export const specialAuctionPriceTitle = style({
  fontSize: '14px',
  fontWeight: 'bold',
  color: colors.primary9,
});

export const specialAuctionPrice = style({
  fontSize: '14px',
});
