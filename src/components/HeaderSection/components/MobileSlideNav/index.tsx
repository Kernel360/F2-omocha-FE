import { UserIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import usePostLogout from '@/apis/queryHooks/Auth/usePostLogout';
import colors from '@/styles/color';

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
  const { mutate: logout } = usePostLogout();

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <div className={S.container}>
      <Link href="/" onClick={onClose}>
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
            {/* <Link href="/mypage/heart" onClick={onClose}>
              <div className={S.userWrapper}>
                <span className={S.userName}>찜 개수: </span>
                <span className={S.userName}>{userHeartCount}</span>
              </div>
            </Link> */}
          </div>
        ) : (
          <div className={S.authWrapper}>
            <Link href="/login" className={S.button.login} onClick={onClose}>
              로그인
            </Link>
            <Link href="/join" className={S.button.join} onClick={onClose}>
              회원가입
            </Link>
          </div>
        )}
      </div>
      <hr className={S.division} />
      <Link href="/create" className={S.button.uploadAuction} onClick={onClose}>
        경매 등록
      </Link>
      <hr className={S.division} />
      <Link href="/mypage/profile" className={S.normalNavButtonBase} onClick={onClose}>
        회원 정보
      </Link>
      <Link href="/mypage/heart" className={S.normalNavButtonBase} onClick={onClose}>
        <>
          찜<div className={S.likeCount}>{userHeartCount}</div>
        </>
      </Link>
      <Link href="/mypage/record" className={S.normalNavButtonBase} onClick={onClose}>
        거래 내역
      </Link>
      <hr className={S.division} />
      {isLogin && (
        <button className={S.bottomNavButtonBase} type="button" onClick={handleLogout}>
          로그아웃
        </button>
      )}
    </div>
  );
}

export default MobileSlideNav;
