'use client';

import { useEffect } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import LoadingSpinner from '@/components/LoadingSpinner';
import { useAuth } from '@/provider/authProvider';
import { useToast } from '@/provider/toastProvider';
import { setTokenCookies } from '@/apis/queryFunctions/Auth';

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
    const handleLogin = () => {
      if (accessToken && refreshToken) {
        setTokenCookies(accessToken, refreshToken);
        setIsLoggedIn(true);
        showToast('success', '로그인 되었습니다.');

        router.push('/');
      } else {
        showToast('error', '로그인에 실패하였습니다.');
        router.push('/login');
      }
    };

    const timer = setTimeout(handleLogin, 500);

    return () => clearTimeout(timer);
  }, [router, searchParams, setIsLoggedIn, showToast]);

  return <LoadingSpinner />;
}

export default OauthCallbackHandler;
