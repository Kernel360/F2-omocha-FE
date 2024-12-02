import { style } from '@vanilla-extract/css';

import colors from '@/styles/color';

export const sectionWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  listStyle: 'none',
  maxHeight: '560px',
  overflow: 'scroll',
  borderRadius: '8px',
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
  textAlign: 'center',
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

export const listWrapper = style({
  position: 'relative',
  width: '100%',
});

// ----------------

export const reviewWrapper = style({
  display: 'flex',
  gap: '16px',
});

export const list = style({
  position: 'relative',
  display: 'grid',
  gridTemplateColumns: '150px 1fr',
  gap: '15px',
  padding: '20px 10px',
  transition: 'background-color 0.3s, transform 0.2s',
  borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
  ':hover': {
    transform: 'scale(1.02)',
  },

  '@media': {
    'screen and (max-width: 420px)': {
      gridTemplateColumns: '1fr 1fr',
    },
  },
});

export const image = style({
  objectFit: 'contain',
  borderRadius: '4px',
  boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',

  '@media': {
    'screen and (max-width: 420px)': {
      width: '100%',
    },
  },
});

export const InfoWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const listFirst = style({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',

  '@media': {
    'screen and (min-width: 774px)': {
      gap: '10px',
      flexDirection: 'column',
      width: 'fit-content ',
    },
  },
});

export const listData = style({
  display: 'flex',

  '@media': {
    'screen and (max-width: 420px)': {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '10px',
    },
  },
});

export const bidTitle = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  maxWidth: '140px',
  fontSize: '15px',
  padding: '5px 10px',
  borderRadius: '4px',
  border: `1px solid ${colors.gray7} `,
  cursor: 'pointer',

  '@media': {
    'screen and (max-width: 420px)': {
      fontSize: '14px',
    },
  },
});

export const title = style({
  fontSize: '14px',
  fontWeight: '600',
});

export const flexWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});

export const memberNickname = style({
  fontSize: '13px',
  fontWeight: '500',
});

export const createdAt = style({
  fontSize: '10px',
  color: colors.gray10,
});

export const reviewContent = style({
  fontSize: '13px',

  flexWrap: 'wrap',
  width: '100%',
});
