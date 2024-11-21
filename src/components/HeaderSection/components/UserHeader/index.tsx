import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import usePostLogout from '@/apis/queryHooks/Auth/usePostLogout';
import logoIcon from '@/assets/png/logo.png';
import { useAuth } from '@/provider/authProvider';
import { SUB_CATEGORY } from '@/static/category';

import * as S from './UserHeader.css';

// 현재 알림 기능 없음으로 주석처리
// interface UserHeaderProps {
//   setTrue: () => void;
// }
// { setTrue }: UserHeaderProps

function UserHeader() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const { mutate: logout } = usePostLogout();
  const pathname = usePathname();

  return (
    <section className={S.topHeader}>
      <Link href="/" scroll={false} className={S.topHeaderLogo}>
        <Image width={40} height={40} src={logoIcon} alt="logo" className={S.logo} priority />
        <div className={S.logo}>OMOCHA</div>
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
            if (category.name === '로그인') {
              return (
                <Link
                  key={category.id}
                  href={`${category.path}?prevUrl=${pathname}`}
                  scroll={false}
                  className={S.TopHeaderUnit}
                >
                  {category.name}
                </Link>
              );
            }
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
                  router.push('/login', { scroll: false });
                }
              }}
            >
              {category.name}
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default UserHeader;
