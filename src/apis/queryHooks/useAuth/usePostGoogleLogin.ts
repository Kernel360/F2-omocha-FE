import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

import { postGoogleLogin } from '@/apis/queryFunctions/Auth';
import { Response } from '@/apis/types/common';

function usePostGoogleLogin() {
  const router = useRouter();

  const { mutate, error } = useMutation({
    mutationFn: () => postGoogleLogin(),
    onSuccess: () => {
      router.push('/');
    },
    onError: (e: AxiosError<Response<string>>) => {
      if (e.response) {
        alert(`${e.response.data.result_msg}`);
      } else {
        console.log('알 수 없는 오류 발생', e.message);
        alert('알 수 없는 오류가 발생했습니다.');
      }
      // 토큰 제거
    },
  });

  return { mutate, error };
}

export default usePostGoogleLogin;
