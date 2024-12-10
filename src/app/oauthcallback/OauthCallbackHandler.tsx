'use client';

import { useEffect } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import LoadingSpinner from '@/components/LoadingSpinner';
import mixpanel from '@/lib/mixpanel';
import { useAuth } from '@/provider/authProvider';
import { useToast } from '@/provider/toastProvider';
import EVENT_ID from '@/static/eventId';

function OauthCallbackHandler() {
  const router = useRouter();
  const { showToast } = useToast();
  const { setIsLoggedIn } = useAuth();
  const searchParams = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get('access_token');
    const refreshToken = searchParams.get('refresh_token');
    const provider = searchParams.get('provider');

    const handleLogin = () => {
      if (accessToken && refreshToken) {
        sessionStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        setIsLoggedIn(true);
        showToast('success', '로그인 되었습니다.');
        router.push('/');
        mixpanel.track(EVENT_ID.LOGIN_SUBMIT_BUTTON_CLICKED, {
          login_type: provider,
        });
      } else {
        localStorage.removeItem('refreshToken');
        sessionStorage.removeItem('accessToken');
        showToast('error', '로그인에 실패하였습니다.');
        router.push('/login');
      }
    };

    const timer = setTimeout(handleLogin, 500);

    // eslint-disable-next-line consistent-return
    return () => clearTimeout(timer);
  }, [router, searchParams, setIsLoggedIn, showToast]);

  return (
    <div>
      <LoadingSpinner />
    </div>
  );
}

export default OauthCallbackHandler;
