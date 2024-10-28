import { style, styleVariants } from '@vanilla-extract/css';

export const container = style({
  position: 'relative',
  padding: '16px 24px',
  backgroundColor: 'white',
  color: 'black',
  borderRadius: '8px',
});

export const title = style({
  position: 'fixed',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '16px 0',
  color: 'black',
});

export const chattingUnitSection = style({
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  padding: '16px 20px',
  boxSizing: 'border-box',
  width: '100%',
  borderBottom: '1px solid #e5e5e5',
  transition: 'background-color 0.2s ease',
  ':hover': {
    backgroundColor: '#f9f9f9',
  },
});

export const chattingUnit = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  width: '100%',
});

export const chattingUnitInfo = style({
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
});

export const dot = style({
  display: 'flex',
  borderRadius: '50%',
  width: '10px',
  height: '10px',
});

export const isReadDot = styleVariants({
  noRead: [
    dot,
    {
      backgroundColor: 'none',
    },
  ],
  read: [
    dot,
    {
      backgroundColor: '#FF4136',
    },
  ],
});

export const chatOpponent = style({
  color: 'black',
  fontSize: '14px',
  minWidth: '50px',
  fontWeight: '500',
  textAlign: 'start',
});

export const chatTitle = style({
  color: 'black',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  fontSize: '14px',
  fontWeight: '600',
  textAlign: 'start',
});

export const recentChatTime = style({
  color: '#999',
  fontSize: '12px',
  marginLeft: 'auto',
  width: 'fit-content',
  minWidth: '45px',
  textAlign: 'start',
});

export const recentChat = style({
  color: '#333',
  fontSize: '14px',
  textAlign: 'start',
});

// Chat Room Styles
export const chatroomContainer = style({
  display: 'flex',
  flexDirection: 'column',

  backgroundColor: 'white',
  borderRadius: '12px',
});

export const chatroomHeader = style({
  height: '61px',
  boxSizing: 'border-box',
  padding: '10px 0 10px 40px',
});

export const chatroomName = style({
  fontSize: '16px',
  fontWeight: 'bold',
  color: 'black',
});

export const chatroomUserSection = style({
  display: 'flex',
  gap: '8px',
  marginTop: '8px',
});

export const user = style({
  color: '#333',
  fontSize: '12px',
});

export const closeButton = style({
  display: 'flex',
  justifyContent: 'flex-end',
  borderBottom: '1.5px solid black',
  backgroundColor: 'transparent',
  paddingBottom: '8px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '600',
});

// Chat List
export const chatListWrapper = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  height: '332px',
  overflowY: 'auto',
  backgroundColor: '#f9f9f9',
  padding: '10px',
  whiteSpace: 'pre-wrap',
});

export const msgBoxBase = style({
  display: 'flex',
  gap: '4px',
  flexDirection: 'column',
});

export const msgBox = styleVariants({
  myMsg: [
    msgBoxBase,
    {
      marginLeft: 'auto',
    },
  ],
  opponentMsg: [
    msgBoxBase,
    {
      marginRight: 'auto',
    },
  ],
});

// Message Styles
export const msgWrapperBase = style({
  display: 'flex',
  maxWidth: '80%',
  width: 'fit-content',
  padding: '12px 16px',
  borderRadius: '12px',
  fontSize: '14px',
  boxShadow: '0 1px 5px rgba(0, 0, 0, 0.1)',
});

export const msgWrapper = styleVariants({
  myMsg: [
    msgWrapperBase,
    {
      marginLeft: 'auto',
      backgroundColor: 'rgba(230,39,39,0.6)',
    },
  ],
  opponentMsg: [
    msgWrapperBase,
    {
      marginRight: 'auto',
      backgroundColor: 'rgba(0,0,0,0.3)',
    },
  ],
});

export const msg = style({
  wordBreak: 'break-word',
});

export const inputSection = style({
  display: 'flex',
  gap: '8px',
  borderTop: '1px solid #e5e5e5',
  padding: '16px 8px',
  backgroundColor: 'white',
  borderRadius: '0 0 8px 8px',
});

export const inputWrapper = style({
  padding: '8px 16px',
  borderRadius: '12px',
  width: '100%',
  border: '1px solid #e5e5e5',
  fontSize: '14px',
  outline: 'none',
  resize: 'none',
});

export const submitButton = style({
  padding: '4px 8px',
  borderRadius: '12px',
  backgroundColor: 'rgba(0,0,0,0.3)',
  color: 'white',
  fontSize: '12px',
  minWidth: '40px',
  cursor: 'pointer',
  outline: 'none',
  border: 'none',
  transition: 'background-color 0.2s ease',
  ':hover': {
    backgroundColor: 'rgba(230, 39, 39, 0.6)',
  },
});

// Message Styles
export const msgDateBase = style({
  fontSize: '10px',
  color: '#999',
  textAlign: 'end',
});

export const msgDate = styleVariants({
  myMsg: [
    msgDateBase,
    {
      marginLeft: 'auto',
    },
  ],
  opponentMsg: [
    msgDateBase,
    {
      marginRight: 'auto',
    },
  ],
});

export const toBottomButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'fixed',
  bottom: '100px',
  right: '10px',
  padding: '8px',
  borderRadius: '50%',
  backgroundColor: 'rgba(0, 0, 0, 0.3);',
  color: 'white',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',
  ':hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
});

export const toBottomIcon = style({
  transform: 'rotate(90deg)',
  width: '20px',
  height: '20px',
});
