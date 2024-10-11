import { style, styleVariants } from '@vanilla-extract/css';

export const container = style({
  padding: '0 24px',
});

export const title = style({
  fontSize: '16px',
  marginTop: '24px',
  marginBottom: '16px',
});

export const chattingUnitSection = style({
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
  padding: '20px',
  borderBottom: '1px solid #f0f0f0',
});

export const chattingUnit = style({
  display: 'flex',
  gap: '12px',
  flexDirection: 'column',
});

export const chattingUnitInfo = style({
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
});

export const dot = style({
  display: 'flex',
  borderRadius: '50%',
  width: '10px',
  height: '10px',
  // 이후 상황에 맞춰서 보내야함. 아마 isNew? 이런 속성이 있겠지.
});

export const isReadDot = styleVariants({
  noRead: [
    dot,
    {
      background: 'none',
    },
  ],
  read: [
    dot,
    {
      background: 'red',
    },
  ],
});

export const chatOpponent = style({
  color: 'black',
  fontSize: '12px',
});

export const chatTitle = style({
  color: 'black',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  width: '215px',
  fontSize: '12px',
});

export const recentChatTime = style({
  color: 'black',
  fontSize: '10px',
});

export const recentChat = style({
  color: 'black',
  fontSize: '12px',
});
