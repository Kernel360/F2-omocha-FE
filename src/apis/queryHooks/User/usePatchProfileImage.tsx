import { patchProfileImage } from '@/apis/queryFunctions/User';
import { Response } from '@/apis/types/common';
import { useToast } from '@/provider/toastProvider';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

function usePatchProfileImage() {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { mutate, error } = useMutation({
    mutationFn: (param: FormData) => patchProfileImage(param),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
      showToast('success', '프로필 변경에 성공했습니다.');
    },
    onError: (e: AxiosError<Response<string>>) => {
      if (e.response) {
        showToast('error', `${e.response.data.result_msg}`);
      } else {
        showToast('error', '알 수 없는 오류가 발생했습니다. 새로고침을 진행해 주세요.');
      }
    },
  });

  return { mutate, error };
}

export default usePatchProfileImage;
