'use client';

import { useSearchParams } from 'next/navigation';

import useGetCategory from '@/apis/queryHooks/category/useGetCategory';
import { Category } from '@/apis/types/category';
import MaxLayout from '@/components/MaxLayout';

import CategoryHeader from '../CategoryHeader';
import UserHeader from '../UserHeader';

import * as S from './Header.css';

function Header() {
  const searchParams = useSearchParams();
  const pickCategory = Number(searchParams.get('categoryId'));

  const { data } = useGetCategory({ targetCategoryId: pickCategory });

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
