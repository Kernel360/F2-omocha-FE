'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import useGetUser from '@/apis/queryHooks/User/useGetUser';
import MaxLayout from '@/components/MaxLayout';
import { MYPAGE_CATEGORY } from '@/static/category';

import * as S from './Layout.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  const user = useGetUser();
  const pathname = usePathname();

  return (
    <div className={S.backContainer}>
      <MaxLayout>
        <div className={S.container}>
          <ul className={S.categoryList}>
            <div className={S.profile}>
              <h2>{user?.data?.email}</h2>
              <Link href="/mypage/heart" scroll={false}>
                <div className={S.heart}>
                  <span>찜</span>
                  <span>16</span>
                </div>
              </Link>
            </div>
            {MYPAGE_CATEGORY.map(category => (
              <li key={category.id}>
                <Link
                  className={S.categoryLink}
                  href={category.path}
                  style={{ color: category.path === pathname ? 'red' : 'black' }}
                  scroll={false}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className={S.page}>{children}</div>
        </div>
      </MaxLayout>
    </div>
  );
}
