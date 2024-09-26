import { style } from '@vanilla-extract/css';

export const responsiveLayoutWrapper = style({
  padding: '32px 0',
  position: 'relative',
  display: 'grid',
  gridRowGap: '2vw',
  gap: '24px',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  width: '100%',
  maxWidth: '1200px',
  justifyItems: 'center',
  height: 'auto',
});

export const layout = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: '1400px',
  margin: '0 auto',
});
