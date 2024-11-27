import { style } from '@vanilla-extract/css';

export const breadcrumb = style({
  display: 'flex',
  alignItems: 'center',
});

export const breadcrumbItem = style({
  color: 'rgba(200, 200, 200, 1)',
  padding: '4px 8px',
  borderRadius: '4px',
  '@media': {
    'screen and (max-width: 700px)': {
      padding: '4px 4px',
      fontSize: '14px',
    },
  },
});

export const breadcrumbItemLink = style({
  color: 'rgba(200, 200, 200, 1)',
  padding: '4px 8px',
  borderRadius: '4px',

  ':active': {
    color: 'rgba(0, 0, 0, 1)',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },

  '@media': {
    '(hover: hover) and (pointer: fine)': {
      ':hover': {
        color: 'rgba(0, 0, 0, 1)',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
      },
    },
    'screen and (max-width: 700px)': {
      padding: '4px 4px',
      fontSize: '14px',
    },
  },
});

export const lastBreadcrumbItem = style({
  color: 'rgba(0, 0, 0, 1)',
  fontWeight: 'bold',
  '@media': {
    'screen and (max-width: 700px)': {
      fontSize: '14px',
    },
  },
});

export const separator = style({
  margin: '0 4px',
});
