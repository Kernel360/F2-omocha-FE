'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { MYPAGE_CATEGORY } from '@/static/category';

import * as S from './MypageCategory.css';

function MypageCategory() {
  const pathname = usePathname();

  return MYPAGE_CATEGORY.map(category => (
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
  ));
}

export default MypageCategory;
