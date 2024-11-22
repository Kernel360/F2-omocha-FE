import { style, styleVariants, keyframes } from '@vanilla-extract/css';

export const toastViewport = style({
  position: 'fixed',
  top: '16px',
  right: '16px',
  zIndex: 100000,
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

const fadeIn = keyframes({
  from: { opacity: 0, transform: 'translateY(-20px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

const fadeOut = keyframes({
  from: { opacity: 1, transform: 'translateY(0)' },
  to: { opacity: 0, transform: 'translateY(-20px)' },
});

export const toastRoot = style({
  background: 'white',
  padding: '16px',
  borderRadius: '8px',
  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
  maxWidth: '320px',
  minHeight: '20px',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  position: 'relative',
  opacity: 0,
  transform: 'translateY(-20%)',
  animation: `${fadeIn} 0.3s ease-in-out forwards`,
  selectors: {
    '&[data-state="closed"]': {
      animation: `${fadeOut} 0.3s ease-in-out forwards`,
    },
  },
});

export const toastTypes = styleVariants({
  default: {
    borderLeft: '4px solid #757575',
  },
  success: {
    borderLeft: '4px solid #06BC0B',
  },
  info: {
    borderLeft: '4px solid #2196F3',
  },
  error: {
    borderLeft: '4px solid #F44336',
  },
  warning: {
    borderLeft: '4px solid #FF9800',
  },
});

export const toastContent = style({
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
  justifyContent: 'space-between',
});

export const toastIcon = style({
  display: 'flex',
});

export const toastMessage = style({
  fontSize: '14px',
});

export const closeButton = style({
  color: 'gray',
  cursor: 'pointer',
  fontSize: '14px',
  width: '18px',

  ':hover': {
    width: '18px',
    height: '18px',
    borderRadius: '4px',
    backgroundColor: '#eee',
  },
});

const progressAnimation = keyframes({
  from: { width: '100%' },
  to: { width: '0%' },
});

export const toastProgress = style({
  height: '4px',
  backgroundColor: '#ddd',
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  animation: `${progressAnimation} 1s ease-in-out`,
});
