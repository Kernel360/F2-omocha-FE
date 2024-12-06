import { useRouter } from 'next/navigation';

import { useAuth } from '@/provider/authProvider';
import { useToast } from '@/provider/toastProvider';

function useLogout() {
  const router = useRouter();
  const { setIsLoggedIn } = useAuth();
  const { showToast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem('refreshToken');
    sessionStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    router.push('/');
    showToast('success', '로그아웃 되었습니다.');
  };

  return handleLogout;
}

export default useLogout;
