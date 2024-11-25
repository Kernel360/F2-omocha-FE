'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import useGetUser from '@/apis/queryHooks/User/useGetUser';
import { MYPAGE_CATEGORY } from '@/static/category';
import colors from '@/styles/color';

import SkeletonCard from '../SkeletonUI/components/SkeletonCard';

import * as S from './MypageCategory.css';

function MypageCategory() {
  const { data: user, isLoading } = useGetUser();
  const pathname = usePathname();

  return MYPAGE_CATEGORY.map(category => {
    if (category.path === '/mypage/heart') {
      return (
        <li key={category.id}>
          <Link
            className={S.categoryLink}
            href={category.path}
            style={{ color: category.path === pathname ? colors.primary9 : 'black' }}
            scroll={false}
          >
            <span>{category.name}</span>
            {isLoading ? (
              <span className={S.loadingStyle}>
                <SkeletonCard width={40} height={27} />
              </span>
            ) : (
              <span className={S.likeCount}>{user?.like_count}</span>
            )}
          </Link>
        </li>
      );
    }
    return (
      <li key={category.id}>
        <Link
          className={S.categoryLink}
          href={category.path}
          style={{ color: category.path === pathname ? colors.primary9 : 'black' }}
          scroll={false}
        >
          {category.name}
        </Link>
      </li>
    );
  });
}

export default MypageCategory;
