import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

import { postLogin } from '@/apis/queryFunctions/Auth';
import { LoginParams } from '@/apis/types/Auth';
import { Response } from '@/apis/types/common';
// import { useAuth } from '@/provider/authProvider';

function usePostLogin() {
  const router = useRouter();
  // const { token, setToken } = useAuth();

  const { mutate, error } = useMutation({
    mutationFn: (param: LoginParams) => postLogin(param),
    onSuccess: (data, variable) => {
      console.log('data', data);
      console.log('variable', variable);
      const cookieString = document.cookie;
      console.log('cookieString', cookieString);
      // 여기서 콜백으로 token을 다시 set할 수 있게 재렌더링이 일어날 수 있는 요소가 필요한데...
      router.push('/');
    },
    onError: (e: AxiosError<Response<string>>) => {
      if (e.response) {
        alert(`${e.response.data.result_msg}`);
      } else {
        // 네트워크 에러나 기타 처리되지 않은 에러 처리
        console.log('알 수 없는 오류 발생', e.message);
        alert('알 수 없는 오류가 발생했습니다.');
      }

      // 토큰 제거
    },
  });

  return { mutate, error };
}

export default usePostLogin;
