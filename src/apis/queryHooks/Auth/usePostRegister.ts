import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { postRegister } from '@/apis/queryFunctions/Auth';
import { RegisterParams } from '@/apis/types/Auth';
import { FetchError } from '@/apis/types/common';
import mixpanel from '@/lib/mixpanel';
import { useToast } from '@/provider/toastProvider';
import EVENT_ID from '@/static/eventId';

function usePostRegister() {
  const router = useRouter();
  const { showToast } = useToast();

  const { mutate, error } = useMutation({
    mutationFn: (param: RegisterParams) => postRegister(param),
    onSuccess: () => {
      showToast('success', '회원가입이 완료되었습니다.🎉');
      router.push('/login', { scroll: false });
      mixpanel.track(EVENT_ID.JOIN_SUBMIT_BUTTON_CLICKED);
    },
    onError: (e: FetchError) => {
      if (e) {
        showToast('error', `${e.resultMsg}`);
      } else {
        // 네트워크 에러나 기타 처리되지 않은 에러 처리
        showToast('error', '알 수 없는 오류가 발생했습니다. 새로고침을 진행해 주세요.');
      }
    },
  });

  return { mutate, error };
}

export default usePostRegister;
