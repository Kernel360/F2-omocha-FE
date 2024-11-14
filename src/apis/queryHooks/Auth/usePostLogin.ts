import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSearchParams, useRouter } from 'next/navigation';

import { postLogin } from '@/apis/queryFunctions/Auth';
import { LoginParams } from '@/apis/types/Auth';
import { Response } from '@/apis/types/common';
import { useAuth } from '@/provider/authProvider';
import { useToast } from '@/provider/toastProvider';

function usePostLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prevUrl = searchParams.get('prevUrl');
  const { setIsLoggedIn } = useAuth();
  const { showToast } = useToast();

  const { mutate, error } = useMutation({
    mutationFn: (param: LoginParams) => postLogin(param),
    onSuccess: () => {
      router.push(prevUrl || '/', { scroll: false });
      setIsLoggedIn(true);
      showToast('success', '로그인에 성공했습니다.');
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

export default usePostLogin;
