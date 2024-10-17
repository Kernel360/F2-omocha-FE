'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import usePostLogout from '@/apis/queryHooks/Auth/usePostLogout';
import Alarm from '@/components/Header/components/Alarm';
import SlideSideNav from '@/components/SlideSideNav';

import useBooleanState from '@/hooks/useBooleanState';
import { useAuth } from '@/provider/authProvider';
import { MAIN_CATEGORY, SUB_CATEGORY } from '@/static/category';

import TabsLayout from '../TabsLayout';

import * as S from './Header.css';

function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { value, setTrue, setFalse } = useBooleanState(false);
  const { isLoggedIn } = useAuth();
  const { mutate: logout } = usePostLogout();

  return (
    <header className={S.container}>
      <section className={S.topHeader}>
        <Link href="/">
          <div className={S.logo}>LOGO</div>
        </Link>
        <div className={S.topCategory}>
          {SUB_CATEGORY.map(category => {
            if (category.name === '로그인' && isLoggedIn) {
              return (
                <button
                  className={S.logoutButton}
                  key={category.id}
                  type="button"
                  onClick={() => logout()}
                >
                  로그아웃
                </button>
              );
            }
            if (category.path) {
              return (
                <Link key={category.id} href={category.path}>
                  {category.name}
                </Link>
              );
            }
            return (
              <button
                style={{ cursor: 'pointer' }}
                key={category.id}
                type="button"
                onClick={() => {
                  if (isLoggedIn) {
                    setTrue();
                  } else {
                    router.push('/login');
                  }
                }}
              >
                {category.name}
              </button>
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
