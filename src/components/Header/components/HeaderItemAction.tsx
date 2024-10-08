import Link from 'next/link';

import { useAuth } from '@/provider/authProvider';
import { SubCategory } from '@/static/category';

import * as S from '../Header.css';

interface HeaderItemActionProps {
  headerItem: SubCategory;
  setTrue: () => void;
}

function HeaderItemAction({ headerItem, setTrue }: HeaderItemActionProps) {
  const { token } = useAuth();

  if (headerItem.name === '알림') {
    return token ? (
      <button className={S.SideNavButton} type="button" key={headerItem.id} onClick={setTrue}>
        {headerItem.name}
      </button>
    ) : (
      <Link key="loginWithNotificationHeader" href="/login">
        {headerItem.name}
      </Link>
    );
  }

  if (headerItem.name === '로그인') {
    return token ? (
      <button
        className={S.SideNavButton}
        type="button"
        key={headerItem.id}
        onClick={() => {
          console.log('로그아웃');
          // 로그아웃 로직 추가
        }}
      >
        로그아웃
      </button>
    ) : (
      <Link key="loginWithLoginHeader" href="/login">
        {headerItem.name}
      </Link>
    );
  }

  return (
    <Link key={headerItem.id} href={headerItem.path!}>
      {headerItem.name}
    </Link>
  );
}

export default HeaderItemAction;
