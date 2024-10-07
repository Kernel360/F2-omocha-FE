import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { postRegister } from '@/apis/queryFunctions/Auth';
import { ErrorResponse, RegisterParams } from '@/apis/types/Auth';

function usePostRegister() {
  const { mutate, error } = useMutation({
    mutationFn: (param: RegisterParams) => postRegister(param),
    onSuccess: () => {
      alert('회원가입을 성공했습니다.🎉');
    },
    onError: (e: AxiosError<ErrorResponse>) => {
      if (e.response) {
        alert(`${e.response.data.result_msg}`);
      } else {
        // 네트워크 에러나 기타 처리되지 않은 에러 처리
        console.log('알 수 없는 오류 발생', e.message);
        alert('알 수 없는 오류가 발생했습니다.');
      }
    },
  });

  return { mutate, error };
}

export default usePostRegister;
