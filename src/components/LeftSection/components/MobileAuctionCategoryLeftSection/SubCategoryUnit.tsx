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
        <div key={category.category_id} className={S.subCategory}>
          <Link
            href={`/basicauction?categoryId=${category.category_id}&page=1`}
            className={S.subCategoryLink}
            onClick={() => handleMixpanel(category.name)}
          >
            {category.name}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default SubCategoryUnit;
