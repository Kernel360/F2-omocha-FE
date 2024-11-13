import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import useGetCategory from '@/apis/queryHooks/category/useGetCategory';
import deleteQueryParamsInUrl from '@/utils/deleteQueryParamsInUrl';

import * as S from './AuctionCategory.css';
import CategoryUnit from './CategoryUnit';

function AuctionCategory() {
  const searchParams = useSearchParams();
  const pickCategory = Number(searchParams.get('categoryId'));

  const { data: categoryData } = useGetCategory({ targetCategoryId: pickCategory });

  if (!categoryData) return null;

  return (
    <div className={S.container}>
      <Link href={deleteQueryParamsInUrl('categoryName', 'categoryId')}>
        <div className={`${S.unitContent} ${S.unitContentForSpan}`}>
          <span className={S.unitButtonSpan}>전체보기</span>
        </div>
      </Link>
      {categoryData.map(category => (
        <CategoryUnit key={category.category_id} unit={category} />
      ))}
    </div>
  );
}

export default AuctionCategory;
