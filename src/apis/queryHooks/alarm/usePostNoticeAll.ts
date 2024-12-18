import { useMutation } from '@tanstack/react-query';

import { postNoticeAll } from '@/apis/queryFunctions/alarm';
import { FetchError } from '@/apis/types/common';
import { useToast } from '@/provider/toastProvider';
import getAuthTokens from '@/utils/getAuthTokens';

function usePostNoticeAll() {
  const tokens = getAuthTokens();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: (param: number[]) => postNoticeAll(param, tokens),
    onSuccess: () => {
      showToast('success', '모든 알림이 삭제되었습니다.');
    },
    onError: (e: FetchError) => {
      if (e) {
        showToast('error', `${e.resultMsg}`);
      } else {
        showToast('error', '알 수 없는 오류가 발생했습니다. 새로고침을 진행해 주세요.');
      }
    },
  });
}

export default usePostNoticeAll;
