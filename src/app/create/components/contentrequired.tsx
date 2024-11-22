/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useMemo } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

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
import useImage from '@/components/TextEditor/hooks/useImage';
import useWithImages from '@/components/TextEditor/hooks/useWithImages';
import { TEXT_EDITOR_BLOCK_ICON, TEXT_EDITOR_MARK_ICON } from '@/static/textEditorIcon';
import countContentText from '@/utils/countContentText';

import * as S from '../Basicauction.css';

type CustomText = { text: string };
type CustomElement = { type: string; children: CustomText[] };

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor &
      ReactEditor &
      HistoryEditor & { isVoid: (element: CustomElement) => boolean };
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
    control,
    formState: { errors },
    setValue,
  } = useFormContext<AuctionInputs>();

  const { isImageUrl, insertImage } = useImage();
  const { withImages } = useWithImages();

  const contentRequiredValue = useWatch({ name: 'contentRequired', control });
  const contentRequired = contentRequiredValue || '0';

  const contentLength = countContentText(JSON.parse(contentRequired));

  const editor = useMemo(() => {
    const editorInstance = withHistory(withReact(createEditor()));
    return withImages({
      editor: editorInstance,
      isImageUrl,
      insertImage,
    });
  }, [insertImage, isImageUrl]);

  const handleChange = (value: Descendant[]) => {
    setValue('contentRequired', JSON.stringify(value));
  };

  const renderElement = useCallback((props: RenderElementProps) => <Elements {...props} />, []);
  const renderLeaf = useCallback((props: RenderLeafProps) => <Leaf {...props} />, []);
  const handleKeyDown = useEditorShortcuts(editor);

  return (
    <label htmlFor="info" className={S.auctionLabel}>
      <h2 className={S.title}>상품 설명</h2>
      <div className={S.flexWrapper}>
        <div className={S.description}>
          상품의 다양한 사진 및 설명을 입력해주세요.
          <br />
          사진은 드래그하여 넣을 수 있습니다.
        </div>
        <div className={S.count}>
          {contentLength} /{MAX_CONTENT}
        </div>
      </div>
      <div className={S.content}>
        <Controller
          name="contentRequired"
          control={control}
          rules={{
            validate: () => {
              if (contentLength === 0) {
                return '상품 정보를 입력해 주세요.';
              }
              if (contentLength < 10) {
                return '내용은 최소 10자 이상이어야 합니다.';
              }
              if (contentLength > MAX_CONTENT) {
                return `내용은 ${MAX_CONTENT}자 이하여야 합니다.`;
              }
              return true;
            },
          }}
          render={({ field }) => (
            <Slate
              editor={editor}
              initialValue={initialValue}
              onChange={value => {
                field.onChange(value);
                handleChange(value);
              }}
            >
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
                onKeyDown={handleKeyDown}
              />
            </Slate>
          )}
        />
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
