import { Suspense } from 'react';

import { Category } from '@/apis/types/category';
import CategoryUnit from '@/components/Category/CategoryUnit/CategoryUnit';
import useSetSearchParams from '@/hooks/useSetSearchParam';

import * as S from './AuctionCategory.css';

interface AuctionCategoryProps {
  categoryData: Category[];
}
function AuctionCategory({ categoryData }: AuctionCategoryProps) {
  const { searchParams, setMultipleSearchParams } = useSetSearchParams();
  const categoryId = searchParams.get('categoryId');

  const handleCategory = () => {
    setMultipleSearchParams({ categoryId: '', page: '1' });
  };

  const unitButtonStyle = () => {
    return categoryId === null ? `${S.unitButtonSpan} ${S.unitButtonALL}` : S.unitButtonSpan;
  };

  return (
    <div className={S.container}>
      <button
        type="button"
        className={`${S.unitContent} ${S.unitContentForSpan}`}
        onClick={handleCategory}
      >
        <span className={unitButtonStyle()}>ALL</span>
      </button>
      {categoryData.map(category => (
        // eslint-disable-next-line react/jsx-key
        <Suspense fallback={<>CategoryUnit</>}>
          <CategoryUnit unit={category} key={category.category_id} />
        </Suspense>
      ))}
    </div>
  );
}

export default AuctionCategory;
