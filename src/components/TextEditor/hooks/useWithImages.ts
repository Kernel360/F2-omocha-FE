/* eslint-disable no-param-reassign */
import { Editor } from 'slate';

import useUploadImages from '@/apis/queryHooks/images/useUploadImages';
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
  const { mutate: uploadImage } = useUploadImages();

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

          // const reader = new FileReader();

          console.log('files[i]', files[i]); // 이 값을 post 를 보내서 서버에 저장하고 s3링크를 가져와서 에디터에 넣어주면 됨

          const file = files[0]; // 첫 번째 파일
          const formData = new FormData();
          formData.append('image', file); // FormData에 파일 추가

          uploadImage(formData, {
            onSuccess: imageUrl => {
              console.log('imageUrl', imageUrl);
              insertImage(editor, imageUrl.result_data.image_path);
              showToast('success', '이미지가 성공적으로 업로드되었습니다.');
            },
            onError: () => {
              showToast('error', '이미지 업로드에 실패했습니다.');
            },
          }); // 여기서 post를 보내는데 이 링크가 s3 링크임
          // mutate(fileData, {
          //   context: {
          //     onSuccess: imageUrl => {
          //       // 에디터에 이미지 URL 삽입
          //       insertImageToEditor(imageUrl);
          //     },
          //   },
          // });

          // const [mime] = files[i].type.split('/');

          // if (mime === 'image') {
          //   reader.addEventListener('load', () => {
          //     console.log('reader', reader);
          //     console.log('reader.result', reader.result);
          //     const url = reader.result;
          //     console.log('url', url);
          //     insertImage(editor, url as string); // 여기서 넣는데 이 링크가 s3 링크임
          //   });

          //   reader.readAsDataURL(files[i]);
          // }
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
