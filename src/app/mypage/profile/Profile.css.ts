import { style, globalStyle, styleVariants } from '@vanilla-extract/css';

export const profile = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '40px',
  boxSizing: 'border-box',
  width: '100%',
});

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
});

export const sectionTitle = style({
  fontSize: '16px',
  fontWeight: '800',
});

export const image = style({
  display: 'flex',
  justifyContent: 'center',
});

export const imageButton = style({
  display: 'flex',
  cursor: 'pointer',
});

export const profileImage = style({
  borderRadius: '50%',
  cursor: 'pointer',
});

export const label = style({
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
});

globalStyle(`${label} span`, {
  minWidth: '120px',
  fontWeight: '500',
});

export const inputBase = style({
  width: '100%',
  borderRadius: '4px',
  padding: '12px',
});

export const input = styleVariants({
  default: [
    inputBase,
    {
      border: '1.5px solid black',
    },
  ],
  disabled: [
    inputBase,
    {
      border: '1.5px solid gray',
      cursor: 'not-allowed',
    },
  ],
});

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
});

export const buttonContainer = style({
  display: 'flex',
  marginTop: '30px',
});

export const button = style({
  padding: '15px 62px',
  background: 'black',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '16px',
  borderRadius: '4px',
  cursor: 'pointer',
  marginTop: '30px',
});

export const inputError = style({
  display: 'flex',
  gap: '4px',
  alignItems: 'center',
  color: 'red',
  fontSize: '14px',
  marginLeft: '130px',
});
