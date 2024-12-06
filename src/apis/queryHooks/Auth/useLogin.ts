import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

// useSearchParams
import setTokenCookies from '@/apis/queryFunctions/setTokenCookies';
import { LoginParams } from '@/apis/types/Auth';
import { Response } from '@/apis/types/common';
import { useAuth } from '@/provider/authProvider';
import { useToast } from '@/provider/toastProvider';

function useLogin() {
  const router = useRouter();
  // const searchParams = useSearchParams();
  // searchParams를 쓰면 서스펜스가 걸려서 에러가 발생함ㄴ

  // const prevUrl = searchParams.get('prevUrl');
  const { showToast } = useToast();
  const { setIsLoggedIn } = useAuth();

  const { mutate } = useMutation({
    mutationFn: (loginParams: LoginParams) => setTokenCookies(loginParams),
    onSuccess: data => {
      sessionStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      setIsLoggedIn(true);
      showToast('success', '로그인 되었습니다.');
      // if (prevUrl?.startsWith('/join') || prevUrl?.startsWith('/login')) {
      router.push('/');
      // } else {
      //   router.push(prevUrl || '/');
      // }
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

  return { mutate };
}

export default useLogin;
