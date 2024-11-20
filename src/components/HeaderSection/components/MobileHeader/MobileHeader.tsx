'use client';

import { useSearchParams } from 'next/navigation';

// 현재 알림 기능 api 없음으로 주석처리
// import Alarm from '@/components/Header/components/Alarm';
// import SlideSideNav from '@/components/SlideSideNav';
// import useBooleanState from '@/hooks/useBooleanState';

import useGetCategory from '@/apis/queryHooks/category/useGetCategory';
import { Category } from '@/apis/types/category';

import MaxLayout from '../../../MaxLayout';
import CategoryHeader from '../CategoryHeader';
import MobileUserHeader from '../MobileUserHeader';

import * as S from './MobileHeader.css';

function MobileHeader() {
  const searchParams = useSearchParams();
  const pickCategory = Number(searchParams.get('categoryId'));

  const { data } = useGetCategory({ targetCategoryId: pickCategory });

  if (!data) return null;

  return (
    <header className={S.stickyHeader}>
      <MaxLayout>
        <div className={S.container}>
          <MobileUserHeader />
          <CategoryHeader data={data as Category[]} />
        </div>
      </MaxLayout>
    </header>
  );
}

export default MobileHeader;
