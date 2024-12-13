'use client';

import * as Collapsible from '@radix-ui/react-collapsible';
import { ChevronDownIcon } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { Category } from '@/apis/types/category';
import mixpanel from '@/lib/mixpanel';
import EVENT_ID from '@/static/eventId';

import * as S from './CategoryUnit.css';

interface CategoryUnitProps {
  unit: Category;
}
function CategoryUnit({ unit }: CategoryUnitProps) {
  const searchParams = useSearchParams();
  const pickCategory = Number(searchParams.get('categoryId'));
  const biddingState = searchParams.get('auctionStatus');

  const isPick = unit.category_id === pickCategory;

  const handleMixpanel = (name: string) => {
    mixpanel.track(EVENT_ID.CATEGORY_BUTTON_CLICKED, {
      category_name: name,
    });
  };

  return (
    <Collapsible.Root className="CollapsibleRoot" defaultOpen={!!unit.isOpen}>
      <Collapsible.Trigger asChild>
        <div className={S.unitButton}>
          <Collapsible.Trigger asChild>
            <Link
              scroll={false}
              href={
                biddingState
                  ? `/basicauction/?categoryId=${unit.category_id}&page=1&auctionStatus=${biddingState}`
                  : `/basicauction/?categoryId=${unit.category_id}&page=1`
              }
              onClick={() => handleMixpanel(unit.name)}
            >
              <span className={isPick ? S.pickUnitButtonSpan : S.unitButtonSpan}>{unit.name}</span>
            </Link>
          </Collapsible.Trigger>
          <ChevronDownIcon size={16} className={S.chevronIcon} />
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
              href={
                biddingState
                  ? `/basicauction/?categoryId=${sub_category.category_id}&page=1&auctionStatus=${biddingState}`
                  : `/basicauction/?categoryId=${sub_category.category_id}&page=1`
              }
              onClick={() => handleMixpanel(sub_category.name)}
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
