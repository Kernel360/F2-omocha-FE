import { style, styleVariants, keyframes } from '@vanilla-extract/css';

export const infoWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '12px',
  minWidth: '320px',
  width: '100%',
  maxWidth: '450px',
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

export const nowPrice = style({
  color: 'red',
});

export const infoRowTitle = style({
  fontSize: '18px',
  fontWeight: '40px',
});

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

export const infoRight = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const division = style({
  width: '100%',
  height: '1px',
  backgroundColor: 'rgba(229, 229, 229, 1)',
});

export const infoButton = style({
  backgroundColor: 'rgba(0, 0, 0, 1)',
  color: 'white',
  padding: '8px 12px',
  borderRadius: '4px',
  border: 'none',
  cursor: 'pointer',
});

export const bidButton = styleVariants({
  default: {
    height: '80px',
    fontSize: '16px',
    padding: '24px 24px',
    marginTop: '12px',
    backgroundColor: 'rgba(0, 0, 0, 1)',
    color: 'white',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
  },
  disabled: {
    fontSize: '14px',
    padding: '24px 24px',
    marginTop: '12px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: 'gray',
    color: 'darkgray',
    cursor: 'not-allowed',
  },
});

export const deleteButton = styleVariants({
  default: {
    marginTop: '20px',
    background: 'red',
    color: '#F0F0F0',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    height: '80px',
    fontSize: '16px',
    padding: '24px 24px',
  },
  disabled: {
    padding: '24px 24px',
    marginTop: '12px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: 'darkred',
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
