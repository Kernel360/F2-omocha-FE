'use client';

import { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import logoIcon from '@/assets/png/logo.png';
import mixpanel from '@/lib/mixpanel';
import { useAuth } from '@/provider/authProvider';
import { useToast } from '@/provider/toastProvider';
import { SUB_CATEGORY } from '@/static/category';
import EVENT_ID from '@/static/eventId';
import { handleLogout } from '@/utils/handleLogout';

import * as S from './UserHeader.css';

function UserHeader() {
  const router = useRouter();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    // 쿠키 설정 후 router.refresh() 사용
    router.refresh();
  }, [isLoggedIn]);

  const logout = async () => {
    await handleLogout();
    router.push('/');
    setIsLoggedIn(false);
    showToast('success', '로그아웃 되었습니다.');
    queryClient.clear();
    mixpanel.track(EVENT_ID.LOGOUT_BUTTON_CLICKED);
    mixpanel.reset();
  };

  const handleMixpanel = (eventId: string, prevEvent?: string) => {
    if (!isLoggedIn) {
      mixpanel.track(EVENT_ID.REDIRECT_TO_LOGIN_PAGE_VIEWED, {
        prev_event: prevEvent,
      });
      return;
    }
    mixpanel.track(eventId);
  };

  return (
    <section className={S.topHeader}>
      <Link href="/" scroll={false} className={S.topHeaderLogo}>
        <Image width={24} height={24} src={logoIcon} alt="logo" className={S.logo} priority />
        <div className={S.logo}>OMOCHA</div>
      </Link>
      <div className={S.topCategory}>
        {SUB_CATEGORY.map(category => {
          if (category.path) {
            return (
              <Link
                key={category.id}
                href={category.path}
                scroll={false}
                className={S.TopHeaderUnit}
                onClick={() => handleMixpanel(category.eventId, category.name)}
              >
                {category.name}
              </Link>
            );
          }
          return (
            <button
              style={{ cursor: 'pointer' }}
              className={S.TopHeaderUnit}
              key={category.id}
              type="button"
              onClick={() => {
                if (isLoggedIn) {
                  // setTrue();
                  // handleMixpanel(category.eventId); // 알림 이벤트ID 버튼 추가 필요
                } else {
                  router.push(
                    searchParams.size > 0
                      ? `/login?prevUrl=${pathname}?${searchParams}`
                      : `/login?prevUrl=${pathname}`,
                    { scroll: false },
                  );
                  handleMixpanel(EVENT_ID.LOGIN_BUTTON_CLICKED);
                }
              }}
            >
              {category.name}
            </button>
          );
        })}
        {isLoggedIn ? (
          <button className={S.logoutButton} type="button" onClick={logout}>
            로그아웃
          </button>
        ) : (
          <Link
            href={
              searchParams.size > 0
                ? `/login?prevUrl=${pathname}?${searchParams}`
                : `/login?prevUrl=${pathname}`
            }
            scroll={false}
            className={S.TopHeaderUnit}
            onClick={() => mixpanel.track(EVENT_ID.LOGIN_BUTTON_CLICKED)}
          >
            로그인
          </Link>
        )}
      </div>
    </section>
  );
}

export default UserHeader;
