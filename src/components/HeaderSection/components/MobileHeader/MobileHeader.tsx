'use client';

import { useEffect } from 'react';

import { useSearchParams } from 'next/navigation';

import useGetUser from '@/apis/queryHooks/User/useGetUser';
import useGetCategory from '@/apis/queryHooks/category/useGetCategory';
import { Category } from '@/apis/types/category';
import SlideSideNav from '@/components/SlideSideNav';
import useBooleanState from '@/hooks/useBooleanState';

import MaxLayout from '../../../MaxLayout';
import CategoryHeader from '../CategoryHeader';
import MobileSlideNav from '../MobileSlideNav';
import MobileUserHeader from '../MobileUserHeader';

import * as S from './MobileHeader.css';

function MobileHeader() {
  const searchParams = useSearchParams();
  const pickCategory = Number(searchParams.get('categoryId'));
  const { value: navState, setTrue: openNav, setFalse: closeNav } = useBooleanState(false);

  const { data } = useGetCategory({ targetCategoryId: pickCategory });
  const { data: userInfo } = useGetUser();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 700) {
        closeNav();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [closeNav]);

  if (!data) return null;

  return (
    <header className={S.stickyHeader}>
      <MaxLayout>
        <div className={S.container}>
          <MobileUserHeader openNav={openNav} />
          <CategoryHeader data={data as Category[]} />
          <SlideSideNav isOpen={navState} onClose={closeNav} type="mobile">
            <MobileSlideNav
              isLogin={!!userInfo}
              userProfileImage={userInfo?.profile_image_url}
              userNickname={userInfo?.nick_name}
              userEmail={userInfo?.email}
              userHeartCount={userInfo?.like_count}
              onClose={closeNav}
            />
          </SlideSideNav>
        </div>
      </MaxLayout>
    </header>
  );
}

export default MobileHeader;
