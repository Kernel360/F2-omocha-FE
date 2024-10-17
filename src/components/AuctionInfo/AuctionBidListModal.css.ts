import { style } from '@vanilla-extract/css';

export const tableWrapper = style({
  width: '100%',
  margin: '0 auto',
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

export const scrollableBody = style({
  maxHeight: '300px',
  overflowY: 'auto',
  width: 'auto',
});

export const noDataMessage = style({
  padding: '16px',
  textAlign: 'center',
  fontSize: '16px',
  color: '#999',
});

export const needLoginSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  alignItems: 'center',
});

export const noUserMessage = style({
  padding: '16px',
  textAlign: 'center',
  fontSize: '16px',
  color: '#999',
});

export const loginButton = style({
  border: 'none',
  color: 'white',
  borderRadius: '4px',
  maxWidth: '100px',
  width: '100%',
  padding: '10px 5px',
  cursor: 'pointer',
  backgroundColor: 'black',
});

export const noBidDataContent = style({
  padding: '12px',
  borderBottom: '1px solid #ddd',
  fontSize: '14px',
  whiteSpace: 'nowrap',
  overflow: 'scroll',
  textAlign: 'center',
});
