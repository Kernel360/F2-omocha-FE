import ListLayout from '@/components/ListLayout';

import * as S from './CardListSkeleton.css';
import SkeletonCard from './components/SkeletonCard';
import SkeletonText from './components/SkeletonText';

interface CardListSkeletonProps {
  count?: number;
}

function CardListSkeleton({ count }: CardListSkeletonProps) {
  return (
    <div className={S.container}>
      <ListLayout>
        {Array.from({ length: count || 4 }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} className={S.cardContainer}>
            <SkeletonCard width={186} height={196} />
            <div className={S.textContainer}>
              <SkeletonText noOfLines={2} gap={8} />
            </div>
          </div>
        ))}
      </ListLayout>
    </div>
  );
}

export default CardListSkeleton;
