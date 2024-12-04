import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { postEmailAuth } from '@/apis/queryFunctions/Auth';
import { Response } from '@/apis/types/common';
import { useToast } from '@/provider/toastProvider';

function usePostEmailAuth(setIsOpenAuthCode: (isOpen: boolean) => void) {
  const { showToast } = useToast();

  const { mutate, error } = useMutation({
    mutationFn: (email: string) => postEmailAuth({ email }),
    onSuccess: () => {
      setIsOpenAuthCode(true);
      showToast('success', '인증번호가 발송되었습니다.');
    },
    onError: (e: AxiosError<Response<string>>) => {
      if (e.response) {
        showToast('error', `${e.response.data.result_msg}`);
      } else {
        // 네트워크 에러나 기타 처리되지 않은 에러 처리
        showToast('error', '알 수 없는 오류가 발생했습니다. 새로고침을 진행해 주세요.');
      }
    },
  });

  return { mutate, error };
}

export default usePostEmailAuth;
