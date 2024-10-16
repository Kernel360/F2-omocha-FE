import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

import { postLogin } from '@/apis/queryFunctions/Auth';
import { getUser } from '@/apis/queryFunctions/User';
import { LoginParams } from '@/apis/types/Auth';
import { Response } from '@/apis/types/common';
import useUserStore from '@/store/useUserStore';

function usePostLogin() {
  const router = useRouter();
  const { setUser } = useUserStore();
  const { referrer } = document;
  const isOmochaAuctionPage = referrer.includes('omocha-auction');

  const { mutate, error } = useMutation({
    mutationFn: (param: LoginParams) => postLogin(param),
    onSuccess: async () => {
      try {
        const userData = await getUser();
        setUser(userData);
        if (referrer && isOmochaAuctionPage) {
          router.back();
        } else {
          router.push('/');
        }
      } catch (e: unknown) {
        if (e instanceof AxiosError) {
          console.log(e.message);
        } else {
          console.log('알 수 없는 오류 발생', e);
          alert('알 수 없는 오류가 발생했습니다.');
        }
      }
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
