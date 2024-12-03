import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { postEmailValidationCode } from '@/apis/queryFunctions/Auth';
import { CheckEmailAuthParams } from '@/apis/types/Auth';
import { Response } from '@/apis/types/common';
import { useToast } from '@/provider/toastProvider';

function useCheckEmailAuthCode(setIsOpenAuthCode: (isOpen: boolean) => void) {
  const { showToast } = useToast();

  const { data, mutate, error } = useMutation({
    mutationFn: (params: CheckEmailAuthParams) => postEmailValidationCode(params),
    onSuccess: responseData => {
      if (responseData.result_data) {
        showToast('success', '이메일 인증이 완료되었습니다.');
        setIsOpenAuthCode(false);
      } else {
        showToast('error', '인증번호가 일치하지 않습니다');
      }
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

  return { data: data!, mutate, error };
}

export default useCheckEmailAuthCode;
