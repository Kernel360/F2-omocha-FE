import { style, styleVariants } from '@vanilla-extract/css';

export const overlay = style({
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
});

export const modal = style({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '350px',
  width: '100%',
  backgroundColor: 'white',
  padding: '10px',
  gap: '20px',
  borderRadius: '10px',
});

export const buttonHeader = style({
  display: 'flex',
  justifyContent: 'flex-end',
  border: 'none',
  borderBottom: '1.5px solid black',
  backgroundColor: 'transparent',
  paddingBottom: '10px',
});

export const content = style({
  display: 'flex',
  justifyContent: 'center',
  textAlign: 'center',
  margin: '10px',
});

export const buttonFooter = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
});

export const buttonBase = style({
  border: 'none',
  backgroundColor: 'transparent',
  color: 'white',
  borderRadius: '4px',
  maxWidth: '100px',
  width: '100%',
  padding: '10px 5px',
});

export const button = styleVariants({
  left: [
    buttonBase,
    {
      backgroundColor: 'rgb(196,39,39)',
    },
  ],
  right: [
    buttonBase,
    {
      backgroundColor: 'black',
    },
  ],
});
