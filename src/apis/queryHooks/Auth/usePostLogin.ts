import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { usePathname, useRouter } from 'next/navigation';

import { postLogin } from '@/apis/queryFunctions/Auth';
import { LoginParams } from '@/apis/types/Auth';
import { Response } from '@/apis/types/common';
import { useAuth } from '@/provider/authProvider';

function usePostLogin() {
  const router = useRouter();
  const { setIsLoggedIn } = useAuth();
  const { referrer } = document;
  const isOmochaAuctionPage = referrer.includes('omocha-auction');
  const pathname = usePathname();

  const { mutate, error } = useMutation({
    mutationFn: (param: LoginParams) => postLogin(param),
    onSuccess: async () => {
      if (referrer && isOmochaAuctionPage && !pathname.includes('/join')) {
        router.back();
      } else {
        router.push('/');
      }
      setIsLoggedIn(true);
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

export default usePostLogin;
