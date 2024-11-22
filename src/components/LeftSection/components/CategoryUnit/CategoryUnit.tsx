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
      <Collapsible.Trigger asChild>
        <div className={S.unitButton}>
          <Collapsible.Trigger asChild>
            <Link scroll={false} href={`/basicauction/?categoryId=${unit.category_id}&page=1`}>
              <span className={isPick ? S.pickUnitButtonSpan : S.unitButtonSpan}>{unit.name}</span>
            </Link>
          </Collapsible.Trigger>
          <ChevronUpIcon size={16} className={S.chevronIcon} />
        </div>
      </Collapsible.Trigger>
      <Collapsible.Content className={S.unitContent}>
        {unit.sub_categories.map(sub_category =>
          sub_category.sub_categories.length > 0 ? (
            <CategoryUnit key={sub_category.category_id} unit={sub_category} />
          ) : (
            <Link
              key={sub_category.category_id}
              scroll={false}
              href={`/basicauction/?categoryId=${sub_category.category_id}&page=1`}
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
