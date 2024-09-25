import { style } from '@vanilla-extract/css';

export const auctionForm = style({
  margin: '10px',
});

export const auctionLabel = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  marginBottom: '30px',
});

export const title = style({
  display: 'flex',
  fontSize: '18px',
  fontWeight: 'bold',
});

export const auctionInput = style({
  width: '368px',
  borderRadius: '4px',
  padding: '12px 16px',
  border: '1.5px solid black',
});

export const priceInput = style({
  textAlign: 'right',
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
  objectFit: 'contain',
  border: '1px dashed white ',
});

export const deleteButton = style({
  position: 'absolute',
  top: '-10px',
  right: '-10px',
  zIndex: '1',
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

export const imageInfo = style({
  display: 'flex',
  cursor: 'pointer',
});

export const info = style({
  resize: 'none',
  height: '200px',
  borderRadius: '4px',
  padding: '12px 16px',
  border: '1.5px solid black',
});

export const period = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2,1fr)',
});

export const subTitle = style({
  fontSize: '16px',
  fontWeight: 'bold',
});

export const endPeriod = style({
  marginLeft: '20px',
});

export const buttonContainer = style({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '50px',
});

export const button = style({
  width: '402px',
  padding: '15px 62px',
  background: 'black ',
  color: '#FFF',
  fontWeight: 'bold',
  fontSize: '16px',
  borderRadius: '4px',
  border: 'none',
  cursor: 'pointer',
});
