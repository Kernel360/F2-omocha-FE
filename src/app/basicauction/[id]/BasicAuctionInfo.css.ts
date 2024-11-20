import { style } from '@vanilla-extract/css';

export const auctionInfoWrapper = style({
  padding: '30px 0',
  gap: '20px',
  display: 'grid',
  gridTemplateColumns: 'minmax(510px, 1fr) minmax(430px, 1fr)',
  '@media': {
    'screen and (max-width: 960px)': {
      gridTemplateColumns: '1fr',
      width: '100%',
    },
  },
});
