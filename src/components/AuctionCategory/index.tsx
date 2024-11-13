import useGetCategory from '@/apis/queryHooks/category/useGetCategory';

import * as S from './AuctionCategory.css';
import CategoryUnit from './CategoryUnit';
import deleteQueryParamsInUrl from '@/utils/deleteQueryParamsInUrl';
import Link from 'next/link';

function AuctionCategory() {
  const { data: categoryData } = useGetCategory();

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
