/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import { TriangleAlert as TriangleAlertIcon } from 'lucide-react';
import { BaseEditor, createEditor, Descendant } from 'slate';
import { HistoryEditor, withHistory } from 'slate-history';
import {
  Editable,
  withReact,
  Slate,
  RenderElementProps,
  RenderLeafProps,
  ReactEditor,
} from 'slate-react';

import { AuctionInputs } from '@/app/create/types/InputTypes';
import BlockButton from '@/components/TextEditor/BlockButton';
import Elements from '@/components/TextEditor/Elements';
import Leaf from '@/components/TextEditor/Leaf';
import MarkButton from '@/components/TextEditor/MarkButton';
import useEditorShortcuts from '@/components/TextEditor/hooks/useEditorShortcuts';
import { TEXT_EDITOR_BLOCK_ICON, TEXT_EDITOR_MARK_ICON } from '@/static/icon';
import countContentText from '@/utils/countContentText';

import * as S from '../Basicauction.css';

type CustomText = { text: string };
type CustomElement = { type: string; children: CustomText[] };

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
  }
}

const MAX_CONTENT = 500;

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

function ContentRequired() {
  const {
    watch,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
  } = useFormContext<AuctionInputs>();

  const contentRequiredValue = watch('contentRequired');
  const contentRequired = contentRequiredValue || '0';

  const contentLength = countContentText(JSON.parse(contentRequired));
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  useEffect(() => {
    if (contentLength === 0) {
      setError('contentRequired', {
        type: 'required',
        message: '상품 정보를 입력해 주세요.',
      });
    } else if (contentLength > 0 && contentLength < 10) {
      setError('contentRequired', {
        type: 'manual',
        message: '내용은 최소 10자 이상이어야 합니다.',
      });
    } else if (contentLength > MAX_CONTENT) {
      setError('contentRequired', {
        type: 'manual',
        message: `내용은 ${MAX_CONTENT}자 이하여야 합니다.`,
      });
    } else {
      clearErrors('contentRequired'); // 에러를 제거
    }
  }, [contentLength]);

  const handleChange = (value: Descendant[]) => {
    setValue('contentRequired', JSON.stringify(value));
  };

  const renderElement = useCallback((props: RenderElementProps) => <Elements {...props} />, []);
  const renderLeaf = useCallback((props: RenderLeafProps) => <Leaf {...props} />, []);
  const handleKeyDown = useEditorShortcuts(editor);

  return (
    <label htmlFor="info" className={S.auctionLabel}>
      <span className={S.title}>상품 정보</span>
      <div className={S.count}>
        {contentLength} /{MAX_CONTENT}
      </div>
      <div className={S.content}>
        <Slate editor={editor} initialValue={initialValue} onChange={handleChange}>
          <section className={S.editorSection}>
            {TEXT_EDITOR_MARK_ICON.map(mark => (
              <MarkButton key={mark.id} format={mark.format} icon={mark.icon} />
            ))}
            {TEXT_EDITOR_BLOCK_ICON.map(block => (
              <BlockButton key={block.id} format={block.format} icon={block.icon} />
            ))}
          </section>
          <Editable
            className={S.editorContent}
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            spellCheck
            autoFocus={false}
            onKeyDown={handleKeyDown}
          />
        </Slate>
      </div>
      {errors.contentRequired && (
        <span className={S.error}>
          <TriangleAlertIcon width={17} height={17} />
          {errors.contentRequired?.message}
        </span>
      )}
    </label>
  );
}

export default React.memo(ContentRequired);
