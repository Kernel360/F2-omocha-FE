import { keyframes, style, styleVariants } from '@vanilla-extract/css';

import colors from '@/styles/color';

const overlayShow = keyframes({
  '0%': {
    opacity: '0',
  },
  '100%': {
    opacity: '1',
  },
});

const contentShow = keyframes({
  '0%': {
    opacity: '0',
    transform: 'translate(-50%, -48%) scale(0.96)',
  },
  '100%': {
    opacity: '1',
    transform: 'translate(-50%, -50%) scale(1)',
  },
});

export const overlay = style({
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgb(0, 0, 0, 0.3)',
  animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
});

export const modal = style({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column',
  width: 'auto',
  backgroundColor: 'white',
  padding: '10px',
  borderRadius: '10px',
  zIndex: '1',
  animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
});

export const closeButton = style({
  display: 'flex',
  width: '100%',
  justifyContent: 'flex-end',
  borderBottom: `1px solid rgba(0, 0, 0, 0.3)`,
  backgroundColor: 'transparent',
  paddingBottom: '10px',
  cursor: 'pointer',
});

export const content = style({
  display: 'flex',
  justifyContent: 'center',
  textAlign: 'center',
  minWidth: '300px',
  padding: '20px 10px',
});

export const footerButton = style({
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
  cursor: 'pointer',
});

export const button = styleVariants({
  positiveButton: [
    buttonBase,
    {
      backgroundColor: colors.primary9,
    },
  ],
  negativeButton: [
    buttonBase,
    {
      backgroundColor: colors.gray10,
    },
  ],
});

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: '14px',
  borderBottom: '1.5px solid black',
  paddingBottom: '10px',
  cursor: 'pointer',
});

export const headerTitle = style({
  margin: '0',
  paddingLeft: '5px',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  wordBreak: 'break-all',
  width: 'calc(100% - 24px)',
});
