'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { MYPAGE_CATEGORY } from '@/static/category';

import * as S from './Layout.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className={S.container}>
      <ul className={S.categoryList}>
        <div className={S.profile}>
          <h2>유저 이름</h2>
          <div className={S.heart}>
            <span>좋아요</span>
            <span>16</span>
          </div>
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
