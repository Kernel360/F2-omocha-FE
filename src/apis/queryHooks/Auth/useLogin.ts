import { useEffect } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { setCookie } from 'cookies-next';
import { useRouter, useSearchParams } from 'next/navigation';

import { postLogin } from '@/apis/queryFunctions/Auth';
import { LoginParams } from '@/apis/types/Auth';
import { FetchError } from '@/apis/types/common';
import mixpanel from '@/lib/mixpanel';
import { useAuth } from '@/provider/authProvider';
import { useToast } from '@/provider/toastProvider';
import EVENT_ID from '@/static/eventId';

function useLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const prevUrl = searchParams.get('prevUrl');
  const { showToast } = useToast();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  useEffect(() => {
    // 쿠키 설정 후 router.refresh() 사용, basicAuctionList 쿼리 캐시 초기화
    queryClient.invalidateQueries({ queryKey: ['basicAuctionList'] });
    router.refresh();
  }, [isLoggedIn]);

  const { mutate } = useMutation({
    mutationFn: (loginParams: LoginParams) => postLogin(loginParams),

    onSuccess: (response, param) => {
      const accessToken = response.result_data.access_token;
      const refreshToken = response.result_data.refresh_token;

      setCookie('accessToken', accessToken, { maxAge: 60 * 60 * 24 });
      setCookie('refreshToken', refreshToken, { maxAge: 60 * 60 * 24 * 7 });

      setIsLoggedIn(true);
      showToast('success', '로그인 되었습니다.');
      if (prevUrl?.startsWith('/join') || prevUrl?.startsWith('/login')) {
        router.push('/');
      } else {
        router.push(prevUrl || '/');
      }

      mixpanel.track(EVENT_ID.LOGIN_SUBMIT_BUTTON_CLICKED, {
        login_type: 'general',
      });
      mixpanel.identify(param.email);
      mixpanel.people.set({
        $email: param.email,
        login_type: 'general',
      });
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

  return { mutate };
}

export default useLogin;
