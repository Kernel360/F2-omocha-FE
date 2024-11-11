import Link from 'next/link';
import { useRouter } from 'next/navigation';

import usePostLogout from '@/apis/queryHooks/Auth/usePostLogout';
import { useAuth } from '@/provider/authProvider';
import { SUB_CATEGORY } from '@/static/category';

import * as S from './UserHeader.css';

interface UserHeaderProps {
  setTrue: () => void;
}

function UserHeader({ setTrue }: UserHeaderProps) {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const { mutate: logout } = usePostLogout();

  return (
    <section className={S.topHeader}>
      <Link href="/" scroll={false}>
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
                  setTrue();
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
