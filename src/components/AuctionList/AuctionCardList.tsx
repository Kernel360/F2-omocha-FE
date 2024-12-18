import useGetBasicAuctionList from '@/apis/queryHooks/basicAuction/useGetBasicAuctionList';
import ListLayout from '@/components/ListLayout';

import AuctionCard from '../AuctionCard';
import CardListSkeleton from '../Skeleton/CardListSkeleton';

import * as S from './AuctionList.css';

interface AuctionCardListProps {
  sort: string;
  direction: string;
}

function AuctionCardList({ sort, direction }: AuctionCardListProps) {
  const { data, isLoading } = useGetBasicAuctionList({
    title: '',
    sort,
    direction,
    page: 0,
    size: 8,
    auctionStatus: 'BIDDING',
  });

  if (!data || isLoading) {
    return (
      <div className={S.listWrapper}>
        <CardListSkeleton count={8} />
      </div>
    );
  }

  return (
    <div className={S.listWrapper}>
      <ListLayout>
        {data.result_data.content.map(item => (
          <AuctionCard
            key={item.auction_id}
            id={item.auction_id}
            thumbnailImage={item.thumbnail_path}
            title={item.title}
            isLike={item.is_liked}
            startPrice={item.start_price}
            startTime={item.start_date}
            endTime={item.end_date}
            nowPrice={item.now_price}
            auctionStatus={item.auction_status}
            instantBuyPrice={item.instant_buy_price}
            category={item.category_id}
          />
        ))}
      </ListLayout>
    </div>
  );
}

export default AuctionCardList;
