import { useMutation } from '@tanstack/react-query';

import { login } from '@/apis/queryFunctions/Auth';
import { LoginParams } from '@/apis/types/Auth';

export const useLogin = () => {
  const { mutate, error } = useMutation({
    mutationFn: (param: LoginParams) => login(param),
    onSuccess: () => {
      // 토큰 관리
    },
    onError: () => {
      // 토큰 제거
    },
  });

  return { mutate, error };
};
