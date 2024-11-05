'use client';

import { useSearchParams } from 'next/navigation';

import useGetBasicAuctionList from '@/apis/queryHooks/basicAuction/useGetBasicAuctionList';
import AuctionCard from '@/components/AuctionCard';
import ListLayout from '@/components/ListLayout';
import { AUCTIONPARAM_KEY } from '@/static/queryParam';

import * as S from './Basicauction.css';

function BasicAuction() {
  const searchParams = useSearchParams();
  const searchKeywordParam = searchParams.get(AUCTIONPARAM_KEY.Q);

  const { data } = useGetBasicAuctionList({
    title: searchKeywordParam || '',
    auctionStatus: searchParams.get(AUCTIONPARAM_KEY.AUCTIONSTATUS) || '',
    sort: searchParams.get(AUCTIONPARAM_KEY.SORT) || '',
    direction: searchParams.get(AUCTIONPARAM_KEY.DIRECTION) || '',
    page: 0,
    size: 20,
  });

  return (
    <div className={S.container}>
      <div className={S.searchContainer}>
        <div className={S.count}>
          <span>전체</span>
          <span>{data.result_data.content.length}</span>
        </div>
      </div>
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
    </div>
  );
}

export default BasicAuction;
