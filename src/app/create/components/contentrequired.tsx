/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useMemo } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { TriangleAlert as TriangleAlertIcon } from 'lucide-react';
import { BaseEditor, createEditor, Descendant, Editor } from 'slate';
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
import ImageTooltip from '@/components/TextEditor/ImageTooltip';
import Leaf from '@/components/TextEditor/Leaf';
import MarkButton from '@/components/TextEditor/MarkButton';
import useEditorShortcuts from '@/components/TextEditor/hooks/useEditorShortcuts';
import useImage, { type ImageElement } from '@/components/TextEditor/hooks/useImage';
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

type WithImagesProps = {
  editor: Editor;
  isImageUrl: (url: string) => boolean;
  insertImage: (editor: Editor, url: string) => void;
};

const MAX_CONTENT = 500;

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

const withImages = ({ editor, isImageUrl, insertImage }: WithImagesProps) => {
  const { isVoid, insertData } = editor;

  editor.isVoid = (element: ImageElement) => {
    return element.type === 'image' ? true : isVoid(element);
  };

  editor.insertData = (data: Editor) => {
    const text = data.getData('text/plain');
    const { files } = data;

    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i += 1) {
        const reader = new FileReader();
        const [mime] = files[i].type.split('/');

        if (mime === 'image') {
          reader.addEventListener('load', () => {
            const url = reader.result;
            insertImage(editor, url as string);
          });

          reader.readAsDataURL(files[i]);
        }
      }
    } else if (isImageUrl(text)) {
      insertImage(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};

function ContentRequired() {
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext<AuctionInputs>();

  const { isImageUrl, insertImage } = useImage();

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
      <span className={S.title}>상품 정보</span>
      <div className={S.count}>
        {contentLength} /{MAX_CONTENT}
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
                <ImageTooltip />
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
