import { style } from '@vanilla-extract/css';

export const tableWrapper = style({
  width: '100%',
  // maxWidth: '600px',
  margin: '0 auto',
  // border: '1px solid #ddd',
  // borderRadius: '8px',
  overflow: 'hidden',
  // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

export const table = style({
  width: '100%',
  borderCollapse: 'collapse',
  tableLayout: 'fixed',
  textAlign: 'left',
  backgroundColor: '#fff',
});

export const th = style({
  padding: '12px',
  backgroundColor: '#f4f4f4',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  fontSize: '14px',
  borderBottom: '1px solid #ddd',
  whiteSpace: 'nowrap',
});

export const td = style({
  padding: '12px',
  borderBottom: '1px solid #ddd',
  fontSize: '14px',
  whiteSpace: 'nowrap',
  overflow: 'scroll',
});

export const scrollableTable = style({
  display: 'block',
  maxHeight: '300px',
  overflowY: 'auto',
});

export const noDataMessage = style({
  padding: '16px',
  textAlign: 'center',
  fontSize: '16px',
  color: '#999',
});
