import { style, keyframes } from '@vanilla-extract/css';

// 나타나고 사라지는 애니메이션 keyframes 정의
const fadeInUp = keyframes({
  '0%': {
    opacity: 0,
  },
  '100%': {
    opacity: 1,
  },
});

const fadeOutDown = keyframes({
  '0%': {
    opacity: 1,
  },
  '100%': {
    opacity: 0,
  },
});

export const scrollButton = style({
  position: 'fixed',
  left: '50%',
  bottom: '50px',
  transform: 'translate(-50%, 0)',
  border: '1px solid rgba(229, 229, 229, 1)',
  background: 'white',
  borderRadius: '50%',
  width: '55px',
  height: '55px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  transition: 'opacity 0.3s, transform 0.3s',
  animationDuration: '0.5s',
  animationFillMode: 'forwards',
});

export const showButton = style({
  animationName: fadeInUp,
});

export const hideButton = style({
  animationName: fadeOutDown,
  pointerEvents: 'none',
});
