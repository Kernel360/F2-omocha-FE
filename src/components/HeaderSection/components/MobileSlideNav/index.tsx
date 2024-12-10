import { UserIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import mixpanel from '@/lib/mixpanel';
import { useAuth } from '@/provider/authProvider';
import { useToast } from '@/provider/toastProvider';
import EVENT_ID from '@/static/eventId';
import colors from '@/styles/color';
import { handleLogout } from '@/utils/handleLogout';

import * as S from './MobileSlideNav.css';

interface MobileSlideNavProps {
  isLogin: boolean;
  onClose: () => void;
  userProfileImage?: string | null;
  userNickname?: string | null;
  userEmail?: string;
  userHeartCount?: number;
}

function MobileSlideNav({
  isLogin,
  onClose,
  userProfileImage,
  userNickname,
  userEmail,
  userHeartCount,
}: MobileSlideNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { setIsLoggedIn } = useAuth();
  const { showToast } = useToast();
  const searchParams = useSearchParams();

  const logout = async () => {
    await handleLogout();
    router.refresh();
    router.push('/');
    setIsLoggedIn(false);
    showToast('success', '로그아웃 되었습니다.');
    onClose();
    mixpanel.track(EVENT_ID.LOGOUT_BUTTON_CLICKED);
    mixpanel.reset();
  };

  const handleMixpanel = (eventId: string, prevEvent: string) => {
    if (!isLogin) {
      mixpanel.track(EVENT_ID.REDIRECT_TO_LOGIN_PAGE_VIEWED, {
        prev_event: prevEvent,
      });
      return;
    }
    mixpanel.track(eventId);
  };

  return (
    <div className={S.container}>
      <Link
        href="/"
        onClick={() => {
          onClose();
          mixpanel.track(EVENT_ID.MAIN_BUTTON_CLICKED);
        }}
      >
        <div className={S.logo}>OMOCHA</div>
      </Link>
      <div>
        {isLogin ? (
          <div className={S.userSection}>
            <div className={S.userWrapper}>
              {userProfileImage ? (
                <Image
                  className={S.profileImage}
                  src={`${process.env.NEXT_PUBLIC_S3_URL}${userProfileImage}`}
                  width={100}
                  height={100}
                  priority
                  alt="프로필 이미지"
                />
              ) : (
                <UserIcon
                  size={20}
                  strokeWidth={1}
                  stroke={colors.gray9}
                  style={{ borderRadius: '50%', border: `1px solid ${colors.gray9}` }}
                />
              )}
              <span className={S.userName}>{userNickname}</span>
            </div>
            <div className={S.userWrapper}>
              <span className={S.userName}>{userEmail}</span>
            </div>
          </div>
        ) : (
          <div className={S.authWrapper}>
            <Link
              href={
                searchParams.size > 0
                  ? `/login?prevUrl=${pathname}?${searchParams}`
                  : `/login?prevUrl=${pathname}`
              }
              className={S.button.login}
              onClick={() => {
                onClose();
                mixpanel.track(EVENT_ID.LOGIN_BUTTON_CLICKED);
              }}
            >
              로그인
            </Link>
            <Link
              href="/join"
              className={S.button.join}
              onClick={() => {
                onClose();
                mixpanel.track(EVENT_ID.JOIN_BUTTON_CLICKED);
              }}
            >
              회원가입
            </Link>
          </div>
        )}
      </div>
      <hr className={S.division} />
      <Link
        href="/create"
        className={S.button.uploadAuction}
        onClick={() => {
          onClose();
          handleMixpanel(EVENT_ID.AUCTION_CREATE_BUTTON_CLICKED, '경매 등록');
        }}
      >
        경매 등록
      </Link>
      <hr className={S.division} />
      <Link
        href="/mypage/profile"
        className={S.normalNavButtonBase}
        onClick={() => {
          onClose();
          handleMixpanel(EVENT_ID.MYPAGE_PROFILE_BUTTON_CLICKED, '마이페이지');
        }}
      >
        마이페이지
      </Link>
      <Link
        href="/mypage/heart"
        className={S.normalNavButtonBase}
        onClick={() => {
          onClose();
          handleMixpanel(EVENT_ID.MYPAGE_HEART_BUTTON_CLICKED, '찜');
        }}
      >
        <>찜{isLogin && <div className={S.likeCount}>{userHeartCount}</div>}</>
      </Link>
      <Link
        href="/mypage/record"
        className={S.normalNavButtonBase}
        onClick={() => {
          onClose();
          handleMixpanel(EVENT_ID.MYPAGE_RECORD_BUTTON_CLICKED, '거래 내역');
        }}
      >
        거래 내역
      </Link>
      <hr className={S.division} />
      {isLogin && (
        <button className={S.bottomNavButtonBase} type="button" onClick={logout}>
          로그아웃
        </button>
      )}
    </div>
  );
}

export default MobileSlideNav;
