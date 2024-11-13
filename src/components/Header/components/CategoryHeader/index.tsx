import { useState } from 'react';

import * as HoverCard from '@radix-ui/react-hover-card';
import { ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';

import { Category } from '@/apis/types/category';
import SearchBar from '@/app/basicauction/components/searchbar';
import colors from '@/styles/color';

import * as S from './CategoryHeader.css';

interface CategoryHeaderProps {
  data: Category[];
}

function CategoryHeader({ data }: CategoryHeaderProps) {
  const [openCategory, setOpenCategory] = useState<Category | null>();

  const handleHover = (category: Category) => {
    setOpenCategory(category);
  };

  return (
    <section className={S.bottomHeaderWrapper}>
      <HoverCard.Root openDelay={200}>
        <div className={S.bottomHeader}>
          {data.map(category => (
            <HoverCard.Trigger
              asChild
              key={category.category_id}
              onMouseEnter={() => handleHover(category)}
            >
              <Link
                href={`/basicauction/?categoryId=${category.category_id}`}
                className={S.buttonStyles}
                scroll={false}
              >
                {category.name}
              </Link>
            </HoverCard.Trigger>
          ))}
        </div>
        <HoverCard.Portal>
          <HoverCard.Content asChild className={S.hoverCardContent}>
            <div>
              {openCategory?.sub_categories.map(sub_category => (
                <div key={sub_category.category_id} className={S.subCategoryContainer}>
                  <Link
                    href={`/basicauction/?categoryName=${sub_category.name}&categoryId=${sub_category.category_id}`}
                  >
                    <div className={S.subCategoryTitle}>
                      {sub_category.name}
                      <ChevronRightIcon size={14} color={colors.gray10} />
                    </div>
                  </Link>
                  <ul>
                    {sub_category.sub_categories.map(sub_sub_category => (
                      <Link
                        key={sub_sub_category.category_id}
                        href={`/basicauction/?categoryName=${sub_sub_category.name}&categoryId=${sub_sub_category.category_id}`}
                      >
                        <li className={S.subCategory}>{sub_sub_category.name}</li>
                      </Link>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </HoverCard.Content>
        </HoverCard.Portal>
      </HoverCard.Root>
      <SearchBar />
    </section>
  );
}

export default CategoryHeader;
