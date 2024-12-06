import { useRouter } from 'next/navigation';

import { useToast } from '@/provider/toastProvider';
import { useAuth } from '@/provider/authProvider';

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
