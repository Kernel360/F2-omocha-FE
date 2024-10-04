'use client';

import useGetBasicAuctionList from '@/apis/queryHooks/basicAuction/useGetBasicAuctionList';
import AuctionCard from '@/components/AuctionCard';
import ListLayout from '@/components/ListLayout';

export default function Home() {
  const { data } = useGetBasicAuctionList({
    title: '',
    sort: '',
    page: 0,
    size: 10,
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
        />
      ))}
    </ListLayout>
  );
}
