import { useMutation } from '@tanstack/react-query';

import { postLogin } from '@/apis/queryFunctions/Auth';
import { LoginParams } from '@/apis/types/Auth';

export default function usePostLogin() {
  const { mutate, error } = useMutation({
    mutationFn: (param: LoginParams) => postLogin(param),
    onSuccess: () => {
      // 토큰 관리
    },
    onError: () => {
      // 토큰 제거
    },
  });

  return { mutate, error };
}
