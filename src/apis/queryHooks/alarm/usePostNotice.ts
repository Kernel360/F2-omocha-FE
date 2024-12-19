import { useMutation } from '@tanstack/react-query';

import { postNotice } from '@/apis/queryFunctions/alarm';
import { FetchError } from '@/apis/types/common';
import { useToast } from '@/provider/toastProvider';
import getAuthTokens from '@/utils/getAuthTokens';

function usePostNotice() {
  const tokens = getAuthTokens();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: (id: number) => postNotice(id, tokens),
    onSuccess: () => {
      showToast('success', '알림이 읽음 처리되었습니다. 알림 목록에서 삭제됩니다.');
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

export default usePostNotice;
