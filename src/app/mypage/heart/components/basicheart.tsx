'use client';

import useGetBasicAuctionList from '@/apis/queryHooks/basicAuction/useGetBasicAuctionList';
import AuctionCard from '@/components/AuctionCard';
import ListLayout from '@/components/ListLayout';

export default function BasicHeart() {
  const { data } = useGetBasicAuctionList({
    title: '',
    auctionStatus: '',
    sort: '',
    direction: '',
    page: 0,
    size: 5,
  });

  if (!data) return null;

  return (
    <ListLayout>
      {data.result_data.content.map(item => (
        <AuctionCard
          key={item.auction_id}
          id={item.auction_id}
          image={item.image_keys}
          title={item.title}
          isLike={false}
          startPrice={item.start_price}
          startTime={item.start_date}
          endTime={item.end_date}
          nowPrice={item.now_price}
        />
      ))}
    </ListLayout>
  );
}
