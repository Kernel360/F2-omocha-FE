'use client';

import { useMemo } from 'react';

import { useSearchParams } from 'next/navigation';

import useGetCategory from '@/apis/queryHooks/category/useGetCategory';
import { Category } from '@/apis/types/category';
import AuctionCategory from '@/components/Category/AuctionCategory/AuctionCategory';
import SkeletonCard from '@/components/Skeleton/components/SkeletonCard';
import useResizeViewportWidth from '@/hooks/useResizeViewportWidth';

import * as S from './AuctionCategoryLeftSection.css';

function addIsOpenProperty(
  targetCategoryId: number,
  category: Category,
): Category & { isOpen: boolean } {
  if (category.category_id === targetCategoryId) {
    return { ...category, isOpen: true };
  }

  let isOpen = false;
  const updatedSubCategory = category.sub_categories.map(subCategory => {
    const subAddIsOpen = addIsOpenProperty(targetCategoryId, subCategory);
    if (!isOpen && subAddIsOpen.isOpen) {
      isOpen = true;
    }
    return subAddIsOpen;
  });

  return { ...category, sub_categories: updatedSubCategory, isOpen };
}

export default function AuctionCategoryLeftSection() {
  const searchParams = useSearchParams();
  const { viewportWidth } = useResizeViewportWidth();
  const pickCategory = Number(searchParams.get('categoryId'));

  const { data: categoryData, isLoading } = useGetCategory();

  const newData = useMemo(() => {
    if (categoryData && pickCategory) {
      const addIsOpenPropertyData: Category[] = categoryData.map(category =>
        addIsOpenProperty(pickCategory, category as Category),
      );

      return addIsOpenPropertyData;
    }

    return [];
  }, [categoryData, pickCategory, isLoading]);

  const rootCategory = newData.find(category => category.isOpen)?.name;

  if (!viewportWidth || (isLoading && newData.length < 1)) {
    return (
      <section className={S.leftSection}>
        <SkeletonCard width={160} height={32} />
        <div className={S.container}>
          <SkeletonCard width={120} height={24} />
          <SkeletonCard width={120} height={24} />
          <SkeletonCard width={120} height={24} />
          <SkeletonCard width={120} height={24} />
        </div>
      </section>
    );
  }

  return (
    viewportWidth &&
    viewportWidth > 504 && (
      <section className={S.leftSection}>
        <div className={S.pickCategory}>{rootCategory || 'ALL'}</div>
        <AuctionCategory categoryData={newData} />
      </section>
    )
  );
}
