import * as S from '../app/basicauction/[id]/BasicAuctionInfoContent.css';

type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
  children?: SlateNode[];
};

export interface SlateNode {
  type: string;
  children: CustomText[] | SlateNode[]; // CustomText 배열로 자식 요소를 관리
  align?: 'left' | 'center' | 'right' | 'justify';
}

// alignment에 따른 스타일을 반환하는 함수
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

// CustomText 배열을 HTML로 변환하는 함수
const renderChildren = (children: CustomText[]): string => {
  return (
    children
      .map(child => {
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
          text = `<code class="${S.codeStyle}">${text}</code>`;
        }
        return text;
      })
      .join('') || ''
  ); // 자식이 없을 경우 빈 문자열 반환
};

const renderListItems = (children: SlateNode[]): string =>
  children
    .map(childNode => {
      if (childNode.type === 'list-item') {
        // 'list-item' 타입일 경우, 자식의 'CustomText[]'을 처리
        return `<li>${renderChildren(childNode.children as CustomText[])}</li>`;
      }
      return ''; // 그 외에는 빈 문자열을 반환
    })
    .join('');

// SlateNode 배열을 HTML로 변환하는 최상위 함수
export function convertSlateToHTML(slateValue: SlateNode[]): string {
  return slateValue
    .map(node => {
      const alignmentStyle = getAlignmentStyle(node.align || 'left'); // 기본 정렬

      switch (node.type) {
        case 'paragraph':
          return `<p style="${alignmentStyle}">${renderChildren(node.children as CustomText[])}</p>`;
        case 'heading-one':
          return `<h1>${renderChildren(node.children as CustomText[])}</h1>`;
        case 'heading-two':
          return `<h2>${renderChildren(node.children as CustomText[])}</h2>`;
        case 'block-quote':
          return `<blockquote class="${S.blackquoteStyle}">${renderChildren(node.children as CustomText[])}</blockquote>`;
        case 'numbered-list':
          return `<ol class="${S.olStyle}">${renderListItems(node.children as SlateNode[])}</ol>`; // 'list-item' 처리
        case 'bulleted-list':
          return `<ul class="${S.ulStyle}">${renderListItems(node.children as SlateNode[])}</ul>`; // 'list-item' 처리
        default:
          return '';
      }
    })
    .join('');
}
