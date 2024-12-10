import { Suspense } from 'react';

import { Category } from '@/apis/types/category';
import CategoryUnit from '@/components/Category/CategoryUnit/CategoryUnit';
import useSetSearchParams from '@/hooks/useSetSearchParam';
import mixpanel from '@/lib/mixpanel';
import EVENT_ID from '@/static/eventId';

import * as S from './AuctionCategory.css';

interface AuctionCategoryProps {
  categoryData: Category[];
}
function AuctionCategory({ categoryData }: AuctionCategoryProps) {
  const { searchParams, setMultipleSearchParams } = useSetSearchParams();
  const categoryId = searchParams.get('categoryId');

  const handleCategory = () => {
    setMultipleSearchParams({ categoryId: '', page: '1' });
    mixpanel.track(EVENT_ID.CATEGORY_BUTTON_CLICKED, {
      category_name: 'ALL',
    });
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
      <Suspense fallback={<>CategoryUnit</>}>
        {categoryData.map(category => (
          // eslint-disable-next-line react/jsx-key
          <CategoryUnit unit={category} key={category.category_id} />
        ))}
      </Suspense>
    </div>
  );
}

export default AuctionCategory;
