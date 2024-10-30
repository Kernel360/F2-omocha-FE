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

const getAlignmentStyle = (alignment: string) => {
  switch (alignment) {
    case 'left':
      return 'text-align: left;';
    case 'center':
      return 'text-align: center;';
    case 'right':
      return 'text-align: right;';
    case 'justify':
      return 'text-align: justify;';
    default:
      return 'text-align: left;';
  }
};

const renderChildren = (children: CustomText[]) => {
  return (
    children!
      .map((child: CustomText) => {
        let text = child.text || ''; // 텍스트가 없을 경우 빈 문자열
        if (child.bold) {
          text = `<strong>${text}</strong>`;
        }
        if (child.italic) {
          text = `<em>${text}</em>`;
        }
        if (child.underline) {
          text = `<u>${text}</u>`;
        }
        if (child.code) {
          text = `<code>${text}</code>`;
        }
        return text;
      })
      .join('') || ''
  ); // 자식이 없을 경우 빈 문자열 반환
};

export function convertSlateToHTML(slateValue: SlateNode[]): string {
  return slateValue
    .map(node => {
      // node의 필수 속성 검증
      if (!node.type || !Array.isArray(node.children)) {
        return '';
      }

      const alignmentStyle = getAlignmentStyle(node.align || 'left'); // 기본 정렬

      switch (node.type) {
        case 'paragraph':
          return `<p style="${alignmentStyle}">${renderChildren(node.children)}</p>`;
        case 'heading-one':
          return `<h1>${renderChildren(node.children)}</h1>`;
        case 'heading-two':
          return `<h2>${renderChildren(node.children)}</h2>`;
        case 'block-quote':
          return `<blockquote>${renderChildren(node.children)}</blockquote>`;
        case 'numbered-list':
          return `<ol>${renderChildren(node.children)}</ol>`;
        case 'bulleted-list':
          return `<ul>${renderChildren(node.children)}</ul>`;
        case 'list-item':
          return `<li>${renderChildren(node.children)}</li>`;
        default:
          return '';
      }
    })
    .join('');
}
