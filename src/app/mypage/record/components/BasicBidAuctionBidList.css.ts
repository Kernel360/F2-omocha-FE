import { style, styleVariants } from '@vanilla-extract/css';

export const container = style({
  width: '100%',
  overflowX: 'auto',
  padding: '0px 10px',
  boxSizing: 'border-box',
});

export const table = style({
  width: '100%',
  borderCollapse: 'collapse',
});

export const tableHeader = style({
  backgroundColor: '#f5f5f5',
});

export const tableHeaderCell = style({
  fontSize: '14px',
  textAlign: 'left',
  padding: '8px',
  fontWeight: 'bold',
  borderBottom: '2px solid #ddd',
});

export const tableBody = style({
  backgroundColor: '#fff',
});

export const tableRow = styleVariants({
  even: {
    backgroundColor: '#f9f9f9',
  },
  odd: {
    backgroundColor: 'transparent',
  },
});

export const tableCell = style({
  padding: '8px',
  fontSize: '12px',
  borderBottom: '1px solid #ddd',
});

export const bidUnitWarning = style({
  color: '#f00',
  textAlign: 'center',
  marginTop: '16px',
});
