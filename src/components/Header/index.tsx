'use client';

import Alarm from '@/components/Header/components/Alarm';
import SlideSideNav from '@/components/SlideSideNav';
import useBooleanState from '@/hooks/useBooleanState';

import MaxLayout from '../MaxLayout';

import * as S from './Header.css';
import CategoryHeader from './components/CategoryHeader';
import UserHeader from './components/UserHeader';

function Header() {
  const { value, setTrue, setFalse } = useBooleanState(false);

  return (
    <div className={S.stickyHeader}>
      <MaxLayout>
        <header className={S.container}>
          <UserHeader setTrue={setTrue} />
          <CategoryHeader />
          <SlideSideNav isOpen={value} onClose={setFalse}>
            <Alarm content="준비중입니다!" />
          </SlideSideNav>
        </header>
      </MaxLayout>
    </div>
  );
}

export default Header;
