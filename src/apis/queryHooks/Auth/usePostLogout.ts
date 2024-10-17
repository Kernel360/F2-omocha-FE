import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

import { postLogout } from '@/apis/queryFunctions/Auth';
import { Response } from '@/apis/types/common';
import { useAuth } from '@/provider/authProvider';
import useUserStore from '@/store/useUserStore';

function usePostLogout() {
  const router = useRouter();
  const { setIsLoggedIn } = useAuth();
  const removeUser = useUserStore(state => state.removeUser);

  const { mutate, error } = useMutation({
    mutationFn: () => postLogout(),
    onSuccess: async () => {
      router.push('/');
      setIsLoggedIn(false);
      removeUser();
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

export default usePostLogout;
