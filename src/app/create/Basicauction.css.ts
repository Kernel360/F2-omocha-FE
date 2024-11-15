import { style, styleVariants } from '@vanilla-extract/css';

import colors from '@/styles/color';
import shadow from '@/styles/shadow';
import typography from '@/styles/typo';

// --- page.tsx ---

export const backContainer = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  width: '100%',
  padding: '60px 0',
  backgroundColor: colors.backgroundGray1,
});

export const container = style({
  display: 'flex',
  boxSizing: 'border-box',
  flexDirection: 'column',
  width: '100%',
  gap: '20px',
  margin: '0 auto',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: shadow.box3,
  backgroundColor: colors.white,
});

export const formSection = style({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '10px',
  gap: '30px',
});

export const inputWrapper = style({
  maxWidth: '368px',
  width: '100%',
});

export const price = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit,minmax(70px, 360px))',
  gap: '30px',
});

export const nowBidPrice = style({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '30px',
});

export const auctionLabel = style({
  display: 'flex',
  flexDirection: 'column',
});

export const title = style({
  display: 'flex',
  fontSize: '18px',
  fontWeight: 'bold',
});

export const auctionTypeTitle = style([
  typography.body,
  {
    color: colors.black1,
    fontWeight: 'bold',
  },
]);

export const auctionTypeButtonWrapper = style({
  display: 'flex',
  gap: '10px',
  margin: '10px 0 20px 0',
});

export const auctionTypeTitleButtonBase = style({
  cursor: 'pointer',
  padding: '4px 8px',
  fontSize: '11px',
  color: colors.gray8,
  borderRadius: '30px',

  border: `1px solid ${colors.gray8}`,
  ':hover': {
    color: colors.primary10,
    fontWeight: 'bold',
    border: `1.5px solid ${colors.primary9}`,
    backgroundColor: colors.primary3,
  },
});

export const auctionTypeTitleButton = styleVariants({
  default: [auctionTypeTitleButtonBase, {}],
  selected: [
    auctionTypeTitleButtonBase,
    {
      color: colors.primary10,
      border: `1px solid ${colors.primary9}`,
      backgroundColor: colors.primary3,
    },
  ],
});

export const flexWrapper = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '10px',
});

export const description = style({
  marginTop: '16px',
  fontSize: '13px',
  color: 'rgb(142,142,142)',
});

export const buttonContainer = style({
  display: 'flex',
  justifyContent: 'center',
  margin: '0 auto',
  marginBottom: '50px',
  width: '100%',
});

export const period = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
});

// --- imagerequired.tsx ---

export const count = style({
  fontSize: '14px',
  textAlign: 'right',
});

export const imageBoard = style({
  display: 'flex',
  width: '100%',
  height: '150px',
  backgroundColor: colors.backgroundGray1,
  borderRadius: '4px',
  overflowX: 'scroll',
});

export const imageUpload = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '10px',
  minWidth: '250px',
  border: `1.5px dashed ${colors.gray8} `,
  borderRadius: '10px',
  cursor: 'pointer',
  color: colors.gray8,
  fontSize: '18px',
});

export const imageInput = style({
  display: 'none',
});

export const imageList = style({
  display: 'flex',
  listStyle: 'none',
  margin: '10px',
  gap: '10px',
});

export const imageWrapper = style({
  position: 'relative',
  display: 'flex',
  gap: '10px',
  justifyContent: 'center',
  width: '250px',
  height: 'auto',
  objectFit: 'contain',
  // border: `1.5px dashed ${colors.gray8} `,
  borderRadius: '10px',
});

export const image = style({
  position: 'relative',
  display: 'flex',
  gap: '10px',
  justifyContent: 'center',
  width: '250px',
  height: 'auto',
  objectFit: 'contain',
  border: `1.5px dashed ${colors.gray8} `,
  borderRadius: '10px',
});

export const thumbnailButtonBase = style({
  cursor: 'pointer',
  position: 'absolute',
  top: '5px',
  left: '18px',
  zIndex: '1',
  padding: '4px',
  fontSize: '12px',
  color: colors.gray8,
  borderRadius: '4px',

  border: `1px solid ${colors.gray8}`,
  ':hover': {
    color: colors.primary10,
    fontWeight: 'bold',
    border: `1.5px solid ${colors.primary9}`,
    backgroundColor: colors.primary3,
  },
});

export const thumbnailButton = styleVariants({
  default: [thumbnailButtonBase, {}],
  selected: [
    thumbnailButtonBase,
    {
      color: colors.primary10,
      border: `1.5px solid ${colors.primary9}`,
      backgroundColor: colors.primary3,
    },
  ],
});

export const deleteButton = style({
  position: 'absolute',
  top: '-10px',
  right: '-10px',
  zIndex: '1',
  cursor: 'pointer',
});

export const error = style({
  display: 'flex',
  gap: '4px',
  alignItems: 'center',
  color: colors.primary10,
  fontSize: '14px',
  marginTop: '16px',
  fontWeight: 'normal',
});

// --- contentrequired.tsx ---

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  border: `1px solid ${colors.gray8}`,
  borderRadius: '4px',
  overflow: 'scroll',
});

export const editorSection = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '8px',
  padding: '8px',
  backgroundColor: colors.backgroundGray1,
  borderBottom: `1px solid  ${colors.gray8}`,
});

export const editorContent = style({
  padding: '16px',
  minHeight: '200px',
  height: '100%',
  fontSize: '16px',
  lineHeight: '1.5',
});
