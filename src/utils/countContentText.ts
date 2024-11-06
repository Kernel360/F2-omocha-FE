import { Descendant, Element, Text } from 'slate';

type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
  children?: {
    text: string;
  };
};

export interface SlateNode {
  type: string;
  children: CustomText[];
  align?: 'left' | 'center' | 'right' | 'justify';
}

function countContentText(data: Descendant[]) {
  let totalCount = 0;

  if (!Array.isArray(data)) {
    return 0;
  }

  function countCharacters(node: Descendant) {
    if (Text.isText(node)) {
      totalCount += node.text.length;
    } else if (Element.isElement(node)) {
      node.children.forEach(child => {
        countCharacters(child);
      });
    }
  }

  data.forEach(node => {
    countCharacters(node);
  });

  return totalCount;
}

export default countContentText;
