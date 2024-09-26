import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit,minmax(300px, 1fr))',
  justifyItems: 'center',
  maxWidth: '1200px',
  width: '100%',
  margin: '0 auto',
  marginTop: '50px',
});

export const containerBox = style({
  maxWidth: '300px',
  width: '100%',
  maxHeight: '400px',
  height: '100%',
});

export const title = style({
  fontSize: '24px',
  fontWeight: 'bold',
});

export const categoryLink = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  border: '1.5px solid black',
  borderRadius: '12px',
  padding: '15px',
  ':hover': {
    boxShadow: '0 0 8px rgba(0, 0, 0, 0.1)',
  },
});

export const description = style({
  fontSize: '14px',
  borderTop: '2px solid black',
  paddingTop: '15px',
  height: '70px',
});

export const dim = style({
  position: 'absolute',
  top: '0',
  left: '0',
  maxWidth: '300px',
  width: '100%',
  maxHeight: '350px',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '24px',
  color: 'rgba(255, 255, 255, 1)',
  fontWeight: 'bold',
  borderRadius: '12px',
  zIndex: 1,
});
