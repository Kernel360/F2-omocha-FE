'use client';

import * as Collapsible from '@radix-ui/react-collapsible';
import { ChevronUpIcon } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { Category } from '@/apis/types/category';

import * as S from './CategoryUnit.css';

interface CategoryUnitProps {
  unit: Category;
}
function CategoryUnit({ unit }: CategoryUnitProps) {
  const searchParams = useSearchParams();
  const pickCategory = Number(searchParams.get('categoryId'));

  const isPick = unit.category_id === pickCategory;

  return (
    <Collapsible.Root className="CollapsibleRoot" defaultOpen={!!unit.isOpen}>
      <Link href={`/basicauction/?categoryId=${unit.category_id}`}>
        <Collapsible.Trigger asChild>
          <div className={S.unitButton}>
            <span className={isPick ? S.pickUnitButtonSpan : S.unitButtonSpan}>{unit.name}</span>
            <ChevronUpIcon size={16} className={S.chevronIcon} />
          </div>
        </Collapsible.Trigger>
      </Link>
      <Collapsible.Content className={S.unitContent}>
        {unit.sub_categories.map(sub_category =>
          sub_category.sub_categories.length > 0 ? (
            <CategoryUnit key={sub_category.category_id} unit={sub_category} />
          ) : (
            <Link
              key={sub_category.category_id}
              href={`/basicauction/?categoryId=${sub_category.category_id}`}
            >
              <div className={`${S.unitContent} ${S.unitContentForSpan}`}>
                <span
                  className={
                    sub_category.category_id === pickCategory
                      ? S.pickUnitButtonSpan
                      : S.unitButtonSpan
                  }
                >
                  {sub_category.name}
                </span>
              </div>
            </Link>
          ),
        )}
      </Collapsible.Content>
    </Collapsible.Root>
  );
}

export default CategoryUnit;
