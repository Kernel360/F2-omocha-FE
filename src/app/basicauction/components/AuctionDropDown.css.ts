import { style } from '@vanilla-extract/css';

import colors from '@/styles/color';
import typography from '@/styles/typo';

const borderColor = `1px solid ${colors.gray6}`;
const dropdownWidth = '130px';
const dropdownSpacing = '8px';

export const dropdownContainer = style({
  display: 'flex',
  justifyContent: 'flex-end',
  position: 'relative',
});

export const dropdown = style({
  ...typography.caption,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '10px',
  width: dropdownWidth,
  padding: dropdownSpacing,
  border: borderColor,
  boxSizing: 'border-box',
  cursor: 'pointer',
});

export const dropdownContent = style({
  position: 'absolute',
  top: '100%',
  display: 'flex',
  flexDirection: 'column',
  border: borderColor,
  boxSizing: 'border-box',
  backgroundColor: 'white',
  zIndex: 10,
});

export const dropdownItem = style({
  ...typography.caption,
  width: `calc(${dropdownWidth} - 2px)`,
  padding: dropdownSpacing,
  boxSizing: 'border-box',
  cursor: 'pointer',

  ':hover': {
    background: colors.gray3,
  },
});

export const selectedDropdownItem = style({
  background: colors.gray3,
});
