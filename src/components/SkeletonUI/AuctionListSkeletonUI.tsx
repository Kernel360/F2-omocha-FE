/* eslint-disable react/no-array-index-key */
import ListLayout from '../ListLayout';

import * as S from './AuctionListSkeletonUI.css';
import SkeletonCard from './components/SkeletonCard';
import SkeletonText from './components/SkeletonText';

interface AuctionListSkeletonUIProps {
  count?: number;
}

function AuctionListSkeletonUI({ count }: AuctionListSkeletonUIProps) {
  return (
    <div className={S.container}>
      <SkeletonCard width={82} height={30} />
      <ListLayout>
        {Array.from({ length: count || 4 }).map((_, index) => (
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

export default AuctionListSkeletonUI;
