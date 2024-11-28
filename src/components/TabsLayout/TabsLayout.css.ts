import { style } from '@vanilla-extract/css';

import colors from '@/styles/color';

export const tabsRoot = style({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  gap: '10px',
  marginBottom: '20px',
});

export const tabsList = style({
  display: 'flex',
});

export const tabsTrigger = style({
  padding: '10px 20px',
  width: '100%',
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  borderBottom: `2px solid ${colors.gray5}`,
  borderRadius: '8px 8px 0 0',
  selectors: {
    '&[data-state="active"]': {
      color: colors.primary11,
      backgroundColor: colors.primary3,
      borderBottom: `2px solid ${colors.primary9}`,
    },
  },
});

export const tabsContent = style({});
