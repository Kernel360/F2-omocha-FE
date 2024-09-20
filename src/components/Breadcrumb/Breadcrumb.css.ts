import { style } from '@vanilla-extract/css';

export const breadcrumb = style({
  display: 'flex',
  alignItems: 'center',
});

export const link = style({
  textDecoration: 'none',
});

export const breadcrumbItem = style({
  color: 'rgba(200, 200, 200, 1)',
  padding: '4px 8px',
  borderRadius: '4px',
});

export const breadcrumbItemLink = style({
  color: 'rgba(200, 200, 200, 1)',
  padding: '4px 8px',
  borderRadius: '4px',
  ':hover': {
    color: 'rgba(0, 0, 0, 1)',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
});

export const lastBreadcrumbItem = style({
  color: 'rgba(0, 0, 0, 1)',
  fontWeight: 'bold',
});

export const separator = style({
  margin: '0 4px',
});
