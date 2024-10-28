import { RenderLeafProps } from 'slate-react';

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
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
}

export default Leaf;
