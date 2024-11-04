/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useMemo } from 'react';
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

import BlockButton from '@/components/TextEditor/BlockButton';
import Elements from '@/components/TextEditor/Elements';
import Leaf from '@/components/TextEditor/Leaf';
import MarkButton from '@/components/TextEditor/MarkButton';
import useEditorShortcuts from '@/components/TextEditor/hooks/useEditorShortcuts';
import { TEXT_EDITOR_BLOCK_ICON, TEXT_EDITOR_MARK_ICON } from '@/static/icon';
import countContentText from '@/utils/countContentText';

import * as S from '../Basicauction.css';

import { AuctionInputs } from '@/app/create/basicauction/types/InputTypes';

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
  } = useFormContext<AuctionInputs>();

  const contentRequired = watch('contentRequired') ? watch('contentRequired') : '0';
  const contentLength = countContentText(JSON.parse(contentRequired));

  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

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
            autoFocus
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

export default ContentRequired;
