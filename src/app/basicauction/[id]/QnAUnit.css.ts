import { style, styleVariants } from '@vanilla-extract/css';

export const accordionItem = style({
  width: '100%',
  borderBottom: '1px solid #e0e0e0',

  ':hover': {
    backgroundColor: 'rgb(245, 245, 245)',
  },
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

export const accordionTrigger = style({
  padding: '10px 20px',
  fontSize: '14px',
  width: '100%',
  gap: '10px',
  display: 'flex ',
  flexDirection: 'column',
  justifyContent: 'space-between',
  fontFamily: 'inherit',
  minHeight: '45px',
  flex: 1,
  alignItems: 'center',
  lineHeight: 1,
  color: 'black',
  backgroundColor: 'var(--accordion-bg-color)',
  transition: 'background-color 0.3s',
});

export const questionWrapper = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  gap: '10px',
});

export const userEmail = style({
  fontSize: '12px',
  color: 'gray',
});

export const accordionAuthorContent = style({
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
});

export const answerTitle = style({
  fontSize: '15px',
  fontWeight: 'bold',
  color: 'rgb(55, 95, 255)',
  margin: '15px 0',
});

export const answerPostSection = style({
  display: 'flex',
  alignItems: 'end',
  gap: '20px',
});

export const questionDeleteButton = style({
  padding: '5px',
  fontSize: '12px',
  color: 'black',
  cursor: 'pointer',
  marginLeft: 'auto',
});

export const accordionContent = style({
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
  width: '100%',
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

export const postQnATextAreaContent = style({
  padding: '5px',
  width: '90%',
  height: '100px',
  borderRadius: '5px',
  fontSize: '14px',
  resize: 'none',
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

export const createAt = style({
  fontSize: '12px',
  color: 'gray',
});

export const haveAnswerBase = style({
  fontSize: '12px',
  padding: '5px',
  color: 'white',
});

export const haveAnswerVariants = styleVariants({
  yes: [
    haveAnswerBase,
    {
      backgroundColor: 'rgb(55, 95, 255)',
    },
  ],
  no: [
    haveAnswerBase,
    {
      backgroundColor: 'RGB(255, 95, 55)',
    },
  ],
});
