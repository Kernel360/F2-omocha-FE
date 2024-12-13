import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patchProfileImage } from '@/apis/queryFunctions/User';
import { FetchError } from '@/apis/types/common';
import { useToast } from '@/provider/toastProvider';
import getAuthTokens from '@/utils/getAuthTokens';

function usePatchProfileImage() {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const tokens = getAuthTokens();

  const { mutate, error } = useMutation({
    mutationFn: (param: FormData) => patchProfileImage(param, tokens),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
      showToast('success', '프로필 변경에 성공했습니다.');
    },
    onError: (e: FetchError) => {
      if (e) {
        showToast('error', `${e.resultMsg}`);
      } else {
        showToast('error', '알 수 없는 오류가 발생했습니다. 새로고침을 진행해 주세요.');
      }
    },
  });

  return { mutate, error };
}

export default usePatchProfileImage;
