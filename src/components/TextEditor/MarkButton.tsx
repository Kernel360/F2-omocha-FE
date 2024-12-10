import { ReactElement } from 'react';

import { useSlate } from 'slate-react';

import useCustomEditor from '@/components/TextEditor/hooks/useCustomEditor';

import * as S from './TextEditor.css';

interface MarkButtonProps {
  format: string;
  icon: ReactElement;
}

// 마크 단위 버튼
function MarkButton({ format, icon }: MarkButtonProps) {
  const editor = useSlate();
  const { isMarkActive, toggleMark } = useCustomEditor();
  const isActive = isMarkActive(editor, format);
  return (
    <button
      type="button"
      onMouseDown={event => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
      data-active={isActive}
      className={S.iconButton}
    >
      {icon}
    </button>
  );
}

export default MarkButton;
