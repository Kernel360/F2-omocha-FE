/* eslint-disable react/jsx-props-no-spreading */
import { RenderLeafProps } from 'slate-react';

import * as S from './TextEditor.css';

type CustomText = {
  text: string;
  bold?: true;
  italic?: true;
  underline?: true;
  code?: true;
};

declare module 'slate' {
  interface CustomTypes {
    Text: CustomText;
  }
}

// 텍스트별 마크 스타일
function Leaf({ attributes, children, leaf }: RenderLeafProps) {
  let styledChildren = children;

  if (leaf.bold) {
    styledChildren = <strong>{styledChildren}</strong>;
  }

  if (leaf.code) {
    styledChildren = <code className={S.codeStyle}>{styledChildren}</code>;
  }

  if (leaf.italic) {
    styledChildren = <em>{styledChildren}</em>;
  }

  if (leaf.underline) {
    styledChildren = <u>{styledChildren}</u>;
  }

  return <span {...attributes}>{styledChildren}</span>;
}

export default Leaf;
