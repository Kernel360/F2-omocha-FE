import { Category } from '@/apis/types/category';
import useSetSearchParams from '@/hooks/useSetSearchParam';

import * as S from './AuctionCategory.css';
import CategoryUnit from './CategoryUnit';

interface AuctionCategoryProps {
  categoryData: Category[];
}
function AuctionCategory({ categoryData }: AuctionCategoryProps) {
  const { setSingleSearchParam } = useSetSearchParams();

  const handleCategory = () => {
    setSingleSearchParam('categoryId', '0');
  };

  return (
    <div className={S.container}>
      <button
        type="button"
        className={`${S.unitContent} ${S.unitContentForSpan}`}
        onClick={handleCategory}
      >
        <span className={S.unitButtonSpan}>ALL</span>
      </button>
      {categoryData.map(category => (
        <CategoryUnit key={category.category_id} unit={category} />
      ))}
    </div>
  );
}

export default AuctionCategory;
