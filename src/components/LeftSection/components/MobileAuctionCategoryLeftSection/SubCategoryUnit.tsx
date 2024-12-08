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
        <Link
          key={category.category_id}
          href={`/basicauction?categoryId=${category.category_id}&page=1`}
          className={S.subCategoryLink}
        >
          <div className={S.subCategoryName}>{category.name}</div>
        </Link>
      ))}
    </div>
  );
}

export default SubCategoryUnit;
