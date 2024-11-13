'use client';

import * as Collapsible from '@radix-ui/react-collapsible';
import { ChevronUpIcon } from 'lucide-react';
import Link from 'next/link';

import { Category } from '@/apis/types/category';

import * as S from './CategoryUnit.css';

interface CategoryUnitProps {
  unit: Category;
}
function CategoryUnit({ unit }: CategoryUnitProps) {
  return (
    <Collapsible.Root className="CollapsibleRoot" defaultOpen={!!unit.isOpen}>
      <Collapsible.Trigger asChild>
        <Link href={`/basicauction/?categoryName=${unit.name}&categoryId=${unit.category_id}`}>
          <div className={S.unitButton}>
            <span className={S.unitButtonSpan}>{unit.name}</span>
            <ChevronUpIcon
              size={16}
              className={S.chevronIcon}
              // data-state={open ? 'open' : 'closed'}
            />
          </div>
        </Link>
      </Collapsible.Trigger>
      <Collapsible.Content className={S.unitContent}>
        {unit.sub_categories.map(sub_category =>
          sub_category.sub_categories.length > 0 ? (
            <CategoryUnit key={sub_category.category_id} unit={sub_category} />
          ) : (
            <Link
              key={sub_category.category_id}
              href={`/basicauction/?categoryName=${sub_category.name}&categoryId=${sub_category.category_id}`}
            >
              <div className={`${S.unitContent} ${S.unitContentForSpan}`}>
                <span className={S.unitButtonSpan}>{sub_category.name}</span>
              </div>
            </Link>
          ),
        )}
      </Collapsible.Content>
    </Collapsible.Root>
  );
}

export default CategoryUnit;
