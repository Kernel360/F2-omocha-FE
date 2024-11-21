'use client';

import { useSearchParams } from 'next/navigation';

// 현재 알림 기능 api 없음으로 주석처리
// import Alarm from '@/components/Header/components/Alarm';
// import SlideSideNav from '@/components/SlideSideNav';
// import useBooleanState from '@/hooks/useBooleanState';

import useGetCategory from '@/apis/queryHooks/category/useGetCategory';
import { Category } from '@/apis/types/category';
import MaxLayout from '@/components/MaxLayout';

import CategoryHeader from '../CategoryHeader';
import UserHeader from '../UserHeader';

import * as S from './Header.css';

function Header() {
  // const { value, setTrue, setFalse } = useBooleanState(false);
  const searchParams = useSearchParams();
  const pickCategory = Number(searchParams.get('categoryId'));

  const { data } = useGetCategory({ targetCategoryId: pickCategory });

  // console.log(data?.result_data);
  // console.log('newData', newData);

  if (!data) return null;

  return (
    <header className={S.stickyHeader}>
      <MaxLayout>
        <div className={S.container}>
          <UserHeader />
          {/* <UserHeader setTrue={setTrue} /> */}
          <CategoryHeader data={data as Category[]} />
          {/* <SlideSideNav isOpen={value} onClose={setFalse}>
            <Alarm content="준비중입니다!" />
          </SlideSideNav> */}
        </div>
      </MaxLayout>
    </header>
  );
}

export default Header;
