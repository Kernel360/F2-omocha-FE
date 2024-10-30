import { style } from '@vanilla-extract/css';

import typography from '@/styles/typo';

export const postQnATextAreaTitle = style({
  padding: '5px',
  width: '90%',
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

export const NoQNA = style([
  typography.bodyLarge,
  {
    padding: '20px',

    color: 'rgb(160, 160, 160)',
  },
]);
