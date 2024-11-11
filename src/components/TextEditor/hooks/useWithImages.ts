/* eslint-disable no-param-reassign */
import { Editor } from 'slate';

import { type ImageElement } from '@/components/TextEditor/hooks/useImage';
import { useToast } from '@/provider/toastProvider';

interface WithImagesProps {
  editor: Editor;
  isImageUrl: (url: string) => boolean;
  insertImage: (editor: Editor, url: string) => void;
}

const MAX_SIZE = 1024 * 1024;
const IMAGE_REGEX = /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i;

function useWithImages() {
  const { showToast } = useToast();

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
          if (files[i].size >= MAX_SIZE) {
            showToast('error', '이미지 파일 크기는 1MB 이하만 업로드 가능합니다.');
            return;
          }

          if (!IMAGE_REGEX.test(files[i].name)) {
            showToast('error', '이미지 파일만 업로드 가능합니다.');
            return;
          }

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

  return {
    withImages,
  };
}

export default useWithImages;
