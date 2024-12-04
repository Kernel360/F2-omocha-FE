import { useRouter, useSearchParams } from 'next/navigation';

import setTokenCookies from '@/apis/queryFunctions/setTokenCookies';
import { LoginParams } from '@/apis/types/Auth';
import { useAuth } from '@/provider/authProvider';
import { useToast } from '@/provider/toastProvider';

function useLogin() {
  const { setIsLoggedIn } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const prevUrl = searchParams.get('prevUrl');
  const { showToast } = useToast();

  const login = async (params: LoginParams) => {
    const { accessToken, refreshToken } = await setTokenCookies(params);

    if (typeof window !== 'undefined') {
      sessionStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    }
    setIsLoggedIn(true);
    if (prevUrl?.startsWith('/join') || prevUrl?.startsWith('/login')) {
      router.push('/');
    } else {
      router.push(prevUrl || '/');
    }

    router.refresh();
    showToast('success', '로그인 되었습니다.');
  };
  return login;
}

export default useLogin;
