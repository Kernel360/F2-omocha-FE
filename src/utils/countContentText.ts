type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
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
    node.children.forEach(child => {
      totalCount += child.text.length;
    });
  }

  data.forEach(node => {
    countCharacters(node);
  });

  return totalCount;
}

export default countContentText;
