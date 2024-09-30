'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import * as S from '@/app/mypage/Layout.css';
import ProfileIcon from '@/assets/svg/profile.svg';
import { MYPAGE_CATEGORY } from '@/static/category';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className={S.container}>
      <ul className={S.categoryList}>
        <div className={S.profile}>
          <div className={S.profileIcon}>
            <ProfileIcon width="40px" />
          </div>
          <h3>닉네임</h3>
        </div>
        {MYPAGE_CATEGORY.map(category => (
          <li key={category.id}>
            <Link
              className={S.categoryLink}
              href={category.path}
              style={{ color: category.path === pathname ? 'red' : 'black' }}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className={S.page}>{children}</div>
    </div>
  );
}
