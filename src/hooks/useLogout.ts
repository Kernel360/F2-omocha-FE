import { useRouter } from 'next/navigation';

import mixpanel from '@/lib/mixpanel';
import { useAuth } from '@/provider/authProvider';
import { useToast } from '@/provider/toastProvider';
import EVENT_ID from '@/static/eventId';

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
    mixpanel.track(EVENT_ID.LOGOUT_BUTTON_CLICKED);
    mixpanel.reset();
  };

  return handleLogout;
}

export default useLogout;
