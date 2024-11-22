import Link from 'next/link';

import { Category } from '@/apis/types/category';

import * as S from './SubCategoryUnit.css';

interface SubCategoryUnitProps {
  categoryData: Category[];
}

function SubCategoryUnit({ categoryData }: SubCategoryUnitProps) {
  return (
    <div className={S.category}>
      {categoryData.map(category => (
        <div key={category.category_id} className={S.subCategory}>
          <Link href={`/basicauction?categoryId=${category.category_id}&page=1`}>
            {category.name}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default SubCategoryUnit;
