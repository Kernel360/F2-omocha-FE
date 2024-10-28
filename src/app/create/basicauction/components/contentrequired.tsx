/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

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

import { AuctionInputs } from '@/app/create/basicauction/types/InputTypes';
import ErrorIcon from '@/assets/svg/error.svg';
import BlockButton from '@/components/TextEditor/BlockButton';
import Elements from '@/components/TextEditor/Elements';
import Leaf from '@/components/TextEditor/Leaf';
import MarkButton from '@/components/TextEditor/MarkButton';
import useEditorShortcuts from '@/components/TextEditor/hooks/useEditorShortcuts';

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
  } = useFormContext<AuctionInputs>();

  const contentRequired = watch('contentRequired');

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
        {contentRequired ? contentRequired.length : 0}/{MAX_CONTENT}
      </div>
      <Slate editor={editor} initialValue={initialValue} onChange={handleChange}>
        <div style={{ display: 'flex', gap: '5px', marginBottom: '5px' }}>
          <MarkButton format="bold" icon="B" />
          <MarkButton format="italic" icon="I" />
          <MarkButton format="underline" icon="U" />
          <MarkButton format="code" icon="CODE" />
          <BlockButton format="heading-one" icon="H1" />
          <BlockButton format="heading-two" icon="H2" />
          <BlockButton format="block-quote" icon="Q" />
          <BlockButton format="numbered-list" icon="Ol" />
          <BlockButton format="bulleted-list" icon="Ul" />
          <BlockButton format="left" icon="LEFT" />
          <BlockButton format="center" icon="CENTER" />
          <BlockButton format="right" icon="RIGHT" />
          <BlockButton format="justify" icon="JUSTIFY" />
        </div>
        <Editable
          style={{ padding: '20px', border: '1px solid gray', height: '400px' }}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          spellCheck
          autoFocus
          onKeyDown={handleKeyDown}
        />
      </Slate>
      {errors.contentRequired && (
        <span className={S.error}>
          <ErrorIcon />
          {errors.contentRequired?.message}
        </span>
      )}
    </label>
  );
}

export default ContentRequired;
