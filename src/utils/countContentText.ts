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

function countContentText(data: SlateNode[]) {
  let totalCount = 0;

  if (!Array.isArray(data)) {
    return 0;
  }

  function countCharacters(node: SlateNode) {
    if (node.type === 'numbered-list' || node.type === 'bulleted-list') {
      node.children.forEach(child => {
        if (child.children && Array.isArray(child.children)) {
          totalCount += child.children[0].text.length;
        }
      });
    } else {
      node.children.forEach(child => {
        totalCount += child.text.length;
      });
    }
  }

  data.forEach(node => {
    countCharacters(node);
  });

  return totalCount;
}

export default countContentText;
