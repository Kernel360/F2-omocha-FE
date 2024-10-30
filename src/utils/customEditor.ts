import { Editor, Transforms, Element as SlateElement } from 'slate';

interface CustomElement extends SlateElement {
  type: string;
  align?: string;
}

const LIST_TYPES = ['numbered-list', 'bulleted-list'];
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'];

// 참고 - https://github.com/ianstormtaylor/slate/blob/main/site/examples/ts/richtext.tsx
// https://docs.slatejs.org/api/transforms
function customEditor() {
  // 활성화된 마크 확인
  const isMarkActive = (editor: Editor, format: string) => {
    const marks = Editor.marks(editor) as Record<string, unknown> | null;
    return marks ? marks[format] === true : false;
  };

  // 마크 토글
  const toggleMark = (editor: Editor, format: string) => {
    const isActive = isMarkActive(editor, format);

    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  };

  // 활성화된 블록 확인
  const isBlockActive = (editor: Editor, format: string, blockType = 'type') => {
    const { selection } = editor;
    if (!selection) return false;

    const [match] = Array.from(
      Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: n => {
          const element = n as SlateElement & Record<string, unknown>;
          return !Editor.isEditor(n) && SlateElement.isElement(n) && element[blockType] === format;
        },
      }),
    );

    return !!match;
  };

  // 블록 토글
  const toggleBlock = (editor: Editor, format: string) => {
    const isActive = isBlockActive(
      editor,
      format,
      TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type',
    );
    const isList = LIST_TYPES.includes(format);

    Transforms.unwrapNodes(editor, {
      match: n =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        LIST_TYPES.includes((n as CustomElement).type!) &&
        !TEXT_ALIGN_TYPES.includes(format),
      split: true,
    });

    const newProperties: Partial<CustomElement> = {}; // 새로 만들 블록

    if (TEXT_ALIGN_TYPES.includes(format)) {
      newProperties.align = isActive ? undefined : format;
    } else if (isList) {
      newProperties.type = isActive ? 'paragraph' : 'list-item';
    } else {
      newProperties.type = isActive ? 'paragraph' : format;
    }

    Transforms.setNodes<CustomElement>(editor, newProperties);

    // 리스트 활성화 여부 확인
    if (!isActive && isList) {
      const block = { type: format, children: [] }; // 새 리스트 블록 생성
      Transforms.wrapNodes(editor, block); // 선택된 노드를 새 리스트 블록으로 감싸기
    }
  };

  return { isMarkActive, toggleMark, isBlockActive, toggleBlock };
}

export default customEditor;
