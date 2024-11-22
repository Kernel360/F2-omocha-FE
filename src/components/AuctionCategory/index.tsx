import { Category } from '@/apis/types/category';
import useSetSearchParams from '@/hooks/useSetSearchParam';

import * as S from './AuctionCategory.css';
import CategoryUnit from './CategoryUnit';

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
        <CategoryUnit key={category.category_id} unit={category} />
      ))}
    </div>
  );
}

export default AuctionCategory;
