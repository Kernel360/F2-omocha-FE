'use client';

import * as Collapsible from '@radix-ui/react-collapsible';

import useGetCategory from '@/apis/queryHooks/category/useGetCategory';
import useBooleanState from '@/hooks/useBooleanState';

import * as S from './AuctionCategory.css';
// import Unit from './Unit';

function AuctionCategory() {
  const { data: categoryData } = useGetCategory();
  const { value: open, setValue: setOpen } = useBooleanState(false);

  if (!categoryData) return null;

  return (
    <div className={S.container}>
      {categoryData.map(category => (
        <div key={category.category_id}>
          <Collapsible.Root className="CollapsibleRoot" open={open} onOpenChange={setOpen}>
            <Collapsible.Trigger asChild className={S.unitButton}>
              <span>{category.name}</span>
            </Collapsible.Trigger>
            <Collapsible.Content className={S.unitContent}>
              {category.sub_categories.map(sub_category => (
                <li key={sub_category.category_id}>{sub_category.name}</li>
              ))}
            </Collapsible.Content>
          </Collapsible.Root>
        </div>
      ))}
    </div>
  );
}

export default AuctionCategory;
