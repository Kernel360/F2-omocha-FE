'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import useBooleanState from '@/hooks/useBooleanState';
import { useAuth } from '@/provider/authProvider';
import { MAIN_CATEGORY, SUB_CATEGORY, SubCategory } from '@/static/category';

import SlideSideNav from '../SlideSideNav';
import TabsLayout from '../TabsLayout';

import * as S from './Header.css';
import Alarm from './components/Alarm';

const TABS = [
  {
    title: '알림',
    value: 'Alarm',
  },
  {
    title: '채팅',
    value: 'Chatting',
  },
];

const TABS_CONTENT = [<Alarm key="알림" content="알림" />, <Alarm key="채팅" content="채팅" />];

function Header() {
  const { token } = useAuth();

  const pathname = usePathname();
  const { value, setTrue, setFalse } = useBooleanState(false);

  const headerItemAction = (headerItem: SubCategory) => {
    switch (headerItem.name) {
      case '알림':
        return token ? (
          <button className={S.SideNavButton} type="button" key={headerItem.id} onClick={setTrue}>
            {headerItem.name}
          </button>
        ) : (
          <Link key="loginWithNotificationHeader" href="/login">
            {headerItem.name}
          </Link>
        );
      case '로그인':
        return token ? (
          <button
            className={S.SideNavButton}
            type="button"
            key={headerItem.id}
            onClick={() => {
              console.log('로그아웃');
            }}
          >
            로그아웃
          </button>
        ) : (
          <Link key="loginWithLoginHeader" href="/login">
            {headerItem.name}
          </Link>
        );
      default:
        return (
          <Link key={headerItem.id} href={headerItem.path!}>
            {headerItem.name}
          </Link>
        );
    }
  };

  return (
    <header className={S.container}>
      <section className={S.topHeader}>
        <Link href="/">
          <div className={S.logo}>LOGO</div>
        </Link>
        <div className={S.topCategory}>
          {SUB_CATEGORY.map(category => headerItemAction(category))}
        </div>
      </section>
      <section className={S.bottomHeader}>
        {MAIN_CATEGORY.map(category => (
          <Link
            key={category.id}
            href={category.path}
            style={{ color: category.path === pathname ? 'red' : 'black' }}
          >
            {category.name}
          </Link>
        ))}
      </section>
      <SlideSideNav isOpen={value} onClose={setFalse}>
        <TabsLayout
          defaultTriggerValue={TABS[0].value}
          triggerTitleList={TABS}
          childrenList={TABS_CONTENT}
        />
      </SlideSideNav>
    </header>
  );
}

export default Header;
