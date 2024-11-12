'use client';

import useGetCategory from '@/apis/queryHooks/category/useGetCategory';

import * as S from './AuctionCategory.css';
// import CategoryProvider from './CategoryProvider';
// import CategoryTest from './CategoryTest';
import UnitTest from './CategoryUnit';

function AuctionCategory() {
  const { data: categoryData } = useGetCategory();

  if (!categoryData) return null;

  return (
    <>
      <div className={S.container}>
        {categoryData.map(category => (
          <UnitTest key={category.category_id} unit={category} />
        ))}
      </div>
    </>
  );
}

export default AuctionCategory;
