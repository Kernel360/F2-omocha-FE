import { style, globalStyle, styleVariants } from '@vanilla-extract/css';

export const profile = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '30px',
  boxSizing: 'border-box',
});

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
});

export const label = style({
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
});

globalStyle(`${label} span`, {
  width: '120px',
  fontWeight: '500',
});

export const inputBase = style({
  maxWidth: '368px',
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
  maxWidth: '525px',
  justifyContent: 'flex-end',
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
