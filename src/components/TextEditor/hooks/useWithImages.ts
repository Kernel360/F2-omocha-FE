/* eslint-disable no-param-reassign */

import { Editor } from 'slate';

import createFetchApiClient from '@/apis/queryFunctions/createFetchApiClient';
import { Response } from '@/apis/types/common';
import { type ImageElement } from '@/components/TextEditor/hooks/useImage';
import { useToast } from '@/provider/toastProvider';

interface ImageResponseData {
  image_path: string;
}

const uploadImage = async (image: File | Blob) => {
  const imageForm = new FormData();

  imageForm.append('image', image);

  const response = await createFetchApiClient<Response<ImageResponseData>>(`/v2/images`, {
    method: 'POST',
    body: imageForm,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  // const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/v2/images`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'multipart/form-data',
  //   },
  //   body: imageForm,
  // }).then(res => res.json());

  return response;
};

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
              console.log(files[i]);
              const imageTest = uploadImage(files[i]);
              // TODO
              console.log(imageTest);
              // 여기서 s3 upload api 호출
              // return response를 url로
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
