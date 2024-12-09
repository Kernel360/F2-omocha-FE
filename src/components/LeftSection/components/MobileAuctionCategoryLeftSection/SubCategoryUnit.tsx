import Link from 'next/link';

import { Category } from '@/apis/types/category';
import mixpanel from '@/lib/mixpanel';
import EVENT_ID from '@/static/eventId';

import * as S from './SubCategoryUnit.css';

interface SubCategoryUnitProps {
  categoryData: Category[];
}

function SubCategoryUnit({ categoryData }: SubCategoryUnitProps) {
  const handleMixpanel = (name: string) => {
    mixpanel.track(EVENT_ID.CATEGORY_BUTTON_CLICKED, {
      category_name: name,
    });
  };

  return (
    <div className={S.category}>
      {categoryData.map(category => (
        <Link
          key={category.category_id}
          href={`/basicauction?categoryId=${category.category_id}&page=1`}
          onClick={() => handleMixpanel(category.name)}
          className={S.subCategoryLink}
        >
          <div className={S.subCategoryName}>{category.name}</div>
        </Link>
      ))}
    </div>
  );
}

export default SubCategoryUnit;
