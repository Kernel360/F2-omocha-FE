import colors from '@/styles/color';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  boxSizing: 'border-box',
  padding: '20px',
  borderTop: `4px solid ${colors.gray10}`,
  gap: '10px',
});
