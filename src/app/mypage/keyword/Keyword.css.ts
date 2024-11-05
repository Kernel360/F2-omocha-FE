import colors from '@/styles/color';
import shadow from '@/styles/shadow';
import typography from '@/styles/typo';
import { style, globalStyle } from '@vanilla-extract/css';
import { shouldMergeNodesRemovePrevNode } from 'slate';

export const keyword = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '30px',
});

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
});

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
});

export const input = style({
  flex: '1',
  borderRadius: '4px',
  padding: '12px',
  border: '1.5px solid black',
});

export const inputError = style({
  display: 'flex',
  gap: '4px',
  alignItems: 'center',
  color: 'red',
  fontSize: '14px',
  marginLeft: '10px',
});

export const formButton = style({
  width: '80px',
  backgroundColor: 'black',
  color: 'white',
  borderRadius: '4px',
  cursor: 'pointer',
});

export const disabledButton = style({
  backgroundColor: 'gray',
  cursor: 'not-allowed',
});

export const keywordContainer = style({
  flex: '1',
  flexDirection: 'column',
  listStyle: 'none',
  borderRadius: '4px',
  padding: '15px',
  maxHeight: '400px',
  height: '100%',
  overflow: 'scroll',
  backgroundColor: '#F7F7F8',
});

export const keywordList = style([
  typography.body,
  {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: `1px solid ${colors.gray4}`,
    borderRadius: '4px',
    padding: '10px',
    marginBottom: '15px',
    cursor: 'pointer',
    backgroundColor: 'white',
    ':hover': {
      boxShadow: '0 0 8px rgba(0, 0, 0, 0.3)',
    },
  },
]);

globalStyle(`${keywordList}:nth-last-child(1)`, {
  marginBottom: '0px',
});

export const deleteButton = style({
  cursor: 'pointer',
});
