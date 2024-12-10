'use client';

import { useEffect } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { setTokenCookies } from '@/apis/queryFunctions/Auth';
import LoadingSpinner from '@/components/LoadingSpinner';
import mixpanel from '@/lib/mixpanel';
import { useAuth } from '@/provider/authProvider';
import { useToast } from '@/provider/toastProvider';
import EVENT_ID from '@/static/eventId';

interface OauthCallbackHandlerProps {
  accessToken: string;
  refreshToken: string;
}

function OauthCallbackHandler({ accessToken, refreshToken }: OauthCallbackHandlerProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const { setIsLoggedIn } = useAuth();
  const searchParams = useSearchParams();

  useEffect(() => {
    const provider = searchParams.get('provider');

    const handleLogin = () => {
      if (accessToken && refreshToken) {
        setTokenCookies(accessToken, refreshToken);
        setIsLoggedIn(true);
        showToast('success', '로그인 되었습니다.');
        router.push('/');
        mixpanel.track(EVENT_ID.LOGIN_SUBMIT_BUTTON_CLICKED, {
          login_type: provider,
        });
      } else {
        showToast('error', '로그인에 실패하였습니다.');
        router.push('/login');
      }
    };

    const timer = setTimeout(handleLogin, 500);

    // eslint-disable-next-line consistent-return
    return () => clearTimeout(timer);
  }, [router, searchParams, setIsLoggedIn, showToast]);

  return <LoadingSpinner />;
}

export default OauthCallbackHandler;
