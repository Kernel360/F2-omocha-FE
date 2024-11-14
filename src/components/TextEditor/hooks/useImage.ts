import { useCallback } from 'react';

import { Editor, Transforms } from 'slate';

const IMAGE_URL = /^https?:\/\/.*\.(jpg|jpeg|png|gif|bmp|webp)$/i;

export type ImageElement = {
  type: 'image';
  url: string;
  children: {
    text: string;
  }[];
};

function useImage() {
  const isImageUrl = useCallback((url: string) => {
    if (!url) return false;
    return IMAGE_URL.test(url);
  }, []);

  const insertImage = useCallback((editor: Editor, url: string) => {
    const text = { text: '' };
    const image: ImageElement = { type: 'image', url, children: [text] };

    const { selection } = editor;

    // 선택 영역이 없으면 첫 번째 위치에 삽입
    if (!selection) {
      // 기본 위치 (예: 첫 번째 paragraph)
      const point = { path: [0, 0], offset: 0 };
      Transforms.insertNodes(editor, image, { at: point });

      // 이미지 아래에 빈 단락 추가
      Transforms.insertNodes(
        editor,
        {
          type: 'paragraph',
          children: [{ text: '' }],
        },
        { at: point },
      );
    } else {
      // 선택 영역이 있을 경우 이미지 삽입
      Transforms.insertNodes(editor, image);

      // 이미지 아래에 빈 단락 추가
      Transforms.insertNodes(editor, {
        type: 'paragraph',
        children: [{ text: '' }],
      });
    }
  }, []);

  return { isImageUrl, insertImage };
}

export default useImage;
