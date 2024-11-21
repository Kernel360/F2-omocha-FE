import Link from 'next/link';

import { Category } from '@/apis/types/category';
import SearchBar from '@/app/basicauction/components/searchbar';

import * as S from './CategoryHeader.css';

interface CategoryHeaderProps {
  data: Category[];
}

function CategoryHeader({ data }: CategoryHeaderProps) {
  return (
    <section className={S.bottomHeaderWrapper}>
      <div className={S.bottomHeader}>
        {data.map(category => (
          <Link
            key={category.category_id}
            href={`/basicauction/?categoryId=${category.category_id}`}
            className={S.buttonStyles}
            scroll={false}
          >
            {category.name}
          </Link>
        ))}
      </div>
      <div className={S.searchBarWrapper}>
        <SearchBar />
      </div>
    </section>
  );
}

export default CategoryHeader;
