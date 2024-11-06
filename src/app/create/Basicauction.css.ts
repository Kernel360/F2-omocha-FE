import { style } from '@vanilla-extract/css';

import colors from '@/styles/color';
import shadow from '@/styles/shadow';

export const auctionLabel = style({
  display: 'flex',
  flexDirection: 'column',
});

export const title = style({
  display: 'flex',
  fontSize: '18px',
  fontWeight: 'bold',
});

export const auctionInput = style({
  maxWidth: '368px',
  borderRadius: '8px',
  padding: '12px 16px',
  border: '1.5px solid black',
});

export const count = style({
  fontSize: '14px',
  textAlign: 'right',
  marginBottom: '10px',
});

export const imageBoard = style({
  display: 'flex',
  width: '100%',
  height: '150px',
  backgroundColor: colors.backgroundGray1,
  borderRadius: '4px',
  overflowX: 'scroll',
});

export const imageList = style({
  display: 'flex',
  listStyle: 'none',
  margin: '10px',
  gap: '10px',
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

export const deleteButton = style({
  position: 'absolute',
  top: '-10px',
  right: '-10px',
  zIndex: '1',
  cursor: 'pointer',
});

export const imageInput = style({
  display: 'none',
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

export const info = style({
  resize: 'none',
  height: '200px',
  borderRadius: '4px',
  padding: '12px 16px',
  border: '1.5px solid black',
});

export const price = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit,minmax(70px, 360px))',
  gap: '30px',
});

export const period = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
});

export const description = style({
  marginTop: '16px',
  fontSize: '13px',
  color: 'rgb(142,142,142)',
});

export const subTitle = style({
  display: 'flex',
  flexDirection: 'column',
  fontSize: '16px',
  fontWeight: 'bold',
  gap: '20px',
});

export const buttonContainer = style({
  display: 'flex',
  justifyContent: 'center',
  margin: '0 auto',
  marginTop: '50px',
  marginBottom: '50px',
  width: '100%',
});

export const button = style({
  width: '402px',
  padding: '15px 62px',
  background: 'black ',
  color: '#FFF',
  fontWeight: 'bold',
  fontSize: '16px',
  borderRadius: '4px',
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

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid #d1d5db',
  borderRadius: '4px',
  overflow: 'scroll',
});

export const editorSection = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '8px',
  padding: '8px',
  backgroundColor: '#f9fafb',
  borderBottom: '1px solid  #d1d5db',
});

export const editorContent = style({
  padding: '16px',
  backgroundColor: '#ffffff',
  minHeight: '200px',
  height: '100%',
  fontSize: '16px',
  lineHeight: '1.5',
  color: '#374151',
});

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

export const topTitle = style({
  fontWeight: '700',
  fontSize: '20px',
  display: 'flex',
  width: '100%',
  lineHeight: '32px',
  color: colors.gray12,
  letterSpacing: '-0.2px',
  marginBottom: '20px',
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
