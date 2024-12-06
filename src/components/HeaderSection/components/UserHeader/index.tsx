'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import logoIcon from '@/assets/png/logo.png';
import useLogout from '@/hooks/useLogout';

import { SUB_CATEGORY } from '@/static/category';

import * as S from './UserHeader.css';

import { useAuth } from '@/provider/authProvider';

function UserHeader() {
  const router = useRouter();

  const { isLoggedIn } = useAuth();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleLogout = useLogout();

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
                } else {
                  router.push(
                    searchParams.size > 0
                      ? `/login?prevUrl=${pathname}?${searchParams}`
                      : `/login?prevUrl=${pathname}`,
                    { scroll: false },
                  );
                }
              }}
            >
              {category.name}
            </button>
          );
        })}
        {isLoggedIn ? (
          <button className={S.logoutButton} type="button" onClick={handleLogout}>
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
          >
            로그인
          </Link>
        )}
      </div>
    </section>
  );
}

export default UserHeader;
