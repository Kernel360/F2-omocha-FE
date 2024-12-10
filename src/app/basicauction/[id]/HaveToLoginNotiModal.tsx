import { usePathname, useRouter } from 'next/navigation';

import mixpanel from '@/lib/mixpanel';
import { useAuth } from '@/provider/authProvider';
import EVENT_ID from '@/static/eventId';

import * as S from './HaveToLoginNotiModal.css';

function HaveToLoginNotiModal() {
  const { isLoggedIn } = useAuth();

  const router = useRouter();
  const pathname = usePathname();

  const moveToLogin = () => {
    router.push(`/login?prevUrl=${pathname}`, { scroll: false });
    mixpanel.track(EVENT_ID.REDIRECT_TO_LOGIN_PAGE_VIEWED, {
      prev_event: 'QnA쓰기',
    });
  };

  if (!isLoggedIn) {
    return (
      <div className={S.needLoginSection}>
        <div className={S.noUserMessage}>로그인이 필요한 서비스 입니다.</div>
        <button className={S.loginButton} type="button" onClick={moveToLogin}>
          로그인하러 가기
        </button>
      </div>
    );
  }
}

export default HaveToLoginNotiModal;
