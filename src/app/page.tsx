'use client';

// 이걸 최대한 빼고 서버 클라이언트에서 쿼리를 가져오는 법을 알아봐야할듯.. 캐시를 통해서 어쩌구..

import useGetBasicAuctionList from '@/apis/queryHooks/basicAuction/useGetBasicAuctionList';
import AuctionCard from '@/components/AuctionCard';
import ListLayout from '@/components/ListLayout';

export default function Home() {
  const { data } = useGetBasicAuctionList();
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
