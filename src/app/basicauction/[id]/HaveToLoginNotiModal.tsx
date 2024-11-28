import { usePathname, useRouter } from 'next/navigation';

import { useAuth } from '@/provider/authProvider';

import * as S from './HaveToLoginNotiModal.css';

function HaveToLoginNotiModal() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const moveToLogin = () => {
    router.push(`/login?prevUrl=${pathname}`, { scroll: false });
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
