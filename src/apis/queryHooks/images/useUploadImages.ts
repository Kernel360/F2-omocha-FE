import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { uploadImage } from '@/apis/queryFunctions/image';
import { Response } from '@/apis/types/common';
import { UploadImageResponseData } from '@/apis/types/images';
import { useToast } from '@/provider/toastProvider';

function useUploadImages() {
  const { showToast } = useToast();

  const { mutate, error } = useMutation({
    mutationFn: (data: FormData) => uploadImage(data),
    onSuccess: response => {
      const imageUrl = response.result_data.image_path;
      showToast('success', '사진이 첨부되었습니다.');
      return imageUrl;
    },
    onError: (e: AxiosError<Response<UploadImageResponseData>>) => {
      if (e.response) {
        showToast('error', `${e.response.data.result_msg}`);
      } else {
        showToast('error', '알 수 없는 오류가 발생했습니다. 새로고침을 진행해 주세요.');
      }
    },
  });

  return { mutate, error };
}

export default useUploadImages;
