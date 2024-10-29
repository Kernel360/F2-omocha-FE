import { ReactElement } from 'react';

import { useSlate } from 'slate-react';

import customEditor from '@/utils/customEditor';

interface MarkButtonProps {
  format: string;
  icon: ReactElement;
}

// 마크 단위 버튼
function MarkButton({ format, icon }: MarkButtonProps) {
  const editor = useSlate();
  const { isMarkActive, toggleMark } = customEditor();
  const isActive = isMarkActive(editor, format);
  return (
    <button
      type="button"
      onMouseDown={event => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
      style={{
        cursor: 'pointer',
        backgroundColor: isActive ? 'lightblue' : 'transparent', // 활성 상태에 따른 배경색
        color: isActive ? 'black' : '#ccc', // 활성 상태에 따른 텍스트 색상
        border: '1px solid black', // 테두리 스타일
        padding: '8px', // 버튼 내부 여백
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {icon}
    </button>
  );
}

export default MarkButton;
