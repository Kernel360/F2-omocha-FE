import { style, styleVariants } from '@vanilla-extract/css';

export const accordionItemButton = style({
  width: '100%',
  borderBottom: '1px solid #e0e0e0',

  selectors: {
    '&[data-state="open"]': {
      backgroundColor: 'rgb(245, 245, 245)',

      vars: {
        '--accordion-bg-color': 'rgb(245, 245, 245)',
      },
    },
    '&[data-state="closed"]': {
      vars: {
        '--accordion-bg-color': 'transparent',
      },
    },
  },
});

export const qnaPostButton = style({
  display: 'block',
  padding: '10px',
  fontSize: '14px',
  backgroundColor: 'rgb(245, 245, 245)',
  color: 'black',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  margin: '10px 0',
  marginLeft: 'auto',
});

export const accordionPostQnAContent = style({
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  boxSizing: 'border-box',
  fontSize: '15px',
  color: 'black',
  backgroundColor: 'var(--accordion-bg-color)',
  transition: 'background-color 0.3s',

  selectors: {
    '&[data-state="open"]': {
      padding: '10px 20px',
    },
  },
});

export const postQnASection = style({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  gap: '20px',
});

export const postQnAWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
});

export const postQnAWrapperTop = style({
  display: 'flex',

  gap: '10px',
});

export const postQnALable = style({
  fontSize: '14px',
  width: '80px',
});

export const postQnAText = style({
  fontSize: '14px',
  padding: '5px',
  backgroundColor: 'rgb(245, 245, 245)',
});

export const buttonWrapper = style({
  display: 'flex',
  gap: '10px',
  marginLeft: 'auto',
});

export const postQnAButton = styleVariants({
  close: [
    {
      width: '72px',
      height: '35px',
      fontSize: '14px',
      backgroundColor: 'rgb(245, 245, 245)',
      borderRadius: '5px',
      cursor: 'pointer',
      color: 'rgb(0, 0, 0)',
      background: 'rgb(255, 255, 255)',
      border: '1px solid rgb(212, 212, 212)',
    },
  ],
  submit: [
    {
      width: '72px',
      height: '35px',
      fontSize: '14px',
      backgroundColor: 'rgb(48, 48, 51)',
      color: 'rgb(255, 255, 255)',
      border: '1px solid rgb(48, 48, 51)',
      borderRadius: '5px',
      cursor: 'pointer',
    },
  ],
});

export const postQnATextAreaTitle = style({
  padding: '5px',
  width: '90%',
  borderRadius: '5px',
  fontSize: '14px',
  resize: 'none',
});

export const postQnATextAreaContent = style({
  padding: '5px',
  width: '90%',
  height: '100px',
  borderRadius: '5px',
  fontSize: '14px',
  resize: 'none',
});

export const postQnANoticeSection = style({
  paddingLeft: '90px',
  marginBottom: '20px',
  color: 'rgb(160, 160, 160)',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
});

export const postQnANoticeTitle = style({
  fontSize: '14px',
  fontWeight: 'bold',
});

export const postQnANoticeUnit = style({
  fontSize: '14px',
  listStylePosition: 'inside',
});
