import { style, styleVariants } from '@vanilla-extract/css';

export const chatroomContainer = style({
  position: 'fixed',
  zIndex: 1000, //
  right: '420px', // 조금 위로 띄우기 20 420
  bottom: '0px',
  width: '350px',
  height: '500px',
  display: 'flex',
  flexDirection: 'column',
  margin: '16px 0',
  padding: '16px 0px',
  backgroundColor: 'white',
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
});

export const chatroomHeader = style({
  padding: '0 16px 16px 16px',
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
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  height: '100%',
  overflowY: 'auto',
  backgroundColor: '#f9f9f9',
  padding: '10px',
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
  paddingTop: '16px',
  padding: '16px 8px 0 8px',
});

export const inputWrapper = style({
  padding: '8px 16px',
  borderRadius: '12px',
  width: '100%',
  border: '1px solid #e5e5e5',
  fontSize: '14px',
  outline: 'none',
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

export const msgDate = style({
  fontSize: '10px',
  color: '#999',
  textAlign: 'end',
});
