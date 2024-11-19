'use client';

import { useSearchParams } from 'next/navigation';

import useGetCategory from '@/apis/queryHooks/category/useGetCategory';
import { Category } from '@/apis/types/category';
import AuctionCategory from '@/components/AuctionCategory';

import * as S from './LeftSection.css';

export default function LeftSection() {
  const searchParams = useSearchParams();
  const pickCategory = Number(searchParams.get('categoryId'));

  const { data: categoryData } = useGetCategory({ targetCategoryId: pickCategory });

  if (!categoryData) return null;

  const rootCategory = (categoryData as Category[]).find(
    category => category.isOpen === true,
  )?.name;

  return (
    <section className={S.leftSection}>
      <div className={S.pickCategory}>{rootCategory || 'ALL'}</div>
      <AuctionCategory categoryData={categoryData as Category[]} />
    </section>
  );
}
