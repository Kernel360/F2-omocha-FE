import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

import { patchPassword } from '@/apis/queryFunctions/User';
import { PatchPasswordParams } from '@/apis/types/User';
import { Response } from '@/apis/types/common';
import { useToast } from '@/provider/toastProvider';

function usePatchPassword() {
  const { showToast } = useToast();
  const router = useRouter();

  const { mutate, error } = useMutation({
    mutationFn: (param: PatchPasswordParams) => patchPassword(param),
    onSuccess: () => {
      showToast('success', '비밀번호 변경이 완료되었습니다.🎉');
      router.push('/mypage', { scroll: false });
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

export default usePatchPassword;
