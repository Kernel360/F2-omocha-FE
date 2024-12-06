import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
// import { useRouter, useSearchParams } from 'next/navigation';

import setRefreshTokenCookies from '@/apis/queryFunctions/setRefreshTokenCookies';
import { RefreshParams } from '@/apis/types/Auth';
import { Response } from '@/apis/types/common';
import useLogout from '@/hooks/useLogout';
// import { useAuth } from '@/provider/authProvider';
import { useToast } from '@/provider/toastProvider';

function useRefresh() {
  // const { setIsLoggedIn } = useAuth();
  // const router = useRouter();
  // const searchParams = useSearchParams();

  // const prevUrl = searchParams.get('prevUrl');
  const { showToast } = useToast();
  const handleLogout = useLogout();

  const { mutate } = useMutation({
    mutationFn: (refreshParams: RefreshParams) => setRefreshTokenCookies(refreshParams),
    onSuccess: () => {
      // sessionStorage.setItem('accessToken', data.accessToken);
      // localStorage.setItem('refreshToken', data.refreshToken);
      // setIsLoggedIn(true);
      // showToast('success', '로그인 되었습니다.');
      // if (prevUrl?.startsWith('/join') || prevUrl?.startsWith('/login')) {
      //   router.push('/');
      // } else {
      //   router.push(prevUrl || '/');
      // }
    },
    onError: (e: AxiosError<Response<string>>) => {
      if (e.response) {
        showToast('error', `${e.response.data.result_msg}`);
        handleLogout();
      } else {
        // 네트워크 에러나 기타 처리되지 않은 에러 처리
        showToast('error', '알 수 없는 오류가 발생했습니다. 새로고침을 진행해 주세요.');
        handleLogout();
      }
    },
  });

  return { mutate };
}

export default useRefresh;
