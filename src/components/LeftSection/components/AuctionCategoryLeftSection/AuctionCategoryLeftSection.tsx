'use client';

import { useEffect, useMemo } from 'react';

import { useSearchParams } from 'next/navigation';

import useGetCategory from '@/apis/queryHooks/category/useGetCategory';
import { Category } from '@/apis/types/category';
import AuctionCategory from '@/components/LeftSection/components/AuctionCategory/AuctionCategory';

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
  const pickCategory = Number(searchParams.get('categoryId'));

  const { data: categoryData } = useGetCategory();

  // TODO gnrdmf: unmount 확인용
  useEffect(() => {
    return () => {
      console.log('unmount');
    };
  }, []);

  const newData = useMemo(() => {
    if (categoryData && pickCategory) {
      const addIsOpenPropertyData: Category[] = categoryData.map(category =>
        addIsOpenProperty(pickCategory, category as Category),
      );

      return addIsOpenPropertyData;
    }
    return categoryData;
  }, [categoryData, pickCategory]);

  const rootCategory = (newData as Category[]).find(category => category.isOpen === true)?.name;

  return (
    <section className={S.leftSection}>
      <div className={S.pickCategory}>{rootCategory || 'ALL'}</div>
      <AuctionCategory categoryData={newData} />
    </section>
  );
}
