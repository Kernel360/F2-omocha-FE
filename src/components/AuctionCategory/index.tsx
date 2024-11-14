import { Category } from '@/apis/types/category';
import useSetSearchParams from '@/hooks/useSetSearchParam';

import * as S from './AuctionCategory.css';
import CategoryUnit from './CategoryUnit';

interface AuctionCategoryProps {
  categoryData: Category[];
}
function AuctionCategory({ categoryData }: AuctionCategoryProps) {
  const { setSingleSearchParam } = useSetSearchParams();

  const test = () => {
    setSingleSearchParam('categoryId', '');
  };

  return (
    <div className={S.container}>
      <button type="button" className={`${S.unitContent} ${S.unitContentForSpan}`} onClick={test}>
        <span className={S.unitButtonSpan}>전체보기</span>
      </button>
      {categoryData.map(category => (
        <CategoryUnit key={category.category_id} unit={category} />
      ))}
    </div>
  );
}

export default AuctionCategory;
