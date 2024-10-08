import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

import { postRegister } from '@/apis/queryFunctions/Auth';
import { RegisterParams } from '@/apis/types/Auth';
import { Response } from '@/apis/types/common';

function usePostRegister() {
  const router = useRouter();

  const { mutate, error } = useMutation({
    mutationFn: (param: RegisterParams) => postRegister(param),
    onSuccess: () => {
      alert('회원가입을 성공했습니다.🎉');
      router.push('/login');
    },
    onError: (e: AxiosError<Response<string>>) => {
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
