import { useSlate } from 'slate-react';

import customEditor from '@/utils/customEditor';

interface BlockButtonProps {
  format: string;
  icon: string;
}

// 참고 -  https://github.com/ianstormtaylor/slate/blob/main/site/examples/ts/richtext.tsx

const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'];

// 블록 단위 버튼
function BlockButton({ format, icon }: BlockButtonProps) {
  const editor = useSlate();
  const { isBlockActive, toggleBlock } = customEditor();

  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type',
  );

  return (
    <button
      type="button"
      onMouseDown={event => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
      style={{
        cursor: 'pointer',
        backgroundColor: isActive ? 'lightblue' : 'transparent', // 활성 상태에 따른 배경색 변경
        color: isActive ? 'black' : '#ccc', // 활성 상태에 따른 텍스트 색상 변경
        border: '1px solid black',
        padding: '8px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {icon}
    </button>
  );
}

export default BlockButton;
