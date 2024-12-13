// styles.css.ts (Vanilla Extract stylesheet)
import { globalStyle } from '@vanilla-extract/css';

import colors from '@/styles/color';
import shadow from '@/styles/shadow';

// Define the base prefix for classes
const selectPrefix = 'rc-cascader';

// Apply styles globally
globalStyle(`.${selectPrefix}-dropdown`, {
  minHeight: 'auto',
  position: 'absolute',
  overflowX: 'scroll',
  '@media': {
    '(max-width: 504px)': {
      maxWidth: '290px',
      width: '100%',
    },
  },
});

// Apply styles globally
globalStyle(`.${selectPrefix}-dropdown-hidden`, {
  display: 'none',
});

globalStyle(`.${selectPrefix}-menus`, {
  display: 'flex',
  flexWrap: 'nowrap',
  boxShadow: shadow.box1,
  overflowX: 'scroll',
});

globalStyle(`.${selectPrefix}-menu`, {
  flex: 'none',
  margin: 0,
  padding: '10px',
  listStyle: 'none',
  borderLeft: `1px solid ${colors.gray6}`,
  height: '180px',
  minWidth: '100px',
  overflow: 'auto',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
});

globalStyle(`.${selectPrefix}-menu:first-child`, {
  borderLeft: '0',
});

globalStyle(`.${selectPrefix}-menu-item`, {
  display: 'flex',
  flexWrap: 'nowrap',
  paddingRight: '20px',
  position: 'relative',
  borderRadius: '4px',
  padding: '4px ',
});

globalStyle(`.${selectPrefix}-menu-item:hover`, {
  background: colors.primary3,
});

globalStyle(`.${selectPrefix}-menu-item-selected`, {
  background: 'rgba(0, 0, 255, 0.05)',
});

globalStyle(`.${selectPrefix}-menu-item-active`, {
  background: colors.primary5,
  display: 'flex',
  justifyContent: 'center',
  gap: '8px',
});

globalStyle(`.${selectPrefix}-menu-item-disabled`, {
  opacity: 0.5,
});

globalStyle(`.${selectPrefix}-menu-item-content`, {
  maxWidth: '120px',
  fontSize: '14px',

  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

globalStyle(`.${selectPrefix}-menu-item-expand`, {
  marginLeft: 'auto',
  display: 'flex',
  justifyContent: 'center',
  gap: '8px',
});

globalStyle(`.${selectPrefix}-menu-item-expand-icon`, {
  marginLeft: 'auto',
});

globalStyle(`.${selectPrefix}-checkbox`, {
  position: 'relative',
  display: 'block',
  flex: 'none',
  width: '20px',
  height: '20px',
  border: '1px solid blue',
});

globalStyle(`.${selectPrefix}-checkbox::after`, {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  content: "''",
});

globalStyle(`.${selectPrefix}-checkbox-checked::after`, {
  content: "'✔️'",
});

globalStyle(`.${selectPrefix}-checkbox-indeterminate::after`, {
  content: "'➖'",
});

// RTL (Right to Left) styles
globalStyle(`.${selectPrefix}-rtl`, {
  direction: 'rtl',
});

globalStyle(`.${selectPrefix}-rtl .${selectPrefix}-menu`, {
  flex: 'none',
  margin: 0,
  padding: 0,
  listStyle: 'none',
  borderLeft: 'none',
  borderRight: '1px solid blue',
});

globalStyle(`.${selectPrefix}-rtl .${selectPrefix}-menu:first-child`, {
  borderRight: '0',
});
