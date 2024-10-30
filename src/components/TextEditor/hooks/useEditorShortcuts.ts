import { useCallback } from 'react';

import { Editor } from 'slate';

import customEditor from '@/utils/customEditor';

// 에디터 단축키
function useEditorShortcuts(editor: Editor) {
  const { toggleMark } = customEditor();
  return useCallback(
    (event: React.KeyboardEvent) => {
      if (!event.ctrlKey && !event.metaKey) {
        // 윈도우 + 맥
        return;
      }

      switch (event.key) {
        case 'b': {
          event.preventDefault();
          toggleMark(editor, 'bold');
          break;
        }
        case 'i': {
          event.preventDefault();
          toggleMark(editor, 'italic');
          break;
        }
        case 'u': {
          event.preventDefault();
          toggleMark(editor, 'underline');
          break;
        }
        case 'e': {
          event.preventDefault();
          toggleMark(editor, 'code');
          break;
        }
        default:
          break;
      }
    },
    [editor],
  );
}

export default useEditorShortcuts;
