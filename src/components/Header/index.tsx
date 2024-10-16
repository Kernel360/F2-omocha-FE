'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import useBooleanState from '@/hooks/useBooleanState';
import { useAuth } from '@/provider/authProvider';
import { MAIN_CATEGORY, SUB_CATEGORY } from '@/static/category';

import SlideSideNav from '../SlideSideNav';

import * as S from './Header.css';
import Alarm from './components/Alarm';
import HeaderActionItem from './components/HeaderActionItem';
import HeaderLinkItem from './components/HeaderLinkItem';

function Header() {
  const pathname = usePathname();
  const { value, setTrue, setFalse } = useBooleanState(false);
  const { token } = useAuth();
  const router = useRouter();
  return (
    <header className={S.container}>
      <section className={S.topHeader}>
        <Link href="/">
          <div className={S.logo}>LOGO</div>
        </Link>
        <div className={S.topCategory}>
          {SUB_CATEGORY.map(category => {
            if (token) {
              if (category.isLoginRequireToShow === 'NO_LOGIN_REQUIRE') {
                return null;
              }
            }
            if (!token) {
              if (category.isLoginRequireToShow === 'LOGIN_REQUIRE') {
                return null;
              }
            }
            if (category.path) {
              return <HeaderLinkItem key={category.id} headerItem={category} />;
            }
            return (
              <HeaderActionItem
                key={category.id}
                headerItem={category}
                onClickEvent={() => {
                  if (category.name === '알림') {
                    if (token) setTrue();
                    else {
                      router.push('/login');
                    }
                  }
                  if (category.name === '로그아웃') {
                    console.log('로그아웃 로직 있는거');
                  }
                }}
              />
            );
          })}
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
        <Alarm content="준비중입니다!" />
      </SlideSideNav>
    </header>
  );
}

export default Header;
