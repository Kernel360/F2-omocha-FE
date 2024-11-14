'use client';

import { useSearchParams } from 'next/navigation';

import useGetCategory from '@/apis/queryHooks/category/useGetCategory';

// 현재 알림 기능 api 없음으로 주석처리
// import Alarm from '@/components/Header/components/Alarm';
// import SlideSideNav from '@/components/SlideSideNav';
// import useBooleanState from '@/hooks/useBooleanState';

import MaxLayout from '../MaxLayout';

import * as S from './Header.css';
import CategoryHeader from './components/CategoryHeader';
import UserHeader from './components/UserHeader';

function Header() {
  // const { value, setTrue, setFalse } = useBooleanState(false);
  const searchParams = useSearchParams();
  const pickCategory = Number(searchParams.get('categoryId'));

  const { data } = useGetCategory({ targetCategoryId: pickCategory });

  // console.log(data?.result_data);
  // console.log('newData', newData);

  if (!data) return null;

  return (
    <div className={S.stickyHeader}>
      <MaxLayout>
        <header className={S.container}>
          <UserHeader />
          {/* <UserHeader setTrue={setTrue} /> */}
          <CategoryHeader data={data} />
          {/* <SlideSideNav isOpen={value} onClose={setFalse}>
            <Alarm content="준비중입니다!" />
          </SlideSideNav> */}
        </header>
      </MaxLayout>
    </div>
  );
}

export default Header;
