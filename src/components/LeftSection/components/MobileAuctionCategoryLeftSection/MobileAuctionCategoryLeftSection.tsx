'use client';

import { useSearchParams } from 'next/navigation';

import useGetSubCategory from '@/apis/queryHooks/category/useGetSubCategory';
import { Category } from '@/apis/types/category';

import * as S from './MobileAuctionCategoryLeftSection.css';
import Test from './SubCategoryUnit';

function MobileAuctionCategoryLeftSection() {
  const searchParams = useSearchParams();
  const pickCategory = Number(searchParams.get('categoryId'));
  const { data: categoryData } = useGetSubCategory(pickCategory);

  const typedCategoryData = categoryData as Category[];

  if (!categoryData) return null;

  console.log('res', typedCategoryData);

  return (
    <div className={S.mobileLeftSection}>
      <Test categoryData={typedCategoryData} />
    </div>
  );
}

export default MobileAuctionCategoryLeftSection;
