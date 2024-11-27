import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

import { postLogout } from '@/apis/queryFunctions/Auth';
import { Response } from '@/apis/types/common';
import { useAuth } from '@/provider/authProvider';
import { useToast } from '@/provider/toastProvider';

function usePostLogout() {
  const router = useRouter();
  const { setIsLoggedIn } = useAuth();
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const { mutate, error } = useMutation({
    mutationFn: () => postLogout(),
    onSuccess: async () => {
      router.push('/', { scroll: false });
      setIsLoggedIn(false);
      showToast('success', '로그아웃에 성공했습니다.');
      router.refresh();
      queryClient.clear();
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

export default usePostLogout;
