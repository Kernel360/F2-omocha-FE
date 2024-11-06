import { Descendant, Element, Text } from 'slate';

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
