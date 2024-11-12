'use client';

import * as Collapsible from '@radix-ui/react-collapsible';

import useBooleanState from '@/hooks/useBooleanState';

import * as S from './CategoryUnit.css';
import { ChevronUpIcon } from 'lucide-react';

export interface Category {
  category_id: number;
  name: string;
  parent_id: number | null;
  sub_categories: Category[];
}

interface CategoryUnitProps {
  unit: Category;
}
function CategoryUnit({ unit }: CategoryUnitProps) {
  const { value: open, setValue: setOpen } = useBooleanState(false);

  return (
    <Collapsible.Root className="CollapsibleRoot" open={open} onOpenChange={setOpen}>
      <Collapsible.Trigger asChild>
        <div className={S.unitButton}>
          <span className={S.unitButtonSpan}>{unit.name}</span>
          <ChevronUpIcon
            size={16}
            className={S.chevronIcon}
            data-state={open ? 'open' : 'closed'}
          />
        </div>
      </Collapsible.Trigger>
      <Collapsible.Content className={S.unitContent}>
        {unit.sub_categories.map(sub_category =>
          sub_category.sub_categories.length > 0 ? (
            <CategoryUnit key={sub_category.category_id} unit={sub_category} />
          ) : (
            <div
              key={sub_category.category_id}
              className={`${S.unitContent} ${S.unitContentForSpan}`}
            >
              <span className={S.unitButtonSpan}>{sub_category.name}</span>
            </div>
          ),
        )}
      </Collapsible.Content>
    </Collapsible.Root>
  );
}

export default CategoryUnit;
