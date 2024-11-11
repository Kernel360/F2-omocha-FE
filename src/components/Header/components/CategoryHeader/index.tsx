import { useState } from 'react';

import * as HoverCard from '@radix-ui/react-hover-card';
import Link from 'next/link';

import useGetCategory from '@/apis/queryHooks/category/useGetCategory';

import * as S from './CategoryHeader.css';

const changeCategory = (type: string) => {
  if (type === '영화') {
    return 'movie';
  }
  if (type === '애니') {
    return 'amime';
  }
  if (type === '아이돌') {
    return 'Idol';
  }
  return 'movie';
};

export interface Category {
  category_id: number;
  name: string;
  parent_id: number | null;
  sub_categories: Category[];
}

function CategoryHeader() {
  const [openCategory, setOpenCategory] = useState<Category | null>();

  const handleHover = (category: Category) => {
    setOpenCategory(category);
  };
  const { data: categoryData } = useGetCategory();
  return (
    <HoverCard.Root openDelay={0}>
      <div className={S.bottomHeader}>
        {categoryData?.map(category => (
          <HoverCard.Trigger
            asChild
            key={category.category_id}
            onMouseEnter={() => handleHover(category)}
          >
            <Link
              href={`/category/${changeCategory(category.name)}`}
              className={S.buttonStyles}
              scroll={false}
            >
              {category.name}
            </Link>
          </HoverCard.Trigger>
        ))}
      </div>
      <HoverCard.Portal>
        <HoverCard.Content asChild>
          <div className={S.customPopperContent}>
            {openCategory?.sub_categories.map(sub_category => (
              <div key={sub_category.category_id}>{sub_category.name}</div>
            ))}
          </div>
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}

export default CategoryHeader;
