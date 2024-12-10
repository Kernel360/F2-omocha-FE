import { ReactElement } from 'react';

import { useSlate } from 'slate-react';

import useCustomEditor from '@/components/TextEditor/hooks/useCustomEditor';

import * as S from './TextEditor.css';

interface BlockButtonProps {
  format: string;
  icon: ReactElement;
}

// 참고 -  https://github.com/ianstormtaylor/slate/blob/main/site/examples/ts/richtext.tsx

const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'];

// 블록 단위 버튼
function BlockButton({ format, icon }: BlockButtonProps) {
  const editor = useSlate();
  const { isBlockActive, toggleBlock } = useCustomEditor();

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
      data-active={isActive}
      className={S.iconButton}
    >
      {icon}
    </button>
  );
}

export default BlockButton;
