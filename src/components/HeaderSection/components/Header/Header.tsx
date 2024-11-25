'use client';

import useGetCategory from '@/apis/queryHooks/category/useGetCategory';
import { Category } from '@/apis/types/category';
import MaxLayout from '@/components/MaxLayout';

import CategoryHeader from '../CategoryHeader';
import UserHeader from '../UserHeader';

import * as S from './Header.css';

function Header() {
  const { data } = useGetCategory();

  if (!data) return null;

  return (
    <header className={S.stickyHeader}>
      <MaxLayout>
        <div className={S.container}>
          <UserHeader />
          <CategoryHeader data={data as Category[]} />
        </div>
      </MaxLayout>
    </header>
  );
}

export default Header;
