import { style } from '@vanilla-extract/css';

export const accordionContainer = style({
  width: '100%',
});

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
  display: 'flex ',
  justifyContent: 'space-between',

  fontFamily: 'inherit',

  height: '45px',
  flex: 1,

  alignItems: 'center',

  lineHeight: 1,
  color: 'black',

  backgroundColor: 'var(--accordion-bg-color)',
  transition: 'background-color 0.3s',
});

export const accordionContent = style({
  overflow: 'hidden',
  display: 'flex',
  width: 'fit-content',
  fontSize: '15px',
  color: 'black',
  backgroundColor: 'var(--accordion-bg-color)',
  transition: 'background-color 0.3s',
});

export const accordionAuthorContent = style({
  display: 'flex',
  gap: '15px',
});
