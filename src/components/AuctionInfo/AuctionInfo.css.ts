import { style, styleVariants, keyframes } from '@vanilla-extract/css';

import colors from '@/styles/color';
import typography from '@/styles/typo';

export const infoWrapper = style({
  display: 'flex',
  boxSizing: 'border-box',
  flexDirection: 'column',
  padding: '12px',
  width: '100%',
  maxWidth: '440px',
  '@media': {
    'screen and (max-width: 960px)': {
      marginLeft: '0px',
      maxWidth: 'none',
    },
  },
});

export const infoTitle = style({
  textAlign: 'center',
  fontSize: '24px',
  lineHeight: '24px',
  fontWeight: '24px',
  wordBreak: 'break-all',
});

export const endTimeDescription = style({
  fontSize: '14px',
  color: 'gray',
  textAlign: 'right',
});

export const infoRow = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px 0',
});

export const noDisplay = style({
  display: 'none',
});

export const nowPrice = style({
  color: 'red',
});

export const infoRowTitle = style(typography.bodyLarge);

export const refreshCurrentPrice = style({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
});

// 중간 발표 이후 공통 로직으로 구현하기
/* 애니메이션 정의 */
export const rotate = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

/* 회전하는 클래스 */
export const rotating = style({
  animation: `${rotate} 1s linear infinite` /* forwards를 사용하여 마지막 상태 유지 */,
});

export const moveToRight = style({
  marginLeft: 'auto',
});

export const infoRight = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const calledTime = style({
  fontSize: '12px',
  color: 'gray',
});

export const division = style({
  width: '100%',
  height: '1px',
  backgroundColor: 'rgba(229, 229, 229, 1)',
});

export const infoButton = style({
  backgroundColor: 'rgba(0, 0, 0, 1)',
  color: colors.primary1,
  padding: '8px 12px',
  borderRadius: '8px',
  border: 'none',
  cursor: 'pointer',
});

export const bidButtonWrapper = style({
  display: 'flex',
  gap: '12px',
  marginTop: 'auto',
});

export const bidButton = styleVariants({
  default: {
    width: '100%',
    height: '50px',
    fontSize: '14px',
    backgroundColor: colors.primary10,
    color: colors.primary1,
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
  },
  disabled: {
    width: '100%',
    height: '50px',
    fontSize: '14px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: 'gray',
    color: 'darkgray',
    cursor: 'not-allowed',
  },
});

export const deleteButton = styleVariants({
  default: {
    width: '100%',
    height: '50px',
    fontSize: '14px',
    backgroundColor: colors.primary10,
    color: colors.primary1,
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
  },
  disabled: {
    width: '100%',
    height: '50px',
    fontSize: '14px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: 'gray',
    color: 'darkgray',
    cursor: 'not-allowed',
  },
});

export const bidButtonExplain = style({
  marginTop: '4px',
  fontSize: '12px',
});

export const bidPriceButton = style({
  cursor: 'pointer',
});
