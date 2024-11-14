import Link from 'next/link';

import { Category } from '@/apis/types/category';
import deleteQueryParamsInUrl from '@/utils/deleteQueryParamsInUrl';

import * as S from './AuctionCategory.css';
import CategoryUnit from './CategoryUnit';

interface AuctionCategoryProps {
  categoryData: Category[];
}
function AuctionCategory({ categoryData }: AuctionCategoryProps) {
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
