'use client';

import { Suspense, useEffect } from 'react';

import useGetUser from '@/apis/queryHooks/User/useGetUser';
import useGetCategory from '@/apis/queryHooks/category/useGetCategory';
import { Category } from '@/apis/types/category';
import SlideSideNav from '@/components/SlideSideNav';
import useBooleanState from '@/hooks/useBooleanState';
import useResizeViewportWidth from '@/hooks/useResizeViewportWidth';

import MaxLayout from '../../../MaxLayout';
import CategoryHeader from '../CategoryHeader';
import MobileSlideNav from '../MobileSlideNav';
import MobileUserHeader from '../MobileUserHeader';

import * as S from './MobileHeader.css';

function MobileHeader() {
  const { value: navState, setTrue: openNav, setFalse: closeNav } = useBooleanState(false);

  const { data } = useGetCategory();
  const { data: userInfo } = useGetUser();
  const { viewportWidth } = useResizeViewportWidth();

  useEffect(() => {
    if (viewportWidth && viewportWidth > 700) {
      closeNav();
    }
  }, [viewportWidth, closeNav]);

  if (!data) return null;

  return (
    <header className={S.stickyHeader}>
      <MaxLayout>
        <div className={S.container}>
          <MobileUserHeader openNav={openNav} />
          <CategoryHeader data={data as Category[]} />

          <SlideSideNav isOpen={navState} onClose={closeNav} type="mobile">
            <Suspense fallback={<>MobileSlideNav Loading...</>}>
              <MobileSlideNav
                isLogin={!!userInfo}
                userProfileImage={userInfo?.profile_image_url}
                userNickname={userInfo?.nickname}
                userEmail={userInfo?.email}
                userHeartCount={userInfo?.like_count}
                onClose={closeNav}
              />
            </Suspense>
          </SlideSideNav>
        </div>
      </MaxLayout>
    </header>
  );
}

export default MobileHeader;
