import { style } from '@vanilla-extract/css';

export const auctionLabel = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  marginBottom: '30px',
});

export const title = style({
  display: 'flex',
  fontSize: '18px',
  fontWeight: 'bold',
});

export const auctionInput = style({
  maxWidth: '368px',
  borderRadius: '4px',
  padding: '12px 16px',
  border: '1.5px solid black',
});

export const count = style({
  fontSize: '14px',
  textAlign: 'right',
});

export const imageBoard = style({
  display: 'flex',
  width: '100%',
  height: '150px',
  backgroundColor: 'rgb(196, 196, 196)',
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
  border: '1.5px dashed white ',
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
  border: '1.5px dashed white',
  borderRadius: '10px',
  cursor: 'pointer',
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
  gridTemplateColumns: 'repeat(auto-fit,minmax(66px, auto))',
  gap: '30px',
});

export const period = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
});

export const description = style({
  fontSize: '14px',
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
  width: '50%',
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
  color: '#FF0000',
  fontSize: '14px',
  paddingLeft: '8px',
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
